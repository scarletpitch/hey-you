import type { AppConfig } from './types'

export const appConfig: AppConfig = {
  names: {
    from: 'Marisa',
    to: 'Gena',
  },
  greeting: 'hey you.',
  occasion: {
    line1: 'happy',
    line2: 'birthday',
  },
  card: {
    to: 'Gena,',
    message: "I wish you peace, happiness,\nand less back pain",
    from: 'Marisa',
  },
  caption: {
    line1: 'Marisa & Gena',
    line2: "Valentine's 2024",
  },
  photos: [
    { src: '/photos/photo1.jpg', alt: 'Photo 1' },
    { src: '/photos/photo2.jpg', alt: 'Photo 2' },
    { src: '/photos/photo3.jpg', alt: 'Photo 3' },
  ],
  music: {
    title: 'The One',
    artist: 'Kodaline',
    src: '/music/track.mp3',
    durationSeconds: 164,
  },
}
