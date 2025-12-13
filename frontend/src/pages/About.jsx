import { useEffect, useState } from 'react'

export default function About() {
  const [members, setMembers] = useState([])
  useEffect(()=>{ fetch('/api/public/members').then(r=>r.json()).then(setMembers) },[])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-700">Ex-Servicemen Foundation is dedicated to supporting Indian Army, Air Force, and Navy veterans through community engagement, welfare programs, and events celebrating service and sacrifice.</p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Purpose</h2>
          <p className="text-gray-600 mt-2">To create a strong support network for veterans and their families.</p>
        </div>
        <div className="p-5 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Vision</h2>
          <p className="text-gray-600 mt-2">A united community honoring service with dignity, respect, and opportunity.</p>
        </div>
        <div className="p-5 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Mission</h2>
          <p className="text-gray-600 mt-2">Provide welfare programs, skill-building, and public awareness to support veterans.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Head Members</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map(m => (
          <div key={m._id} className="bg-white rounded shadow p-4 text-center">
            {m.photoUrl && <img src={m.photoUrl} alt={m.name} className="w-28 h-28 object-cover rounded-full mx-auto" />}
            <h3 className="mt-3 font-semibold">{m.name}</h3>
            <p className="text-sm text-navy">{m.role}</p>
            <p className="text-sm text-gray-600 mt-2">{m.bio}</p>
          </div>
        ))}
      </div>

    </div>
  )
}


