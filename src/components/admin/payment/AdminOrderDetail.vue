<template>
  <BaseDialog
    :show="show"
    :title="t('payment.admin.orderDetail')"
    width="wide"
    @close="emit('close')"
  >
    <div v-if="order" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.orderId') }}</p>
          <p class="font-mono text-sm font-medium text-neutral-100 dark:text-white">#{{ order.id }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.status') }}</p>
          <span :class="['badge', statusBadgeClass(order.status)]">
            {{ t('payment.status.' + order.status.toLowerCase(), order.status) }}
          </span>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.baseAmount') }}</p>
          <p class="text-sm font-medium text-neutral-100 dark:text-white">¥{{ baseAmount.toFixed(2) }}</p>
        </div>
        <div v-if="order.fee_rate > 0">
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.fee') }} ({{ order.fee_rate }}%)</p>
          <p class="text-sm font-medium text-neutral-100 dark:text-white">¥{{ feeAmount.toFixed(2) }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.payAmount') }}</p>
          <p class="text-sm font-medium text-neutral-100 dark:text-white">¥{{ order.pay_amount.toFixed(2) }}</p>
        </div>
        <div v-if="order.amount !== order.pay_amount">
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.creditedAmount') }}</p>
          <p class="text-sm font-medium text-neutral-100 dark:text-white">{{ order.order_type === 'balance' ? '$' : '¥' }}{{ order.amount.toFixed(2) }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.paymentMethod') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">
            {{ t('payment.methods.' + order.payment_type, order.payment_type) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.orderType') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">
            {{ t('payment.admin.' + order.order_type + 'Order', order.order_type) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.userId') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">#{{ order.user_id }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.orders.createdAt') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">{{ formatDateTime(order.created_at) }}</p>
        </div>
        <div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.expiresAt') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">{{ formatDateTime(order.expires_at) }}</p>
        </div>
        <div v-if="order.paid_at">
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.paidAt') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">{{ formatDateTime(order.paid_at) }}</p>
        </div>
        <div v-if="order.completed_at">
          <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ t('payment.admin.completedAt') }}</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">{{ formatDateTime(order.completed_at) }}</p>
        </div>
      </div>

      <div
        v-if="order.refund_amount"
        class="rounded-lg border border-[#bf616a]/20 bg-[#bf616a] p-3 dark:border-[#bf616a]/25 dark:bg-[#bf616a]/12"
      >
        <h4 class="mb-2 text-sm font-semibold text-[#bf616a]/80 dark:text-[#bf616a]">
          {{ t('payment.admin.refundInfo') }}
        </h4>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span class="text-[#bf616a]/80 dark:text-[#bf616a]">{{ t('payment.admin.refundAmount') }}:</span>
            <span class="ml-1 font-medium text-[#bf616a]/80 dark:text-[#bf616a]">{{ order.order_type === 'balance' ? '$' : '¥' }}{{ order.refund_amount.toFixed(2) }}</span>
          </div>
          <div v-if="order.refund_reason" class="col-span-2">
            <span class="text-[#bf616a]/80 dark:text-[#bf616a]">{{ t('payment.admin.refundReason') }}:</span>
            <span class="ml-1 text-[#bf616a]/80 dark:text-[#bf616a]">{{ order.refund_reason }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 border-t border-gray-200 pt-4 dark:border-neutral-800/60">
        <button
          v-if="order.status === 'PENDING'"
          @click="emit('cancel', order)"
          class="btn btn-sm rounded-md bg-[#ebcb8b]/12 px-3 py-1.5 text-sm text-neutral-900 hover:bg-[#ebcb8b]/12 dark:bg-[#ebcb8b]/12 dark:text-[#ebcb8b] dark:hover:bg-[#ebcb8b]/15"
        >
          {{ t('payment.orders.cancel') }}
        </button>
        <button
          v-if="order.status === 'FAILED'"
          @click="emit('retry', order)"
          class="btn btn-sm btn-secondary"
        >
          {{ t('payment.admin.retry') }}
        </button>
        <button
          v-if="canRefund(order)"
          @click="emit('refund', order)"
          class="btn btn-sm rounded-md bg-[#bf616a]/12 px-3 py-1.5 text-sm text-white hover:bg-[#bf616a]/12 dark:bg-[#bf616a]/12 dark:text-[#bf616a] dark:hover:bg-[#bf616a]/15"
        >
          {{ t('payment.admin.refund') }}
        </button>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseDialog from '@/components/common/BaseDialog.vue'
import type { PaymentOrder } from '@/types/payment'
import { statusBadgeClass, canRefund as canRefundStatus, formatOrderDateTime } from '@/components/payment/orderUtils'

const { t } = useI18n()

const props = defineProps<{
  show: boolean
  order: PaymentOrder | null
}>()

/** 充值金额 (base amount before fee) = pay_amount - fee = pay_amount / (1 + fee_rate/100) */
const baseAmount = computed(() => {
  if (!props.order) return 0
  const feeRate = Number(props.order.fee_rate) || 0
  if (feeRate <= 0) return props.order.pay_amount
  return props.order.pay_amount / (1 + feeRate / 100)
})

/** 手续费 = pay_amount - baseAmount */
const feeAmount = computed(() => {
  if (!props.order) return 0
  const feeRate = Number(props.order.fee_rate) || 0
  if (feeRate <= 0) return 0
  return props.order.pay_amount - baseAmount.value
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cancel', order: PaymentOrder): void
  (e: 'retry', order: PaymentOrder): void
  (e: 'refund', order: PaymentOrder): void
}>()

function canRefund(order: PaymentOrder): boolean {
  return canRefundStatus(order.status)
}

function formatDateTime(dateStr: string): string {
  return formatOrderDateTime(dateStr)
}
</script>
