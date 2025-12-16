import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useLanguage } from '../contexts/LanguageContext.jsx'

export default function Footer() {
  const [visits, setVisits] = useState<number | null>(null)
  const { t } = useLanguage()
  
  useEffect(() => {
    api.post('/public/visit')
      .then(response => setVisits(response.data.total))
      .catch(() => {})
  }, [])
  
  return (
    <footer className="bg-navyDark text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Ex-Servicemen Service Foundation</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Dedicated to supporting Indian Armed Forces veterans who continue their service through community leadership and welfare initiatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-white/80 hover:text-white transition block py-2">Home</a></li>
              <li><a href="/about" className="text-white/80 hover:text-white transition block py-2">About Us</a></li>
              <li><a href="/notifications" className="text-white/80 hover:text-white transition block py-2">Notifications</a></li>
              <li><a href="/events" className="text-white/80 hover:text-white transition block py-2">Events</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Contact</h3>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">913/1, Adarsh Nagar, Hiran Nagar, Unnao, Uttar Pradesh 209801</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918299471336" className="hover:text-white transition text-sm py-2 block">+91 82994 71336</a>
              </li>
              <li className="flex items-center space-x-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:exservicmenasso.india@gmail.com" className="hover:text-white transition text-sm py-2 block">exservicmenasso.india@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Social & Stats */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-serif">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.facebook.com/groups/1361858078952482/?ref=share&mibextid=KtfwRi" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://chat.whatsapp.com/KxmeMe9UX22CqUenIZDb3T" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.58-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.718 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.24c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.002 5.45-4.437 9.884-9.886 9.884" />
                </svg>
              </a>
              <a href="mailto:exservicmenasso.india@gmail.com" aria-label="Email" className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            {visits && (
              <div className="text-sm text-white/80">
                <span className="font-medium">Visitor Count:</span> {visits.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/80">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">© {new Date().getFullYear()} Ex-Servicemen Service Foundation. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="hover:text-white transition text-sm py-2 px-3">Contact</a>
            <a href="/privacy-policy" className="hover:text-white transition text-sm py-2 px-3">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition text-sm py-2 px-3">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className="fixed bottom-4 right-4 bg-saffron text-white w-14 h-14 rounded-full shadow-strong hover:bg-opacity-90 transition flex items-center justify-center z-40 md:bottom-6 md:right-6 md:w-16 md:h-16"
        aria-label={t('backToTop')}
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}


