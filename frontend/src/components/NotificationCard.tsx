import { Notification } from '../types'

export default function NotificationCard({ n }: { n: Notification }) {
  const d = new Date(n.date || n.createdAt)
  const isRecent = (Date.now() - d.getTime()) < 7 * 24 * 60 * 60 * 1000 // 7 days
  
  return (
    <div className="card card-hover p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-navy/10 rounded-lg">
            <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            {isRecent && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                New
              </span>
            )}
          </div>
        </div>
      </div>
      <h3 className="font-bold text-lg text-navy mb-2 font-serif">{n.title}</h3>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-4">{n.message}</p>
    </div>
  )
}


