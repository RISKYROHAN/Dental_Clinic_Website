import { Activity, Sparkles, Smile, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: "Root Canal Treatment",
    description: "Painless and precise endodontic therapy to save your natural teeth.",
    icon: Activity,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Clear Aligners",
    description: "Invisible, comfortable aligners to perfectly straighten your teeth.",
    icon: Smile,
    color: "bg-teal-100 text-teal-600"
  },
  {
    title: "Teeth Whitening",
    description: "Advanced laser whitening for a bright, confident smile in one visit.",
    icon: Sparkles,
    color: "bg-amber-100 text-amber-600"
  },
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking replacements for missing teeth.",
    icon: ShieldCheck,
    color: "bg-indigo-100 text-indigo-600"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-4xl text-slate-900 mb-4">Our Premium Services</h2>
          <p className="text-slate-600 text-lg">Comprehensive dental care tailored to your unique needs using the latest digital technology.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-teal-100 hover:-translate-y-2 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl ${svc.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{svc.title}</h3>
                <p className="text-slate-600 leading-relaxed">{svc.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
