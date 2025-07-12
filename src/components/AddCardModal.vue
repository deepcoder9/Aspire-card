<template>
  <div v-if="isNewCardModalOpen" class="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4" style="z-index: 999999999999999;">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 class="text-xl font-semibold">Create New Card</h2>
        <button @click="toggleNewCardModal" class="text-gray-500 hover:text-gray-700 cursor-pointer">X</button>
      </div>
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="mb-6">
          <label for="cardName" class="block text-gray-700 font-medium mb-2">Card Name</label>
          <input
            type="text"
            id="cardName"
            v-model="cardName"
            @input="error = ''"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            :class="error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'"
            placeholder="Enter card name"
          />
          <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="toggleNewCardModal" class="px-4 py-2 text-gray-600 mr-2">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-[#325BAF] text-white rounded-lg hover:bg-[#0C365A] transition-colors">Create Card</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCardStore } from '../store/cardStore';

const cardStore = useCardStore();
const cardName = ref('');
const error = ref('');

const isNewCardModalOpen = computed(() => cardStore.isNewCardModalOpen);
const toggleNewCardModal = cardStore.toggleNewCardModal;
const addCard = cardStore.addCard;

function handleSubmit() {
  if (!cardName.value.trim()) {
    error.value = 'Card name cannot be empty';
    return;
  }
  addCard(cardName.value);
  cardName.value = '';
  error.value = '';
}
</script>
