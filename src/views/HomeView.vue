<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe v-if="isHomeContentUrl" :src="homeContent.trim()" class="h-screen w-full border-0" allowfullscreen />
    <div v-else v-html="homeContent" />
  </div>

  <div v-else class="relative min-h-screen flex flex-col" style="background-color:#0a0a0a;">

    <!-- ── Nav ── -->
    <header class="sticky top-0 z-30 flex h-14 items-center justify-between px-5 border-b border-neutral-800/40"
      style="background-color: var(--glass-header); backdrop-filter: blur(24px) saturate(160%); -webkit-backdrop-filter: blur(24px) saturate(160%);">
      <div class="flex items-center gap-3">
        <div class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-neutral-700/60 bg-neutral-800/80">
          <img v-if="siteLogo" :src="siteLogo" class="h-full w-full object-contain" />
          <span v-else class="text-xs font-bold text-neutral-200">C</span>
        </div>
        <span class="text-sm font-semibold text-neutral-200 tracking-tight">{{ siteName }}</span>
        <span class="hidden sm:inline-block text-xs text-neutral-600 font-mono">·&nbsp;{{ siteSubtitle }}</span>
      </div>
      <div class="flex items-center gap-3">
        <LocaleSwitcher />
        <a v-if="docUrl" :href="docUrl" target="_blank"
          class="hidden sm:flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors px-2 py-1 rounded-lg hover:bg-neutral-800/60">
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Docs
        </a>
        <router-link :to="isAuthenticated ? dashboardPath : '/login'"
          class="flex items-center gap-1.5 rounded-lg border border-neutral-700/60 bg-neutral-800/60 px-3 py-1.5 text-sm font-medium text-neutral-200 transition-all hover:border-neutral-600 hover:bg-neutral-800">
          {{ isAuthenticated ? 'Dashboard →' : 'Login' }}
        </router-link>
      </div>
    </header>

    <!-- ── Hero ── -->
    <main class="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">

      <!-- Badge -->
      <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-[#81a1c1]/20 bg-[#81a1c1]/8 px-3.5 py-1 text-xs font-medium text-[#81a1c1]">
        <span class="h-1.5 w-1.5 rounded-full bg-[#a3be8c] animate-pulse"></span>
        All systems operational
      </div>

      <!-- Headline -->
      <p class="mb-5 text-sm font-semibold tracking-[0.25em] uppercase text-neutral-500">
        CCF · Campus · Care · Future
      </p>
      <h1 class="mb-10 max-w-3xl text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none"
        style="font-family:'Space Grotesk',ui-sans-serif,system-ui,sans-serif;">
        <span class="text-transparent bg-clip-text"
          style="background-image: linear-gradient(135deg, #81a1c1 0%, #88c0d0 45%, #a3be8c 100%); -webkit-background-clip: text;">
          AI for students,
        </span><br />
        <span class="text-neutral-100">by students.</span>
      </h1>

      <!-- CTA -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <router-link :to="isAuthenticated ? dashboardPath : '/login'"
          class="flex items-center gap-2 rounded-xl border border-[#81a1c1]/30 bg-[#81a1c1]/10 px-5 py-2.5 text-sm font-semibold text-[#88c0d0] transition-all hover:border-[#81a1c1]/60 hover:bg-[#81a1c1]/15">
          {{ isAuthenticated ? 'Go to Dashboard' : 'Get Started Free' }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </router-link>
        <a v-if="docUrl" :href="docUrl" target="_blank"
          class="flex items-center gap-2 rounded-xl border border-neutral-700/60 bg-neutral-800/40 px-5 py-2.5 text-sm font-medium text-neutral-400 transition-all hover:border-neutral-600 hover:text-neutral-200">
          Read the Docs
        </a>
      </div>

      <!-- Quick code -->
      <div class="mt-12 w-full max-w-lg">
        <div class="card overflow-hidden text-left">
          <div class="flex items-center gap-2 border-b border-neutral-800/60 px-4 py-2.5">
            <div class="flex gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full bg-neutral-700"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-neutral-700"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-neutral-700"></span>
            </div>
            <span class="ml-1 text-xs text-neutral-600 font-mono">quickstart.py</span>
          </div>
          <pre class="px-5 py-4 text-xs leading-relaxed font-mono overflow-x-auto scrollbar-hide"><span class="text-neutral-600">from</span> <span class="text-[#88c0d0]">openai</span> <span class="text-neutral-600">import</span> <span class="text-neutral-300">OpenAI</span>

<span class="text-neutral-500"># drop-in replacement — just change base_url</span>
<span class="text-neutral-300">client</span> <span class="text-neutral-500">=</span> <span class="text-neutral-300">OpenAI</span>(
  <span class="text-[#81a1c1]">api_key</span><span class="text-neutral-500">=</span><span class="text-[#a3be8c]">"sk-ccf-..."</span><span class="text-neutral-500">,</span>
  <span class="text-[#81a1c1]">base_url</span><span class="text-neutral-500">=</span><span class="text-[#a3be8c]">"https://api.ccfuck.me/v1"</span><span class="text-neutral-500">,</span>
)

<span class="text-neutral-300">response</span> <span class="text-neutral-500">=</span> <span class="text-neutral-300">client</span>.<span class="text-[#88c0d0]">chat</span>.<span class="text-[#88c0d0]">completions</span>.<span class="text-[#88c0d0]">create</span>(
  <span class="text-[#81a1c1]">model</span><span class="text-neutral-500">=</span><span class="text-[#a3be8c]">"gpt-5"</span><span class="text-neutral-500">,</span>
  <span class="text-[#81a1c1]">messages</span><span class="text-neutral-500">=</span>[{<span class="text-[#a3be8c]">"role"</span>: <span class="text-[#a3be8c]">"user"</span><span class="text-neutral-500">,</span> <span class="text-[#a3be8c]">"content"</span>: <span class="text-[#a3be8c]">"hi"</span>}]
)</pre>
        </div>
      </div>
    </main>

    <!-- ── Stats ── -->
    <section class="px-4 pb-10">
      <div class="mx-auto max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div v-for="s in stats" :key="s.label" class="card p-4 text-center">
          <p class="text-xl font-bold" :style="{ color: s.color }">{{ s.value }}</p>
          <p class="mt-0.5 text-xs text-neutral-500">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- ── Features ── -->
    <section class="px-4 pb-16">
      <div class="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div v-for="f in features" :key="f.title" class="card p-4 flex items-start gap-3">
          <div class="mt-0.5 flex-shrink-0 rounded-lg p-2" :style="{ background: f.iconBg }">
            <svg class="h-4 w-4" :style="{ color: f.iconColor }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" :d="f.icon" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-neutral-200">{{ f.title }}</p>
            <p class="mt-0.5 text-xs text-neutral-500 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="border-t border-neutral-800/40 py-5 text-center text-xs text-neutral-700">
      © {{ year }} {{ siteName }} · Campus · Care · Future
    </footer>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'

const authStore = useAuthStore()
const appStore = useAppStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Campus · Care · Future')
const siteName = computed(() => appStore.siteName || 'CCF')
const docUrl = computed(() => appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const isHomeContentUrl = computed(() => { const c = homeContent.value.trim(); return c.startsWith('http://') || c.startsWith('https://') })
const year = new Date().getFullYear()

const stats = [
  { value: '99.9%', label: 'Uptime (30d)',      color: '#a3be8c' },
  { value: '<200ms', label: 'Latency p95',       color: '#88c0d0' },
  { value: '10+',   label: 'Models supported',   color: '#81a1c1' },
  { value: '24/7',  label: 'Always online',      color: '#b48ead' },
]

const features = [
  {
    title: 'OpenAI-compatible',
    desc: 'Drop-in replacement. Change one line of code to access all models.',
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    iconBg: 'rgb(129 161 193 / 0.12)',
    iconColor: '#81a1c1',
  },
  {
    title: 'Built for students',
    desc: 'Low barrier to entry. Register and start building immediately.',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    iconBg: 'rgb(163 190 140 / 0.12)',
    iconColor: '#a3be8c',
  },
  {
    title: 'All major models',
    desc: 'Claude, GPT-4o, Gemini, DeepSeek, Qwen and more — one endpoint.',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    iconBg: 'rgb(180 142 173 / 0.12)',
    iconColor: '#b48ead',
  },
  {
    title: 'Usage monitoring',
    desc: 'Real-time dashboards for requests, latency, and cost breakdown by model.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    iconBg: 'rgb(136 192 208 / 0.12)',
    iconColor: '#88c0d0',
  },
]

onMounted(() => {
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) appStore.fetchPublicSettings()
})
</script>
