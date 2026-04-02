<template>
  <div class="screen" :class="{ active: isActive }">

    <!-- Header -->
    <img class="hdr" src="/hdr.png" alt="happy birthday" />

    <!-- Status -->
    <div class="print-status">
      <div class="dot" :class="{ done: isDone }" />
      <span class="dot-lbl" :class="{ done: isDone }">
        {{ isDone ? 'ready to collect' : 'photo is printing' }}
      </span>
    </div>

    <!-- Booth machine + strip -->
    <div class="booth-wrap">

      <!-- Your booth image — place file at client/public/booth.png -->
      <img class="booth-img" src="/booth.png" alt="booth" />

      <!-- Strip prints out from the bottom of the booth image -->
      <div class="strip-exit">
        <div class="strip-window" :class="{ go: stripVisible }">
          <div class="mini-strip" />
        </div>
      </div>

    </div>

    <!-- Collect button -->
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
import { ref, watch, onUnmounted } from 'vue'
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

const t1 = ref<ReturnType<typeof setTimeout>>()
const t2 = ref<ReturnType<typeof setTimeout>>()

watch(
  () => props.isActive,
  (active) => {
    if (!active) return
    t1.value = setTimeout(() => { stripVisible.value = true }, 400)
    t2.value = setTimeout(() => { isDone.value = true }, 8000)
  },
  { immediate: true },
)

onUnmounted(() => {
  clearTimeout(t1.value)
  clearTimeout(t2.value)
})
</script>

<style lang="scss" scoped src="@/styles/components/screens/_PrintingScreen.scss" />
