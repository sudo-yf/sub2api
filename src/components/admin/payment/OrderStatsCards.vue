<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <!-- Today Revenue -->
    <div class="card p-4">
      <div class="flex items-center gap-3">
        <div class="rounded-lg bg-[#a3be8c]/12 p-2 dark:bg-[#a3be8c]/12">
          <Icon name="dollar" size="md" class="text-[#a3be8c]/80 dark:text-[#a3be8c]" :stroke-width="2" />
        </div>
        <div>
          <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.todayRevenue') }}</p>
          <p class="text-xl font-bold text-neutral-100 dark:text-white">${{ formatMoney(stats.today_amount) }}</p>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            {{ stats.today_count }} {{ t('payment.admin.orders') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Total Revenue -->
    <div class="card p-4">
      <div class="flex items-center gap-3">
        <div class="rounded-lg bg-[#81a1c1]/12 p-2 dark:bg-[#81a1c1]/12">
          <Icon name="creditCard" size="md" class="text-[#81a1c1]/80 dark:text-[#81a1c1]" :stroke-width="2" />
        </div>
        <div>
          <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.totalRevenue') }}</p>
          <p class="text-xl font-bold text-neutral-100 dark:text-white">${{ formatMoney(stats.total_amount) }}</p>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">
            {{ stats.total_count }} {{ t('payment.admin.orders') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Today Orders -->
    <div class="card p-4">
      <div class="flex items-center gap-3">
        <div class="rounded-lg bg-[#b48ead]/12 p-2 dark:bg-[#b48ead]/12">
          <Icon name="chart" size="md" class="text-[#b48ead]/80 dark:text-[#b48ead]" :stroke-width="2" />
        </div>
        <div>
          <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.todayOrders') }}</p>
          <p class="text-xl font-bold text-neutral-100 dark:text-white">{{ stats.today_count }}</p>
        </div>
      </div>
    </div>

    <!-- Average Amount -->
    <div class="card p-4">
      <div class="flex items-center gap-3">
        <div class="rounded-lg bg-[#ebcb8b]/12 p-2 dark:bg-[#ebcb8b]/15">
          <Icon name="chart" size="md" class="text-[#d08770]/80 dark:text-[#d08770]" :stroke-width="2" />
        </div>
        <div>
          <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.avgAmount') }}</p>
          <p class="text-xl font-bold text-neutral-100 dark:text-white">${{ formatMoney(stats.avg_amount) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import type { DashboardStats } from '@/types/payment'

const { t } = useI18n()

defineProps<{
  stats: DashboardStats
}>()

function formatMoney(value: number): string {
  return value.toFixed(2)
}
</script>
