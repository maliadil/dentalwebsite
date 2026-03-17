'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { FaShieldAlt, FaStar, FaUserMd } from 'react-icons/fa';

const stats = [
  { icon: <FaUserMd className="text-primary-500" />, value: '20+', label: 'Expert Dentists' },
  { icon: <FaStar className="text-yellow-500" />,    value: '4.9★', label: 'Patient Rating' },
  { icon: <FaShieldAlt className="text-teal-500" />, value: '18k+', label: 'Happy Patients' },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-dental-light via-white to-teal-50 pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary-100/60 blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-teal-100/60 blur-3xl -z-10" />

      <div className="container-max w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Content */}
          <div className="space-y-7 animate-fade-in">
            {/* Badge */}
            <span className="badge bg-primary-50 text-primary-700 border border-primary-100 font-semibold text-xs tracking-wide">
              🏆 #1 Rated Dental Clinic in New York
            </span>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl xl:text-6xl font-heading font-bold text-dental-dark leading-[1.15]"
            >
              Your Perfect{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600">
                Smile
              </span>{' '}
              Starts Here
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              Experience gentle, state-of-the-art dental care for the whole family.
              From routine cleanings to complete smile makeovers — we've got you covered.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/appointment" className="btn-primary gap-2 px-7 py-3.5 text-base shadow-lg shadow-primary-200">
                Book Appointment
                <FiArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-secondary px-7 py-3.5 text-base">
                Our Services
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/68.jpg',
                ].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt="Happy patient"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                <strong className="text-dental-dark">18,000+</strong> patients trust us
              </p>
            </div>
          </div>

          {/* Image / visual */}
          <div className="relative flex justify-center lg:justify-end animate-slide-up">
            <div className="relative w-full max-w-md">
              {/* Main image placeholder – replace with real clinic photo */}
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-teal-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">🦷</div>
                    <p className="text-2xl font-bold font-heading">BrightSmile</p>
                    <p className="text-primary-100 mt-1">Dental Clinic</p>
                  </div>
                </div>
              </div>

              {/* Floating video play button */}
              <button
                className="absolute -left-6 bottom-24 flex items-center gap-3 bg-white rounded-2xl shadow-xl px-4 py-3 group hover:shadow-2xl transition-shadow"
                aria-label="Watch clinic tour"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white group-hover:bg-primary-700 transition-colors">
                  <FiPlay size={16} />
                </span>
                <div className="text-left">
                  <p className="text-xs font-semibold text-dental-dark">Watch Tour</p>
                  <p className="text-[11px] text-gray-400">2 min video</p>
                </div>
              </button>

              {/* Stats card */}
              <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl p-4 space-y-3">
                {stats.map(({ icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <p className="text-sm font-bold text-dental-dark leading-tight">{value}</p>
                      <p className="text-[11px] text-gray-400 leading-tight">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 animate-bounce-slow">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-gray-300" />
        <div className="h-3 w-3 rounded-full border-2 border-gray-300" />
      </div>
    </section>
  );
}
