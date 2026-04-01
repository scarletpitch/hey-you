import type { AppConfig } from './types'

export const appConfig: AppConfig = {
  names: {
    from: 'Noon',
    to: 'Ruj',
  },
  greeting: 'hey you.',
  occasion: {
    line1: 'happy',
    line2: 'birthday',
  },
  card: {
    to: 'Ruj,',
    message: "Happy birthday, \naWishing you a year full of good energy, meaningful moments, and everything that makes you genuinely happy.",
    from: 'Noon',
  },
  caption: {
    line1: `Ruj's Day`,
    line2: "2026",
  },
  photos: [
    { src: '/photos/photo1.jpg', alt: 'Photo 1' },
    { src: '/photos/photo2.jpg', alt: 'Photo 2' },
    { src: '/photos/photo3.jpg', alt: 'Photo 3' },
  ],
  music: {
    title: 'Those Eyes',
    artist: 'New West',
    src: '/music/track.mp3',
    durationSeconds: 164,
  },
}
