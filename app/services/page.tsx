import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Dental Services – Complete Care for Every Smile',
  description:
    'Explore BrightSmile\'s full range of dental services: general dentistry, teeth whitening, implants, orthodontics, root canal, and cosmetic dentistry.',
};

const services = [
  {
    id:      'general',
    emoji:   '🦷',
    title:   'General Dentistry',
    tagline: 'Your foundation for lifelong oral health',
    color:   'from-blue-50 to-primary-50',
    accent:  'text-primary-600',
    desc: `General dentistry forms the cornerstone of your oral health. Regular check-ups and
    cleanings prevent problems before they start, saving you time, discomfort, and money.
    Our gentle approach makes routine visits a positive experience for the whole family.`,
    services: [
      'Comprehensive oral exams',
      'Professional teeth cleaning',
      'Digital X-rays (80% less radiation)',
      'Tooth-colored fillings',
      'Dental sealants & fluoride treatment',
      'Gum disease treatment',
      'Tooth extractions',
      'Night guards for bruxism',
    ],
    pricing: 'Check-up & clean from $120',
    duration: '45–60 minutes',
  },
  {
    id:      'whitening',
    emoji:   '✨',
    title:   'Teeth Whitening',
    tagline: 'A brighter smile in one visit',
    color:   'from-yellow-50 to-amber-50',
    accent:  'text-yellow-700',
    desc: `Our professional whitening treatments use medical-grade bleaching agents to safely
    brighten your smile by up to 8 shades in a single session. Unlike over-the-counter products,
    our treatments are customized to your teeth and supervised by our dental team.`,
    services: [
      'In-office Zoom! Whitening (1 hour)',
      'Custom take-home whitening trays',
      'Sensitivity-free whitening formulas',
      'Combined in-office + take-home packages',
      'Whitening for sensitive teeth',
      'Touch-up kits',
    ],
    pricing: 'In-office whitening from $299',
    duration: '60–90 minutes (in-office)',
  },
  {
    id:      'implants',
    emoji:   '🔩',
    title:   'Dental Implants',
    tagline: 'Permanent teeth that look and feel natural',
    color:   'from-teal-50 to-green-50',
    accent:  'text-teal-700',
    desc: `Dental implants are the gold standard for replacing missing teeth. A titanium post
    is surgically placed in your jawbone, providing a permanent anchor for a natural-looking
    crown. Implants look, feel, and function exactly like natural teeth and can last a lifetime.`,
    services: [
      'Single tooth implants',
      'Multiple tooth implants',
      'Full arch implants (All-on-4 / All-on-6)',
      'Implant-supported dentures',
      '3D treatment planning with CBCT scan',
      'Bone grafting when required',
      'Implant crown fabrication',
    ],
    pricing: 'Single implant from $1,800',
    duration: 'Multi-stage: 3–6 months total',
  },
  {
    id:      'orthodontics',
    emoji:   '😁',
    title:   'Orthodontics',
    tagline: 'Straight teeth at any age',
    color:   'from-purple-50 to-indigo-50',
    accent:  'text-purple-700',
    desc: `Whether you're a teenager or an adult, it's never too late to achieve a straight,
    confident smile. We offer both traditional metal braces and clear aligner therapy
    (Invisalign) to suit every lifestyle and budget.`,
    services: [
      'Traditional metal braces',
      'Clear ceramic braces',
      'Invisalign clear aligners (Certified Provider)',
      'Teen Invisalign',
      'Retainers (removable & fixed)',
      'Phase I early treatment for children',
      'Digital smile simulation',
    ],
    pricing: 'Invisalign from $3,200 · Braces from $2,800',
    duration: '12–24 months depending on case',
  },
  {
    id:      'rootcanal',
    emoji:   '💊',
    title:   'Root Canal Treatment',
    tagline: 'Save your tooth. End the pain.',
    color:   'from-red-50 to-rose-50',
    accent:  'text-red-600',
    desc: `Root canals have an undeserved reputation for being painful. With modern techniques
    and anesthesia, the procedure is no more uncomfortable than getting a filling.
    It relieves the pain of an infected tooth and saves it from extraction.`,
    services: [
      'Single-visit root canal treatment',
      'Multi-canal complex cases',
      'Rotary endodontic instruments',
      'Electronic apex locators for precision',
      'Post & core build-up',
      'Same-day dental crowns',
      'Emergency toothache relief',
    ],
    pricing: 'Root canal from $650',
    duration: '60–90 minutes per visit',
  },
  {
    id:      'cosmetic',
    emoji:   '💎',
    title:   'Cosmetic Dentistry',
    tagline: 'Your smile makeover starts here',
    color:   'from-pink-50 to-rose-50',
    accent:  'text-pink-700',
    desc: `Cosmetic dentistry is the art of creating beautiful smiles. From a single veneer to
    a complete smile makeover, our cosmetic team uses the finest materials and masterful
    technique to craft smiles that look stunning and completely natural.`,
    services: [
      'Porcelain veneers',
      'Composite bonding',
      'Smile makeovers',
      'Gum contouring',
      'Crown lengthening',
      'Tooth-colored crowns & bridges',
      'Digital smile design preview',
      'CEREC same-day crowns',
    ],
    pricing: 'Veneers from $950 per tooth',
    duration: 'Varies by treatment plan',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-dental-light via-white to-teal-50">
        <div className="container-max text-center max-w-3xl">
          <span className="badge bg-primary-50 text-primary-700 font-semibold text-xs mb-4">
            Our Services
          </span>
          <h1 className="section-title text-4xl md:text-5xl">
            Complete Dental Care Under One Roof
          </h1>
          <p className="section-subtitle mx-auto mt-4">
            From routine cleanings to full smile transformations — BrightSmile offers
            every dental service your family needs with the expertise you deserve.
          </p>
          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {services.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service sections */}
      {services.map(({ id, emoji, title, tagline, color, accent, desc, services: items, pricing, duration }, i) => (
        <section
          key={id}
          id={id}
          className={`section-pad ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
          aria-labelledby={`service-${id}`}
        >
          <div className="container-max">
            <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
              {/* Card visual */}
              <div className={`lg:[direction:ltr] h-64 md:h-80 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center shadow-inner`}>
                <div className="text-center">
                  <div className="text-8xl mb-4">{emoji}</div>
                  <p className={`font-heading font-bold text-xl ${accent}`}>{title}</p>
                  <p className="text-gray-400 text-sm mt-1">{tagline}</p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:[direction:ltr] space-y-5">
                <div>
                  <span className={`badge bg-white border font-semibold text-xs ${accent}`}>
                    {emoji} {title}
                  </span>
                  <h2 id={`service-${id}`} className="text-2xl md:text-3xl font-bold text-dental-dark mt-3">
                    {tagline}
                  </h2>
                </div>
                <p className="text-gray-500 leading-relaxed">{desc}</p>

                {/* What's included */}
                <div>
                  <p className="font-semibold text-dental-dark text-sm mb-3">What's included:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <FiCheck size={14} className="text-teal-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing + duration chips */}
                <div className="flex flex-wrap gap-3">
                  <span className="badge bg-green-50 text-green-700 border border-green-100">
                    💰 {pricing}
                  </span>
                  <span className="badge bg-blue-50 text-blue-700 border border-blue-100">
                    ⏱ {duration}
                  </span>
                </div>

                <Link href="/appointment" className="btn-primary inline-flex items-center gap-2">
                  Book This Service
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
