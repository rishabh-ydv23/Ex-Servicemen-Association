export type Notification = {
  _id: string
  title: string
  message: string
  date: string
  createdAt: string
}

export type Event = {
  _id: string
  title: string
  description: string
  date: string
  imageUrls: string[]
  tags?: string[]
}

export type Photo = {
  _id: string
  url: string
  title?: string
  tags?: string[]
  eventId?: string
}

export type Member = {
  _id: string
  name: string
  role: string
  bio?: string
  photoUrl?: string
  priority?: number
}


