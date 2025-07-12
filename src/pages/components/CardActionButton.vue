<template>
  <div
    class="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
    @click="onClick"
  >
    <div class="mb-2 w-8 h-8">
      <slot name="icon"></slot>
    </div>
    <div class="text-center text-xs text-[#0C365A] break-words">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
});
</script>