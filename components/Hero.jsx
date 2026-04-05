import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100/50 border border-teal-200 text-teal-700 text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-teal-500 text-teal-500" />
              <span>#1 Rated Digital Clinic</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 leading-tight mb-6">
              Advanced Dental Care <br/>
              <span className="text-teal-600">You Can Trust.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience painless, state-of-the-art dentistry. From routine checkups to cosmetic makeovers, bring your perfect smile to life in our premium digital facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#book" className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-full text-lg font-medium transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/40 hover:-translate-y-1">
                <CalendarDays className="w-5 h-5" />
                Book Your Visit
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <Image 
                src="/hero.png" 
                alt="Modern Digital Clinic" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce hover:animate-none transition-all duration-300">
              <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                <span className="font-heading font-extrabold text-2xl">15+</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Years of</p>
                <p className="text-sm text-slate-500">Excellence</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
