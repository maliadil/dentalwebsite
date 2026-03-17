import { FiShield, FiClock, FiDollarSign, FiSmile, FiAward, FiHeart } from 'react-icons/fi';

const reasons = [
  {
    icon: <FiShield size={24} />,
    color: 'text-primary-600 bg-primary-50',
    title: 'Advanced Technology',
    desc: 'Digital X-rays, 3D CBCT scans, and laser dentistry for precise, comfortable treatment.',
  },
  {
    icon: <FiSmile size={24} />,
    color: 'text-teal-600 bg-teal-50',
    title: 'Pain-Free Experience',
    desc: 'Sedation dentistry options and gentle techniques ensure every visit is comfortable.',
  },
  {
    icon: <FiClock size={24} />,
    color: 'text-orange-500 bg-orange-50',
    title: 'Same-Day Appointments',
    desc: 'Dental emergencies handled same day. Extended hours on evenings and weekends.',
  },
  {
    icon: <FiDollarSign size={24} />,
    color: 'text-green-600 bg-green-50',
    title: 'Affordable & Transparent',
    desc: 'Upfront pricing, flexible payment plans, and acceptance of all major insurance plans.',
  },
  {
    icon: <FiAward size={24} />,
    color: 'text-purple-600 bg-purple-50',
    title: 'Award-Winning Care',
    desc: 'Recognized as Top Dental Clinic in New York by multiple health publications.',
  },
  {
    icon: <FiHeart size={24} />,
    color: 'text-red-500 bg-red-50',
    title: 'Family-Friendly',
    desc: 'Welcoming environment for patients of all ages, from toddlers to seniors.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-gray-50/50" aria-labelledby="why-heading">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="badge bg-teal-50 text-teal-700 font-semibold text-xs mb-3">
            Why BrightSmile?
          </span>
          <h2 id="why-heading" className="section-title">
            The BrightSmile Difference
          </h2>
          <p className="section-subtitle mx-auto text-center">
            We combine cutting-edge technology with genuine compassion to deliver an
            unmatched dental experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon, color, title, desc }) => (
            <div key={title} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
                {icon}
              </span>
              <div>
                <h3 className="font-semibold text-dental-dark mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
