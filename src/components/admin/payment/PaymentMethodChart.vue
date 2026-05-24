<template>
  <div class="card p-4">
    <h3 class="mb-4 text-sm font-semibold text-neutral-100 dark:text-white">
      {{ t('payment.admin.paymentDistribution') }}
    </h3>
    <div
      v-if="!methods?.length"
      class="flex h-32 items-center justify-center text-sm text-neutral-500 dark:text-neutral-400"
    >
      {{ t('payment.admin.noData') }}
    </div>
    <div v-else class="space-y-3">
      <div v-for="method in methods" :key="method.type" class="space-y-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span :class="['inline-block h-3 w-3 rounded-full', colorMap[method.type] || 'bg-gray-400']"></span>
            <span class="text-sm text-neutral-600 dark:text-neutral-300">
              {{ t('payment.methods.' + method.type, method.type) }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-sm font-medium text-neutral-100 dark:text-white">
              ${{ method.amount.toFixed(2) }}
            </span>
            <span class="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
              ({{ method.count }})
            </span>
          </div>
        </div>
        <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-neutral-900">
          <div
            :class="['h-full rounded-full transition-all', barColorMap[method.type] || 'bg-gray-400']"
            :style="{ width: barWidth(method.amount) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  methods: { type: string; amount: number; count: number }[]
}>()

const colorMap: Record<string, string> = {
  alipay: 'bg-[#81a1c1]',
  wxpay: 'bg-[#a3be8c]',
  alipay_direct: 'bg-blue-800/50',
  wxpay_direct: 'bg-green-400',
  stripe: 'bg-[#b48ead]',
}

const barColorMap: Record<string, string> = {
  alipay: 'bg-[#81a1c1]',
  wxpay: 'bg-[#a3be8c]',
  alipay_direct: 'bg-blue-800/50',
  wxpay_direct: 'bg-green-400',
  stripe: 'bg-[#b48ead]',
}

const maxAmount = computed(() => {
  if (!props.methods?.length) return 1
  return Math.max(...props.methods.map(m => m.amount), 1)
})

function barWidth(amount: number): number {
  return Math.min((amount / maxAmount.value) * 100, 100)
}
</script>
