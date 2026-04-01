<template>
  <div v-if="config">
    <WelcomeScreen
      :greeting="config.greeting"
      :is-active="isWelcome"
      @start="onStart"
    />

    <PrintingScreen
      :photos="config.photos"
      :caption-line1="config.caption.line1"
      :caption-line2="config.caption.line2"
      :occasion="config.occasion"
      :is-active="isPrinting"
      @collect="goTo('collection')"
    />

    <CollectionScreen
      :photos="config.photos"
      :caption-line1="config.caption.line1"
      :caption-line2="config.caption.line2"
      :card="config.card"
      :is-active="isCollection"
    />

    <!-- MusicPlayer temporarily hidden
    <MusicPlayer
      :track="config.music"
      :auto-play-on-mount="musicStarted"
    />
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  WelcomeScreen,
  PrintingScreen,
  CollectionScreen,
  // MusicPlayer,
} from '@/components'
import { useFlow } from '@/composables/useFlow'
import type { AppConfig } from '@/types'

const config = ref<AppConfig | null>(null)
// const musicStarted = ref(false)

const { goTo, isWelcome, isPrinting, isCollection } = useFlow()

onMounted(async () => {
  const { data } = await axios.get<AppConfig>('/api/config')
  config.value = data
})

function onStart() {
  goTo('printing')
  // musicStarted.value = true
}
</script>
