<template>
  <div class="w-full flex flex-col gap-4 p-4 md:p-0 pb-26 md:pb-0 bg-white">
    <AccordionItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :icon="item.icon"
      :is-open="!!openStates[index]"
      :transactions="item.title === 'Recent transactions' ? transactions : []"
      @toggle="toggleAccordion(index)"
    >
      <component
        :is="item.component"
        v-bind="item.title === 'Recent transactions' ? { transactions } : item.props"
      />
    </AccordionItem>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AccordionItem from './AccordionItem.vue'
import CardDetails from './CardDetails.vue'
import TransactionList from '../pages/components/TransactionList.vue'
import CardIcon from '../assets/card_icon.svg?component'
import TransactionIcon from '../assets/transaction_icon.svg?component'
import { useCardStore } from '../store/cardStore'
import { storeToRefs } from 'pinia'

const cardStore = useCardStore()
const { getCurrentCard } = storeToRefs(cardStore)
const currentCard = computed(() => getCurrentCard.value)
const transactions = computed(() =>
  currentCard.value ? cardStore.getCardTransactions(currentCard.value.id) : []
)

function handleShowCardNumber(card) {
  if (!card) return;
  if (card.isFrozen) {
    alert('Card is frozen');
    return;
  }
  cardStore.toggleCardNumberVisibility(card.id);
}

const items = computed(() => [
  {
    title: 'Card details',
    icon: CardIcon,
    component: CardDetails,
    props: { currentCard: currentCard.value, handleShowCardNumber },
  },
  {
    title: 'Recent transactions',
    icon: TransactionIcon,
    component: TransactionList,
    props: { transactions: transactions.value },
  },
])

const openStates = ref({ 0: true })

function toggleAccordion(index) {
  openStates.value[index] = !openStates.value[index]
}
</script> 