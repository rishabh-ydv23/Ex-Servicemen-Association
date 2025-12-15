import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Photo } from '../types'

const fallbackSlides: Photo[] = [
  { _id: 'airforce', url: '/branches/airforce.jpg', title: 'Indian Air Force', tags: ['Air Force'] },
  { _id: 'army', url: '/branches/army.jpg', title: 'Indian Army', tags: ['Army'] },
  { _id: 'navy', url: '/branches/navy.jpg', title: 'Indian Navy', tags: ['Navy'] },
]

type Props = { photos: Photo[] }

export default function HomeGallerySlider({ photos }: Props) {
  const items = useMemo(() => {
    const withUrls = (photos || []).filter(p => !!p?.url)
    const latest = withUrls.slice(0, 7)
    return latest.length > 0 ? latest : fallbackSlides
  }, [photos])
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setIndex(0)
  }, [items.length])

  useEffect(() => {
    if (items.length < 2 || isPaused) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4500)
    return () => clearInterval(id)
  }, [items.length, isPaused])

  if (items.length === 0) return null
  const active = items[index]

  const goTo = (next: number) => {
    if (items.length === 0) return
    setIndex((next + items.length) % items.length)
  }

  return (
    <section 
      className="bg-white py-12 md:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="section-title">Moments in Motion</h2>
          </div>
          <Link to="/gallery" className="btn-secondary hidden md:inline-flex items-center gap-2">
            View Gallery
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl shadow-strong bg-gray-900/80 text-white">
          <div className="aspect-[16/8] md:aspect-[16/6]">
            <img
              src={active.url}
              alt={active.title || 'Gallery slide'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/70 mb-1">Featured Memory</p>
                <h3 className="text-2xl md:text-3xl font-bold font-serif">
                  {active.title || 'Association Event'}
                </h3>
                {active.tags && active.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {active.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="badge bg-white/15 text-white text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden md:flex items-center gap-3">
                <a
                  href={active.url}
                  download
                  className="px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
                <button
                  onClick={() => goTo(index - 1)}
                  className="p-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm transition"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => goTo(index + 1)}
                  className="p-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm transition"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === index ? 'w-10 bg-white' : 'w-3 bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}


