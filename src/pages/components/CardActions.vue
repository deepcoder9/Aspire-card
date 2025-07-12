<template>
  <div
    :style="isMobile ? { borderRadius: '20px 20px 0 0' } : {}"
    class="w-full md:mt-4 bg-[#EDF3FF] py-4 rounded-t-xl md:rounded-xl"
    :class="isMobile ? 'mt-4' : ''"
  >
    <div class="grid grid-cols-5 gap-1">
      <CardActionButton
        v-for="(action, index) in actions"
        :key="index"
        :label="action.label"
        :onClick="action.onClick"
      >
        <template #icon>
          <component :is="action.icon" class="w-8 h-8" />
        </template>
      </CardActionButton>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCardStore } from "../../store/cardStore";
import { useMobile } from "../../composable/useMobile";
import CardActionButton from "./CardActionButton.vue";
import FreezeIcon from "../../assets/freeze_card.svg?component";
import SpendLimitIcon from "../../assets/set_spend_limit.svg?component";
import GPay from "../../assets/GPay.svg?component";
import ReplaceCardIcon from "../../assets/replace_card.svg?component";
import CancelCardIcon from "../../assets/deactivate_card.svg?component";

const { isMobile } = useMobile();
const cardStore = useCardStore();
const currentCard = computed(() => cardStore.getCurrentCard);

function handleFreezeCard() {
  if (currentCard.value) {
    cardStore.freezeCard(currentCard.value.id);
  }
}

const actions = computed(() => [
  {
    label: "Freeze card",
    onClick: handleFreezeCard,
    icon: FreezeIcon,
  },
  {
    label: "Set spend limit",
    onClick: () => {},
    icon: SpendLimitIcon,
  },
  {
    label: "Add to GPay",
    onClick: () => {},
    icon: GPay,
  },
  {
    label: "Replace card",
    onClick: () => {},
    icon: ReplaceCardIcon,
  },
  {
    label: "Cancel card",
    onClick: () => {},
    icon: CancelCardIcon,
  },
]);
</script>
