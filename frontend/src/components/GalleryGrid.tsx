import { useState } from 'react'
import { Photo } from '../types'

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<Photo | null>(null)

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((p) => (
          <button key={p._id} className="group" onClick={() => setActive(p)}>
            <img src={p.url} alt={p.title || ''} className="h-40 w-full object-cover rounded shadow group-hover:opacity-90" />
            {p.title && <div className="text-xs mt-1 text-gray-600">{p.title}</div>}
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setActive(null)}>
          <div className="bg-white rounded max-w-4xl w-full p-3" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.title || ''} className="max-h-[70vh] w-full object-contain" />
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-gray-700">{active.title}</div>
              <a href={active.url} download className="text-saffron hover:underline">Download</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


