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

<style lang="scss" scoped src="@/styles/components/_PhotoStrip.scss" />
