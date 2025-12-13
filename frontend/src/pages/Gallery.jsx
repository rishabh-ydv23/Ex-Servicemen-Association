import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import api from '../services/api'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [tag, setTag] = useState('')
  const [lightbox, setLightbox] = useState(null)
  const { t } = useLanguage()
  
  const load = () => {
    api.get(`/public/gallery?tag=${encodeURIComponent(tag)}`)
      .then(response => setPhotos(response.data))
      .catch(error => console.error('Error fetching gallery:', error))
  }
  
  useEffect(load, [])
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{t('galleryTitle')}</h1>
      <div className="flex gap-2 mb-6">
        <input className="border p-2 flex-1 rounded" placeholder={t('filterByTag')} value={tag} onChange={e=>setTag(e.target.value)} />
        <button className="bg-navy text-white px-4 py-2 rounded" onClick={load}>{t('filter')}</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {photos.map(p => (
          <div key={p._id} className="relative group">
            <img src={p.url} alt="gallery" className="w-full h-48 object-cover rounded cursor-pointer" onClick={()=>setLightbox(p.url)} />
            <a href={p.url} download className="absolute bottom-2 right-2 bg-white text-sm px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100">{t('download')}</a>
          </div>
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center" onClick={()=>setLightbox(null)}>
          <img src={lightbox} alt="full" className="max-h-[90vh] max-w-[90vw] rounded" />
        </div>
      )}
    </div>
  )
}


