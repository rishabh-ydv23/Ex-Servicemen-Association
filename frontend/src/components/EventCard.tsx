import { Event } from '../types'

export default function EventCard({ e, onOpen }: { e: Event, onOpen?: (e: Event) => void }) {
  const d = new Date(e.date)
  const cover = e.imageUrls?.[0]
  const isUpcoming = d > new Date()
  const isPast = d < new Date()
  
  return (
    <div className="card card-hover overflow-hidden">
      {cover && (
        <div className="relative h-48 overflow-hidden">
          <img src={cover} alt={e.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3">
            {isUpcoming && (
              <span className="badge bg-green text-white">Upcoming</span>
            )}
            {isPast && (
              <span className="badge bg-gray-500 text-white">Past Event</span>
            )}
          </div>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h3 className="font-bold text-lg text-navy mb-2 font-serif line-clamp-2">{e.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed mb-4">{e.description}</p>
        {onOpen && (
          <button 
            className="text-saffron hover:text-navy font-medium text-sm flex items-center space-x-1 group py-2 px-3"
            onClick={() => onOpen(e)}
          >
            <span>View Gallery</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )}


