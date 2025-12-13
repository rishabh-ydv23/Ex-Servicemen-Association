import { useEffect, useState } from 'react'
import api from '../services/api'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Footer() {
  const [visits, setVisits] = useState(null)
  const { t } = useLanguage()
  
  useEffect(() => {
    api.post('/public/visit')
      .then(response => setVisits(response.data.total))
      .catch(() => {})
  }, [])
  
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <p className="text-sm">{t('copyright').replace('{year}', new Date().getFullYear())}</p>
        <p className="text-sm">{t('visitors')}: {visits ?? '—'}</p>
        <div className="flex gap-3 text-navy">
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Twitter">X</a>
          <a href="#" aria-label="Instagram">IG</a>
        </div>
      </div>
      <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-6 right-6 bg-navy text-white px-3 py-2 rounded shadow">{t('backToTop')}</button>
    </footer>
  )
}


