import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dental-light via-white to-teal-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🦷</div>
        <h1 className="text-6xl font-bold text-primary-600 mb-2">404</h1>
        <h2 className="text-2xl font-heading font-bold text-dental-dark mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Looks like this page went missing — just like a lost tooth! Let's get you back
          to familiar territory.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary gap-2">
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
          <Link href="/appointment" className="btn-secondary">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
