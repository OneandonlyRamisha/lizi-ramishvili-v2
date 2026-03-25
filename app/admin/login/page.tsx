'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Invalid credentials')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>LR Admin</h1>
        <p style={styles.subtitle}>Schedule management</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={styles.input}
              autoComplete="username"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', padding: '2rem',
  },
  card: {
    width: '100%', maxWidth: '380px',
    background: '#1a1a1a', border: '1px solid #2a2a2a',
    padding: '2.5rem', borderRadius: '4px',
  },
  title: {
    fontFamily: 'Georgia, serif', fontSize: '1.8rem',
    fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.25rem',
  },
  subtitle: {
    fontSize: '0.8rem', color: '#888', letterSpacing: '0.15em',
    textTransform: 'uppercase', marginBottom: '2rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888' },
  input: {
    background: '#111', border: '1px solid #333', borderRadius: '3px',
    padding: '0.75rem 1rem', color: '#f0ece8', fontSize: '0.95rem', outline: 'none',
  },
  error: { color: '#e05555', fontSize: '0.82rem', margin: 0 },
  button: {
    background: '#b52a3a', border: 'none', borderRadius: '3px',
    padding: '0.85rem', color: '#fff', fontSize: '0.8rem',
    fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
    cursor: 'pointer', marginTop: '0.5rem',
  },
}
