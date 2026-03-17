import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { FaTooth, FaTeeth, FaSyringe } from 'react-icons/fa';
import { GiTooth, GiToothbrush } from 'react-icons/gi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';

const services = [
  {
    icon: <GiToothbrush size={28} />,
    color: 'bg-blue-50 text-primary-600',
    title: 'General Dentistry',
    desc: 'Comprehensive check-ups, cleanings, fillings, and preventive care to maintain your oral health.',
  },
  {
    icon: <FaTeeth size={28} />,
    color: 'bg-yellow-50 text-yellow-600',
    title: 'Teeth Whitening',
    desc: 'Professional-grade whitening treatments that safely brighten your smile by up to 8 shades.',
  },
  {
    icon: <FaSyringe size={28} />,
    color: 'bg-teal-50 text-teal-600',
    title: 'Dental Implants',
    desc: 'Permanent, natural-looking tooth replacements that restore function and confidence.',
  },
  {
    icon: <FaTooth size={28} />,
    color: 'bg-purple-50 text-purple-600',
    title: 'Orthodontics',
    desc: 'Traditional braces and clear aligner options to straighten teeth at any age.',
  },
  {
    icon: <GiTooth size={28} />,
    color: 'bg-red-50 text-red-500',
    title: 'Root Canal',
    desc: 'Pain-free root canal treatments using the latest technology to save infected teeth.',
  },
  {
    icon: <MdOutlineHealthAndSafety size={28} />,
    color: 'bg-green-50 text-green-600',
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, bonding, and smile makeovers tailored to reveal your most beautiful smile.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-pad bg-white" aria-labelledby="services-heading">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-primary-50 text-primary-700 font-semibold text-xs mb-3">
            What We Offer
          </span>
          <h2 id="services-heading" className="section-title">
            Comprehensive Dental Services
          </h2>
          <p className="section-subtitle mx-auto text-center">
            From routine care to complete smile transformations — all under one roof with the
            latest technology and a compassionate team.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, color, title, desc }) => (
            <div
              key={title}
              className="card group cursor-pointer border border-transparent hover:border-primary-100"
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5 ${color} transition-transform group-hover:scale-110`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-dental-dark mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-600 hover:gap-2 transition-all"
              >
                Learn more <FiArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
