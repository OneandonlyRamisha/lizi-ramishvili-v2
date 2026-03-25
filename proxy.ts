import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    return NextResponse.next()
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    // Valid token — redirect away from login page
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  } catch {
    // Invalid or expired token
    const response = NextResponse.redirect(new URL('/admin/login', req.url))
    response.cookies.delete('admin_token')
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
