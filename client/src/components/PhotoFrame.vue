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

<style lang="scss" scoped src="@/styles/components/_PhotoFrame.scss" />
