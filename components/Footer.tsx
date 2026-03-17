import Link from 'next/link';
import {
  FaTooth, FaFacebookF, FaTwitter, FaInstagram, FaYoutube,
} from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';

const quickLinks = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About Us' },
  { href: '/services',    label: 'Services' },
  { href: '/appointment', label: 'Book Appointment' },
  { href: '/contact',     label: 'Contact' },
];

const services = [
  'General Dentistry',
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics',
  'Root Canal',
  'Cosmetic Dentistry',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dental-dark text-gray-300" role="contentinfo">
      {/* Main footer */}
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
                <FaTooth size={18} />
              </span>
              <span className="text-xl font-heading font-bold text-white">
                Bright<span className="text-primary-400">Smile</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Delivering compassionate, world-class dental care since 2005. Your smile is our mission.
            </p>
            {/* Social */}
            <div className="flex gap-3 pt-1">
              {[
                { icon: <FaFacebookF size={14} />, label: 'Facebook',  href: '#' },
                { icon: <FaTwitter   size={14} />, label: 'Twitter',   href: '#' },
                { icon: <FaInstagram size={14} />, label: 'Instagram', href: '#' },
                { icon: <FaYoutube   size={14} />, label: 'YouTube',   href: '#' },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-primary-600 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">123 Dental Avenue, Suite 200<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={16} className="text-primary-400 shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-primary-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail size={16} className="text-primary-400 shrink-0" />
                <a href="mailto:info@brightsmileclinic.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@brightsmileclinic.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiClock size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <div className="text-gray-400 text-xs leading-relaxed">
                  Mon–Fri: 8 AM – 7 PM<br />
                  Saturday: 9 AM – 5 PM<br />
                  Sunday: Closed
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} BrightSmile Dental Clinic. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
