import { test } from 'node:test'
import assert from 'node:assert/strict'
import handler from './hello.js'

function mockRes() {
  return {
    code: 0,
    body: null,
    status(c) { this.code = c; return this },
    json(b) { this.body = b; return this },
  }
}

test('returns default greeting and ISO time', () => {
  delete process.env.GREETING
  const res = mockRes()
  handler({}, res)
  assert.equal(res.code, 200)
  assert.equal(res.body.message, 'Hello from the Vercel API')
  assert.equal(res.body.time, new Date(res.body.time).toISOString())
})

test('uses GREETING env var', () => {
  process.env.GREETING = 'Hi there'
  const res = mockRes()
  handler({}, res)
  assert.equal(res.body.message, 'Hi there')
  delete process.env.GREETING
})
