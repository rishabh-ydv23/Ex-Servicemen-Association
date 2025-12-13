import { useEffect, useState } from 'react'

export default function Notifications() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const load = () => fetch('/api/public/notifications?q='+encodeURIComponent(q)).then(r=>r.json()).then(setItems)
  useEffect(load, [])
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div className="flex gap-2 mb-6">
        <input className="border p-2 flex-1 rounded" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="bg-navy text-white px-4 py-2 rounded" onClick={load}>Search</button>
      </div>
      <div className="space-y-3">
        {items.map(n=> (
          <div key={n._id} className="bg-white border rounded p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{n.title}</h3>
              <span className="text-sm text-gray-600">{new Date(n.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 whitespace-pre-wrap">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


