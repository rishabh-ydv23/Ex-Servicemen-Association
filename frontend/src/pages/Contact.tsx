import { useState } from 'react'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    await api.post('/contact', form).catch(() => {})
    setSent(true)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold text-navy">Contact Us</h1>
        <p className="mt-2 text-gray-700">Have a question or want to reach us? Send a message.</p>
        <form className="mt-6 space-y-3" onSubmit={submit}>
          <input className="border px-3 py-2 rounded w-full" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="border px-3 py-2 rounded w-full" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="border px-3 py-2 rounded w-full" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} />
          <textarea className="border px-3 py-2 rounded w-full" placeholder="Message" rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
          <button className="bg-saffron text-white px-4 py-2 rounded">Send</button>
          {sent && <div className="text-green mt-1">Message sent!</div>}
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold text-navy">Our Office</h2>
        <p className="mt-2 text-gray-700">123 Veteran Avenue, New Delhi, India</p>
        <p className="text-gray-700">Phone: +91 98765 43210</p>
        <div className="mt-4">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.283779943572!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1600000000000"
            width="100%"
            height="300"
            loading="lazy"
            className="border rounded"
          />
        </div>
      </div>
    </div>
  )
}


