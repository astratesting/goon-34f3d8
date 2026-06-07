const features = [
  {
    title: "0-100% Confidence Score",
    description: "Our AI analyzes sentiment and technicals to give you one simple number. No complex indicators.",
    icon: "🎯",
  },
  {
    title: "Real-Time Sentiment Analysis",
    description: "Track what Reddit, Twitter, and financial news are saying about your stocks.",
    icon: "📊",
  },
  {
    title: "Smart Watchlist",
    description: "Build your watchlist and get instant AI predictions for each stock.",
    icon: "👁️",
  },
  {
    title: "Unlimited Predictions",
    description: "Pro & Elite users get unlimited AI predictions powered by our ensemble models.",
    icon: "⚡",
  },
  {
    title: "Backtesting Engine",
    description: "Elite tier includes backtesting to validate your strategies against historical data.",
    icon: "📈",
  },
  {
    title: "API Access",
    description: "Integrate Goon predictions directly into your algorithmic trading systems.",
    icon: "🔌",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Trade Smarter
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for retail traders who want an edge without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
