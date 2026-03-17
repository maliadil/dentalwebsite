import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiArrowRight, FiAward } from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About Us – Our Story & Team',
  description:
    'Meet the BrightSmile team — award-winning dentists dedicated to exceptional, compassionate care for you and your family since 2005.',
};

const team = [
  {
    name: 'Dr. James Thompson',
    role: 'Lead Dentist & Clinic Director',
    spec: 'Cosmetic & Restorative Dentistry',
    exp: '20 Years',
    edu: 'DDS – Harvard School of Dental Medicine',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    awards: ['Top Dentist NY 2024', 'ADA Excellence Award'],
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'Senior Orthodontist',
    spec: 'Orthodontics & Invisalign',
    exp: '15 Years',
    edu: 'DDS, MS Orthodontics – NYU College of Dentistry',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    awards: ['Best Orthodontist NY 2023', 'AAO Member'],
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Oral Surgeon & Implantologist',
    spec: 'Dental Implants & Oral Surgery',
    exp: '18 Years',
    edu: 'DMD – Columbia University College of Dental Medicine',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    awards: ['AAOMS Fellow', 'Implant Specialist Certification'],
  },
  {
    name: 'Dr. Sarah Williams',
    role: 'Pediatric Dentist',
    spec: 'Pediatric & Family Dentistry',
    exp: '12 Years',
    edu: 'DDS – University of Michigan School of Dentistry',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    awards: ['Best Pediatric Dentist 2022', 'AAPD Member'],
  },
];

const milestones = [
  { year: '2005', event: 'BrightSmile Dental Clinic founded in Manhattan' },
  { year: '2008', event: 'Expanded to a 3,000 sq ft state-of-the-art facility' },
  { year: '2012', event: 'Introduced digital X-ray and 3D CBCT imaging' },
  { year: '2016', event: 'Launched Invisalign & cosmetic dentistry programs' },
  { year: '2019', event: 'Reached 10,000 happy patients milestone' },
  { year: '2022', event: 'Opened second location in Brooklyn' },
  { year: '2024', event: 'Named #1 Dental Clinic in New York' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-dental-light via-white to-teal-50">
        <div className="container-max text-center max-w-3xl">
          <span className="badge bg-primary-50 text-primary-700 font-semibold text-xs mb-4">
            Our Story
          </span>
          <h1 className="section-title text-4xl md:text-5xl">
            Smiles Built on Trust & Expertise
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            For nearly two decades, BrightSmile has been New York's most trusted dental clinic —
            where cutting-edge technology meets genuine, compassionate care.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-pad bg-white">
        <div className="container-max grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-dental-dark">
              A Clinic Built on a Simple Promise
            </h2>
            <p className="text-gray-500 leading-relaxed">
              In 2005, Dr. James Thompson had a vision: to create a dental clinic that patients
              would actually <em>look forward</em> to visiting. He combined his Harvard training,
              passion for technology, and deep belief in patient-centered care to found
              BrightSmile in the heart of Manhattan.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Today, our team of 20+ dental professionals serves over 18,000 patients from
              across New York and beyond. We've invested heavily in the latest technology —
              from 3D imaging to laser dentistry — so you always receive the most precise,
              comfortable care possible.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Our promise hasn't changed: treat every person like family, be honest and
              transparent, and deliver results that genuinely transform lives.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { v: '18k+', l: 'Patients Served' },
                { v: '20+',  l: 'Expert Dentists' },
                { v: '2',    l: 'Clinic Locations' },
                { v: '4.9★', l: 'Average Rating' },
              ].map(({ v, l }) => (
                <div key={l} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">{v}</p>
                  <p className="text-xs text-gray-500 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-dental-dark mb-6">Our Journey</h3>
            {milestones.map(({ year, event }, i) => (
              <div key={year} className="flex gap-4 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                    {year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px h-8 bg-primary-100 mt-1" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-xs font-semibold text-primary-600 mb-0.5">{year}</p>
                  <p className="text-sm text-gray-600">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-pad bg-gray-50/50">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="badge bg-teal-50 text-teal-700 font-semibold text-xs mb-3">
              Our Experts
            </span>
            <h2 className="section-title">Meet Our Dental Team</h2>
            <p className="section-subtitle mx-auto text-center">
              Board-certified, award-winning dentists who are passionate about your smile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, spec, exp, edu, avatar, awards }) => (
              <div key={name} className="card text-center group">
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <Image
                    src={avatar}
                    alt={name}
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
                <h3 className="font-bold text-dental-dark text-sm">{name}</h3>
                <p className="text-xs text-primary-600 font-medium mt-0.5">{role}</p>
                <p className="text-xs text-gray-400 mt-1">{spec}</p>
                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1.5">
                  <div className="flex items-center gap-1.5 justify-center">
                    <FaTooth size={11} className="text-primary-400" />
                    <span className="text-xs text-gray-500">{exp} experience</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-tight">{edu}</p>
                  <div className="flex flex-col gap-1 mt-2">
                    {awards.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 text-[10px] text-yellow-700 bg-yellow-50 rounded-full px-2 py-0.5 justify-center">
                        <FiAward size={9} />
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🤝', title: 'Patient First', desc: 'Every decision we make centers on what is best for our patients — their health, comfort, and happiness.' },
              { emoji: '🔬', title: 'Clinical Excellence', desc: 'We pursue the highest standards of care, continuously updating our skills and technology.' },
              { emoji: '💙', title: 'Genuine Compassion', desc: 'We listen, we care, and we treat every patient with dignity and respect in a welcoming environment.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="text-center p-8 bg-gradient-to-br from-dental-light to-white rounded-2xl border border-blue-50">
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="text-lg font-bold text-dental-dark mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
