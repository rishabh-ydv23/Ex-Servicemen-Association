import { Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext.tsx'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Notifications from './pages/Notifications'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import UserDashboard from './pages/UserDashboard'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import NotificationsAdmin from './pages/admin/NotificationsAdmin'
import EventsAdmin from './pages/admin/EventsAdmin'
import GalleryAdmin from './pages/admin/GalleryAdmin'
import MembersAdmin from './pages/admin/MembersAdmin'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('admin-token')
  return token ? children : <AdminLogin />
}

function App() {
  return (
    <LanguageProvider>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin/notifications" element={<PrivateRoute><NotificationsAdmin /></PrivateRoute>} />
            <Route path="/admin/events" element={<PrivateRoute><EventsAdmin /></PrivateRoute>} />
            <Route path="/admin/gallery" element={<PrivateRoute><GalleryAdmin /></PrivateRoute>} />
            <Route path="/admin/members" element={<PrivateRoute><MembersAdmin /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App


