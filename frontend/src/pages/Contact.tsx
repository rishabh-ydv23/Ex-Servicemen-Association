import { useState } from 'react'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/contact', form)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (error: any) {
      console.error('Contact form error:', error)
      alert(`Failed to send message: ${error.response?.data?.error || error.message || 'Unknown error'}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl mb-2 font-bold font-serif drop-shadow-lg">Contact Us</h1>
          <p className="text-lg text-white/90 drop-shadow-md">Get in touch with us - we'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-white mb-2 font-serif">Send us a Message</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form className="space-y-5" onSubmit={submit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft"
                  placeholder="Your full name"
                  value={form.name} 
                  onChange={e=>setForm({...form, name:e.target.value})} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft"
                  placeholder="your.email@example.com"
                  type="email" 
                  value={form.email} 
                  onChange={e=>setForm({...form, email:e.target.value})} 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft"
                  placeholder="What is this regarding?"
                  value={form.subject} 
                  onChange={e=>setForm({...form, subject:e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy bg-white shadow-soft resize-none"
                  placeholder="Your message here..."
                  rows={6} 
                  value={form.message} 
                  onChange={e=>setForm({...form, message:e.target.value})} 
                  required 
                />
              </div>
              
              <button 
                type="submit"
                disabled={sending}
                className="btn-accent w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              
              {sent && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-serif">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Address</h3>
                    <p className="text-gray-700">913/1, Adarsh Nagar<br />Hiran Nagar, Unnao, Uttar Pradesh 209801</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                    <a href="tel:+918299471336" className="text-gray-700 hover:text-navy">+91 82994 71336</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-saffron/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <a href="mailto:exservicmenasso.india@gmail.com" className="text-gray-700 hover:text-navy">exservicmenasso.india@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Facebook Group</h3>
                    <a href="https://www.facebook.com/groups/1361858078952482/?ref=share&mibextid=KtfwRi" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-navy">
                      Join on Facebook
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.72 4.28a3.6 3.6 0 00-5.09 0l-.63.63a1 1 0 000 1.41l1.08 1.08a1 1 0 001.41 0l.3-.3a.6.6 0 01.85 0l2.05 2.05a.6.6 0 010 .85l-5.9 5.9a.6.6 0 01-.85 0l-2.05-2.05a.6.6 0 010-.85l.3-.3a1 1 0 000-1.41l-1.08-1.08a1 1 0 00-1.41 0l-.63.63a3.6 3.6 0 000 5.09l2.44 2.44a3.6 3.6 0 005.09 0l7.07-7.07a3.6 3.6 0 000-5.09z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                    <a href="https://chat.whatsapp.com/KxmeMe9UX22CqUenIZDb3T" target="_blank" rel="noreferrer" className="text-gray-700 hover:text-navy">
                      Join the WhatsApp group
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="card p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-white font-serif">Find Us on Map</h3>
              </div>
              <div className="relative h-80">
                <iframe
                  title="map"
                  src="https://www.google.com/maps?q=913/1,+Adarsh+Nagar,+Hiran+Nagar,+Unnao,+Uttar+Pradesh+209801&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


