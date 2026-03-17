import Link from 'next/link';
import { FiArrowRight, FiPhone } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section className="section-pad" aria-labelledby="cta-heading">
      <div className="container-max">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-teal-700 px-8 py-14 md:px-16 text-center shadow-2xl">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span className="badge bg-white/10 text-white font-semibold text-xs border border-white/20">
              Limited Appointments Available
            </span>

            <h2 id="cta-heading" className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
              Ready for Your Best Smile?
            </h2>

            <p className="text-primary-100 text-base leading-relaxed">
              Book a free consultation today and let our expert team create a personalised
              dental care plan just for you. New patients welcome!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/appointment"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary-700 font-semibold text-sm shadow-lg hover:bg-primary-50 active:scale-95 transition-all"
              >
                Book Free Consultation
                <FiArrowRight size={16} />
              </Link>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/50 text-white font-semibold text-sm hover:bg-white/10 active:scale-95 transition-all"
              >
                <FiPhone size={16} />
                (555) 123-4567
              </a>
            </div>

            <p className="text-primary-200 text-xs">
              No hidden fees · Flexible payment plans · Insurance accepted
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
