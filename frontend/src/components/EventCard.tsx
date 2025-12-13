import { Event } from '../types'

export default function EventCard({ e, onOpen }: { e: Event, onOpen?: (e: Event) => void }) {
  const d = new Date(e.date)
  const cover = e.imageUrls?.[0]
  return (
    <div className="border rounded overflow-hidden bg-white shadow-sm">
      {cover && <img src={cover} alt={e.title} className="h-40 w-full object-cover" />}
      <div className="p-4">
        <div className="text-xs text-gray-500">{d.toDateString()}</div>
        <div className="font-semibold text-navy mt-1">{e.title}</div>
        <p className="text-sm mt-2 text-gray-700 line-clamp-3">{e.description}</p>
        {onOpen && (
          <button className="mt-3 text-saffron hover:underline" onClick={() => onOpen(e)}>Open Gallery</button>
        )}
      </div>
    </div>
  )}


