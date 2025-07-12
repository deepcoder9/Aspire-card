<template>
  <div class="w-full pt-8 md:px-10 md:p-15 bg-[#0B2B4B] md:bg-transparent max-w-[1026px]">
    <div class="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0B2B4B]">
      <div class="p-4 w-full flex justify-between items-center">
        <div>
          <h1 className="text-gray-500 text-sm">
            <span className="text-sm text-white pb-2">
              Account balance
            </span>
          </h1>
          <div className="flex items-center">
            <div
              className="bg-green-400 text-white px-2 py-1 rounded text-sm mr-2"
            >
              $
            </div>
            <span className="text-3xl font-bold text-white">
              3,000
            </span>
          </div>
        </div>

        <button
          @click="toggleNewCardModal"
          className="flex items-center gap-2 text-[#23CEFD] px-4 py-2 rounded-lg hover:bg-[#1B2A41] transition-colors duration-200"
        >
          <component
            :is="PlusMob"
            :style="{ color: '#23CEFD' }"
          />
          <span>New card</span>
        </button>
      </div>

      <TabBar :tabs="tabs" />
    </div>
    <div class="hidden md:block p-4 md:p-0 w-full">
    <div class="flex flex-row justify-between items-center">
      <div>
        <h1 class="w-auto text-gray-500 text-sm md:text-base">
          <span className="text-sm md:text-base text-white pb-2 md:text-black">
            Available balance
          </span>
        </h1>
        <div className="flex items-center">
          <div
            className="bg-green-400 text-white px-2 py-1 rounded text-sm mr-2"
          >
            $
          </div>
          <span className="text-3xl font-bold text-white md:text-black">
            3,000
          </span>
        </div>
      </div>

      <button
        @click="toggleNewCardModal"
        className="flex cursor-pointer items-center gap-2 md:bg-[#325BAF] text-[#23CEFD] md:text-white px-4 py-2 rounded-lg hover:bg-[#1B2A41] transition-colors duration-200"
      >
        <component
          :is="PlusIcon"
          :style="{ color: isMobile ? '#23CEFD' : 'white' }"
        />
        <span>New card</span>
      </button>
      </div>
    </div>
    <div class="hidden md:block">
      <TabBar :tabs="tabs" />
    </div>
    <div class="md:hidden fixed top-36 left-0 right-0 z-30 bg-[#0B2B4B]">
      <div class="p-4 bg-[#0B2B4B]">
        <CardCarousel />
      </div>
    </div>
    <div class="md:hidden" style="height: 450px;"></div>
    <div class="md:flex md:flex-row rounded-xl md:bg-white md:mt-6 md:p-8 relative z-99" :class="isMobile ? 'bg-white' : ''" style="box-shadow: 0 0 24px 0 rgba(0,0,0,0.15);">
      <div class="md:w-[50%] md:flex-shrink-0">
        <div class="md:hidden">
          <CardActions />
        </div>
        <div class="hidden md:block">
          <CardCarousel />
        </div>
        <div class="hidden md:block">
          <CardActions />
        </div>
      </div>
      <div class="md:ml-8 md:flex-1 bg-white">
        <Accordion />
      </div>
    </div>
    <AddCardModal />
  </div>
</template>

<script setup>
import PlusIcon from "./../../assets/plusIcon.svg?component";
import PlusMob from "./../../assets/box_mb.svg?component";
import TabBar from "./../../components/TabBar.vue";
import CardActions from "./../components//CardActions.vue";
import CardCarousel from "./../../components/CardCarousel.vue";
import { useMobile } from "../../composable/useMobile";
import Accordion from "../../components/Accordion.vue";
import AddCardModal from "../../components/AddCardModal.vue";
import { useCardStore } from "../../store/cardStore";

const tabs = [
  {
    label: "My debit cards",
    value: "my",
  },
  {
    label: "All company cards",
    value: "all",
  },
];

const { isMobile } = useMobile();
const cardStore = useCardStore();
const toggleNewCardModal = cardStore.toggleNewCardModal;
</script>
