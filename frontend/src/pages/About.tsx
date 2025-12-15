import { useEffect, useState } from 'react'
import { Member } from '../types'
import { api } from '../services/api'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function About() {
  const { t, language } = useLanguage()
  const [members, setMembers] = useState<Member[]>([])
  useEffect(() => {
    api.get('/members').then(r => setMembers(r.data)).catch(() => {})
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy to-navyDark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-4xl md:text-5xl mb-4 font-bold font-serif drop-shadow-lg">{t('aboutTitle')}</h1>
          <p className="text-xl text-white/90 max-w-3xl drop-shadow-md">
            {language === 'en' ? 'Ex-Servicemen Service Foundation - Continuing Service to the Nation' : 'पूर्व सैनिक सेवा फाउंडेशन - राष्ट्र की सेवा जारी'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-navy/10 rounded-full mx-auto mb-4">
                <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 font-serif">{t('ourMission')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' ? 'To support and empower Indian Army, Air Force, and Navy veterans, fostering a community of dedicated service members who continue to contribute to society and nation-building.' : 'भारतीय सेना, वायु सेना और नौसेना के पूर्व सैनिकों का समर्थन और सशक्तिकरण करना, एक समुदाय को बढ़ावा देना जो समर्पित सेवा सदस्यों का है जो समाज और राष्ट्र-निर्माण में योगदान जारी रखते हैं।'}
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-olive/10 rounded-full mx-auto mb-4">
                <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 font-serif">{t('ourVision')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' ? 'A society where veterans\' expertise and dedication continue to shape the future through community leadership, welfare initiatives, and nation-building efforts.' : 'एक समाज जहां पूर्व सैनिकों की विशेषज्ञता और समर्पण भविष्य को आकार देना जारी रखता है सामुदायिक नेतृत्व, कल्याण पहल, और राष्ट्र-निर्माण प्रयासों के माध्यम से।'}
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-saffron/10 rounded-full mx-auto mb-4">
                <svg className="w-8 h-8 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-3 font-serif">{t('ourValues')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' ? 'Integrity, dedication, service, and excellence - values instilled through military service and carried forward in all aspects of life and community service.' : 'ईमानदारी, समर्पण, सेवा और उत्कृष्टता - सैन्य सेवा के माध्यम से प्रेरित मूल्य और जीवन और सामुदायिक सेवा के सभी पहलुओं में आगे बढ़ाए गए।'}
              </p>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="mb-16">
          <h2 className="section-title text-white mb-8">{t('ourJourney')}</h2>
          <div className="card p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">{t('foundation')}</h3>
                  <p className="text-gray-700">
                    {language === 'en' ? 'Established to bring together veterans from the Indian Armed Forces who continue to serve the nation through various community and welfare initiatives.' : 'भारतीय सशस्त्र बलों के पूर्व सैनिकों को एक साथ लाने के लिए स्थापित किया गया जो विभिन्न सामुदायिक और कल्याण पहलों के माध्यम से राष्ट्र की सेवा जारी रखते हैं।'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-olive rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">{t('growth')}</h3>
                  <p className="text-gray-700">
                    {language === 'en' ? 'Expanding our network of veterans across the nation, building a strong community dedicated to service, welfare, and nation-building.' : 'देश भर में पूर्व सैनिकों का हमारा नेटवर्क विस्तारित करना, सेवा, कल्याण और राष्ट्र-निर्माण के लिए समर्पित एक मजबूत समुदाय का निर्माण।'}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy mb-2">{t('impact')}</h3>
                  <p className="text-gray-700">
                    {language === 'en' ? 'Creating lasting impact through welfare initiatives, mentorship, community service, and support programs for veterans and their families.' : 'कल्याण पहलों, प्रशिक्षण, सामुदायिक सेवा और पूर्व सैनिकों और उनके परिवारों के लिए समर्थन कार्यक्रमों के माध्यम से स्थायी प्रभाव पैदा करना।'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Head Members Section */}
        <section>
          <h2 className="section-title text-white mb-8">{t('leadershipTeam')}</h2>
          
          {/* Fixed Leadership Profiles */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Profile 1: Flight Lieutenant Ram Swaroop Yadav */}
            <div className="card card-hover p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-navy/10 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/leadership/ram-swaroop-yadav.jpg" 
                  alt="Ram Swaroop Yadav" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <h3 className="font-bold text-xl text-navy mb-1 font-serif">Ram Swaroop</h3>
              <div className="text-sm font-medium text-olive mb-3">Flight Lieutenant (Retired) - Chief Patron</div>
            </div>

            {/* Profile 2: Flying Officer Muneshwar Singh Yadav */}
            <div className="card card-hover p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-navy/10 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/leadership/muneshwar-singh-yadav.jpg" 
                  alt="Muneshwar Singh Yadav" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <h3 className="font-bold text-xl text-navy mb-1 font-serif">मुनेश्वर सिंह</h3>
              <div className="text-sm font-medium text-olive mb-3">Flying Officer (Retired) - President</div>
            </div>

            {/* Profile 3: Air Veteran Deshraj Yadav - General Secretary */}
            <div className="card card-hover p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-navy/10 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/leadership/deshraj-yadav.jpg" 
                  alt="Deshraj Yadav" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <h3 className="font-bold text-xl text-navy mb-1 font-serif">Deshraj Yadav</h3>
              <div className="text-sm font-medium text-olive mb-3">Air Veteran - General Secretary</div>
            </div>

            {/* Profile 4: Air Veteran Rajesh Kumar - Management Secretary */}
            <div className="card card-hover p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-navy/10 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/leadership/rajesh-kumar.jpg" 
                  alt="Rajesh Kumar" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <h3 className="font-bold text-xl text-navy mb-1 font-serif">Rajesh Kumar</h3>
              <div className="text-sm font-medium text-olive mb-3">Air Veteran - Management Secretary</div>
            </div>
          </div>

          {/* Additional Members from Database (if any) */}
          {members.length > 0 && (
            <>
              <h3 className="text-2xl font-bold text-white mb-6 font-serif mt-12">{t('additionalMembers')}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((m) => (
                  <div key={m._id} className="card card-hover p-6 text-center">
                    {m.photoUrl ? (
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <img 
                          src={m.photoUrl} 
                          alt={m.name} 
                          className="w-full h-full object-cover rounded-full border-4 border-navy/10" 
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 mx-auto mb-4 bg-navy/10 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-navy">👤</span>
                      </div>
                    )}
                    <h3 className="font-bold text-xl text-navy mb-1 font-serif">{m.name}</h3>
                    <div className="text-sm font-medium text-olive mb-3">{m.role}</div>
                    {m.bio && (
                      <p className="text-sm text-gray-700 leading-relaxed">{m.bio}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}


