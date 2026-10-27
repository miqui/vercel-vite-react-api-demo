import { afterEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import App from './App'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

test('renders message from /api/hello', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ message: 'Hello, test', time: '2026-01-01T00:00:00.000Z' }),
  })
  vi.stubGlobal('fetch', fetchMock)
  render(<App />)
  expect(await screen.findByText('Hello, test')).toBeTruthy()
  expect(fetchMock).toHaveBeenCalledWith('/api/hello')
})

test('shows error on failure', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
  render(<App />)
  expect(await screen.findByRole('alert')).toBeTruthy()
})
