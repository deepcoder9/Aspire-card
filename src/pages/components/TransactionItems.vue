<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  transaction: {
    name: string;
    date: string;
    amount: number;
    category: string;
    type: string;
  };
}>();

const getTransactionIcon = computed(() => {
  switch (props.transaction.category) {
    case "shopping":
      return {
        icon: "file_storage",
        bg: "#009DFF1A",
        fill: "#009dff",
      };
    case "travel":
      return {
        icon: "flights",
        bg: "#00D6B51A",
        fill: "#00d6b5",
      };
    case "marketing":
      return {
        icon: "megaphone",
        bg: "#F251951A",
        fill: "#f25195",
      };
    default:
      return {
        icon: "file_storage",
        bg: "#009DFF1A",
        fill: "#009dff",
      };
  }
});

const isPositive = computed(() => props.transaction.amount > 0);

function formatAmount(amount: number) {
  return (amount < 0 ? "- " : "+ ") + "₹" + Math.abs(amount).toLocaleString();
}
</script>

<template>
  <div
    class="py-4 flex items-center justify-between border-b border-gray-100 last:border-0"
  >
    <div class="flex items-center">
      <div class="mr-4">
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: getTransactionIcon.bg }"
        >
          <component 
            :is="getTransactionIcon.icon" 
            :class="getTransactionIcon.icon"
            :style="{ fill: getTransactionIcon.fill }"
          />
        </div>
      </div>
      <div>
        <h4 class="font-medium text-sm text-gray-800">
          {{ props.transaction.name }}
        </h4>
        <p class="text-[13px] text-[#707070]">{{ props.transaction.date }}</p>
        <div class="flex items-center mt-1">
          <div
            class="w-6 h-5 rounded-full bg-[#325BAF] flex items-center justify-center"
          >
            <CardSvg class="card-icon" style="fill: #fff;" />
          </div>
          <span class="ml-2 text-[12px] text-[#325BAF]">
            {{
              props.transaction.type === "refund"
                ? "Refund on debit card"
                : "Charged to debit card"
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <span
        class="font-medium text-sm"
        :class="isPositive ? 'text-green-500' : 'text-gray-700'"
      >
        {{ formatAmount(props.transaction.amount) }}
      </span>
      <div class="ml-2 cursor-pointer">
        <Next />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import FileStorageSvg from "./../../assets/file_storage.svg?component";
import FlightsSvg from "./../../assets/flights.svg?component";
import MegaphoneSvg from "./../../assets/megaphone_icon.svg?component";
import CardSvg from "./../../assets/business-and-finance.svg?component";
import Next from "./../../assets/next.svg?component";

export default {
  components: {
    "file_storage": FileStorageSvg,
    "flights": FlightsSvg,
    "megaphone": MegaphoneSvg,
    CardSvg,
    Next,
  },
};
</script>
