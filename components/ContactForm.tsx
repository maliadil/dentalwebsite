'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email'),
  phone:   z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type FormData = z.infer<typeof schema>;

const SUBJECTS = [
  'General Inquiry',
  'Appointment Request',
  'Billing / Insurance',
  'Feedback / Complaint',
  'Partnership Inquiry',
  'Other',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card text-center py-12 border border-green-100">
        <FiCheckCircle size={40} className="text-green-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-dental-dark mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="btn-primary mt-5 text-sm">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card border border-gray-100 space-y-5">
      {status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-700">
          <FiAlertCircle size={15} className="mt-0.5 shrink-0" />
          Failed to send. Please try again or call us directly.
        </div>
      )}

      <div>
        <label className="form-label" htmlFor="contact-name">Full Name *</label>
        <input id="contact-name" className={`form-input ${errors.name ? 'border-red-400' : ''}`}
          placeholder="Jane Smith" {...register('name')} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="contact-email">Email Address *</label>
          <input id="contact-email" type="email" className={`form-input ${errors.email ? 'border-red-400' : ''}`}
            placeholder="jane@example.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="contact-phone">Phone (optional)</label>
          <input id="contact-phone" type="tel" className="form-input"
            placeholder="(555) 000-0000" {...register('phone')} />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="contact-subject">Subject *</label>
        <select id="contact-subject" className={`form-input ${errors.subject ? 'border-red-400' : ''}`}
          {...register('subject')}>
          <option value="">-- Select a subject --</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          rows={5}
          className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`}
          placeholder="How can we help you?"
          {...register('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {status === 'loading' ? (
          <><FiLoader size={16} className="animate-spin" /> Sending…</>
        ) : 'Send Message'}
      </button>
    </form>
  );
}
