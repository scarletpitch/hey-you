<template>
  <div class="screen" :class="{ active: isActive }">
    <div class="hdr">
      <span class="hdr-top">{{ occasion.line1 }}</span>
      <span class="hdr-bot">{{ occasion.line2 }}</span>
    </div>

    <div class="print-status">
      <div class="dot" :class="{ done: isDone }" />
      <span class="dot-lbl" :class="{ done: isDone }">
        {{ isDone ? 'ready to collect' : 'photo is printing' }}
      </span>
    </div>

    <div class="slot-line" />

    <div class="strip-window" :class="{ go: stripVisible }">
      <PhotoStrip
        :photos="photos"
        :caption-line1="captionLine1"
        :caption-line2="captionLine2"
      />
    </div>

    <button
      class="collect-btn"
      :class="{ show: isDone }"
      @click="$emit('collect')"
    >
      collect photo
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PhotoStrip from '../PhotoStrip.vue'
import type { Photo } from '@/types'

const props = defineProps<{
  photos: Photo[]
  captionLine1: string
  captionLine2: string
  occasion: { line1: string; line2: string }
  isActive: boolean
}>()

defineEmits<{ collect: [] }>()

const isDone       = ref(false)
const stripVisible = ref(false)
let   timers: ReturnType<typeof setTimeout>[] = []

watch(
  () => props.isActive,
  (active) => {
    if (!active) return
    timers.push(setTimeout(() => { stripVisible.value = true }, 400))
    timers.push(setTimeout(() => { isDone.value = true }, 4800))
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.screen {
  @include screen-base;
  justify-content: flex-start;
  @include safe-top(44px);
  overflow-y: auto;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}

.print-status {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 12px;
  width: $strip-width;
}

.dot {
  flex-shrink: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: $dot-printing;
  animation: blink 1.1s ease-in-out infinite;

  &.done {
    background: $dot-done;
    animation: none;
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.1; }
}

.dot-lbl {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: $dot-printing;

  &.done { color: $dot-done; }
}

.slot-line {
  width: $strip-width;
  height: 3px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  flex-shrink: 0;
}

.strip-window {
  width: $strip-width;
  height: 0;
  overflow: hidden;
  transition: $transition-strip;
  flex-shrink: 0;

  &.go { height: $strip-print-height; }
}

.collect-btn {
  margin-top: 26px;
  margin-bottom: env(safe-area-inset-bottom, 20px);
  padding: 13px 38px;
  background: rgba(180, 220, 180, 0.1);
  border: 1px solid rgba(180, 220, 180, 0.28);
  border-radius: 50px;
  color: $collect-green;
  font-family: $font-serif;
  font-size: 15px;
  letter-spacing: 0.12em;
  cursor: pointer;
  -webkit-appearance: none;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.55s ease, transform 0.55s ease;
  flex-shrink: 0;

  &.show {
    opacity: 1;
    transform: none;
  }

  &:active { opacity: 0.45; }
}
</style>
