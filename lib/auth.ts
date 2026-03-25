import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const SECRET = process.env.JWT_SECRET!

if (!SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables')
}

export function signToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' })
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, SECRET)
}

/** Constant-time string comparison — prevents timing attacks */
export function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a)
    const bufB = Buffer.from(b)
    if (bufA.length !== bufB.length) return false
    return crypto.timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}
