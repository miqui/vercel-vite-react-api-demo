import { useEffect, useState } from 'react'

type Hello = { message: string; time: string }

export default function App() {
  const [data, setData] = useState<Hello | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/hello')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<Hello>
      })
      .then(setData)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <main>
      <h1>{import.meta.env.VITE_APP_NAME ?? 'Vite React API Demo'}</h1>
      {error && <p role="alert">Error: {error}</p>}
      {!error && !data && <p>Loading…</p>}
      {data && (
        <p>
          <span data-testid="message">{data.message}</span> (
          <time>{data.time}</time>)
        </p>
      )}
    </main>
  )
}
