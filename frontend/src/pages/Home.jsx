import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export default function Home() {
  const [data, setData] = useState({ notifications: [], photos: [] });
  const { t } = useLanguage();

  useEffect(() => {
    api
      .get("/public/home")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching home data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-gray-800">
      
      {/* Sticky Navbar (NO HEADING) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/notifications" className="hover:text-indigo-600">
              {t("notifications")}
            </Link>
            <Link to="/events" className="hover:text-indigo-600">
              {t("events")}
            </Link>
            <Link to="/about" className="hover:text-indigo-600">
              {t("about")}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,41,59,.75),rgba(30,41,59,.75)), url(https://images.unsplash.com/photo-1608889175231-2f1f01cf15f7?q=80&w=1400&auto=format&fit=crop)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {t("heroTitle")}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-indigo-100">
            {t("heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/notifications"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg transition"
            >
              {t("notifications")}
            </Link>
            <Link
              to="/events"
              className="px-6 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg transition"
            >
              {t("events")}
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 shadow-lg transition"
            >
              {t("about")}
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-2">
        
        {/* Notifications */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            {t("latestNotifications")}
          </h3>
          <div className="space-y-5">
            {data.notifications.map((n) => (
              <div
                key={n._id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold text-lg text-indigo-700">
                  {n.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Photos */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            {t("recentEventPhotos")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.photos.map((p) => (
              <div
                key={p._id}
                className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <img
                  src={p.url}
                  alt="event"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ex-Servicemen Association. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
