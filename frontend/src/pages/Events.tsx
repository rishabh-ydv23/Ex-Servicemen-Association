import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { Event } from '../types'
import EventCard from '../components/EventCard'

export default function Events() {
  const [items, setItems] = useState<Event[]>([])
  const [q, setQ] = useState('')
  const [active, setActive] = useState<Event | null>(null)

  useEffect(() => {
    api.get('/events').then(r => setItems(r.data)).catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(i => i.title.toLowerCase().includes(s) || i.description.toLowerCase().includes(s))
  }, [items, q])

  const upcoming = filtered.filter(e => new Date(e.date) > new Date())
  const past = filtered.filter(e => new Date(e.date) <= new Date())

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl mb-2 font-bold font-serif drop-shadow-lg">Events & Activities</h1>
          <p className="text-lg text-white/90 drop-shadow-md">Join us for community gatherings, celebrations, and special occasions</p>
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
              placeholder="Search events..." 
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft"
            />
          </div>
        </div>

        {/* Upcoming Events */}
        {upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 font-serif flex items-center">
              <span className="w-1 h-8 bg-saffron rounded-full mr-3"></span>
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((e) => (<EventCard key={e._id} e={e} onOpen={setActive} />))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {past.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 font-serif flex items-center">
              <span className="w-1 h-8 bg-gray-400 rounded-full mr-3"></span>
              Past Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((e) => (<EventCard key={e._id} e={e} onOpen={setActive} />))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="card p-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              {q ? 'No events found matching your search' : 'No events scheduled'}
            </p>
          </div>
        )}

        {/* Event Gallery Modal */}
        {active && (
          <div className="fixed inset-0 bg-black/80 z-50 p-4 overflow-auto backdrop-blur-sm" onClick={() => setActive(null)}>
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-strong my-8" onClick={(ev) => ev.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white font-serif">{active.title}</h2>
                  <p className="text-gray-600 mt-1">
                    {new Date(active.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button 
                  onClick={() => setActive(null)}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">{active.description}</p>
                {active.imageUrls && active.imageUrls.length > 0 && (
                  <>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {active.imageUrls.map((u, idx) => (
                        <div key={idx} className="relative group">
                          <img src={u} alt={`${active.title} - Image ${idx + 1}`} className="w-full h-48 object-cover rounded-lg shadow-soft" />
                          <a 
                            href={u} 
                            download 
                            className="absolute bottom-3 right-3 bg-saffron text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-medium hover:bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center pt-4 border-t border-gray-200">
                      <a
                        href={`data:text/plain;charset=utf-8,${encodeURIComponent((active.imageUrls||[]).join('\n'))}`}
                        download={`${active.title.replace(/\s+/g,'_')}_images.txt`}
                        className="btn-accent flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download All Image Links</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


