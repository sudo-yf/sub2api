<template>
  <div class="card p-4">
    <h3 class="mb-4 text-sm font-semibold text-neutral-100 dark:text-white">
      {{ t('payment.admin.topUsers') }}
    </h3>
    <div
      v-if="!users?.length"
      class="flex h-32 items-center justify-center text-sm text-neutral-500 dark:text-neutral-400"
    >
      {{ t('payment.admin.noData') }}
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="(user, idx) in users"
        :key="user.user_id"
        class="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-neutral-900"
      >
        <div class="flex items-center gap-3">
          <span
            :class="[
              'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
              rankClass(idx),
            ]"
          >
            {{ idx + 1 }}
          </span>
          <span class="text-sm text-neutral-600 dark:text-neutral-300">{{ user.email }}</span>
        </div>
        <span class="text-sm font-medium text-neutral-100 dark:text-white">
          ${{ user.amount.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  users: { user_id: number; email: string; amount: number }[]
}>()

function rankClass(idx: number): string {
  if (idx === 0) return 'bg-[#ebcb8b] text-neutral-900 dark:bg-[#ebcb8b]/12 dark:text-[#ebcb8b]'
  if (idx === 1) return 'bg-gray-200 text-gray-600 dark:bg-[#252525] dark:text-neutral-300'
  if (idx === 2) return 'bg-[#ebcb8b] text-neutral-800 dark:bg-[#ebcb8b]/15 dark:text-[#ebcb8b]'
  return 'bg-gray-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400'
}
</script>
