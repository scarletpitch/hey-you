<template>
  <div class="screen" :class="{ active: isActive }">
    <div class="pile">
      <!-- Greeting card (starts behind) -->
      <div
        class="layer card-layer"
        :class="{ top: topLayer === 'card' }"
        @click="topLayer = 'card'"
      >
        <div class="card-to">{{ card.to }}</div>
        <div class="card-msg" v-html="formattedMessage" />
        <div class="card-from">{{ card.from }}</div>
      </div>

      <!-- Photo strip (starts on top) -->
      <div
        class="layer strip-layer"
        :class="{ top: topLayer === 'photo' }"
        @click="topLayer = 'photo'"
      >
        <PhotoStrip
          :photos="photos"
          :caption-line1="captionLine1"
          :caption-line2="captionLine2"
          compact
        />
      </div>
    </div>

    <p class="hint">tap to reveal</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PhotoStrip from '../PhotoStrip.vue'
import type { Photo } from '@/types'

const props = defineProps<{
  photos: Photo[]
  captionLine1: string
  captionLine2: string
  card: { to: string; message: string; from: string }
  isActive: boolean
}>()

type Layer = 'photo' | 'card'
const topLayer = ref<Layer>('photo')

const formattedMessage = computed(() =>
  props.card.message.replace(/\n/g, '<br>'),
)
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.screen {
  @include screen-base;
  overflow: hidden;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}

.pile {
  position: relative;
  width: 300px;
  height: 490px;
}

.layer {
  @include layer-base;

  &.top {
    z-index: 10;
  }
}

// Photo strip layer
.strip-layer {
  top: 8px;
  left: 60px;
  transform: rotate(4deg);
  box-shadow: $shadow-layer;
  z-index: 2;

  &.top {
    transform: rotate(4deg) translateY(-6px) scale(1.025);
    box-shadow: $shadow-layer-top;
  }
}

// Greeting card layer
.card-layer {
  width: 265px;
  background: radial-gradient(ellipse at 35% 40%, #d6ccba, $card-kraft 65%, $card-kraft-dark);
  padding: 28px 22px 28px 28px;
  top: 130px;
  left: 8px;
  transform: rotate(-5.5deg);
  box-shadow: $shadow-layer;
  z-index: 1;

  &.top {
    transform: rotate(-5.5deg) translateY(-6px) scale(1.025);
    box-shadow: $shadow-layer-top;
  }
}

.card-to {
  font-family: $font-script;
  font-size: 24px;
  color: $ink-dark;
  margin-bottom: 18px;
}

.card-msg {
  font-family: $font-script;
  font-size: 19px;
  color: $ink-dark;
  line-height: 1.75;
  margin-bottom: 24px;
}

.card-from {
  font-family: $font-script;
  font-size: 24px;
  color: $ink-dark;
  text-align: right;
}

.hint {
  margin-top: 24px;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.22);
  text-transform: uppercase;
}
</style>
