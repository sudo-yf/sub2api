<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed bottom-6 right-5 z-[9999] flex flex-col gap-2 items-end"
      aria-live="polite"
      aria-atomic="true"
    >
      <TransitionGroup
        enter-active-class="transition ease-out duration-250"
        enter-from-class="opacity-0 translate-y-3 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'pointer-events-auto flex items-center gap-3',
            'min-w-[280px] max-w-sm rounded-xl px-4 py-3',
            'border border-neutral-700/60 bg-neutral-900/95 backdrop-blur-xl shadow-xl',
          ]"
        >
          <!-- Colored dot -->
          <span class="h-1.5 w-1.5 flex-shrink-0 rounded-full" :class="getDotColor(toast.type)" />

          <!-- Message -->
          <p class="flex-1 text-sm text-neutral-200 leading-snug">
            <span v-if="toast.title" class="font-semibold mr-1">{{ toast.title }}</span>
            {{ toast.message }}
          </p>

          <!-- Close -->
          <button
            @click="removeToast(toast.id)"
            class="flex-shrink-0 rounded-md p-0.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
            aria-label="Close"
          >
            <Icon name="x" size="sm" />
          </button>

          <!-- Progress bar -->
          <div v-if="toast.duration" class="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl overflow-hidden">
            <div
              :class="['h-full toast-progress', getProgressBarColor(toast.type)]"
              :style="{ animationDuration: `${toast.duration}ms` }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/icons/Icon.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const toasts = computed(() => appStore.toasts)

const getDotColor = (type: string): string => {
  const colors: Record<string, string> = {
    success: 'bg-[#a3be8c]',
    error: 'bg-[#bf616a]',
    warning: 'bg-[#ebcb8b]',
    info: 'bg-[#88c0d0]',
  }
  return colors[type] ?? colors.info
}

const getProgressBarColor = (type: string): string => {
  const colors: Record<string, string> = {
    success: 'bg-[#a3be8c]/60',
    error: 'bg-[#bf616a]/60',
    warning: 'bg-[#ebcb8b]/60',
    info: 'bg-[#88c0d0]/60',
  }
  return colors[type] ?? colors.info
}

const removeToast = (id: string) => {
  appStore.hideToast(id)
}
</script>

<style scoped>
.toast-progress {
  width: 100%;
  animation-name: toast-shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes toast-shrink {
  from { width: 100%; }
  to   { width: 0%; }
}
</style>
