'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import clsx from 'clsx';

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About' },
  { href: '/services',    label: 'Services' },
  { href: '/appointment', label: 'Appointment' },
  { href: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white/80 backdrop-blur-sm py-4',
      )}
      role="banner"
    >
      <div className="container-max flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="BrightSmile Home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm group-hover:bg-primary-700 transition-colors">
            <FaTooth size={18} />
          </span>
          <span className="text-xl font-heading font-bold text-dental-dark">
            Bright<span className="text-primary-600">Smile</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA + phone */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+15551234567"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            aria-label="Call us"
          >
            <FiPhone size={14} className="text-primary-500" />
            <span className="font-medium">(555) 123-4567</span>
          </a>
          <Link href="/appointment" className="btn-primary text-xs px-5 py-2.5">
            Book Appointment
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
          <nav className="container-max py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                )}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a href="tel:+15551234567" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
                <FiPhone size={14} className="text-primary-500" />
                (555) 123-4567
              </a>
              <Link href="/appointment" className="btn-primary justify-center">
                Book Appointment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
