import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-navy">Ex-Servicemen Foundation</Link>
        <nav className="hidden md:flex gap-6">
          <NavLink to="/" className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}>Home</NavLink>
          <NavLink to="/about" className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}>About</NavLink>
          <NavLink to="/notifications" className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}>Notifications</NavLink>
          <NavLink to="/events" className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}>Events</NavLink>
          <NavLink to="/gallery" className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}>Gallery</NavLink>
          <NavLink to="/contact" className={({isActive})=>`hover:text-navy ${isActive?'text-navy font-semibold':''}`}>Contact</NavLink>
        </nav>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-saffron via-white to-green" />
    </header>
  )
}


