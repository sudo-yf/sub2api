<template>
  <div class="flex items-center rounded-md overflow-hidden border border-neutral-700/60 bg-neutral-900">
    <button
      v-for="loc in availableLocales"
      :key="loc.code"
      @click="switchTo(loc.code)"
      :disabled="switching"
      class="px-2 py-1 text-[11px] font-semibold transition-colors disabled:opacity-50"
      :class="currentLocaleCode === loc.code
        ? 'bg-neutral-700 text-neutral-100'
        : 'text-neutral-500 hover:text-neutral-300'"
    >{{ loc.label }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale } = useI18n()
const switching = ref(false)
const currentLocaleCode = computed(() => locale.value)

const availableLocales = [
  { code: 'zh', label: '文' },
  { code: 'en', label: 'En' },
]

async function switchTo(code: string) {
  if (switching.value || code === currentLocaleCode.value) return
  switching.value = true
  try {
    await setLocale(code as 'zh' | 'en')
  } finally {
    switching.value = false
  }
}
</script>
