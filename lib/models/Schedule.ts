import mongoose, { Schema, model, models } from 'mongoose'

export interface ISchedule {
  _id: mongoose.Types.ObjectId
  id: number
  day: string
  month: string
  year: string
  time: string
  venue: string
  city: string
  programme: string
  status: 'tickets' | 'enquire' | 'sold-out'
  link: string
}

const ScheduleSchema = new Schema<ISchedule>(
  {
    id:        { type: Number, required: true, unique: true },
    day:       { type: String, required: true },
    month:     { type: String, required: true },
    year:      { type: String, required: true },
    time:      { type: String, required: true },
    venue:     { type: String, required: true },
    city:      { type: String, required: true },
    programme: { type: String, required: true },
    status:    { type: String, enum: ['tickets', 'enquire', 'sold-out'], required: true },
    link:      { type: String, default: '#' },
  },
  { collection: 'schedules' }
)

export const Schedule = models.Schedule || model<ISchedule>('Schedule', ScheduleSchema)
