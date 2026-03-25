/**
 * One-time seed script — inserts the 5 original schedule events into MongoDB.
 * Run with: npx ts-node --project tsconfig.json scripts/seed-schedule.ts
 *
 * Requires DB_URI, USERNAME, PASSWORD in .env.local
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') })

import mongoose from 'mongoose'

const events = [
  { id: 1, day: '14', month: 'APR', year: '2026', time: '19:30', venue: 'Wigmore Hall', city: 'London, United Kingdom', programme: 'Bach · Britten · Shostakovich', status: 'tickets', link: '#' },
  { id: 2, day: '28', month: 'APR', year: '2026', time: '20:00', venue: 'Konzerthaus Berlin', city: 'Berlin, Germany', programme: 'Dvořák — Cello Concerto in B minor', status: 'tickets', link: '#' },
  { id: 3, day: '12', month: 'MAY', year: '2026', time: '19:00', venue: 'Palau de la Música', city: 'Barcelona, Spain', programme: 'Elgar · Brahms — Sonata in E minor', status: 'enquire', link: '#' },
  { id: 4, day: '03', month: 'JUN', year: '2026', time: '18:30', venue: 'Philharmonie de Paris', city: 'Paris, France', programme: 'Saint-Saëns · Debussy · Ravel', status: 'tickets', link: '#' },
  { id: 5, day: '19', month: 'JUL', year: '2026', time: '21:00', venue: 'Tbilisi Concert Hall', city: 'Tbilisi, Georgia', programme: 'Solo Recital — Six Suites for Cello, J.S. Bach', status: 'sold-out', link: '#' },
]

async function seed() {
  await mongoose.connect(process.env.DB_URI!, {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
  })

  const Schedule = mongoose.model('Schedule', new mongoose.Schema({
    id: Number, day: String, month: String, year: String, time: String,
    venue: String, city: String, programme: String, status: String, link: String,
  }, { collection: 'schedules' }))

  for (const ev of events) {
    await Schedule.updateOne({ id: ev.id }, { $set: ev }, { upsert: true })
    console.log(`✓ Upserted event ${ev.id}: ${ev.venue}`)
  }

  await mongoose.disconnect()
  console.log('\nSeed complete.')
}

seed().catch(err => { console.error(err); process.exit(1) })
