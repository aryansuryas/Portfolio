'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send } from 'lucide-react';

const sanitize = (value: string) => value.replace(/<[^>]*>/g, '').trim();

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setError('The contact form is unavailable because its EmailJS settings are missing.');
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: sanitize(form.name),
          from_email: sanitize(form.email),
          message: sanitize(form.message),
        },
        publicKey
      );
      setSubmitted(true);
      setError('');
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section bg-[var(--background)]">
      <div className="content-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="lg:pt-16">
            <h2 className="sec-head mb-8">Get In Touch</h2>
          </div>

          <div className="bg-[var(--paper-panel)] p-10 rounded-3xl border border-[var(--paper-line)]">
            {submitted ? (
              <p className="text-center py-10" role="status">
                Sent!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <input
                  id="contact-name"
                  required
                  placeholder="Name"
                  className="w-full p-4 bg-[var(--background)] border border-[var(--paper-line)] rounded-xl"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 bg-[var(--background)] border border-[var(--paper-line)] rounded-xl"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Message"
                  className="w-full p-4 bg-[var(--background)] border border-[var(--paper-line)] rounded-xl"
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button type="submit" className="button button-primary w-full" disabled={sending}>
                  <Send size={16} /> {sending ? 'Sending...' : 'Send'}
                </button>
                {error && (
                  <p className="text-sm text-[var(--wine)]" role="alert">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
