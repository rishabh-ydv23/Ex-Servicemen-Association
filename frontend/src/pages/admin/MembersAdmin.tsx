import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Member } from '../../types'

export default function MembersAdmin(){
  const [items, setItems] = useState<Member[]>([])
  const [form, setForm] = useState({ name: '', role: '', bio: '', mobile: '', priority: 0 })
  const [file, setFile] = useState<File | null>(null)

  function load(){ api.get('/members').then(r => setItems(r.data)).catch(() => {}) }
  useEffect(() => { load() }, [])

  async function create(e: React.FormEvent){
    e.preventDefault()
    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('role', form.role)
    fd.append('bio', form.bio)
    fd.append('mobile', form.mobile)
    fd.append('priority', String(form.priority))
    if (file) fd.append('photo', file)
    await api.post('/members', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setForm({ name: '', role: '', bio: '', mobile: '', priority: 0 }); setFile(null); load()
  }

  async function remove(id: string){ await api.delete(`/members/${id}`); load() }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy font-serif">Manage Head Members</h1>
      <form className="mt-4 grid md:grid-cols-6 gap-3" onSubmit={create}>
        <input className="border px-3 py-2 rounded" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border px-3 py-2 rounded" placeholder="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} required />
        <input className="border px-3 py-2 rounded" placeholder="Bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} />
        <input className="border px-3 py-2 rounded" placeholder="Mobile" value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} />
        <input className="border px-3 py-2 rounded" type="number" placeholder="Priority" value={form.priority} onChange={e=>setForm({...form, priority:Number(e.target.value)})} />
        <div className="flex items-center gap-2"><input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} /><button className="bg-navy text-white px-3 py-2 rounded">Add</button></div>
      </form>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {items.map((m) => (
          <div key={m._id} className="border rounded p-3 bg-white">
            {m.photoUrl && <img src={m.photoUrl} className="h-40 w-full object-cover rounded" />}
            <div className="font-semibold mt-2">{m.name}</div>
            <div className="text-sm text-gray-600">{m.role}</div>
            {m.mobile && <div className="text-sm text-gray-600">Mobile: {m.mobile}</div>}
            <p className="text-sm text-gray-700">{m.bio}</p>
            <button className="text-red-600 mt-2" onClick={() => remove(m._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}