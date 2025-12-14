import { useEffect, useState } from 'react'
import { api } from '../../services/api.ts'
import { Event } from '../../types'

export default function EventsAdmin() {
  const [items, setItems] = useState<Event[]>([])
  const [form, setForm] = useState({ title: '', description: '', date: '' })
  const [files, setFiles] = useState<FileList | null>(null)

  function load() { api.get('/events').then(r => setItems(r.data)).catch(() => {}) }
  useEffect(() => { load() }, [])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    await api.post('/events', form)
    setForm({ title: '', description: '', date: '' })
    load()
  }

  async function uploadImages(eventId: string) {
    if (!files || files.length === 0) return
    const fd = new FormData()
    Array.from(files).forEach(f => fd.append('images', f))
    await api.post(`/events/${eventId}/images`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setFiles(null)
    load()
  }

  async function remove(id: string) {
    await api.delete(`/events/${id}`)
    load()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Manage Events</h1>
      <form className="mt-4 grid gap-3 md:grid-cols-4" onSubmit={create}>
        <input className="border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input className="border px-3 py-2 rounded" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required />
        <input className="border px-3 py-2 rounded" type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required />
        <button className="bg-navy text-white px-3 py-2 rounded">Add</button>
      </form>

      <div className="mt-6 space-y-4">
        {items.map((e) => (
          <div key={e._id} className="border rounded p-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm text-gray-600">{new Date(e.date).toDateString()}</div>
              </div>
              <button className="text-red-600" onClick={() => remove(e._id)}>Delete</button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-6 gap-2">
              {e.imageUrls?.map((u, idx) => (
                <img key={idx} src={u} className="h-20 w-full object-cover rounded" />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
              <button className="bg-saffron text-white px-3 py-1 rounded" onClick={() => uploadImages(e._id)}>Upload Images</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


