import type { Metadata } from 'next';
import AppointmentForm from '@/components/AppointmentForm';
import { FiClock, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Schedule your dental appointment at BrightSmile Clinic. Fast, easy online booking with instant confirmation.',
};

const hours = [
  { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM' },
  { day: 'Saturday',        time: '9:00 AM – 5:00 PM' },
  { day: 'Sunday',          time: 'Closed' },
];

const perks = [
  'Free consultation for new patients',
  'Instant email confirmation',
  'Easy rescheduling online',
  'Reminders sent 24 hrs before',
  'All insurances accepted',
];

export default function AppointmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-dental-light via-white to-teal-50">
        <div className="container-max text-center max-w-2xl">
          <span className="badge bg-primary-50 text-primary-700 font-semibold text-xs mb-4">
            Online Booking
          </span>
          <h1 className="section-title text-4xl md:text-5xl">Book Your Appointment</h1>
          <p className="section-subtitle mx-auto mt-3">
            Fill in the form below and our team will confirm your appointment within 2 hours.
            New patients receive a <strong>free consultation</strong>!
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Sidebar info */}
            <div className="space-y-6 order-2 lg:order-1">
              {/* Hours */}
              <div className="card border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <FiClock className="text-primary-600" size={18} />
                  <h2 className="font-semibold text-dental-dark">Opening Hours</h2>
                </div>
                <ul className="space-y-2">
                  {hours.map(({ day, time }) => (
                    <li key={day} className="flex justify-between text-sm">
                      <span className="text-gray-500">{day}</span>
                      <span className={`font-medium ${time === 'Closed' ? 'text-red-500' : 'text-dental-dark'}`}>
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="card border border-gray-100 space-y-3">
                <h2 className="font-semibold text-dental-dark mb-1">Need Help?</h2>
                <a href="tel:+15551234567" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  <FiPhone size={14} className="text-primary-500 shrink-0" />
                  (555) 123-4567
                </a>
                <a href="mailto:info@brightsmileclinic.com" className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  <span className="text-primary-500 text-xs shrink-0">✉</span>
                  info@brightsmileclinic.com
                </a>
                <div className="flex items-start gap-2.5 text-sm text-gray-600">
                  <FiMapPin size={14} className="text-primary-500 mt-0.5 shrink-0" />
                  <span>123 Dental Ave, Suite 200<br />New York, NY 10001</span>
                </div>
              </div>

              {/* Perks */}
              <div className="card border border-primary-100 bg-primary-50">
                <h2 className="font-semibold text-primary-700 mb-3">Why Book Online?</h2>
                <ul className="space-y-2">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-primary-700">
                      <FiCheckCircle size={14} className="mt-0.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
