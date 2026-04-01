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

<style lang="scss" scoped src="@/styles/components/screens/_WelcomeScreen.scss" />
