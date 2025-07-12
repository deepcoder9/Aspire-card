import { defineStore } from "pinia";

export type TabType = "my" | "all";

export interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isFrozen: boolean;
  showCardNumber: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: string;
  cardId: string;
  category: string;
}

function generateCardNumber() {
  return "2345 2342 4536 2020";
}

function generateExpiryDate() {
  return "12/25";
}

function generateCVV() {
  return "123";
}

const initialCards: Card[] = [
  {
    id: "1",
    name: "Mark Henry",
    cardNumber: "2345 2342 4536 2020",
    expiryDate: "12/25",
    cvv: "123",
    isFrozen: false,
    showCardNumber: false,
  },
];

const initialTransactions: Transaction[] = [
  {
    id: "1",
    name: "Hamleys",
    date: "20 May 2020",
    amount: 120,
    type: "refund",
    cardId: "1",
    category: "shopping",
  },
  {
    id: "3",
    name: "Hamleys",
    date: "20 May 2020",
    amount: -150,
    type: "charge",
    cardId: "1",
    category: "marketing",
  },
  {
    id: "4",
    name: "Hamleys",
    date: "20 May 2020",
    amount: -140,
    type: "charge",
    cardId: "1",
    category: "travel",
  },
  {
    id: "2",
    name: "Hamleys",
    date: "20 May 2020",
    amount: -110,
    type: "charge",
    cardId: "1",
    category: "shopping",
  },
];

export const useCardStore = defineStore("card", {
  state: () => ({
    cards: initialCards as Card[],
    transactions: initialTransactions as Transaction[],
    currentCardIndex: 0,
    activeTab: "my" as TabType,
    isNewCardModalOpen: false,
  }),
  actions: {
    addCard(name: string) {
      const newCard: Card = {
        id: Date.now().toString(),
        name,
        cardNumber: generateCardNumber(),
        expiryDate: generateExpiryDate(),
        cvv: generateCVV(),
        isFrozen: false,
        showCardNumber: false,
      };
      this.cards.push(newCard);
      this.currentCardIndex = this.cards.length - 1;
      this.isNewCardModalOpen = false;
    },
    toggleCardNumberVisibility(id: string) {
      this.cards = this.cards.map((card) =>
        card.id === id
          ? { ...card, showCardNumber: !card.showCardNumber }
          : card
      );
    },
    freezeCard(id: string) {
      this.cards = this.cards.map((card) =>
        card.id === id ? { ...card, isFrozen: !card.isFrozen } : card
      );
    },
    setCurrentCardIndex(index: number) {
      this.currentCardIndex = index;
    },
    setActiveTab(tab: TabType) {
      this.activeTab = tab;
    },
    toggleNewCardModal() {
      this.isNewCardModalOpen = !this.isNewCardModalOpen;
    },
  },
  getters: {
    getCurrentCard(state): Card | undefined {
      return state.cards[state.currentCardIndex];
    },
    getCardTransactions: (state) => (cardId: string) => {
      return state.transactions.filter((t) => t.cardId === cardId);
    },
  },
});
