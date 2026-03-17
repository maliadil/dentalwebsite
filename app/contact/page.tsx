import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with BrightSmile Dental Clinic. Call, email, or visit us in New York. We\'d love to hear from you!',
};

const contactItems = [
  {
    icon:  <FiMapPin size={22} />,
    color: 'bg-primary-50 text-primary-600',
    title: 'Visit Us',
    lines: ['123 Dental Avenue, Suite 200', 'New York, NY 10001'],
    link:  'https://maps.google.com/?q=123+Dental+Avenue+New+York',
    cta:   'Get Directions',
  },
  {
    icon:  <FiPhone size={22} />,
    color: 'bg-teal-50 text-teal-600',
    title: 'Call Us',
    lines: ['(555) 123-4567', 'Emergency: (555) 987-6543'],
    link:  'tel:+15551234567',
    cta:   'Call Now',
  },
  {
    icon:  <FiMail size={22} />,
    color: 'bg-purple-50 text-purple-600',
    title: 'Email Us',
    lines: ['info@brightsmileclinic.com', 'appointments@brightsmileclinic.com'],
    link:  'mailto:info@brightsmileclinic.com',
    cta:   'Send Email',
  },
  {
    icon:  <FiClock size={22} />,
    color: 'bg-orange-50 text-orange-600',
    title: 'Opening Hours',
    lines: ['Mon–Fri: 8 AM – 7 PM', 'Sat: 9 AM – 5 PM | Sun: Closed'],
    link:  null,
    cta:   null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-dental-light via-white to-teal-50">
        <div className="container-max text-center max-w-2xl">
          <span className="badge bg-primary-50 text-primary-700 font-semibold text-xs mb-4">
            Get in Touch
          </span>
          <h1 className="section-title text-4xl md:text-5xl">We'd Love to Hear From You</h1>
          <p className="section-subtitle mx-auto mt-3">
            Have a question about our services, want to book an appointment, or just
            want to say hello? We're here to help!
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactItems.map(({ icon, color, title, lines, link, cta }) => (
              <div key={title} className="card text-center border border-gray-100">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 mx-auto ${color}`}>
                  {icon}
                </span>
                <h3 className="font-semibold text-dental-dark mb-2">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-sm text-gray-500">{l}</p>
                ))}
                {link && cta && (
                  <a
                    href={link}
                    className="inline-block mt-3 text-xs font-semibold text-primary-600 hover:underline"
                    target={link.startsWith('http') ? '_blank' : undefined}
                    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {cta} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-pad bg-gray-50/60">
        <div className="container-max grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-bold text-dental-dark mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Map + social */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-dental-dark mb-4">Find Our Clinic</h2>
              {/* Google Maps embed – works without API key */}
              <div className="rounded-2xl overflow-hidden shadow-card h-72 w-full">
                <iframe
                  title="BrightSmile Dental Clinic Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209148362!2d-73.98731562346266!3d40.75269843440501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Social links */}
            <div className="card border border-gray-100">
              <h3 className="font-semibold text-dental-dark mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: <FaFacebookF />, label: 'Facebook',  color: 'bg-blue-600',  href: '#' },
                  { icon: <FaInstagram />, label: 'Instagram', color: 'bg-pink-600',  href: '#' },
                  { icon: <FaTwitter />,  label: 'Twitter',   color: 'bg-sky-500',   href: '#' },
                ].map(({ icon, label, color, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${color} text-white hover:opacity-90 transition-opacity`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Follow us for oral health tips, before/after transformations, and clinic news.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
