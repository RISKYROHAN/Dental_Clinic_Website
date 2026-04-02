export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-teal-100 flex-shrink-0 flex items-center justify-center border-4 border-teal-50">
            {/* Avatar placeholder if no real image */}
            <span className="text-teal-600 font-heading font-bold text-6xl">Dr. S</span>
          </div>
          <div>
            <div className="mb-2">
              <span className="text-teal-600 font-bold uppercase tracking-wider text-sm">Meet Your Dentist</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 mb-4">Dr. John Smith</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">BDS, MDS (Endodontics)</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">15+ Years Exp.</span>
              <span className="px-3 py-1 bg-teal-50 text-teal-700 border border-teal-100 rounded-lg text-sm font-bold">DCI Reg: A-12345</span>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Dr. Smith is a highly acclaimed specialist dedicated to providing painless and precise digital dentistry. With a patient-first approach, he ensures every treatment is comfortable, transparent, and aesthetically perfect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
