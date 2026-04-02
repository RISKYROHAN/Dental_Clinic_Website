import { Phone } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-lg">
              <span className="text-white font-heading font-bold text-xl">DC</span>
            </div>
            <span className="font-heading font-bold text-2xl text-slate-900 tracking-tight">Digital Clinic</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#services" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">Services</Link>
            <Link href="#about" className="text-slate-600 hover:text-teal-600 font-medium transition-colors">About Us</Link>
          </div>
          <div className="flex items-center">
            <a href="#book" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5">
              <Phone className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
