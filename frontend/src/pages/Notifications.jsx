import { useEffect, useState } from 'react'
import api from '../services/api'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Notifications() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const { t } = useLanguage()
  
  const load = () => {
    api.get(`/public/notifications?q=${encodeURIComponent(q)}`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching notifications:', error))
  }
  
  useEffect(() => {
    load()
  }, [])
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{t('notificationsTitle')}</h1>
      <div className="flex gap-2 mb-6">
        <input 
          className="border p-2 flex-1 rounded" 
          placeholder={t('searchPlaceholder')} 
          value={q} 
          onChange={e => setQ(e.target.value)} 
        />
        <button 
          className="bg-navy text-white px-4 py-2 rounded" 
          onClick={load}
        >
          {t('searchPlaceholder')}
        </button>
      </div>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map(n => (
            <div key={n._id} className="bg-white border rounded p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{n.title}</h3>
                <span className="text-sm text-gray-600">
                  {new Date(n.createdAt || n.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap">{n.message}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            {t('notificationsTitle')} {t('notFound')}
          </div>
        )}
      </div>
    </div>
  )
}


