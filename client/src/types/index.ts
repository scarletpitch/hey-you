export interface Photo {
  src: string
  alt: string
}

export interface MusicTrack {
  title: string
  artist: string
  src: string
  durationSeconds: number
}

export interface AppConfig {
  names: {
    from: string
    to: string
  }
  greeting: string
  occasion: {
    line1: string
    line2: string
  }
  card: {
    to: string
    message: string
    from: string
  }
  caption: {
    line1: string
    line2: string
  }
  photos: Photo[]
  music: MusicTrack
}

export type AppScreen = 'welcome' | 'printing' | 'collection'
