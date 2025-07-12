<template>
  <div
    class="mt-5 md:mt-0 w-full md:p-0 max-w-full md:max-w-md rounded-xl md:rounded-xl rounded-tr-none shadow-lg overflow-hidden transition-opacity duration-300"
    :class="getCardOpacity"
    :style="{ opacity: getCardOpacityValue }"
  >
    <div v-if="isMobile" class="ml-auto max-w-[200px] flex justify-end items-center mt-4 cursor-pointer text-green-500 font-medium bg-white rounded-bl-none rounded-lg rounded-br-none p-2" @click="props.handleShowCardNumber">
      <span class="flex items-center mr-2">
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
            fill="#4ADE80"
          />
        </svg>
      </span>
      <span>{{ props.showCardNumber ? 'Hide' : 'Show' }} card number</span>
    </div>
    <div class="relative bg-[#01D167] p-4 md:p-6 pt-6 md:pt-8 text-white rounded-xl md:rounded-xl rounded-tr-none">
      <div class="w-full flex justify-end items-center">
        <img src="../assets/aspire_logo_white.svg" class="h-6 md:h-8 mb-2" alt="Aspire Logo" />
      </div>
      <div class="mt-3 md:mt-4 mb-3 md:mb-4">
        <h2 class="text-xl md:text-2xl font-semibold">{{ props.card.name }}</h2>
      </div>
      <div class="flex space-x-4 mb-6 md:mb-8">
        <div class="flex flex-row space-x-2 md:space-x-6 overflow-hidden">
          <template v-for="(group, index) in displayedCardNumber.split(' ')" :key="index">
            <div class="flex space-x-1 md:space-x-2 mr-5">
              <span v-for="(char, idx) in group.split('')" :key="idx" class="text-lg md:text-xl font-semibold font-mono tracking-wide">{{ char }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex gap-8 md:gap-14">
          <div class="text-xs md:text-sm font-semibold text-white">
            Thru: {{ props.card.expiryDate }}
          </div>
          <div class="text-xs md:text-sm font-semibold text-white flex items-center">
            <div>CVV:&nbsp;</div>
            <div class="font-mono tracking-wide md:tracking-wider">{{ props.showCardNumber ? props.card.cvv : '•••' }}</div>
          </div>
        </div>
        <div class="h-6 md:h-8">
          <img src="./../assets/visa_logo.svg" alt="Visa Logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCardNumber } from "./../util";
import { useMobile } from '../composable/useMobile';
import { computed } from 'vue';

const props = defineProps<{
  card: {
    name: string;
    cardNumber: string;
    cvv: string;
    expiryDate: string;
    isFrozen?: boolean;
  };
  showCardNumber: boolean;
  handleShowCardNumber: () => void;
}>();

const { isMobile } = useMobile();

const displayedCardNumber = computed(() =>
  formatCardNumber(props.card.cardNumber, props.showCardNumber)
);

const getCardOpacityValue = computed(() => (props.card.isFrozen ? 0.4 : 1));
const getCardOpacity = computed(() => (props.card.isFrozen ? 'opacity-40' : 'opacity-100'));
</script>

