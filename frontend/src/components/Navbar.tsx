import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="bg-navy text-white sticky top-0 z-40 shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Ex-Servicemen Foundation</Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `hover:text-saffron transition ${isActive ? 'text-saffron' : ''}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}


