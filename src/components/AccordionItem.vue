<template>
  <div>
    <div
      style="z-index: 9"
      class="relative border border-gray-200 rounded-lg bg-white"
    >
      <div
        class="flex items-center justify-between p-4 cursor-pointer bg-[#F5F9FF]"
        @click="$emit('toggle')"
      >
        <div class="flex items-center">
          <span class="mr-3 text-blue-600">
            <slot name="icon">
              <component :is="icon" />
            </slot>
          </span>
          <span class="font-medium text-gray-800">{{ title }}</span>
        </div>
        <component
          :is="ChevronDown"
          :class="[
            'transition-transform duration-300 w-6 h-6',
            isOpen ? 'transform rotate-180' : '',
          ]"
        />
      </div>
      <div
        :class="[
          'transition-all duration-300 overflow-hidden',
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        ]"
      >
        <div class="p-4 border-t border-gray-200">
          <slot />
        </div>
      </div>
    </div>
    <div
      v-if="isOpen && title === 'Recent transactions' && transactions?.length > 0"
      style="z-index: 1"
      class="pt-5 p-4 text-center border bg-[#EDFFF5] border-[#DDFFEC] cursor-pointer border-t-0 rounded-b-lg relative mt-[-4px] p-[18px]"
    >
      <button class="text-[#01D167] font-medium hover:underline cursor-pointer">
        View all card transactions
      </button>
    </div>
  </div>
</template>

<script setup>
import ChevronDown from "./../assets/down-arrow.svg?component";

const props = defineProps({
  title: String,
  icon: [Object, Function, String],
  isOpen: Boolean,
  transactions: {
    type: Array,
    default: () => [],
  },
});
</script>
