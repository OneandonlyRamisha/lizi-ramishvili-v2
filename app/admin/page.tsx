import { connectDB } from '../../lib/mongodb'
import { Schedule, ISchedule } from '../../lib/models/Schedule'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  await connectDB()
  const events = await Schedule.find({}).sort({ id: 1 }).lean()

  // Serialize for client component
  const serialized = events.map(e => ({
    _id: (e._id as object).toString(),
    id: e.id,
    day: e.day,
    month: e.month,
    year: e.year,
    time: e.time,
    venue: e.venue,
    city: e.city,
    programme: e.programme,
    status: e.status as ISchedule['status'],
    link: e.link,
  }))

  return <AdminDashboard initialEvents={serialized} />
}
