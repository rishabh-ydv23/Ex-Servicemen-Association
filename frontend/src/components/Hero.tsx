import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative tri-gradient text-center py-20">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?q=80&w=1470&auto=format&fit=crop)', backgroundSize: 'cover' }} />
      <div className="relative max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-navy drop-shadow">Honoring Those Who Served</h1>
        <p className="mt-4 text-navy/90">Indian Army, Air Force and Navy veterans united in service to society.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link className="bg-navy text-white px-4 py-2 rounded hover:bg-opacity-90" to="/notifications">Notifications</Link>
          <Link className="bg-saffron text-white px-4 py-2 rounded hover:bg-opacity-90" to="/events">Events</Link>
          <Link className="bg-green text-white px-4 py-2 rounded hover:bg-opacity-90" to="/about">About Us</Link>
        </div>
      </div>
    </section>
  )
}


