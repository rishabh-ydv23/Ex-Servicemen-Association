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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Notifications</h1>
      <div className="mt-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="border px-3 py-2 rounded w-full md:w-80" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {filtered.map((n) => (<NotificationCard key={n._id} n={n} />))}
      </div>
    </div>
  )
}


