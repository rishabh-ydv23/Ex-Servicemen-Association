import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { api } from '../services/api'
import { Event, Notification, Photo } from '../types'
import NotificationCard from '../components/NotificationCard'
import EventCard from '../components/EventCard'

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    api.get('/notifications').then(r => setNotifications(r.data.slice(0, 3))).catch(() => {})
    api.get('/events').then(r => setEvents(r.data.slice(0, 3))).catch(() => {})
    api.get('/gallery').then(r => setPhotos(r.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-navy">Latest Notifications</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {notifications.map((n) => (<NotificationCard key={n._id} n={n} />))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-navy">Recent Events</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {events.map((e) => (<EventCard key={e._id} e={e} />))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-navy">Recent Photos</h2>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {photos.map((p) => (
            <img key={p._id} src={p.url} alt={p.title || ''} className="h-28 w-full object-cover rounded" />
          ))}
        </div>
      </section>
    </div>
  )
}


