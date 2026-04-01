<template>
  <div class="strip" :class="{ compact }">
    <PhotoFrame
      v-for="(photo, i) in photos"
      :key="i"
      :src="photo.src"
      :alt="photo.alt"
    />
    <div class="strip-caption">
      <p>{{ captionLine1 }}</p>
      <p>{{ captionLine2 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhotoFrame from './PhotoFrame.vue'
import type { Photo } from '@/types'

defineProps<{
  photos: Photo[]
  captionLine1: string
  captionLine2: string
  compact?: boolean
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.strip {
  width: $strip-width;
  background: $strip-kraft;
  padding: 8px 8px 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.compact {
    width: $strip-width-compact;
    padding: 7px 7px 12px;
    gap: 3px;
  }
}

.strip-caption {
  padding-top: 7px;
  text-align: center;

  p {
    font-family: $font-script;
    font-size: 15px;
    color: $ink-dark;
    line-height: 1.6;
  }
}
</style>
