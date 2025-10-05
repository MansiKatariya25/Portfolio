import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Basic hardening
app.use(helmet())
app.use(express.json({ limit: '50kb' }))

// CORS
const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true)
      if (allowed.length === 0 || allowed.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
    methods: ['POST', 'OPTIONS'],
  })
)

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000),
  max: Number(process.env.RATE_LIMIT_MAX || 20),
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

// Mail transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false') === 'true',
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
})

app.get('/api/health', async (_req, res) => {
  try {
    await transporter.verify()
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ ok: false, error: 'Mail transport not ready' })
  }
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {}

    const errors = []
    if (!name || String(name).trim().length < 2) errors.push('name')
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRe.test(String(email))) errors.push('email')
    if (!message || String(message).trim().length < 10) errors.push('message')
    if (errors.length) return res.status(400).json({ ok: false, error: 'invalid_fields', fields: errors })

    const to = process.env.CONTACT_TO || 'katariyamansi25@gmail.com'
    const from = process.env.MAIL_FROM || `Portfolio Contact <no-reply@${req.hostname || 'localhost'}>`

    const text = `New portfolio contact\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5">
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
      </div>`

    await transporter.sendMail({
      to,
      from,
      subject: 'New contact form submission',
      text,
      html,
      replyTo: email,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('contact error', err)
    res.status(500).json({ ok: false, error: 'send_failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Contact server running on :${PORT}`)
})

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

