<template>
  <div class="p-4 md:p-0 flex md:border-b md:border-gray-200 md:px-0 bg-[#0B2B4B] md:bg-transparent md:mt-6">
    <div
      v-for="tab in tabs"
      :key="tab.value"
      class="cursor-pointer py-4 mr-6 relative text-white md:text-black"
      :class="activeTab === tab.value ? 'text-blue-800 font-semibold' : 'text-gray-600'"
      @click="handleTabClick(tab.value)"
    >
      {{ tab.label }}
      <div
        v-if="activeTab === tab.value"
        class="absolute bottom-0 left-0 right-0 h-[0.8px] bg-[#23CEFD]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

type Tab = {
  label: string;
  value: string;
};

const props = defineProps<{
  tabs: Tab[];
  modelValue?: string;
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const activeTab = ref(props.modelValue ?? props.tabs[0]?.value ?? '');

watch(() => props.modelValue, (val) => {
  if (val !== undefined) activeTab.value = val;
});

function handleTabClick(value: string) {
  activeTab.value = value;
  emit('update:modelValue', value);
  emit('change', value);
}
</script> 