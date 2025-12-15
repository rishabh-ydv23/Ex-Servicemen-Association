import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import HomeGallerySlider from '../components/HomeGallerySlider'
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
    api.get('/gallery').then(r => setPhotos(r.data.slice(0, 7))).catch(() => {})
  }, [])

  const gridPhotos = photos.slice(0, 6)

  return (
    <div className="bg-gray-50">
      <Hero />
      <HomeGallerySlider photos={photos} />
      
      {/* Latest Notifications Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Latest Notifications</h2>
            <p className="section-subtitle">Stay updated with important announcements and news</p>
          </div>
          <Link 
            to="/notifications" 
            className="hidden md:flex items-center text-navy hover:text-navyDark font-medium"
          >
            View All
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {notifications.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {notifications.map((n) => (<NotificationCard key={n._id} n={n} />))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No notifications available</div>
        )}
      </section>

      {/* Recent Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Join us for community gatherings and special occasions</p>
          </div>
          <Link 
            to="/events" 
            className="hidden md:flex items-center text-navy hover:text-navyDark font-medium"
          >
            View All
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {events.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e) => (<EventCard key={e._id} e={e} />))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No events scheduled</div>
        )}
      </section>

      {/* Recent Photos Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Gallery Highlights</h2>
            <p className="section-subtitle">Memories from our events and activities</p>
          </div>
          <Link 
            to="/gallery" 
            className="hidden md:flex items-center text-navy hover:text-navyDark font-medium"
          >
            View All
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {gridPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gridPhotos.map((p) => (
              <Link 
                key={p._id} 
                to="/gallery"
                className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-medium transition-all aspect-square"
              >
                <img 
                  src={p.url} 
                  alt={p.title || 'Gallery photo'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No photos available</div>
        )}
      </section>
    </div>
  )
}


