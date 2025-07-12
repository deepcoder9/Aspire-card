<script setup lang="ts">
import TransactionItems from "./TransactionItems.vue";

defineProps<{
  transactions: Array<{
    id: string | number;
    name: string;
    date: string;
    amount: number;
    category: string;
    type: string;
  }>;
}>();
</script>

<template>
  <div class="divide-y divide-gray-100">
    <div v-if="!transactions.length" class="py-6 text-center text-gray-500">
      No transactions found
    </div>
    <template v-else>
      <TransactionItems
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </template>
  </div>
</template>
