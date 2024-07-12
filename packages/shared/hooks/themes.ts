// 当前是否为暗色主题 return boolean
import { computed } from 'vue';
import { useAppStore } from '#shared/store';

export default function isDarkTheme() {
  const appStore = useAppStore();
  const isDark = computed(() => {
    return appStore.theme === 'dark';
  });
  return {
    isDark,
  };
}
