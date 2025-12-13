import { useEffect, useState } from 'react'

export default function Events() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [photos, setPhotos] = useState([])
  const [q, setQ] = useState('')
  const load = () => fetch('/api/public/events?q='+encodeURIComponent(q)).then(r=>r.json()).then(setItems)
  useEffect(load, [])
  function openEvent(e) {
    setSelected(e)
    fetch(`/api/public/events/${e._id}/photos`).then(r=>r.json()).then(setPhotos)
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <div className="flex gap-2 mb-6">
        <input className="border p-2 flex-1 rounded" placeholder="Search events" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="bg-navy text-white px-4 py-2 rounded" onClick={load}>Search</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(e=> (
          <div key={e._id} className="bg-white border rounded p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-sm text-gray-600">{new Date(e.date).toLocaleDateString()}</p>
              </div>
              <button className="text-navy underline" onClick={()=>openEvent(e)}>View Gallery</button>
            </div>
            <p className="mt-2">{e.description}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{selected.title} - Photos</h2>
            <a className="bg-navy text-white px-4 py-2 rounded" href={`/api/admin/events/${selected._id}/download`} target="_blank">Download All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {photos.map(p => (
              <a key={p._id} href={p.url} download>
                <img src={p.url} alt="event" className="w-full h-40 object-cover rounded"/>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


