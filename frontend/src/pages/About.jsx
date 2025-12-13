import { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import api from '../services/api'

export default function About() {
  const [members, setMembers] = useState([])
  const { t } = useLanguage()
  
  useEffect(()=>{ 
    api.get('/public/members')
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error))
  },[])
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{t('aboutTitle')}</h1>
      <p className="text-gray-700">{t('aboutDescription')}</p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{t('purpose')}</h2>
          <p className="text-gray-600 mt-2">{t('purposeDescription')}</p>
        </div>
        <div className="p-5 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{t('vision')}</h2>
          <p className="text-gray-600 mt-2">{t('visionDescription')}</p>
        </div>
        <div className="p-5 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{t('missionStatement')}</h2>
          <p className="text-gray-600 mt-2">{t('missionDescription')}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">{t('headMembers')}</h2>
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


