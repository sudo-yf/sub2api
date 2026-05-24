<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="statusClass"
  >
    {{ statusLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { OrderStatus } from '@/types/payment'

const props = defineProps<{
  status: OrderStatus
}>()

const { t } = useI18n()

const statusMap: Record<OrderStatus, { key: string; class: string }> = {
  PENDING: { key: 'payment.status.pending', class: 'bg-[#ebcb8b] text-neutral-900 dark:bg-[#ebcb8b]/12 dark:text-[#ebcb8b]' },
  PAID: { key: 'payment.status.paid', class: 'bg-[#81a1c1] text-white dark:bg-[#81a1c1]/12 dark:text-[#81a1c1]' },
  RECHARGING: { key: 'payment.status.recharging', class: 'bg-[#81a1c1] text-white dark:bg-[#81a1c1]/12 dark:text-[#81a1c1]' },
  COMPLETED: { key: 'payment.status.completed', class: 'bg-[#a3be8c] text-white dark:bg-[#a3be8c]/12 dark:text-[#a3be8c]' },
  EXPIRED: { key: 'payment.status.expired', class: 'bg-gray-100 text-neutral-300 dark:bg-neutral-900/30 dark:text-neutral-400' },
  CANCELLED: { key: 'payment.status.cancelled', class: 'bg-gray-100 text-neutral-300 dark:bg-neutral-900/30 dark:text-neutral-400' },
  FAILED: { key: 'payment.status.failed', class: 'bg-[#bf616a] text-white dark:bg-[#bf616a]/12 dark:text-[#bf616a]' },
  REFUND_REQUESTED: { key: 'payment.status.refund_requested', class: 'bg-[#ebcb8b] text-neutral-800 dark:bg-[#ebcb8b]/15 dark:text-[#ebcb8b]' },
  REFUNDING: { key: 'payment.status.refunding', class: 'bg-[#ebcb8b] text-neutral-800 dark:bg-[#ebcb8b]/15 dark:text-[#ebcb8b]' },
  REFUNDED: { key: 'payment.status.refunded', class: 'bg-[#b48ead] text-white dark:bg-[#b48ead]/12 dark:text-[#b48ead]' },
  PARTIALLY_REFUNDED: { key: 'payment.status.partially_refunded', class: 'bg-[#b48ead] text-white dark:bg-[#b48ead]/12 dark:text-[#b48ead]' },
  REFUND_FAILED: { key: 'payment.status.refund_failed', class: 'bg-[#bf616a] text-white dark:bg-[#bf616a]/12 dark:text-[#bf616a]' },
}

const statusLabel = computed(() => {
  const entry = statusMap[props.status]
  return entry ? t(entry.key) : props.status
})

const statusClass = computed(() => {
  const entry = statusMap[props.status]
  return entry?.class ?? 'bg-gray-100 text-neutral-300 dark:bg-neutral-900/30 dark:text-neutral-400'
})
</script>
