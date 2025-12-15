import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { Notification } from '../types'
import NotificationCard from '../components/NotificationCard'

export default function Notifications() {
  const [items, setItems] = useState<Notification[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
    api.get('/notifications').then(r => setItems(r.data)).catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(i => i.title.toLowerCase().includes(s) || i.message.toLowerCase().includes(s))
  }, [items, q])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl mb-2 font-bold font-serif drop-shadow-lg">Notifications & Updates</h1>
          <p className="text-lg text-white/90 drop-shadow-md">Stay informed about important announcements and news</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              placeholder="Search notifications..." 
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft"
            />
          </div>
        </div>

        {/* Results Count */}
        {q && (
          <div className="mb-6 text-sm text-gray-600">
            Found {filtered.length} notification{filtered.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Notifications Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n) => (<NotificationCard key={n._id} n={n} />))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              {q ? 'No notifications found matching your search' : 'No notifications available'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


