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

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    items.forEach(item => {
      (item.tags || []).forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [items])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="section-title text-white text-4xl md:text-5xl mb-2">Photo Gallery</h1>
          <p className="text-lg text-white/90">Memories from our events, activities, and community gatherings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              placeholder="Search by title or tags..." 
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft"
            />
          </div>
          
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Filter by tags:</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setQ(tag)}
                  className="badge bg-navy/10 text-navy hover:bg-navy hover:text-white transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        {q && (
          <div className="mb-6 text-sm text-gray-600">
            Found {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Gallery Grid */}
        {filtered.length > 0 ? (
          <GalleryGrid photos={filtered} />
        ) : (
          <div className="card p-12 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              {q ? 'No photos found matching your search' : 'No photos available in gallery'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


