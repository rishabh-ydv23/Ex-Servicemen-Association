import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [logoError, setLogoError] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  
  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const userToken = localStorage.getItem('user-token')
      setIsLoggedIn(!!userToken)
    }
    
    checkAuth()
    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth)
    // Check periodically for token changes
    const interval = setInterval(checkAuth, 1000)
    
    return () => {
      window.removeEventListener('storage', checkAuth)
      clearInterval(interval)
    }
  }, [])
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en')
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user-token')
    setIsLoggedIn(false)
    navigate('/')
    window.location.reload() // Refresh to update UI
  }
  
  const navItems = [
    { to: '/', label: t('home'), icon: '🏠' },
    { to: '/about', label: t('about'), icon: 'ℹ️' },
    { to: '/notifications', label: t('notifications'), icon: '📢' },
    { to: '/events', label: t('events'), icon: '📅' },
    { to: '/gallery', label: t('gallery'), icon: '🖼️' },
    { to: '/contact', label: t('contact'), icon: '📧' },
  ]
  
  const authItems = [
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ]
  
  return (
    <header className="bg-white shadow-medium sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-14 h-14 overflow-hidden rounded-lg transition group-hover:opacity-90">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Ex-Servicemen Association Logo" 
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-navy to-navyDark rounded-lg shadow-soft">
                  <span className="text-white text-xs font-bold">ES</span>
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-navy font-serif">Ex-Servicemen Association</div>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className={({isActive}) => 
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-navy text-white shadow-soft' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-navy'
                  }`
                }
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            {!isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-2 border-l border-gray-200 pl-3 ml-3">
                {authItems.map((item) => (
                  <NavLink 
                    key={item.to} 
                    to={item.to} 
                    className={({isActive}) => 
                      `px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                        isActive 
                          ? 'bg-olive text-white' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-navy'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 border-l border-gray-200 pl-3 ml-3">
                <NavLink 
                  to="/dashboard" 
                  className={({isActive}) => 
                    `px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                      isActive 
                        ? 'bg-olive text-white' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-navy'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg transition text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
            <button 
              onClick={toggleLanguage}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy text-white hover:bg-navyDark transition shadow-soft hover:shadow-medium"
              aria-label={t('language')}
              title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'HI'}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-green" />
    </header>
  )
}


