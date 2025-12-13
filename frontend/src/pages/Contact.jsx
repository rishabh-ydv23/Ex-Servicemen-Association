import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import api from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  const { t } = useLanguage()
  
  const submit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/contact', form)
      if (response.status === 200) setSent(true)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-3xl font-bold mb-4">{t('contactTitle')}</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="border p-2 w-full rounded" placeholder={t('name')} value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="border p-2 w-full rounded" placeholder={t('email')} type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="border p-2 w-full rounded" placeholder={t('subject')} value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} required />
          <textarea className="border p-2 w-full rounded" placeholder={t('message')} rows={5} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
          <button className="bg-navy text-white px-4 py-2 rounded">{t('sendMessage')}</button>
          {sent && <p className="text-green-700">{t('messageSent')}</p>}
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">{t('office')}</h2>
        <p className="text-gray-700">{t('officeAddress')}</p>
        <p className="text-gray-700">{t('phone')}: +91 98765 43210</p>
        <div className="mt-4 aspect-video">
          <iframe title="map" className="w-full h-full" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.358936082322!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNSJF!5e0!3m2!1sen!2sin!4v1700000000000"></iframe>
        </div>
      </div>
    </div>
  )
}


