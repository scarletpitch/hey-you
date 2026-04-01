<template>
  <div class="frame">
    <img v-if="src" :src="src" :alt="alt" />
    <span v-else class="ph">photo here</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
}>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.frame {
  width: 100%;
  aspect-ratio: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .ph {
    color: $placeholder-green;
    font-family: $font-mono;
    font-size: 11px;
    font-weight: 700;
  }
}
</style>
