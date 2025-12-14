import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-navy via-navyDark to-navyLight text-white overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6 border-2 border-white/20">
            <span className="text-4xl">🇮🇳</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight">
            Honoring Those Who Served
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            Ex-Servicemen Association
          </p>
          
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Indian Army, Air Force, and Navy veterans united in service to society, 
            continuing their dedication through community service and welfare initiatives.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/notifications" 
              className="btn-primary bg-white text-navy hover:bg-gray-100 px-8 py-3 text-lg shadow-strong"
            >
              📢 Latest Updates
            </Link>
            <Link 
              to="/events" 
              className="btn-accent px-8 py-3 text-lg shadow-strong"
            >
              📅 Upcoming Events
            </Link>
            <Link 
              to="/about" 
              className="btn-secondary px-8 py-3 text-lg shadow-strong"
            >
              ℹ️ About Us
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


