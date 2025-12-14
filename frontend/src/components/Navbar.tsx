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
  
  const authItems = [
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ]
  
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-navy">Ex-Servicemen Association</Link>
        <div className="hidden md:flex gap-6">
          <nav className="flex gap-6">
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
          <nav className="flex gap-4 ml-4 pl-4 border-l border-gray-200">
            {authItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1 rounded bg-navy text-white hover:bg-opacity-90 transition"
          aria-label={t('language')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 8l6 6" />
            <path d="M4 14l6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2v12" />
            <path d="M22 22l-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
        </button>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-green" />
    </header>
  )
}


