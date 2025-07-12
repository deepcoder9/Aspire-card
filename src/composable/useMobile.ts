import { ref, onMounted, onUnmounted } from 'vue';

export function useMobile() {
  const isMobile = ref(window.innerWidth <= 768);

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    window.addEventListener('resize', updateIsMobile);
    updateIsMobile();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateIsMobile);
  });

  return { isMobile };
} 