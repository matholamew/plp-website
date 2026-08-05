import { useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT_EMAIL } from '../lib/site'
import CTAButton from '../components/CTAButton'
import Section from '../components/Section'

/*
 * Contact. docs/site-copy.md specifies the contact email but no body copy for
 * this page, so the intro reuses the approved closing-CTA sentence from the
 * Home section rather than inventing a new claim. The former
 * "[X business days]" response-time placeholder was removed (it rendered
 * literally and promises a turnaround nobody has approved).
 *
 * TODO before launch: no backend yet — submit opens the visitor's mail client
 * with a prefilled message (mailto). Replace with a real handler (e.g. a
 * Cloudflare Worker) when ready.
 */

// min-h-11 = 44px touch target (Apple HIG)
// placeholder at full ink-muted (8.45:1) — /60 tint fails WCAG AA at 3.03:1
const inputClasses =
  'w-full rounded-md border border-ink-muted/40 bg-bg px-3 py-2 min-h-11 font-body text-base text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-cta focus:border-cta'

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
      `Consult inquiry from ${form.name}${form.organization ? `, ${form.organization}` : ''}`,
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
    <Section width="xl">
        <h1 className="font-display text-fluid-h1 text-ink leading-tight mb-4">
          Get in touch.
        </h1>
        <p className="font-body text-base sm:text-lg text-ink-muted leading-relaxed mb-10">
          Tell us what you're working on — grade levels, goals, what's
          already in place — and we'll tell you honestly whether we're a fit.
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

          <CTAButton type="submit" size="lg">
            Send Message
          </CTAButton>
        </form>

        <p className="font-body text-sm text-ink-muted mt-8">
          Prefer email? Reach us directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ink underline underline-offset-4 decoration-accent-teal hover:opacity-80 inline-flex items-center min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta rounded"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
    </Section>
  )
}
