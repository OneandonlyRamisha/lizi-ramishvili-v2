import { connectDB } from '../lib/mongodb'
import { Schedule } from '../lib/models/Schedule'
import { ScheduleEventData } from './data'
import HomePage from '../components/HomePage'

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

function eventTimestamp(e: ScheduleEventData): number {
  const m = MONTHS.indexOf(e.month.toUpperCase())
  if (m === -1) return 0
  const [h = '0', min = '0'] = e.time.split(':')
  return new Date(+e.year, m, +e.day, +h, +min).getTime()
}

export default async function Page() {
  let scheduleEvents: ScheduleEventData[] = []

  try {
    await connectDB()
    const raw = await Schedule.find({}).lean()
    const mapped: ScheduleEventData[] = raw.map(e => ({
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
    scheduleEvents = mapped.sort((a, b) => eventTimestamp(a) - eventTimestamp(b))
  } catch (err) {
    console.error('Failed to fetch schedule from DB:', err)
  }

  return <HomePage scheduleEvents={scheduleEvents} />
}
