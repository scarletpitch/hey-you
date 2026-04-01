import { ref, computed, onUnmounted } from 'vue'

export function useAudio(
  src: string,
  options?: { loopStart?: number; loopEnd?: number },
) {
  const { loopStart = 0, loopEnd } = options ?? {}

  const audio       = new Audio(src)
  audio.preload     = 'auto'

  const isPlaying   = ref(false)
  const currentTime = ref(0)
  const duration    = ref(0)
  let   rafId       = 0

  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })

  const progress = computed(() =>
    duration.value > 0 ? currentTime.value / duration.value : 0,
  )

  function tick() {
    currentTime.value = audio.currentTime
    // Loop the segment
    if (loopEnd !== undefined && audio.currentTime >= loopEnd) {
      audio.currentTime = loopStart
    }
    if (isPlaying.value) {
      rafId = requestAnimationFrame(tick)
    }
  }

  async function play() {
    try {
      await audio.play()
      isPlaying.value = true
      rafId = requestAnimationFrame(tick)
    } catch {
      // autoplay blocked — needs user gesture first
    }
  }

  async function playFrom(time: number) {
    audio.currentTime = time
    await play()
  }

  function pause() {
    audio.pause()
    isPlaying.value = false
    cancelAnimationFrame(rafId)
  }

  function toggle() {
    isPlaying.value ? pause() : play()
  }

  function seek(ratio: number) {
    if (duration.value > 0) {
      audio.currentTime = ratio * duration.value
      currentTime.value = audio.currentTime
    }
  }

  onUnmounted(() => {
    pause()
    audio.src = ''
  })

  return { isPlaying, currentTime, duration, progress, play, playFrom, pause, toggle, seek }
}
