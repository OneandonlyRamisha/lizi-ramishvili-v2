import { connectDB } from '../lib/mongodb'
import { Schedule } from '../lib/models/Schedule'
import { ScheduleEventData } from './data'
import HomePage from '../components/HomePage'

export default async function Page() {
  let scheduleEvents: ScheduleEventData[] = []

  try {
    await connectDB()
    const raw = await Schedule.find({}).sort({ id: 1 }).lean()
    scheduleEvents = raw.map(e => ({
      id: e.id,
      day: e.day,
      month: e.month,
      year: e.year,
      time: e.time,
      venue: e.venue,
      city: e.city,
      programme: e.programme,
      status: e.status as ScheduleEventData['status'],
      link: e.link,
    }))
  } catch (err) {
    console.error('Failed to fetch schedule from DB:', err)
  }

  return <HomePage scheduleEvents={scheduleEvents} />
}
