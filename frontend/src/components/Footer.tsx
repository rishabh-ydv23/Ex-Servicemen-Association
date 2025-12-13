import { useEffect, useState } from 'react'

export default function Footer() {
  const [visits, setVisits] = useState<number>(0)
  useEffect(() => {
    try {
      const key = 'visit-counter'
      const current = Number(localStorage.getItem(key) || '0') + 1
      localStorage.setItem(key, String(current))
      setVisits(current)
    } catch {
      // ignore
    }
  }, [])

  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-700 flex flex-col md:flex-row gap-2 md:gap-0 md:items-center md:justify-between">
        <div>© Ex-Servicemen Foundation</div>
        <div className="flex items-center gap-4">
          <span>Visitor count: {visits}</span>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-saffron">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-saffron">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-saffron">Instagram</a>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-saffron text-white px-3 py-2 rounded shadow hover:opacity-90"
      >
        Back to top
      </button>
    </footer>
  )
}


