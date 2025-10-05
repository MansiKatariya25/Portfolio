import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ sending: false, ok: null, error: null, fields: [] })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    // Basic client-side validation mirroring the server
    const invalid = []
    if (!form.name || form.name.trim().length < 2) invalid.push('name')
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email || !emailRe.test(form.email)) invalid.push('email')
    if (!form.message || form.message.trim().length < 10) invalid.push('message')
    if (invalid.length) {
      setStatus({ sending: false, ok: false, error: 'Please correct highlighted fields.', fields: invalid })
      return
    }

    setStatus({ sending: true, ok: null, error: null, fields: [] })
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        const fields = Array.isArray(data.fields) ? data.fields : []
        const msg = data.error === 'invalid_fields' ? 'Please correct highlighted fields.' : 'Request failed'
        setStatus({ sending: false, ok: false, error: msg, fields })
        return
      }
      setStatus({ sending: false, ok: true, error: null, fields: [] })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ sending: false, ok: false, error: 'Could not send. Please try again.', fields: [] })
    }
  }

  return (
    <div className="relative">
      {/* background split with thin lines */}
      <div className="absolute inset-x-0 top-0 h-24 md:h-36 pointer-events-none border-gray-900/70"></div>
      <div className="absolute inset-x-0 top-24 md:top-64 bottom-0 bg-violet-100 border-t border-gray-900/70"></div>

      <div className="relative max-w-2xl mx-auto px-6">
        <div className="mt-[-2rem] md:mt-[-3rem]"></div>
        <div className="bg-white rounded-[22px] border-2 border-gray-900/70 shadow-[6px_6px_0_0_rgba(0,0,0,0.2)] p-6 sm:p-6 md:p-10">
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1 rounded-full border border-gray-700/30 bg-white text-sm font-medium mb-4">
              ✦ CONTACT
            </span>
            <h2 className="roboto-slab text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Got a project in mind?
              <br />
              Let’s get in touch.
            </h2>
          </div>

          <form className="grid gap-8" onSubmit={onSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name</label>
                <input
                  placeholder="Your name *"
                  minLength={2}
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-900/70 focus:border-gray-900 outline-none py-2"
                />
                {status.fields.includes('name') && (
                  <p className="mt-1 text-xs text-red-700">Name must be at least 2 characters.</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email address *"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full bg-transparent border-b-2 border-gray-900/70 focus:border-gray-900 outline-none py-2"
                />
                {status.fields.includes('email') && (
                  <p className="mt-1 text-xs text-red-700">Enter a valid email address.</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Message</label>
              <textarea
                placeholder="Tell me about your project *"
                minLength={10}
                name="message"
                value={form.message}
                onChange={onChange}
                required
                className="w-full bg-transparent border-b-2 border-gray-900/70 focus:border-gray-900 outline-none py-2 min-h-28"
              />
              {status.fields.includes('message') && (
                <p className="mt-1 text-xs text-red-700">Message must be at least 10 characters.</p>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={status.sending}
                className="inline-flex items-center justify-center rounded-xl border-2 border-gray-900 bg-white px-6 py-3 font-semibold shadow-[4px_4px_0_0_#000] hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.sending ? 'Sending…' : 'Submit'}
              </button>
              {status.ok && (
                <p className="mt-3 text-green-700 text-sm">Thanks! Your message has been sent.</p>
              )}
              {status.ok === false && (
                <p className="mt-3 text-red-700 text-sm">{status.error}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
