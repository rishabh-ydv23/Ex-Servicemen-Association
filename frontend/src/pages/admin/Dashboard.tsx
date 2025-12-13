import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [stats, setStats] = useState({ notifications: 0, events: 0, photos: 0, members: 0 })
  useEffect(() => {
    Promise.all([
      api.get('/notifications'),
      api.get('/events'),
      api.get('/gallery'),
      api.get('/members'),
    ]).then(([n, e, g, m]) => setStats({ notifications: n.data.length, events: e.data.length, photos: g.data.length, members: m.data.length }))
    .catch(() => {})
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <Card title="Notifications" value={stats.notifications} to="/admin/notifications" />
        <Card title="Events" value={stats.events} to="/admin/events" />
        <Card title="Photos" value={stats.photos} to="/admin/gallery" />
        <Card title="Members" value={stats.members} to="/admin/members" />
      </div>
    </div>
  )
}

function Card({ title, value, to }: { title: string, value: number, to: string }) {
  return (
    <Link to={to} className="border rounded p-4 bg-white shadow hover:shadow-md transition">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold text-navy">{value}</div>
    </Link>
  )
}


