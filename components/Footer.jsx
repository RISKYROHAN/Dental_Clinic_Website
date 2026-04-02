export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-heading font-bold text-2xl text-white tracking-tight block mb-2">Digital Clinic</span>
            <p className="text-sm text-slate-500">Premium Dental Care.</p>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Digital Clinic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
