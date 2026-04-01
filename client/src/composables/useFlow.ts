import { ref, computed } from 'vue'
import type { AppScreen } from '@/types'

const currentScreen = ref<AppScreen>('welcome')

export function useFlow() {
  function goTo(screen: AppScreen) {
    currentScreen.value = screen
  }

  const isWelcome    = computed(() => currentScreen.value === 'welcome')
  const isPrinting   = computed(() => currentScreen.value === 'printing')
  const isCollection = computed(() => currentScreen.value === 'collection')

  return { currentScreen, goTo, isWelcome, isPrinting, isCollection }
}
