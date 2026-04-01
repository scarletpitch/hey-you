<template>
  <div class="player" :class="{ visible: show }">
    <div class="player-inner">
      <!-- Album art -->
      <div class="album-art">
        <div class="art-placeholder" />
      </div>

      <!-- Track info + progress -->
      <div class="track-info">
        <div class="track-meta">
          <span class="track-title">{{ track.title }}</span>
          <span class="track-artist">{{ track.artist }}</span>
        </div>

        <!-- Progress bar -->
        <div class="progress-track" @click="onSeek">
          <div class="progress-fill" :style="{ width: `${progress * 100}%` }" />
        </div>
      </div>

      <!-- Waveform bars (animated when playing) -->
      <div class="waveform" :class="{ playing: isPlaying }">
        <span v-for="n in 4" :key="n" class="bar" />
      </div>

      <!-- Controls -->
      <div class="controls">
        <button class="ctrl-btn" @click="$emit('prev')">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        <button class="ctrl-btn play-pause" @click="toggle">
          <!-- Pause icon -->
          <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          <!-- Play icon -->
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <button class="ctrl-btn" @click="$emit('next')">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.9 2.14L8 14.14V9.86zM16 6h2v12h-2z" />
          </svg>
        </button>

        <!-- AirPlay icon -->
        <button class="ctrl-btn airplay">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 22h12l-6-6-6 6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAudio } from '@/composables/useAudio'
import type { MusicTrack } from '@/types'

const props = defineProps<{
  track: MusicTrack
  autoPlayOnMount?: boolean
}>()

defineEmits<{
  prev: []
  next: []
}>()

const { isPlaying, progress, toggle, seek } = useAudio(props.track.src)

// Show widget after a short delay so it slides in after mount
const show = ref(false)
setTimeout(() => { show.value = true }, 600)

function onSeek(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  seek(Math.max(0, Math.min(1, ratio)))
}

// Auto-play when the parent signals it (e.g. user tapped START)
watch(
  () => props.autoPlayOnMount,
  (val) => {
    if (val && !isPlaying.value) toggle()
  },
)
</script>

<style lang="scss" scoped src="@/styles/components/_MusicPlayer.scss" />
