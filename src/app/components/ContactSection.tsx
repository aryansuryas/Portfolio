'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const sanitize = (value: string) => value.replace(/<[^>]*>/g, '').trim();

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot || Date.now() - startedAt < 1200) {
      setSubmitted(true);
      return;
    }

    const name = sanitize(form.name);
    const email = sanitize(form.email);
    const message = sanitize(form.message);
    const lastSubmission = Number(window.localStorage.getItem('last_submission_time') || 0);

    if (Date.now() - lastSubmission < 60_000) {
      setError('Please wait one minute before sending another message.');
      return;
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      setError('Please provide a valid name, email, and message.');
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setError('Contact delivery is not configured. Please email me directly.');
      return;
    }

    setSending(true);
    setError('');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: name, from_email: email, message },
        publicKey
      );
      window.localStorage.setItem('last_submission_time', Date.now().toString());
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setError('Message delivery failed. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="content-shell">
        <div className="section-heading">
          <p className="eyebrow">05 / Let&apos;s Build Something</p>
          <h2>Let&apos;s Build Something</h2>
        </div>
        <div className="contact-layout">
          <div className="contact-copy">
            <p>
              Have a product idea, technical challenge, or opportunity in mind? Send a concise note
              and I&apos;ll get back to you.
            </p>
          </div>
          {submitted ? (
            <div className="contact-success">
              <strong>Message received.</strong>
              <span>Thanks for reaching out. I&apos;ll respond soon.</span>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  maxLength={100}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  maxLength={120}
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  value={form.message}
                  onChange={(event) => update('message', event.target.value)}
                  maxLength={2000}
                  rows={5}
                  required
                />
              </label>
              <button className="button button-primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
              </button>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
