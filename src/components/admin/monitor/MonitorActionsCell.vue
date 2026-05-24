<template>
  <div class="flex items-center gap-1">
    <button
      @click="$emit('run', row)"
      :disabled="running"
      class="flex flex-col items-center gap-0.5 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-gray-100 hover:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
    >
      <Icon name="refresh" size="sm" :class="running ? 'animate-spin' : ''" />
      <span class="text-xs">{{ t('admin.channelMonitor.runNow') }}</span>
    </button>
    <button
      @click="$emit('edit', row)"
      class="flex flex-col items-center gap-0.5 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-gray-100 hover:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
    >
      <Icon name="edit" size="sm" />
      <span class="text-xs">{{ t('common.edit') }}</span>
    </button>
    <button
      @click="$emit('delete', row)"
      class="flex flex-col items-center gap-0.5 rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-[#bf616a] hover:text-red-400/70 dark:hover:bg-[#bf616a]/15 dark:hover:text-red-400"
    >
      <Icon name="trash" size="sm" />
      <span class="text-xs">{{ t('common.delete') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ChannelMonitor } from '@/api/admin/channelMonitor'
import Icon from '@/components/icons/Icon.vue'

defineProps<{
  row: ChannelMonitor
  running: boolean
}>()

defineEmits<{
  (e: 'run', row: ChannelMonitor): void
  (e: 'edit', row: ChannelMonitor): void
  (e: 'delete', row: ChannelMonitor): void
}>()

const { t } = useI18n()
</script>
