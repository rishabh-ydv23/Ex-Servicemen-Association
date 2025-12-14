import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
    if (!res.ok) return setError('Invalid credentials')
    const data = await res.json()
    localStorage.setItem('token', data.token)
    navigate('/admin')
  }
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="border p-2 w-full rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border p-2 w-full rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-navy text-white px-4 py-2 rounded w-full">Login</button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  )
}


