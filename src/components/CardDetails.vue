<script setup lang="ts">
import type { Card } from '../store/cardStore';
import { computed } from 'vue';
import { formatCardNumber } from '../util';

const props = defineProps<{ 
  currentCard: Card;
  handleShowCardNumber?: (card: Card) => void;
}>();

const displayedCardNumber = computed(() =>
  formatCardNumber(props.currentCard.cardNumber, props.currentCard.showCardNumber)
);

const displayedCVV = computed(() =>
  props.currentCard.showCardNumber ? props.currentCard.cvv : '•••'
);

const status = computed(() =>
  props.currentCard.isFrozen ? 'Frozen' : 'Active'
);

const handleCardNumberClick = () => {
  if (props.handleShowCardNumber && props.currentCard) {
    props.handleShowCardNumber(props.currentCard);
  }
};
</script>

<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-gray-500 text-sm">Card Name</p>
        <p class="font-medium">{{ currentCard.name }}</p>
      </div>
      <div 
        @click="handleCardNumberClick"
        :class="handleShowCardNumber ? 'cursor-pointer hover:text-green-600 transition-colors' : ''"
      >
        <p class="text-gray-500 text-sm">Card Number</p>
        <p class="font-mono font-medium tracking-wider text-sm">{{ displayedCardNumber }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-gray-500 text-sm">Expiry Date</p>
        <p class="font-medium">{{ currentCard.expiryDate }}</p>
      </div>
      <div 
        @click="handleCardNumberClick"
        :class="handleShowCardNumber ? 'cursor-pointer hover:text-green-600 transition-colors' : ''"
      >
        <p class="text-gray-500 text-sm">CVV</p>
        <p class="font-mono font-medium tracking-wider text-sm">{{ displayedCVV }}</p>
      </div>
    </div>

    <div>
      <p class="text-gray-500 text-sm">Status</p>
      <p class="font-medium">{{ status }}</p>
    </div>
  </div>
</template>
