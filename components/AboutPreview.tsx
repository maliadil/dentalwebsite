import Link from 'next/link';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const features = [
  'Over 20 years of combined dental expertise',
  'State-of-the-art digital X-ray & 3D imaging',
  'Pain-free procedures with sedation options',
  'Insurance accepted & flexible payment plans',
  'Same-day emergency appointments available',
  'Strict sterilization & safety protocols',
];

export default function AboutPreview() {
  return (
    <section className="section-pad bg-white" aria-labelledby="about-heading">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Visual side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-primary-600 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-7xl mb-4">👨‍⚕️</div>
                  <p className="text-xl font-bold font-heading">Dr. James Thompson</p>
                  <p className="text-teal-100 mt-1 text-sm">Lead Dentist & Clinic Director</p>
                  <p className="text-teal-200 text-xs mt-2">DDS, MS – Harvard School of Dental Medicine</p>
                </div>
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white text-xl font-bold">
                20
              </div>
              <div>
                <p className="font-bold text-dental-dark text-sm">Years</p>
                <p className="text-xs text-gray-400">of Experience</p>
              </div>
            </div>

            {/* Awards badge */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3">
              <p className="text-xs font-semibold text-dental-dark">🏆 Top Dentist Award</p>
              <p className="text-[11px] text-gray-400">New York Magazine 2024</p>
            </div>
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="badge bg-teal-50 text-teal-700 font-semibold text-xs">
              About BrightSmile
            </span>

            <h2 id="about-heading" className="section-title">
              Dental Excellence Rooted in Compassion
            </h2>

            <p className="text-gray-500 leading-relaxed">
              Since 2005, BrightSmile Dental Clinic has been New York's trusted destination
              for comprehensive dental care. Our philosophy is simple: treat every patient
              like family, use the best technology, and never compromise on quality.
            </p>

            <p className="text-gray-500 leading-relaxed">
              Our team of board-certified dentists and specialists are passionate about
              creating beautiful, healthy smiles that last a lifetime.
            </p>

            {/* Features list */}
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <FiCheckCircle size={16} className="text-teal-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-teal inline-flex items-center gap-2">
              Meet Our Team
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
