'use client';

import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name:    'Sarah Johnson',
    role:    'Teeth Whitening Patient',
    avatar:  'https://randomuser.me/api/portraits/women/44.jpg',
    rating:  5,
    text:    'I was nervous about whitening, but the team made me feel completely at ease. My teeth are 6 shades whiter and I can\'t stop smiling! The results are absolutely stunning.',
  },
  {
    name:    'Michael Chen',
    role:    'Dental Implant Patient',
    avatar:  'https://randomuser.me/api/portraits/men/32.jpg',
    rating:  5,
    text:    'After losing a tooth in an accident, I was devastated. Dr. Smith gave me a dental implant that looks and feels completely natural. I\'m so grateful for this incredible team.',
  },
  {
    name:    'Emily Rodriguez',
    role:    'Orthodontics Patient',
    avatar:  'https://randomuser.me/api/portraits/women/68.jpg',
    rating:  5,
    text:    'I got Invisalign at 34 and it was the best decision. The whole process was smooth, and my smile transformation in 14 months is jaw-dropping. Highly recommend BrightSmile!',
  },
  {
    name:    'James Williams',
    role:    'General Dentistry Patient',
    avatar:  'https://randomuser.me/api/portraits/men/56.jpg',
    rating:  5,
    text:    'The staff here genuinely care about your wellbeing. I had severe dental anxiety and now I actually look forward to my appointments. They\'ve changed my relationship with dentistry.',
  },
  {
    name:    'Aisha Patel',
    role:    'Cosmetic Dentistry Patient',
    avatar:  'https://randomuser.me/api/portraits/women/24.jpg',
    rating:  5,
    text:    'My veneers look absolutely natural and beautiful. Dr. Thompson is an artist. The whole clinic is modern, clean, and the technology they use is impressive. 10/10!',
  },
  {
    name:    'Robert Davis',
    role:    'Root Canal Patient',
    avatar:  'https://randomuser.me/api/portraits/men/78.jpg',
    rating:  5,
    text:    'Root canal sounds scary, right? Not here. Zero pain during and after. The team was reassuring throughout and explained every step. Saved my tooth and my sanity!',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} size={13} className="text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-pad bg-gradient-to-br from-dental-light via-white to-teal-50" aria-labelledby="testimonials-heading">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-yellow-50 text-yellow-700 font-semibold text-xs mb-3">
            ⭐ Patient Reviews
          </span>
          <h2 id="testimonials-heading" className="section-title">
            What Our Patients Say
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Don't take our word for it — here's what thousands of satisfied patients have to say
            about their experience at BrightSmile.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              { v: '4.9/5', l: 'Google Rating' },
              { v: '18k+', l: 'Happy Patients' },
              { v: '99%', l: 'Recommend Us' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-2xl font-bold text-dental-dark">{v}</p>
                <p className="text-xs text-gray-400 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, rating, text }) => (
            <div key={name} className="card relative">
              <FaQuoteLeft size={24} className="text-primary-100 absolute top-5 right-5" />
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={avatar}
                  alt={name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-primary-100"
                />
                <div>
                  <p className="font-semibold text-dental-dark text-sm">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
              <StarRating count={rating} />
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
