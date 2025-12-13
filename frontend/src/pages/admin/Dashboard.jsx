import { useEffect, useState } from 'react'

function useAuthFetch() {
  return (url, options={}) => {
    const token = localStorage.getItem('token')
    return fetch(url, { ...options, headers: { ...(options.headers||{}), Authorization: `Bearer ${token}` } })
  }
}

export default function Dashboard(){
  const [stats, setStats] = useState({ notifications:0, events:0, photos:0, members:0 })
  const [notif, setNotif] = useState({ title:'', message:'' })
  const [eventForm, setEventForm] = useState({ title:'', description:'', date:'' })
  const [galleryTags, setGalleryTags] = useState('')
  const authFetch = useAuthFetch()

  useEffect(() => {
    const loadStats = async () => {
      const [n, e, p, m] = await Promise.all([
        fetch('/api/public/notifications').then(r=>r.json()),
        fetch('/api/public/events').then(r=>r.json()),
        fetch('/api/public/gallery').then(r=>r.json()),
        fetch('/api/public/members').then(r=>r.json()),
      ])
      setStats({ notifications:n.length, events:e.length, photos:p.length, members:m.length })
    }
    loadStats()
  }, [])

  async function addNotification(e){
    e.preventDefault()
    await authFetch('/api/admin/notifications', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(notif) })
    alert('Notification added')
  }

  async function addEvent(e){
    e.preventDefault()
    await authFetch('/api/admin/events', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...eventForm, date: new Date(eventForm.date) }) })
    alert('Event created')
  }

  async function uploadEventImages(e){
    e.preventDefault()
    const eventId = prompt('Enter Event ID to upload images to')
    if (!eventId) return
    const form = new FormData()
    for (const f of e.target.images.files) form.append('images', f)
    await authFetch(`/api/admin/events/${eventId}/photos`, { method:'POST', body: form })
    alert('Event images uploaded')
  }

  async function uploadGallery(e){
    e.preventDefault()
    const form = new FormData()
    for (const f of e.target.images.files) form.append('images', f)
    form.append('tags', galleryTags)
    await authFetch('/api/admin/photos', { method:'POST', body: form })
    alert('Gallery photos uploaded')
  }

  async function addMember(e){
    e.preventDefault()
    const form = new FormData(e.target)
    await authFetch('/api/admin/members', { method:'POST', body: form })
    alert('Member added')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([k,v]) => (
          <div key={k} className="bg-white p-5 rounded shadow text-center">
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-gray-600 capitalize">{k}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <form onSubmit={addNotification} className="bg-white p-5 rounded shadow space-y-3">
          <h2 className="font-semibold">Add Notification</h2>
          <input className="border p-2 w-full rounded" placeholder="Title" value={notif.title} onChange={e=>setNotif({...notif, title:e.target.value})} required />
          <textarea className="border p-2 w-full rounded" placeholder="Message" rows={4} value={notif.message} onChange={e=>setNotif({...notif, message:e.target.value})} required />
          <button className="bg-navy text-white px-4 py-2 rounded">Add</button>
        </form>

        <form onSubmit={addEvent} className="bg-white p-5 rounded shadow space-y-3">
          <h2 className="font-semibold">Create Event</h2>
          <input className="border p-2 w-full rounded" placeholder="Title" value={eventForm.title} onChange={e=>setEventForm({...eventForm, title:e.target.value})} required />
          <textarea className="border p-2 w-full rounded" placeholder="Description" rows={3} value={eventForm.description} onChange={e=>setEventForm({...eventForm, description:e.target.value})} required />
          <input className="border p-2 w-full rounded" type="date" value={eventForm.date} onChange={e=>setEventForm({...eventForm, date:e.target.value})} required />
          <button className="bg-navy text-white px-4 py-2 rounded">Create</button>
        </form>

        <form onSubmit={uploadEventImages} className="bg-white p-5 rounded shadow space-y-3">
          <h2 className="font-semibold">Upload Event Images</h2>
          <input name="images" className="border p-2 w-full rounded" type="file" multiple accept="image/*" />
          <button className="bg-navy text-white px-4 py-2 rounded">Upload</button>
        </form>

        <form onSubmit={uploadGallery} className="bg-white p-5 rounded shadow space-y-3">
          <h2 className="font-semibold">Upload Gallery Photos</h2>
          <input name="images" className="border p-2 w-full rounded" type="file" multiple accept="image/*" />
          <input className="border p-2 w-full rounded" placeholder="Tags (comma separated)" value={galleryTags} onChange={e=>setGalleryTags(e.target.value)} />
          <button className="bg-navy text-white px-4 py-2 rounded">Upload</button>
        </form>

        <form onSubmit={addMember} className="bg-white p-5 rounded shadow space-y-3 md:col-span-2">
          <h2 className="font-semibold">Add Head Member</h2>
          <input name="name" className="border p-2 w-full rounded" placeholder="Name" required />
          <input name="role" className="border p-2 w-full rounded" placeholder="Role" required />
          <textarea name="bio" className="border p-2 w-full rounded" placeholder="Bio" rows={3} />
          <input name="photo" className="border p-2 w-full rounded" type="file" accept="image/*" />
          <button className="bg-navy text-white px-4 py-2 rounded">Add Member</button>
        </form>
      </div>
    </div>
  )
}


