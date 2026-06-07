const testimonials = [
  {
    name: "Alex M.",
    role: "Day Trader",
    content: "Goon's confidence score is a game-changer. I finally know when to pull the trigger.",
    tier: "Pro",
  },
  {
    name: "Sarah K.",
    role: "Retail Investor",
    content: "The sentiment analysis saved me from a bad trade. Reddit was screaming sell on AAPL.",
    tier: "Elite",
  },
  {
    name: "Mike R.",
    role: "Swing Trader",
    content: "Simple, clean, effective. No bloat. Just predictions I can act on.",
    tier: "Pro",
  },
];

export default function SocialProof() {
  return (
    <section className="px-6 py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Trusted by Retail Traders</h2>
          <p className="text-xl text-gray-400">
            Join thousands of traders making smarter decisions with Goon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-900 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-black font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-green-400/10 text-green-400 text-xs rounded-full">
                  {testimonial.tier}
                </span>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
