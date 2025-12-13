import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }
  
  const navItems = [
    { to: '/', label: t('home') },
    { to: '/about', label: t('about') },
    { to: '/notifications', label: t('notifications') },
    { to: '/events', label: t('events') },
    { to: '/gallery', label: t('gallery') },
    { to: '/contact', label: t('contact') },
  ]
  
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-navy">Ex-Servicemen Foundation</Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1 rounded bg-navy text-white hover:bg-opacity-90 transition"
          aria-label={t('language')}
        >
          {language === 'en' ? (
            // India flag icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
              <rect width="24" height="16" fill="#ff9933"/>
              <rect width="24" height="8" y="8" fill="#ffffff"/>
              <rect width="24" height="5.33" y="10.67" fill="#138808"/>
              <circle cx="12" cy="8" r="3" fill="#000088"/>
              <circle cx="12" cy="8" r="2" fill="#ffffff"/>
              <circle cx="12" cy="8" r="1" fill="#000088"/>
            </svg>
          ) : (
            // UK flag icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
              <rect width="24" height="16" fill="#012169"/>
              <path d="M0 0l24 16m0-16L0 16" stroke="#FFFFFF" strokeWidth="3"/>
              <path d="M12 0v16M0 8h24" stroke="#FFFFFF" strokeWidth="5"/>
              <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3"/>
            </svg>
          )}
        </button>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-green" />
    </header>
  )
}


