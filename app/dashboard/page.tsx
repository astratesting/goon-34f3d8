"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface WatchlistItem {
  id: string;
  symbol: string;
  addedAt: string;
}

interface Prediction {
  id: string;
  symbol: string;
  confidence: number;
  direction: string;
  reasoning: string;
  sentiment: string;
  sentimentScore: number;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictLoading, setPredictLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchWatchlist();
      fetchPredictions();
    }
  }, [session]);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch("/api/watchlist");
      if (res.ok) {
        const data = await res.json();
        setWatchlist(data);
      }
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
    }
  };

  const fetchPredictions = async () => {
    try {
      const res = await fetch("/api/predict/recent");
      if (res.ok) {
        const data = await res.json();
        setPredictions(data);
      }
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    }
  };

  const addToWatchlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: newSymbol.toUpperCase() }),
      });

      if (res.ok) {
        setNewSymbol("");
        fetchWatchlist();
      }
    } catch (error) {
      console.error("Failed to add to watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    try {
      const res = await fetch(`/api/watchlist?symbol=${symbol}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchWatchlist();
      }
    } catch (error) {
      console.error("Failed to remove from watchlist:", error);
    }
  };

  const getPrediction = async (symbol: string) => {
    setPredictLoading(true);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      });

      if (res.ok) {
        fetchPredictions();
      }
    } catch (error) {
      console.error("Failed to get prediction:", error);
    } finally {
      setPredictLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-green-400";
    if (confidence >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-near-black flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-near-black text-white">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">goon</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{session?.user?.email}</span>
            <span className="px-3 py-1 bg-green-400/10 text-green-400 text-sm rounded-full">
              {session?.user?.tier || "FREE"}
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Watchlist Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Watchlist</h2>

              <form onSubmit={addToWatchlist} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    placeholder="AAPL"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-400 uppercase"
                    maxLength={5}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-400 text-black font-bold rounded-lg hover:bg-green-500 transition disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {watchlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                  >
                    <span className="font-mono font-bold">{item.symbol}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => getPrediction(item.symbol)}
                        disabled={predictLoading}
                        className="text-sm px-3 py-1 bg-green-400/10 text-green-400 rounded hover:bg-green-400/20 transition"
                      >
                        Predict
                      </button>
                      <button
                        onClick={() => removeFromWatchlist(item.symbol)}
                        className="text-sm px-3 py-1 bg-red-400/10 text-red-400 rounded hover:bg-red-400/20 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {watchlist.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No stocks in watchlist</p>
                )}
              </div>
            </div>
          </div>

          {/* Predictions Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">AI Predictions</h2>

              <div className="space-y-4">
                {predictions.map((pred) => (
                  <div key={pred.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{pred.symbol}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(pred.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className={`text-3xl font-bold ${getConfidenceColor(pred.confidence)}`}>
                        {pred.confidence}%
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-400">Direction</p>
                        <p className={`font-bold ${pred.direction === "UP" ? "text-green-400" : "text-red-400"}`}>
                          {pred.direction}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Sentiment</p>
                        <p className="font-bold">
                          {pred.sentiment} ({pred.sentimentScore.toFixed(2)})
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm">{pred.reasoning}</p>
                  </div>
                ))}
                {predictions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No predictions yet. Add stocks to your watchlist and click "Predict".
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
