import { Globe, Zap, Search, Shield, BarChart3, Paintbrush } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Lead Discovery',
    description: 'We find local businesses that don\'t have a website yet and identify the best opportunities.',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description: 'Professional websites are generated in seconds using smart templates tailored to each business.',
  },
  {
    icon: Globe,
    title: 'One-Click Deploy',
    description: 'Sites go live instantly with custom domains, SSL certificates, and fast hosting included.',
  },
  {
    icon: Paintbrush,
    title: 'Custom Branding',
    description: 'Each site is customized with the business\'s brand colors, logo, and content automatically.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track visits, leads, and conversions with a simple dashboard built for business owners.',
  },
  {
    icon: Shield,
    title: 'Managed Hosting',
    description: 'We handle all the technical stuff — hosting, updates, security, and performance optimization.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From finding leads to deploying live sites, Goon handles the entire process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                <feature.icon className="text-violet-400" size={24} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
