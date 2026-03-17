import type { Metadata } from 'next';
import HeroSection      from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import AboutPreview     from '@/components/AboutPreview';
import Testimonials     from '@/components/Testimonials';
import CTASection       from '@/components/CTASection';
import WhyChooseUs      from '@/components/WhyChooseUs';

export const metadata: Metadata = {
  title: 'BrightSmile Dental Clinic – Expert Dental Care in New York',
  description:
    'BrightSmile Dental Clinic offers comprehensive dental care including teeth whitening, implants, orthodontics & cosmetic dentistry. Serving New York since 2005.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <ServicesOverview />
      <AboutPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
