import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Notifications from './pages/Notifications'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import NotificationsAdmin from './pages/admin/NotificationsAdmin'
import EventsAdmin from './pages/admin/EventsAdmin'
import GalleryAdmin from './pages/admin/GalleryAdmin'
import MembersAdmin from './pages/admin/MembersAdmin'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/notifications" element={<NotificationsAdmin />} />
          <Route path="/admin/events" element={<EventsAdmin />} />
          <Route path="/admin/gallery" element={<GalleryAdmin />} />
          <Route path="/admin/members" element={<MembersAdmin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App


