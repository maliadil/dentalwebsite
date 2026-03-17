'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

const schema = z.object({
  firstName:   z.string().min(2, 'First name must be at least 2 characters'),
  lastName:    z.string().min(2, 'Last name must be at least 2 characters'),
  email:       z.string().email('Please enter a valid email address'),
  phone:       z.string().min(10, 'Please enter a valid phone number'),
  service:     z.string().min(1, 'Please select a service'),
  date:        z.string().min(1, 'Please select a preferred date'),
  time:        z.string().min(1, 'Please select a preferred time'),
  isNewPatient: z.enum(['yes', 'no']),
  insurance:   z.string().optional(),
  notes:       z.string().max(500, 'Notes must be under 500 characters').optional(),
  consent:     z.literal(true, { errorMap: () => ({ message: 'You must agree to the terms' }) }),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  'General Check-up & Cleaning',
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics / Invisalign',
  'Root Canal Treatment',
  'Cosmetic Dentistry / Veneers',
  'Emergency Dental Care',
  'Other (please specify in notes)',
];

const TIMES = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
];

// Minimum date: tomorrow
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export default function AppointmentForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { isNewPatient: 'yes' },
  });

  async function onSubmit(data: FormData) {
    setStatus('loading');
    try {
      const res = await fetch('/api/appointment', {
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
      <div className="card text-center py-16 border border-green-100">
        <div className="flex justify-center mb-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <FiCheckCircle size={32} className="text-green-600" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-dental-dark mb-3">Appointment Requested!</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Thank you! We'll confirm your appointment within 2 hours via email and phone.
          We look forward to seeing you!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-primary"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="card border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-dental-dark">Schedule Your Visit</h2>
        <p className="text-sm text-gray-400 mt-1">
          All fields marked <span className="text-red-500">*</span> are required.
        </p>
      </div>

      {status === 'error' && (
        <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 p-4 text-sm text-red-700">
          <FiAlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>Something went wrong. Please try again or call us at (555) 123-4567.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              className={`form-input ${errors.firstName ? 'border-red-400 focus:ring-red-200' : ''}`}
              placeholder="Jane"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              className={`form-input ${errors.lastName ? 'border-red-400 focus:ring-red-200' : ''}`}
              placeholder="Smith"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'border-red-400 focus:ring-red-200' : ''}`}
              placeholder="jane@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className={`form-input ${errors.phone ? 'border-red-400 focus:ring-red-200' : ''}`}
              placeholder="(555) 000-0000"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="form-label" htmlFor="service">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            className={`form-input ${errors.service ? 'border-red-400 focus:ring-red-200' : ''}`}
            {...register('service')}
          >
            <option value="">-- Select a service --</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>
          )}
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label" htmlFor="date">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              min={minDate()}
              className={`form-input ${errors.date ? 'border-red-400 focus:ring-red-200' : ''}`}
              {...register('date')}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="time">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <select
              id="time"
              className={`form-input ${errors.time ? 'border-red-400 focus:ring-red-200' : ''}`}
              {...register('time')}
            >
              <option value="">-- Select time --</option>
              {TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.time && (
              <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* New patient + Insurance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              New Patient? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mt-2">
              {(['yes', 'no'] as const).map((val) => (
                <label key={val} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="radio"
                    value={val}
                    className="accent-primary-600"
                    {...register('isNewPatient')}
                  />
                  {val === 'yes' ? 'Yes (new patient)' : 'No (returning)'}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="form-label" htmlFor="insurance">Insurance Provider</label>
            <input
              id="insurance"
              className="form-input"
              placeholder="e.g. BlueCross, Aetna"
              {...register('insurance')}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="form-label" htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            rows={3}
            className={`form-input resize-none ${errors.notes ? 'border-red-400 focus:ring-red-200' : ''}`}
            placeholder="Any concerns, symptoms, or questions for our team…"
            {...register('notes')}
          />
          {errors.notes && (
            <p className="mt-1 text-xs text-red-500">{errors.notes.message}</p>
          )}
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 accent-primary-600"
              {...register('consent')}
            />
            <span className="text-xs text-gray-500 leading-relaxed">
              I agree to BrightSmile's{' '}
              <a href="#" className="text-primary-600 underline">Privacy Policy</a> and{' '}
              <a href="#" className="text-primary-600 underline">Terms of Service</a>. I consent
              to being contacted regarding my appointment via email and phone.
              <span className="text-red-500"> *</span>
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <FiLoader size={18} className="animate-spin" />
              Submitting…
            </>
          ) : (
            'Request Appointment'
          )}
        </button>
      </form>
    </div>
  );
}
