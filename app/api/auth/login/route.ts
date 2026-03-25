import { NextRequest, NextResponse } from 'next/server'
import { signToken, safeCompare } from '../../../../lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUsername = safeCompare(username ?? '', process.env.USERNAME ?? '')
  const validPassword = safeCompare(password ?? '', process.env.PASSWORD ?? '')

  if (!validUsername || !validPassword) {
    // Small delay to slow brute-force attempts
    await new Promise(r => setTimeout(r, 500))
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = signToken({ role: 'admin' })

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })
  return res
}
