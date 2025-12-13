import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import { Photo } from '../types'
import GalleryGrid from '../components/GalleryGrid'

export default function Gallery() {
  const [items, setItems] = useState<Photo[]>([])
  const [q, setQ] = useState('')

  useEffect(() => {
    api.get('/gallery').then(r => setItems(r.data)).catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter(i => (i.title||'').toLowerCase().includes(s) || (i.tags||[]).join(',').toLowerCase().includes(s))
  }, [items, q])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Gallery</h1>
      <div className="mt-4">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search tags or title..." className="border px-3 py-2 rounded w-full md:w-96" />
      </div>
      <div className="mt-6">
        <GalleryGrid photos={filtered} />
      </div>
    </div>
  )
}


