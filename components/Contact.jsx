import { useState } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ShinyText from '../reactbits/ShinyText/ShinyText';
import { CONTACT } from '../data/content';
import { THEME } from '../constants/theme';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', brief: '' });

  const handleChange = e => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id === 'f-name' ? 'name' : id === 'f-email' ? 'email' : 'brief']: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1600);
  };

  return (
    <section id="contact" className="section-pad section-panel">
      <div className="wrap contact-grid">
        <Reveal className="rv-left">
          <SectionHeading pre="Let's work" emphasis="together" stacked />
          <div className="contact-info">
            <p>
              <span className="info-label font-mono">Email</span>
              <a href={`mailto:${CONTACT.email}`} className="info-value-link">
                {CONTACT.email}
              </a>
            </p>
            <p>
              <span className="info-label font-mono">Location</span>
              {CONTACT.location}
            </p>
            <p>
              <span className="info-label font-mono">Availability</span>
              <ShinyText text={CONTACT.availability} color={THEME.inkSoft} shineColor={THEME.brass} speed={2.6} pauseOnHover />
            </p>
          </div>
        </Reveal>

        <Reveal as="form" className="rv-right contact-form" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="f-name" className="field-label font-mono">
              Your name
            </label>
            <input id="f-name" type="text" className="field-input" placeholder="Jane Doe" required value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="f-email" className="field-label font-mono">
              Email address
            </label>
            <input
              id="f-email"
              type="email"
              className="field-input"
              placeholder="jane@studio.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="f-brief" className="field-label font-mono">
              Project brief
            </label>
            <textarea
              id="f-brief"
              rows="4"
              className="field-input field-textarea"
              placeholder="Tell me about your project..."
              required
              value={form.brief}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className={`btn btn-solid contact-submit ${status === 'sent' ? 'is-sent' : ''}`.trim()}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="spinner" />
                &nbsp;&nbsp;Sending...
              </>
            ) : status === 'sent' ? (
              'Message sent'
            ) : (
              'Send message'
            )}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
