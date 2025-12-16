import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import HeroSlider from '../components/HeroSlider'
import { api } from '../services/api'
import { Event, Notification } from '../types'
import NotificationCard from '../components/NotificationCard'
import EventCard from '../components/EventCard'

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [events, setEvents] = useState<Event[]>([])
  useEffect(() => {
    api.get('/notifications').then(r => setNotifications(r.data.slice(0, 3))).catch(() => {})
    api.get('/events').then(r => setEvents(r.data.slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div className="bg-gray-50">
      <Hero />

      {/* Hero Slider Section */}
      <div className="py-8">
        <HeroSlider />
      </div>

      {/* Latest Notifications Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-2 font-serif">Latest Notifications</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notifications.map((n) => (<NotificationCard key={n._id} n={n} />))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No notifications available</div>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 my-8"></div>
      </div>

      {/* Recent Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-2 font-serif">Upcoming Events</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((e) => (<EventCard key={e._id} e={e} />))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No events scheduled</div>
        )}
      </section>


    </div>
  )
}


