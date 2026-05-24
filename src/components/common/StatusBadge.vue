<template>
  <div class="flex items-center gap-1.5">
    <span
      :class="[
        'inline-block h-2 w-2 rounded-full',
        variantClass
      ]"
    ></span>
    <span class="text-sm text-neutral-600 dark:text-neutral-300">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string
  label: string
}>()

const variantClass = computed(() => {
  switch (props.status) {
    case 'active':
    case 'success':
      return 'bg-[#a3be8c]'
    case 'disabled':
    case 'inactive':
    case 'warning':
      return 'bg-[#ebcb8b]'
    case 'error':
    case 'danger':
      return 'bg-[#bf616a]'
    default:
      return 'bg-gray-400'
  }
})
</script>
