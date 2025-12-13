import { useEffect, useState } from 'react'
import { Member } from '../types'
import { api } from '../services/api'

export default function About() {
  const [members, setMembers] = useState<Member[]>([])
  useEffect(() => {
    api.get('/members').then(r => setMembers(r.data)).catch(() => {})
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy">About Us</h1>
      <p className="mt-3 text-gray-700">
        The Ex-Servicemen Association is dedicated to supporting Indian Army, Air Force, and Navy veterans
        and their families. Our mission is to honor their service through welfare initiatives, community engagement,
        and promoting opportunities for continued contribution to society.
      </p>

      <h2 className="text-xl font-bold text-navy mt-8">Head Members</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {members.map((m) => (
          <div key={m._id} className="border rounded p-4 bg-white">
            {m.photoUrl && <img src={m.photoUrl} alt={m.name} className="h-40 w-full object-cover rounded" />}
            <div className="mt-3 font-semibold text-navy">{m.name}</div>
            <div className="text-sm text-gray-600">{m.role}</div>
            <p className="text-sm text-gray-700 mt-2">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


