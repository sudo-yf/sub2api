<template>
  <section class="py-3 md:py-4">
    <div class="flex items-center justify-end gap-3 flex-wrap">
      <div
        role="tablist"
        class="inline-flex p-0.5 rounded-xl bg-gray-100 dark:bg-neutral-800 border border-gray-200/60 dark:border-neutral-800/60 text-xs"
      >
        <button
          v-for="opt in windowOptions"
          :key="opt.value"
          type="button"
          role="tab"
          :aria-selected="window === opt.value"
          class="px-3 py-1 rounded-lg transition-colors"
          :class="window === opt.value
            ? 'bg-white dark:bg-neutral-900 shadow-sm text-neutral-100 dark:text-white font-semibold'
            : 'text-neutral-500 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-500'"
          @click="emit('update:window', opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>

      <span
        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
        :class="overallChipClass"
      >
        <span
          class="w-1.5 h-1.5 rounded-full mr-1.5"
          :class="overallDotClass"
        ></span>
        {{ overallLabel }}
      </span>

      <button
        type="button"
        class="h-8 w-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-neutral-400 hover:bg-gray-100 dark:text-neutral-400 dark:hover:text-neutral-500 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
        :disabled="loading"
        :title="t('common.refresh')"
        @click="emit('refresh')"
      >
        <Icon name="refresh" size="md" :class="loading ? 'animate-spin' : ''" />
      </button>

      <AutoRefreshButton
        v-if="autoRefresh"
        :enabled="autoRefresh.enabled.value"
        :interval-seconds="autoRefresh.intervalSeconds.value"
        :countdown="autoRefresh.countdown.value"
        :intervals="autoRefresh.intervals"
        @update:enabled="autoRefresh.setEnabled"
        @update:interval="autoRefresh.setInterval"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import AutoRefreshButton from '@/components/common/AutoRefreshButton.vue'
export type MonitorWindow = '7d' | '15d' | '30d'
export type OverallStatus = 'operational' | 'degraded'

const props = defineProps<{
  overallStatus: OverallStatus
  intervalSeconds: number
  window: MonitorWindow
  loading: boolean
  autoRefresh?: {
    enabled: { value: boolean }
    intervalSeconds: { value: number }
    countdown: { value: number }
    intervals: readonly number[]
    setEnabled: (v: boolean) => void
    setInterval: (v: number) => void
  }
}>()

const emit = defineEmits<{
  (e: 'update:window', value: MonitorWindow): void
  (e: 'refresh'): void
}>()

const { t } = useI18n()

const windowOptions = computed<{ value: MonitorWindow; label: string }[]>(() => [
  { value: '7d', label: t('channelStatus.windowTab.7d') },
  { value: '15d', label: t('channelStatus.windowTab.15d') },
  { value: '30d', label: t('channelStatus.windowTab.30d') },
])

const overallLabel = computed(() => t(`channelStatus.overall.${props.overallStatus}`))

const overallChipClass = computed(() => {
  switch (props.overallStatus) {
    case 'operational':
      return 'bg-[#a3be8c] text-neutral-800 dark:bg-[#0a1a0f]/15 dark:text-[#a3be8c]'
    case 'degraded':
    default:
      return 'bg-[#ebcb8b] text-neutral-800 dark:bg-[#1a1200]/15 dark:text-[#ebcb8b]'
  }
})

const overallDotClass = computed(() => {
  switch (props.overallStatus) {
    case 'operational':
      return 'bg-[#a3be8c] animate-pulse'
    case 'degraded':
    default:
      return 'bg-[#d08770] animate-pulse'
  }
})

</script>
