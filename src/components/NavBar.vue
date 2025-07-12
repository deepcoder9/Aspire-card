<template>
  <!-- Desktop Sidebar -->
  <div class="bg-[#0C365A] p-4 min-h-screen md:w-[340px] hidden md:block">
    <div class="px-4 mt-8">
      <component :is="AspireLogo" />
      <div class="text-white opacity-30 mt-3 text-[15px]">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </div>
    </div>
    <div v-for="link in navLink" :key="link.title">
      <div
        class="flex gap-4 p-4 my-4 cursor-pointer"
        @click="activeLink = link.id"
      >
        <component
          :is="link.icon"
          class="h-8 w-8"
          :style="{ color: activeLink === link.id ? '#01D167' : 'white' }"
        />
        <div
          class="text-white"
          :style="{ color: activeLink === link.id ? '#01D167' : 'white' }"
        >
          {{ link.title }}
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Bottom Nav -->
  <div
    class="fixed bottom-0 bg-white z-999 left-0 w-full h-[80px] flex justify-around items-center md:hidden z-50 shadow-top"
  >
    <div
      v-for="link in navLink"
      :key="link.title"
      class="flex-1 flex flex-col items-center justify-center cursor-pointer"
      @click="activeLink = link.id"
    >
      <component
        :is="link.icon"
        :style="{ color: activeLink === link.id ? '#01D167' : '#ddd'}"
        class="h-8 w-8"
      />
      <div v-if="false" class="text-white text-xs mt-1">{{ link.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMobile } from "./../composable//useMobile.ts";
import AspireLogo from "./../assets/aspire_logo_green.svg?component";
import HomeIcon from "./../assets/home.svg?component";
import CardIcon from "./../assets/card.svg?component";
import PaymentsIcon from "./../assets/payments.svg?component";
import CreditIcon from "./../assets/credit.svg?component";
import AccountIcon from "./../assets/account.svg?component";

const activeLink = ref("card");
const { isMobile } = useMobile();

const navLink = [
  { icon: HomeIcon, title: "Home", id: "home" },
  { icon: CardIcon, title: "Cards", id: "card" },
  { icon: PaymentsIcon, title: "Payments", id: "payment" },
  { icon: CreditIcon, title: "Credit", id: "credit" },
  { icon: AccountIcon, title: "Settings", id: "setting" },
];
</script>

<style scoped>
.shadow-top {
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
}
</style>
