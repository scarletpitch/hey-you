import type { AppConfig } from '@/types'

export const siteConfig: AppConfig = {
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
    message: "Have you ever met someone whose way of thinking quietly captivates you?\n\nThe way you articulate your thoughts, the calm clarity in how you see things, and the way you consider angles most people simply overlook — it's something I find myself genuinely admiring. You have this rare ability to make even complex thoughts feel grounded. And beyond all of that, there's a quiet humility in you that makes everything even more real.\n\nIn a world that often feels rushed and loud, your presence feels steady. Thoughtful. Intentional. And I think that's something truly rare to find in a person.\n\nGetting to know you has been a quiet reminder that not everything meaningful needs to be hurried. Some things are worth understanding slowly, appreciating deeply, and allowing to unfold in their own time.\n\n I'm just glad our paths crossed — at exactly the pace they did.\n\nHappy birthday",
    from: '\nxoxo\nNoon',
  },
  caption: {
    line1: "Ruj's Day",
    line2: '2026',
  },
  photos: [
    { src: 'photos/photo1.jpg', alt: 'Photo 1' },
    { src: 'photos/photo2.jpg', alt: 'Photo 2' },
    { src: 'photos/photo3.jpg', alt: 'Photo 3' },
  ],
  music: {
    title: 'Those Eyes',
    artist: 'New West',
    src: 'music/track.mp3',
    durationSeconds: 164,
  },
}
