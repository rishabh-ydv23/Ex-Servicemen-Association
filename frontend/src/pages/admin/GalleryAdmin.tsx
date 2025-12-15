import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Photo } from '../../types'

export default function GalleryAdmin() {
  const [items, setItems] = useState<Photo[]>([])
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState<File | null>(null)

  function load(){ api.get('/gallery').then(r => setItems(r.data)).catch(() => {}) }
  useEffect(() => { load() }, [])

  async function upload(e: React.FormEvent){
    e.preventDefault()
    if (!file) return
    const fd = new FormData()
    fd.append('images', file)
    fd.append('title', title)
    fd.append('tags', tags)
    await api.post('/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    setFile(null); setTitle(''); setTags(''); load()
  }

  async function remove(id: string){ await api.delete(`/gallery/${id}`); load() }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white font-serif">Manage Gallery</h1>
      <form className="mt-4 flex flex-col md:flex-row gap-3" onSubmit={upload}>
        <input className="border px-3 py-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border px-3 py-2 rounded" placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
        <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} />
        <button className="bg-navy text-white px-3 py-2 rounded">Upload</button>
      </form>
      <div className="grid md:grid-cols-4 gap-3 mt-6">
        {items.map((p) => (
          <div key={p._id} className="border rounded p-2 bg-white">
            <img src={p.url} className="h-40 w-full object-cover rounded" onLoad={() => console.log('Admin thumbnail loaded:', p.url)} onError={(e) => {
              console.error('Admin thumbnail failed to load:', p.url);
              e.currentTarget.src = '/placeholder-admin.png'; // Fallback thumbnail
            }} />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-600">{(p.tags||[]).join(', ')}</div>
              <button className="text-red-600 text-sm" onClick={() => remove(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


