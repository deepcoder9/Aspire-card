<template>
  <div class="px-2 md:p-0">
    <div
      v-if="!isMobile && currentCard"
      class="w-full flex justify-end items-center mt-0 cursor-pointer text-green-500 font-medium"
      @click="() => handleShowCardNumber(currentCard)"
    >
      <span class="eye-icon">
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
            fill="#4ADE80"
          />
        </svg>
      </span>
      <span>{{ currentCard.showCardNumber ? 'Hide' : 'Show' }} card number</span>
    </div>

    <div class="relative w-full md:flex md:justify-center md:my-12 md:mt-8">
      <div class="relative w-full md:w-auto md:max-w-md">
        <div
          class="relative w-full overflow-hidden rounded-xl"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            class="transition-transform duration-300 ease-in-out flex"
            :style="{ transform: `translateX(-${currentCardIndex * 100}%)` }"
          >
            <div
              v-for="(card, _index) in cards"
              :key="card.id"
              class="min-w-full flex-shrink-0 w-full"
            >
              <Card
                :card="card"
                :showCardNumber="card.showCardNumber"
                :handleShowCardNumber="() => handleShowCardNumber(card)"
                class="w-full"
              />
            </div>
          </div>
        </div>

        <div v-if="cards.length > 1" class="flex justify-center mt-4 space-x-2">
          <div
            v-for="(_card, index) in cards"
            :key="index"
            @click="setCurrentCardIndex(index)"
            :class="[
              'h-2 rounded-full cursor-pointer transition-all duration-300',
              index === currentCardIndex ? 'w-4 bg-green-400' : 'w-2 bg-gray-300'
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from './Card.vue';
import { useCardStore } from '../store/cardStore';
import { useMobile } from '../composable/useMobile';
import { storeToRefs } from 'pinia';

const cardStore = useCardStore();
const { cards, currentCardIndex } = storeToRefs(cardStore);
const { setCurrentCardIndex, toggleCardNumberVisibility } = cardStore;
const { isMobile } = useMobile();

const currentCard = computed(() => cards.value[currentCardIndex.value]);

const touchStartX = ref<number | null>(null);
const touchEndX = ref<number | null>(null);

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX;
}
function onTouchMove(e: TouchEvent) {
  touchEndX.value = e.touches[0].clientX;
}
function onTouchEnd() {
  if (touchStartX.value !== null && touchEndX.value !== null) {
    const diff = touchStartX.value - touchEndX.value;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextCard();
      else prevCard();
    }
  }
  touchStartX.value = null;
  touchEndX.value = null;
}

function prevCard() {
  if (currentCardIndex.value > 0) {
    setCurrentCardIndex(currentCardIndex.value - 1);
  }
}
function nextCard() {
  if (currentCardIndex.value < cards.value.length - 1) {
    setCurrentCardIndex(currentCardIndex.value + 1);
  }
}

function handleShowCardNumber(card = currentCard.value) {
  if (!card) return;
  if (card.isFrozen) {
    // Optionally use a toast here
    alert('Card is frozen');
    return;
  }
  toggleCardNumberVisibility(card.id);
}
</script>

<style scoped>
.eye-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}
</style> 