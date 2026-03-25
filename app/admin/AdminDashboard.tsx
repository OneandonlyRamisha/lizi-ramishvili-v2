'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'tickets' | 'enquire' | 'sold-out'

interface ScheduleEvent {
  _id: string
  id: number
  day: string
  month: string
  year: string
  time: string
  venue: string
  city: string
  programme: string
  status: Status
  link: string
}

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

// Stored fields → "YYYY-MM-DD" (native date input format)
function toDateInput(day: string, month: string, year: string): string {
  const m = MONTHS.indexOf(month.toUpperCase())
  if (m === -1) return ''
  return `${year}-${String(m + 1).padStart(2,'0')}-${day.padStart(2,'0')}`
}

// "YYYY-MM-DD" → { day, month, year } with abbreviated month
function parseDateInput(date: string): { day: string; month: string; year: string } | null {
  if (!date) return null
  const [y, m, d] = date.split('-')
  const monthIndex = parseInt(m, 10)
  if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) return null
  return { day: d, month: MONTHS[monthIndex - 1], year: y }
}

// Every 30-min slot in 24h format
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0')
  const m = i % 2 === 0 ? '00' : '30'
  return `${h}:${m}`
})

const CUSTOM_SENTINEL = '__custom__'

const EMPTY_FORM = {
  date: '', time: '19:00',
  venue: '', city: '', programme: '', status: 'tickets' as Status, link: '#',
}

export default function AdminDashboard({ initialEvents }: { initialEvents: ScheduleEvent[] }) {
  const router = useRouter()
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents)
  const [editing, setEditing] = useState<ScheduleEvent | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [customTime, setCustomTime] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function startEdit(ev: ScheduleEvent) {
    setEditing(ev)
    setAdding(false)
    const isCustom = !TIME_OPTIONS.includes(ev.time)
    setCustomTime(isCustom)
    setForm({
      date: toDateInput(ev.day, ev.month, ev.year),
      time: ev.time,
      venue: ev.venue, city: ev.city, programme: ev.programme,
      status: ev.status, link: ev.link,
    })
    setError('')
  }

  function startAdd() {
    setAdding(true)
    setEditing(null)
    setCustomTime(false)
    setForm(EMPTY_FORM)
    setError('')
  }

  function cancelForm() { setEditing(null); setAdding(false); setCustomTime(false); setError('') }

  function handleTimeSelect(value: string) {
    if (value === CUSTOM_SENTINEL) {
      setCustomTime(true)
      setForm(f => ({ ...f, time: '' }))
    } else {
      setCustomTime(false)
      setForm(f => ({ ...f, time: value }))
    }
  }

  async function handleSave() {
    const parsed = parseDateInput(form.date)
    if (!parsed) {
      setError('Please select a valid date.')
      return
    }
    if (!form.time.trim()) {
      setError('Please enter a time.')
      return
    }
    setLoading(true); setError('')
    const payload = { ...parsed, time: form.time, venue: form.venue, city: form.city, programme: form.programme, status: form.status, link: form.link }
    try {
      if (editing) {
        const res = await fetch(`/api/schedule/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(await res.text())
        const updated: ScheduleEvent = await res.json()
        setEvents(prev => prev.map(e => e._id === updated._id ? { ...updated, _id: updated._id } : e))
      } else {
        const res = await fetch('/api/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(await res.text())
        const created: ScheduleEvent = await res.json()
        setEvents(prev => [...prev, { ...created, _id: created._id.toString() }])
      }
      cancelForm()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error saving')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(ev: ScheduleEvent) {
    if (!confirm(`Delete "${ev.venue}"?`)) return
    setLoading(true)
    try {
      const res = await fetch(`/api/schedule/${ev._id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      setEvents(prev => prev.filter(e => e._id !== ev._id))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error deleting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <header style={s.header}>
        <div>
          <h1 style={s.title}>Schedule</h1>
          <span style={s.subtitle}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={startAdd} style={s.btnPrimary}>+ Add Event</button>
          <button onClick={handleLogout} style={s.btnGhost}>Log out</button>
        </div>
      </header>

      {error && <div style={s.errorBanner}>{error}</div>}

      {/* Form (add or edit) */}
      {(adding || editing) && (
        <div style={s.formCard}>
          <h2 style={s.formTitle}>{adding ? 'Add Event' : 'Edit Event'}</h2>
          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                style={s.input}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Time</label>
              {customTime ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    placeholder="e.g. 21:15"
                    style={{ ...s.input, flex: 1 }}
                  />
                  <button
                    onClick={() => { setCustomTime(false); setForm(f => ({ ...f, time: '19:00' })) }}
                    style={s.btnGhost}
                    title="Back to list"
                  >↩</button>
                </div>
              ) : (
                <select
                  value={form.time}
                  onChange={e => handleTimeSelect(e.target.value)}
                  style={s.input}
                >
                  {TIME_OPTIONS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                  <option value={CUSTOM_SENTINEL}>Custom…</option>
                </select>
              )}
            </div>
          </div>
          <div style={s.grid2}>
            {(['venue', 'city'] as const).map(k => (
              <Field key={k} label={k} value={form[k]} onChange={v => setForm(f => ({ ...f, [k]: v }))} />
            ))}
          </div>
          <Field label="programme" value={form.programme} onChange={v => setForm(f => ({ ...f, programme: v }))} />
          <Field label="link" value={form.link} onChange={v => setForm(f => ({ ...f, link: v }))} />
          <div style={s.field}>
            <label style={s.label}>Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))}
              style={s.input}
            >
              <option value="tickets">Tickets</option>
              <option value="enquire">Enquire</option>
              <option value="sold-out">Sold Out</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button onClick={handleSave} style={s.btnPrimary} disabled={loading}>
              {loading ? 'Saving…' : 'Save'}
            </button>
            <button onClick={cancelForm} style={s.btnGhost}>Cancel</button>
          </div>
        </div>
      )}

      {/* Events table */}
      <div style={s.tableWrap}>
        {events.length === 0 ? (
          <p style={{ color: '#666', padding: '2rem 0' }}>No events. Add one above.</p>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {['Date', 'Time', 'Venue', 'City', 'Programme', 'Status', ''].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev._id} style={s.tr}>
                  <td style={s.td}>{ev.day} {ev.month} {ev.year}</td>
                  <td style={s.td}>{ev.time}</td>
                  <td style={s.td}>{ev.venue}</td>
                  <td style={s.td}>{ev.city}</td>
                  <td style={{ ...s.td, maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.programme}</td>
                  <td style={s.td}>
                    <span style={{ ...s.badge, background: STATUS_COLOR[ev.status] }}>
                      {ev.status}
                    </span>
                  </td>
                  <td style={{ ...s.td, textAlign: 'right' }}>
                    <button onClick={() => startEdit(ev)} style={s.btnSm}>Edit</button>
                    <button onClick={() => handleDelete(ev)} style={{ ...s.btnSm, ...s.btnDanger }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={s.field}>
      <label style={s.label}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} style={s.input} />
    </div>
  )
}

const STATUS_COLOR: Record<Status, string> = {
  tickets: '#1a6b3c',
  enquire: '#7a5c00',
  'sold-out': '#5a1a1a',
}

const s: Record<string, React.CSSProperties> = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' },
  title: { fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, marginBottom: '0.15rem' },
  subtitle: { fontSize: '0.72rem', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase' },
  errorBanner: { background: '#3d0f0f', border: '1px solid #7a2020', color: '#f08080', padding: '0.75rem 1rem', borderRadius: '3px', marginBottom: '1.5rem', fontSize: '0.9rem' },
  formCard: { background: '#1a1a1a', border: '1px solid #2a2a2a', padding: '2rem', borderRadius: '4px', marginBottom: '2.5rem' },
  formTitle: { fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '0.05em' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' },
  label: { fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#777' },
  input: { background: '#111', border: '1px solid #333', borderRadius: '3px', padding: '0.65rem 0.85rem', color: '#f0ece8', fontSize: '0.92rem', outline: 'none' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', padding: '0.6rem 1rem', borderBottom: '1px solid #222' },
  tr: { borderBottom: '1px solid #1e1e1e' },
  td: { padding: '0.85rem 1rem', fontSize: '0.88rem', color: '#ccc' },
  badge: { display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '2px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' },
  btnPrimary: { background: '#b52a3a', border: 'none', borderRadius: '3px', padding: '0.65rem 1.5rem', color: '#fff', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' },
  btnGhost: { background: 'transparent', border: '1px solid #333', borderRadius: '3px', padding: '0.65rem 1.5rem', color: '#aaa', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' },
  btnSm: { background: '#222', border: '1px solid #333', borderRadius: '3px', padding: '0.3rem 0.75rem', color: '#bbb', fontSize: '0.75rem', cursor: 'pointer', marginLeft: '0.4rem' },
  btnDanger: { color: '#e05555', borderColor: '#4a1a1a' },
}
