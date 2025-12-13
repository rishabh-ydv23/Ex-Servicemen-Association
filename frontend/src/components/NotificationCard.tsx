import { Notification } from '../types'

export default function NotificationCard({ n }: { n: Notification }) {
  const d = new Date(n.date || n.createdAt)
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <div className="text-xs text-gray-500">{d.toDateString()}</div>
      <div className="font-semibold text-navy mt-1">{n.title}</div>
      <p className="text-sm mt-2 text-gray-700 whitespace-pre-wrap">{n.message}</p>
    </div>
  )
}


