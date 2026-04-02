<template>
  <div class="screen" :class="{ active: isActive }">
    <div class="pile">

      <!-- Backdrop — inside pile so z-index is in same stacking context -->
      <div class="backdrop" :class="{ show: isExpanded }" @click="isExpanded = false" />

      <!-- Greeting card (starts behind) -->
      <div
        class="layer card-layer"
        :class="{ top: topLayer === 'card', expanded: topLayer === 'card' && isExpanded }"
        @click="onCardClick"
      >
        <div class="card-to">{{ card.to }}</div>
        <div class="card-msg" v-html="formattedMessage" />
        <div class="card-from">{{ card.from }}</div>
      </div>

      <!-- Photo strip (starts on top) -->
      <div
        class="layer strip-layer"
        :class="{ top: topLayer === 'photo', expanded: topLayer === 'photo' && isExpanded }"
        @click="onStripClick"
      >
        <PhotoStrip
          :photos="photos"
          :caption-line1="captionLine1"
          :caption-line2="captionLine2"
          compact
        />
      </div>

    </div>
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
const topLayer   = ref<Layer>('photo')
const isExpanded = ref(false)

function onCardClick() {
  if (topLayer.value !== 'card') {
    topLayer.value = 'card'
    isExpanded.value = false
  } else {
    isExpanded.value = !isExpanded.value
  }
}

function onStripClick() {
  if (topLayer.value !== 'photo') {
    topLayer.value = 'photo'
    isExpanded.value = false
  } else {
    isExpanded.value = !isExpanded.value
  }
}

const formattedMessage = computed(() =>
  props.card.message.replace(/\n/g, '<br>'),
)
</script>

<style lang="scss" scoped src="@/styles/components/screens/_CollectionScreen.scss" />

