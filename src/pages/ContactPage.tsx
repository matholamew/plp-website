import { useState } from 'react'
import type { FormEvent } from 'react'

/*
 * TODO before launch:
 *   - No backend submission yet. Submit currently opens the visitor's mail
 *     client with a prefilled message (mailto). Replace with a real form
 *     handler (e.g. Cloudflare Pages Function / Worker) when ready.
 *   - CONTACT_EMAIL is a placeholder — confirm the real address (matches the
 *     placeholder used in SiteFooter).
 *   - "[X business days]" response-time claim is a placeholder for Debra.
 */
const CONTACT_EMAIL = 'hello@playfullearningpartners.com'

const inputClasses =
  'w-full rounded-md border border-ink-muted/40 bg-bg px-3 py-2 font-body text-base text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-cta focus:border-cta'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    role: '',
    organization: '',
    email: '',
    message: '',
  })

  function update(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Consult inquiry — ${form.name}${form.organization ? `, ${form.organization}` : ''}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Role / Title: ${form.role}`,
        `District or Organization: ${form.organization}`,
        `Email: ${form.email}`,
        '',
        form.message,
      ].join('\n'),
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-4">
          Get in touch.
        </h1>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-10">
          If you are a district administrator, curriculum director, or
          instructional coach exploring whether a Playful Learning Partners
          engagement is a fit for your district, this is the right place to
          start. Fill out the form below and Debra will follow up within
          [X business days] to schedule a consult call.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block font-body text-sm font-medium text-ink mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={update('name')}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block font-body text-sm font-medium text-ink mb-1"
            >
              Role / Title
            </label>
            <input
              id="role"
              type="text"
              autoComplete="organization-title"
              value={form.role}
              onChange={update('role')}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="block font-body text-sm font-medium text-ink mb-1"
            >
              District or Organization
            </label>
            <input
              id="organization"
              type="text"
              autoComplete="organization"
              value={form.organization}
              onChange={update('organization')}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-body text-sm font-medium text-ink mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={update('email')}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-body text-sm font-medium text-ink mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={form.message}
              onChange={update('message')}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            className="inline-block rounded-md bg-cta hover:bg-cta-hover text-navy font-body font-semibold px-7 py-3 text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
          >
            Send Message
          </button>
        </form>

        <p className="font-body text-sm text-ink-muted mt-8">
          Prefer email? Reach Debra directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline underline-offset-4 decoration-accent-teal hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
