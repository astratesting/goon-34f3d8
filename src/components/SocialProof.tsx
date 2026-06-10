const testimonials = [
  {
    quote: 'Goon built our restaurant a beautiful website in minutes. We\'ve seen a 40% increase in online orders since launch.',
    name: 'Maria Santos',
    role: 'Owner, Casa Maria Kitchen',
  },
  {
    quote: 'I never thought my plumbing business needed a website. Goon changed my mind — and doubled my new customer calls.',
    name: 'James Chen',
    role: 'Owner, Chen Plumbing Co.',
  },
  {
    quote: 'The dashboard makes it so easy to track everything. Best investment we\'ve made for our salon.',
    name: 'Aisha Johnson',
    role: 'Owner, Luxe Hair Studio',
  },
];

const stats = [
  { value: '2,500+', label: 'Sites Built' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '3 min', label: 'Average Build Time' },
  { value: '24/7', label: 'Support' },
];

export default function SocialProof() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Trusted by Local Businesses
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thousands of businesses have gotten online with Goon.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-violet-500 to-coral-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-coral-500 flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
