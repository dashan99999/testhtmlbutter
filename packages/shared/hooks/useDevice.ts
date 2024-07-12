import { ref } from 'vue';

export function useDevice() {
  const isMobile = ref(false);

  if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    isMobile.value = /android|iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream;
  }

  return { isMobile };
}
