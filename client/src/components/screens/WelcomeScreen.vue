<template>
  <div class="screen" :class="{ active: isActive }">
    <p class="greeting">{{ greeting }}</p>
    <button class="start-btn" @click="$emit('start')">
      <span class="play-tri" />
      START
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  greeting: string
  isActive: boolean
}>()

defineEmits<{ start: [] }>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.screen {
  @include screen-base;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }
}

.greeting {
  font-size: 54px;
  font-weight: 300;
  color: $white;
  letter-spacing: 0.02em;
  margin-bottom: 76px;
}

.start-btn {
  @include pill-button;
}

.play-tri {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid rgba(255, 255, 255, 0.78);
  flex-shrink: 0;
}
</style>
