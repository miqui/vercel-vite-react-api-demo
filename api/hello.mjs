export default function handler(req, res) {
  const greeting = process.env.GREETING || 'Hello from the Vercel API'
  res.status(200).json({ message: greeting, time: new Date().toISOString() })
}
