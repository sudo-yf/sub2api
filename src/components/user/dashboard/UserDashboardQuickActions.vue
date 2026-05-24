<template>
  <div class="panel-shell">
    <div class="border-b border-neutral-800/60 px-6 py-4">
      <h2 class="font-headline text-base font-semibold text-neutral-100">{{ t('dashboard.quickActions') }}</h2>
    </div>
    <div class="space-y-2 p-4">
      <button @click="router.push(getDevPreviewRoute('/keys'))" class="group flex w-full items-center gap-4 rounded-xl border border-neutral-800/60 bg-[#0d0d0d] p-4 text-left transition-all duration-150 hover:border-neutral-700/60 hover:bg-[#161616]">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-800">
          <Icon name="key" size="md" class="text-neutral-300" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-neutral-200">{{ t('dashboard.createApiKey') }}</p>
          <p class="text-xs text-neutral-500">{{ t('dashboard.generateNewKey') }}</p>
        </div>
        <Icon name="chevronRight" size="sm" class="text-neutral-600 transition-colors group-hover:text-neutral-400" />
      </button>

      <button @click="router.push(getDevPreviewRoute('/usage'))" class="group flex w-full items-center gap-4 rounded-xl border border-neutral-800/60 bg-[#0d0d0d] p-4 text-left transition-all duration-150 hover:border-neutral-700/60 hover:bg-[#161616]">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-800">
          <Icon name="chart" size="md" class="text-neutral-300" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-neutral-200">{{ t('dashboard.viewUsage') }}</p>
          <p class="text-xs text-neutral-500">{{ t('dashboard.checkDetailedLogs') }}</p>
        </div>
        <Icon name="chevronRight" size="sm" class="text-neutral-600 transition-colors group-hover:text-neutral-400" />
      </button>

      <button @click="router.push(getDevPreviewRoute('/redeem'))" class="group flex w-full items-center gap-4 rounded-xl border border-neutral-800/60 bg-[#0d0d0d] p-4 text-left transition-all duration-150 hover:border-neutral-700/60 hover:bg-[#161616]">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-800">
          <Icon name="gift" size="md" class="text-neutral-300" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-neutral-200">{{ t('dashboard.redeemCode') }}</p>
          <p class="text-xs text-neutral-500">{{ t('dashboard.addBalanceWithCode') }}</p>
        </div>
        <Icon name="chevronRight" size="sm" class="text-neutral-600 transition-colors group-hover:text-neutral-400" />
      </button>

      <button @click="router.push(getDevPreviewRoute('/available-channels'))" class="group flex w-full items-center gap-4 rounded-xl border border-neutral-800/60 bg-[#0d0d0d] p-4 text-left transition-all duration-150 hover:border-neutral-700/60 hover:bg-[#161616]">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-800">
          <Icon name="sync" size="md" class="text-neutral-300" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-neutral-200">Channel Status</p>
          <p class="text-xs text-neutral-500">Review upstream lanes and group access</p>
        </div>
        <Icon name="chevronRight" size="sm" class="text-neutral-600 transition-colors group-hover:text-neutral-400" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getDevPreviewRoute } from '@/utils/devPreview'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
const router = useRouter()
const { t } = useI18n()
</script>
