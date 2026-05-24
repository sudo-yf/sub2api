<template>
  <AppLayout>
    <div class="space-y-6">
      <!-- Header with Day Switcher -->
      <div class="flex items-center justify-end">
        <div class="flex items-center gap-2">
          <div class="flex rounded-lg border border-gray-200 dark:border-neutral-800/60">
            <button
              v-for="d in DAYS_OPTIONS"
              :key="d"
              type="button"
              class="px-3 py-1.5 text-xs font-medium transition-colors first:rounded-l-lg last:rounded-r-lg"
              :class="days === d
                ? 'bg-neutral-600 text-white'
                : 'text-gray-600 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-900'"
              @click="days = d"
            >
              {{ d }}{{ t('payment.admin.daySuffix') }}
            </button>
          </div>
          <button @click="loadDashboard" :disabled="loading" class="btn btn-secondary" :title="t('common.refresh')">
            <Icon name="refresh" size="md" :class="loading ? 'animate-spin' : ''" />
          </button>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
      <template v-else-if="stats">
        <OrderStatsCards :stats="stats" />
        <DailyRevenueChart :data="stats.daily_series || []" :loading="loading" />
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="card p-4">
            <h3 class="mb-4 text-sm font-semibold text-neutral-100 dark:text-white">{{ t('payment.admin.paymentDistribution') }}</h3>
            <div v-if="!stats.payment_methods?.length" class="flex h-32 items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.noData') }}</div>
            <div v-else class="space-y-3">
              <div v-for="method in stats.payment_methods" :key="method.type" class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span :class="['inline-block h-3 w-3 rounded-full', methodColor(method.type)]"></span>
                  <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ t('payment.methods.' + method.type, method.type) }}</span>
                </div>
                <div class="text-right">
                  <span class="text-sm font-medium text-neutral-100 dark:text-white">&yen;{{ method.amount.toFixed(2) }}</span>
                  <span class="ml-2 text-xs text-neutral-500 dark:text-neutral-400">({{ method.count }})</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card p-4">
            <h3 class="mb-4 text-sm font-semibold text-neutral-100 dark:text-white">{{ t('payment.admin.topUsers') }}</h3>
            <div v-if="!stats.top_users?.length" class="flex h-32 items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.noData') }}</div>
            <div v-else class="space-y-2">
              <div v-for="(user, idx) in stats.top_users" :key="user.user_id" class="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-neutral-900">
                <div class="flex items-center gap-3">
                  <span :class="['flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold', rankClass(idx)]">{{ idx + 1 }}</span>
                  <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ user.email }}</span>
                </div>
                <span class="text-sm font-medium text-neutral-100 dark:text-white">&yen;{{ user.amount.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import { adminPaymentAPI } from '@/api/admin/payment'
import { extractI18nErrorMessage } from '@/utils/apiError'
import type { DashboardStats } from '@/types/payment'
import AppLayout from '@/components/layout/AppLayout.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import Icon from '@/components/icons/Icon.vue'
import OrderStatsCards from '@/components/admin/payment/OrderStatsCards.vue'
import DailyRevenueChart from '@/components/admin/payment/DailyRevenueChart.vue'

const { t } = useI18n()
const appStore = useAppStore()

const DAYS_OPTIONS = [7, 30, 90] as const
const days = ref<number>(30)
const loading = ref(false)
const stats = ref<DashboardStats | null>(null)

function methodColor(type: string): string {
  const c: Record<string, string> = {
    alipay: 'bg-[#81a1c1]', wxpay: 'bg-[#a3be8c]',
    alipay_direct: 'bg-blue-800/50', wxpay_direct: 'bg-green-400',
    stripe: 'bg-[#b48ead]',
  }
  return c[type] || 'bg-gray-400'
}

function rankClass(idx: number): string {
  if (idx === 0) return 'bg-[#ebcb8b] text-neutral-900 dark:bg-[#ebcb8b]/12 dark:text-[#ebcb8b]'
  if (idx === 1) return 'bg-gray-200 text-gray-600 dark:bg-[#252525] dark:text-neutral-300'
  if (idx === 2) return 'bg-[#ebcb8b] text-neutral-800 dark:bg-[#ebcb8b]/15 dark:text-[#ebcb8b]'
  return 'bg-gray-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400'
}

async function loadDashboard() {
  loading.value = true
  try {
    const res = await adminPaymentAPI.getDashboard(days.value)
    stats.value = res.data
  } catch (err: unknown) {
    appStore.showError(extractI18nErrorMessage(err, t, 'payment.errors', t('common.error')))
  } finally {
    loading.value = false
  }
}

watch(days, () => loadDashboard())
onMounted(() => loadDashboard())
</script>
