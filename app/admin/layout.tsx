import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Lizi Ramishvili',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      color: '#f0ece8',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {children}
    </div>
  )
}
