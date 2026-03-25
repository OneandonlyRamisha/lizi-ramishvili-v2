import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '../../../lib/mongodb'
import { Schedule } from '../../../lib/models/Schedule'
import { verifyToken } from '../../../lib/auth'
import { cookies } from 'next/headers'

// GET /api/schedule — public
export async function GET() {
  await connectDB()
  const events = await Schedule.find({}).sort({ id: 1 }).lean()
  return NextResponse.json(events)
}

// POST /api/schedule — admin only
export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    verifyToken(token)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const body = await req.json()

  // Auto-assign next id
  const last = await Schedule.findOne().sort({ id: -1 }).lean()
  const nextId = last ? (last.id as number) + 1 : 1

  const event = await Schedule.create({ ...body, id: nextId })
  return NextResponse.json(event, { status: 201 })
}
