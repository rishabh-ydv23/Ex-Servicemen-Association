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

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Events</h1>
      <div className="mt-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="border px-3 py-2 rounded w-full md:w-80" />
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {filtered.map((e) => (<EventCard key={e._id} e={e} onOpen={setActive} />))}
      </div>

      {active && (
        <div className="fixed inset-0 bg-black/70 z-50 p-4 overflow-auto" onClick={() => setActive(null)}>
          <div className="max-w-5xl mx-auto bg-white rounded p-4" onClick={(ev) => ev.stopPropagation()}>
            <h2 className="text-xl font-bold text-navy">{active.title}</h2>
            <div className="grid md:grid-cols-3 gap-3 mt-3">
              {active.imageUrls?.map((u, idx) => (
                <div key={idx} className="relative">
                  <img src={u} className="w-full h-48 object-cover rounded" />
                  <a href={u} download className="absolute bottom-2 right-2 bg-saffron text-white text-xs px-2 py-1 rounded">Download</a>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent((active.imageUrls||[]).join('\n'))}`}
                download={`${active.title.replace(/\s+/g,'_')}_images.txt`}
                className="text-saffron hover:underline"
              >Download all links</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


