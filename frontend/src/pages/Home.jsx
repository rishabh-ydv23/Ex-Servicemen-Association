import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Home() {
  const [data, setData] = useState({ notifications: [], photos: [] })
  const { t } = useLanguage()
  
  useEffect(()=>{ 
    api.get('/public/home')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching home data:', error))
  },[])
  
  return (
    <div>
      <section className="bg-cover bg-center" style={{backgroundImage:'linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url(https://images.unsplash.com/photo-1608889175231-2f1f01cf15f7?q=80&w=1200&auto=format&fit=crop)'}}> 
        <div className="max-w-6xl mx-auto px-4 py-28 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">{t('heroTitle')}</h1>
          <p className="mt-4 text-lg">{t('heroSubtitle')}</p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link className="bg-saffron text-black px-4 py-2 rounded" to="/notifications">{t('notifications')}</Link>
            <Link className="bg-white text-black px-4 py-2 rounded" to="/events">{t('events')}</Link>
            <Link className="bg-green text-white px-4 py-2 rounded" to="/about">{t('about')}</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('latestNotifications')}</h2>
          <div className="space-y-3">
            {data.notifications.map(n=> (
              <div key={n._id} className="border rounded p-4 bg-white">
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-sm text-gray-600">{new Date(n.createdAt).toLocaleDateString()}</p>
                <p className="mt-2 line-clamp-3">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('recentEventPhotos')}</h2>
          <div className="grid grid-cols-3 gap-3">
            {data.photos.map(p=> (
              <img key={p._id} src={p.url} alt="event" className="w-full h-28 object-cover rounded" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


