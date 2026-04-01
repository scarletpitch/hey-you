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

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.player {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(120%);
  z-index: 100;
  width: min(380px, calc(100vw - 24px));
  transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
  @include safe-bottom(12px);

  &.visible {
    transform: translateX(-50%) translateY(0);
  }
}

.player-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(20, 22, 40, 0.82);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

// Album art
.album-art {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  overflow: hidden;

  .art-placeholder {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 40% 40%, #6b7ec7, #2d3166);
  }
}

// Track info
.track-info {
  flex: 1;
  min-width: 0;
}

.track-meta {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.track-title {
  font-family: $font-serif;
  font-size: 13px;
  font-weight: 400;
  color: $white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.01em;
}

.track-artist {
  font-family: $font-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.03em;
}

// Progress bar
.progress-track {
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1px;
  cursor: pointer;
  overflow: hidden;

  .progress-fill {
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 1px;
    transition: width 0.25s linear;
  }
}

// Waveform
.waveform {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 18px;
  flex-shrink: 0;

  .bar {
    display: block;
    width: 3px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2px;
    height: 4px;
    transform-origin: bottom;
  }

  &.playing {
    @for $i from 1 through 4 {
      .bar:nth-child(#{$i}) {
        animation: wave 0.8s ease-in-out #{$i * 0.1}s infinite alternate;
      }
    }
  }
}

@keyframes wave {
  from { height: 4px; }
  to   { height: 16px; }
}

// Controls
.controls {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.ctrl-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: opacity 0.15s;

  &:active { opacity: 0.4; }

  svg {
    width: 18px;
    height: 18px;
  }

  &.play-pause {
    color: $white;

    svg { width: 22px; height: 22px; }
  }

  &.airplay {
    color: rgba(255, 255, 255, 0.5);

    svg { width: 16px; height: 16px; }
  }
}
</style>
