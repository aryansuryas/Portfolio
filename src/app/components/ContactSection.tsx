'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';

const sanitize = (value: string) => value.replace(/<[^>]*>/g, '').trim();

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-brand-icon">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.01c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.57c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-brand-icon">
      <path
        fill="currentColor"
        d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9h3.6v11.5H3.4V9Zm5.7 0h3.4v1.57h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.38h-3.6v-5.66c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99v5.76H9.1V9Z"
      />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-brand-icon">
      <path fill="#ea4335" d="M3 5.5 12 12l9-6.5V19h-3V9.35l-6 4.34-6-4.34V19H3V5.5Z" />
      <path fill="#4285f4" d="M3 5.5 6 7.67V19H3V5.5Z" />
      <path fill="#34a853" d="M18 9.35 21 7.19V19h-3V9.35Z" />
      <path fill="#fbbc05" d="m3 5.5 3 2.17L12 12l-3-2.17L3 5.5Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-brand-icon">
      <path
        fill="currentColor"
        d="M21.58 7.19a2.99 2.99 0 0 0-2.1-2.12C17.63 4.55 12 4.55 12 4.55s-5.63 0-7.48.52a2.99 2.99 0 0 0-2.1 2.12A31.1 31.1 0 0 0 1.9 12a31.1 31.1 0 0 0 .52 4.81 2.99 2.99 0 0 0 2.1 2.12c1.85.52 7.48.52 7.48.52s5.63 0 7.48-.52a2.99 2.99 0 0 0 2.1-2.12A31.1 31.1 0 0 0 22.1 12a31.1 31.1 0 0 0-.52-4.81ZM10.1 15.3V8.7l5.7 3.3-5.7 3.3Z"
      />
    </svg>
  );
}

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: sanitize(form.name),
          from_email: sanitize(form.email),
          message: sanitize(form.message),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
    } catch {
      setError('Failed');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section bg-[var(--background)]">
      <div className="content-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="sec-head mb-8">Get In Touch</h2>
            <div className="contact-social-links">
              <a
                href="https://github.com/aryansuryas"
                className="contact-social-link contact-social-github"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com/aryansuryas"
                className="contact-social-link contact-social-linkedin"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:aryansurya752006@gmail.com"
                className="contact-social-link contact-social-email"
                aria-label="Email Aryan Surya"
              >
                <GmailIcon />
              </a>
              <a
                href="https://www.youtube.com/@aryansuryas"
                className="contact-social-link contact-social-youtube"
                target="_blank"
                rel="noreferrer"
                aria-label="Aryan Surya on YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div className="bg-[var(--paper-panel)] p-10 rounded-3xl border border-[var(--paper-line)]">
            {submitted ? (
              <div className="text-center py-10">Sent!</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  required
                  placeholder="Name"
                  className="w-full p-4 bg-[var(--background)] border border-[var(--paper-line)] rounded-xl"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 bg-[var(--background)] border border-[var(--paper-line)] rounded-xl"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Message"
                  className="w-full p-4 bg-[var(--background)] border border-[var(--paper-line)] rounded-xl"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button type="submit" className="button button-primary w-full">
                  <Send size={16} /> Send
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
