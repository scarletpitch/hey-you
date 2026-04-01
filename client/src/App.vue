<template>
  <div>
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
import {
  WelcomeScreen,
  PrintingScreen,
  CollectionScreen,
} from '@/components'
import { useFlow } from '@/composables/useFlow'
import { useAudio } from '@/composables/useAudio'
import { siteConfig } from '@/siteConfig'

const config = siteConfig

const { goTo, isWelcome, isPrinting, isCollection } = useFlow()

// Play from 0:46, loop back at 1:17
const audio = useAudio(siteConfig.music.src, { loopStart: 46, loopEnd: 77 })

function onStart() {
  goTo('printing')
}

function onCollect() {
  goTo('collection')
  audio.playFrom(46)
}
</script>
