<template>
  <div class="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] p-4 sm:p-6">
    <!-- Subtle noise texture via radial gradient -->
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_60%)]"></div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="mb-8 text-center">
        <template v-if="settingsLoaded">
          <div
            class="mb-4 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <h1 class="brand-title mb-1.5 text-2xl font-bold tracking-tight">
            {{ siteName }}
          </h1>
          <p class="brand-subtitle text-sm">
            {{ siteSubtitle }}
          </p>
        </template>
      </div>

      <!-- Card Container -->
      <div class="auth-panel rounded-2xl p-8 sm:p-9">
        <slot />
      </div>

      <!-- Footer Links -->
      <div class="auth-footer mt-5 text-center text-sm">
        <slot name="footer" />
      </div>

      <!-- Copyright -->
      <div class="mt-6 text-center text-xs text-neutral-700">
        &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'CCF')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Campus · Care · Future')
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.brand-title {
  color: #f5f5f5;
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.03em;
}

.brand-subtitle {
  color: rgba(163, 163, 163, 0.85);
}

.auth-panel {
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.auth-footer :deep(p) {
  color: rgba(163, 163, 163, 0.8);
}

.auth-footer :deep(a) {
  color: #a3a3a3 !important;
}

.auth-footer :deep(a:hover) {
  color: #e5e5e5 !important;
}

.auth-shell :deep(h2) {
  color: #f5f5f5 !important;
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.025em;
}

.auth-shell :deep(.text-center > p) {
  color: rgba(163, 163, 163, 0.8) !important;
}

.auth-shell :deep(.input-label) {
  color: rgba(163, 163, 163, 0.9) !important;
}

.auth-shell :deep(.input) {
  background: rgba(10, 10, 10, 0.9) !important;
  border-color: rgba(255, 255, 255, 0.09) !important;
  color: #f5f5f5 !important;
}

.auth-shell :deep(.input::placeholder) {
  color: rgba(115, 115, 115, 0.7) !important;
}

.auth-shell :deep(.input:hover) {
  border-color: rgba(255, 255, 255, 0.18) !important;
}

.auth-shell :deep(.input:focus) {
  border-color: rgba(255, 255, 255, 0.35) !important;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05) !important;
}

.auth-shell :deep(.btn-primary) {
  background: #e5e5e5 !important;
  color: #0a0a0a !important;
  border: none !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  font-weight: 600;
}

.auth-shell :deep(.btn-primary:hover) {
  background: #ffffff !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.auth-shell :deep(.btn-secondary) {
  background: rgba(20, 20, 20, 0.9) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #d4d4d4 !important;
}

.auth-shell :deep(.btn-secondary:hover) {
  background: rgba(30, 30, 30, 0.98) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Links */
.auth-shell :deep(.text-neutral-300),
.auth-shell :deep(.dark\:text-neutral-400),
.auth-shell :deep(.dark\:text-neutral-300) {
  color: #a3a3a3 !important;
}

.auth-shell :deep(.hover\:text-neutral-500:hover),
.auth-shell :deep(.hover\:text-neutral-200:hover),
.auth-shell :deep(.dark\:hover\:text-neutral-300:hover),
.auth-shell :deep(.dark\:hover\:text-neutral-200:hover) {
  color: #e5e5e5 !important;
}

/* Status boxes */
.auth-shell :deep(.bg-[#0a1a0e]),
.auth-shell :deep(.dark\:bg-green-900\/20) {
  background: rgba(52, 211, 153, 0.08) !important;
}

.auth-shell :deep(.text-green-400),
.auth-shell :deep(.dark\:text-green-400),
.auth-shell :deep(.text-green-600) {
  color: #34d399 !important;
}

.auth-shell :deep(.bg-[#1a1200]),
.auth-shell :deep(.dark\:bg-amber-900\/20) {
  background: rgba(251, 191, 36, 0.08) !important;
}

.auth-shell :deep(.border-amber-800) {
  border-color: rgba(251, 191, 36, 0.2) !important;
}

.auth-shell :deep(.text-amber-400),
.auth-shell :deep(.dark\:text-amber-400),
.auth-shell :deep(.text-amber-600) {
  color: #fbbf24 !important;
}

/* Generic text overrides */
.auth-shell :deep(.text-gray-500),
.auth-shell :deep(.dark\:text-neutral-400) {
  color: rgba(115, 115, 115, 0.9) !important;
}

.auth-shell :deep(.text-gray-400),
.auth-shell :deep(.dark\:text-dark-500) {
  color: rgba(82, 82, 82, 0.9) !important;
}

.auth-shell :deep(.text-gray-700),
.auth-shell :deep(.dark\:text-neutral-300),
.auth-shell :deep(.dark\:text-neutral-200) {
  color: #d4d4d4 !important;
}

/* Background overrides */
.auth-shell :deep(.bg-white),
.auth-shell :deep(.dark\:bg-[#0d0d0d]) {
  background-color: #111111 !important;
}

.auth-shell :deep(.bg-gray-50\/80),
.auth-shell :deep(.dark\:bg-dark-950\/60),
.auth-shell :deep(.bg-gray-50\/70),
.auth-shell :deep(.dark\:bg-neutral-800\/70),
.auth-shell :deep(.dark\:bg-neutral-800) {
  background-color: rgba(20, 20, 20, 0.9) !important;
}

.auth-shell :deep(.border-gray-100),
.auth-shell :deep(.border-gray-200),
.auth-shell :deep(.dark\:border-neutral-800\/60) {
  border-color: rgba(255, 255, 255, 0.07) !important;
}

.auth-shell :deep(.text-gray-950),
.auth-shell :deep(.dark\:text-white) {
  color: #f5f5f5 !important;
}

.auth-shell :deep(.bg-gray-200),
.auth-shell :deep(.dark\:bg-neutral-900) {
  background-color: rgba(255, 255, 255, 0.08) !important;
}

.auth-shell :deep(.input-hint) {
  color: rgba(115, 115, 115, 0.8) !important;
}
</style>
