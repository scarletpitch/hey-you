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
      @collect="onCollect"
    />

    <CollectionScreen
      :photos="config.photos"
      :caption-line1="config.caption.line1"
      :caption-line2="config.caption.line2"
      :card="config.card"
      :is-active="isCollection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  WelcomeScreen,
  PrintingScreen,
  CollectionScreen,
} from '@/components'
import { useFlow } from '@/composables/useFlow'
import { useAudio } from '@/composables/useAudio'
import type { AppConfig } from '@/types'

const config = ref<AppConfig | null>(null)

const { goTo, isWelcome, isPrinting, isCollection } = useFlow()

// Play from 0:46, loop back at 1:17
const audio = useAudio('/music/track.mp3', { loopStart: 46, loopEnd: 77 })

onMounted(async () => {
  const { data } = await axios.get<AppConfig>('/api/config')
  config.value = data
})

function onStart() {
  goTo('printing')
}

function onCollect() {
  goTo('collection')
  audio.playFrom(46)
}
</script>
