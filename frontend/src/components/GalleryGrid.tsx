import { useState } from 'react'
import { Photo } from '../types'

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openPhoto = (photo: Photo, index: number) => {
    setActive(photo)
    setCurrentIndex(index)
  }

  const nextPhoto = () => {
    if (currentIndex < photos.length - 1) {
      const next = photos[currentIndex + 1]
      setActive(next)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (currentIndex > 0) {
      const prev = photos[currentIndex - 1]
      setActive(prev)
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((p, idx) => (
          <button 
            key={p._id} 
            className="group relative overflow-hidden rounded-lg shadow-soft hover:shadow-medium transition-all aspect-square"
            onClick={() => openPhoto(p, idx)}
          >
            <img 
              src={p.url} 
              alt={p.title || 'Gallery photo'} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              onError={(e) => {
                console.error('Thumbnail failed to load:', p.url);
                e.currentTarget.src = '/placeholder-thumbnail.png'; // Fallback thumbnail
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {p.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="text-white text-sm font-medium truncate">{p.title}</div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {active && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition z-10"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            {currentIndex > 0 && (
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {currentIndex < photos.length - 1 && (
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-strong">
              <img 
                src={active.url} 
                alt={active.title || 'Gallery photo'} 
                className="w-full max-h-[75vh] object-contain mx-auto" 
                onError={(e) => {
                  console.error('Image failed to load:', active.url);
                  e.currentTarget.src = '/placeholder-image.png'; // Fallback image
                }}
              />
              <div className="p-6 bg-white">
                {/* Debug info - remove in production */}
                <div className="mb-2 text-xs text-gray-500 break-all">URL: {active.url}</div>
                <div>
                  {active.title && (
                    <h3 className="text-xl font-bold text-navy mb-2 font-serif">{active.title}</h3>
                  )}
                  {active.tags && active.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {active.tags.map((tag, idx) => (
                        <span key={idx} className="badge bg-navy/10 text-navy text-xs">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-4 text-center">
                  {currentIndex + 1} of {photos.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


