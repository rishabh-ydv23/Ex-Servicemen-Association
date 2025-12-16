import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative bg-gradient-to-br from-navy via-navyDark to-navyLight text-white overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4 border-2 border-white/20 md:w-20 md:h-20">
            <span className="text-3xl md:text-4xl">🇮🇳</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 leading-tight">
            {t('heroTitle')}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 font-light">
            {t('organizationName')}
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 max-w-2xl mx-auto px-2">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Link 
              to="/notifications" 
              className="btn-primary bg-white text-navy hover:bg-gray-100 px-6 py-3 text-base sm:text-lg shadow-strong md:px-8 md:py-3 md:text-lg"
            >
              📢 {t('latestUpdates')}
            </Link>
            <Link 
              to="/events" 
              className="btn-accent px-6 py-3 text-base sm:text-lg shadow-strong md:px-8 md:py-3 md:text-lg"
            >
              📅 {t('upcomingEventsButton')}
            </Link>
            <Link 
              to="/about" 
              className="btn-secondary px-6 py-3 text-base sm:text-lg shadow-strong md:px-8 md:py-3 md:text-lg"
            >
              ℹ️ {t('aboutUs')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  )
}


