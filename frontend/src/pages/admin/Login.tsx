import { useState } from 'react'
import { api, setToken } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('Admin@123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const r = await api.post('/auth/login', { email, password })
      setToken(r.data.token)
      navigate('/admin')
    } catch (e) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy font-serif">Admin Login</h1>
      <form className="space-y-3 mt-6" onSubmit={submit}>
        <input className="border px-3 py-2 rounded w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border px-3 py-2 rounded w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-navy text-white px-4 py-2 rounded w-full">Login</button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  )
}


