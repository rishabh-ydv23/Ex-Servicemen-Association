import { useEffect, useState } from 'react'
import { api } from '../../services/api.ts'
import { Notification } from '../../types'

export default function NotificationsAdmin() {
  const [items, setItems] = useState<Notification[]>([])
  const [form, setForm] = useState({ title: '', message: '' })

  function load() {
    api.get('/notifications').then((r: any) => setItems(r.data)).catch(() => {})
  }
  useEffect(() => { load() }, [])

  async function create(e: React.FormEvent) {
    e.preventDefault()
    await api.post('/notifications', form)
    setForm({ title: '', message: '' })
    load()
  }

  async function remove(id: string) {
    await api.delete(`/notifications/${id}`)
    load()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Manage Notifications</h1>
      <form className="mt-4 grid gap-3 md:grid-cols-3" onSubmit={create}>
        <input className="border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        <input className="border px-3 py-2 rounded" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
        <button className="bg-navy text-white px-3 py-2 rounded">Add</button>
      </form>
      <div className="mt-6 grid md:grid-cols-2 gap-3">
        {items.map((n) => (
          <div key={n._id} className="border rounded p-3 bg-white flex items-start justify-between">
            <div>
              <div className="font-semibold">{n.title}</div>
              <div className="text-sm text-gray-700">{n.message}</div>
            </div>
            <button className="text-red-600" onClick={() => remove(n._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}


