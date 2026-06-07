from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List
import random
import json
from datetime import datetime, timedelta

app = FastAPI(title="Goon AI Prediction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    symbol: str
    user_tier: str = "FREE"

class SentimentData(BaseModel):
    reddit_score: float
    twitter_score: float
    news_score: float
    overall_sentiment: str
    mention_count: int

class PredictionResponse(BaseModel):
    symbol: str
    confidence: int
    direction: str
    reasoning: str
    sentiment: SentimentData
    historical_accuracy: Optional[float]
    timestamp: str

REDDIT_MENTIONS = {
    "AAPL": 1234, "TSLA": 2345, "NVDA": 1876, "SPY": 987, "QQQ": 654,
    "AMC": 3456, "GME": 2345, "MSFT": 876, "GOOGL": 765, "META": 1098,
}

def get_reddit_sentiment(symbol: str) -> Dict:
    base_sentiment = random.uniform(-0.5, 0.8)
    mention_count = REDDIT_MENTIONS.get(symbol, random.randint(50, 500))

    if mention_count > 2000:
        base_sentiment = min(0.9, base_sentiment + 0.3)

    return {
        "score": round(base_sentiment, 2),
        "mention_count": mention_count,
        "trending": mention_count > 1500,
    }

def get_twitter_sentiment(symbol: str) -> Dict:
    return {
        "score": round(random.uniform(-0.6, 0.7), 2),
        "tweet_volume": random.randint(100, 5000),
        "verified_mentions": random.randint(0, 20),
    }

def get_news_sentiment(symbol: str) -> Dict:
    sentiment = random.uniform(-0.4, 0.6)
    return {
        "score": round(sentiment, 2),
        "article_count": random.randint(5, 50),
        "top_headline_sentiment": random.choice(["POSITIVE", "NEGATIVE", "NEUTRAL"]),
    }

def calculate_confidence(sentiment_data: Dict) -> int:
    reddit_weight = 0.4
    twitter_weight = 0.35
    news_weight = 0.25

    combined_score = (
        sentiment_data["reddit"]["score"] * reddit_weight +
        sentiment_data["twitter"]["score"] * twitter_weight +
        sentiment_data["news"]["score"] * news_weight
    )

    base_confidence = 50 + (combined_score * 40)
    noise = random.uniform(-5, 5)
    confidence = int(max(5, min(95, base_confidence + noise)))

    return confidence

def generate_reasoning(symbol: str, sentiment: Dict, confidence: int) -> str:
    reasons = []

    if sentiment["reddit"]["score"] > 0.3:
        reasons.append(f"Strong positive sentiment on Reddit ({sentiment['reddit']['mention_count']} mentions)")
    elif sentiment["reddit"]["score"] < -0.2:
        reasons.append(f"Negative sentiment trending on Reddit")

    if sentiment["twitter"]["score"] > 0.3:
        reasons.append(f"Twitter buzz is bullish with {sentiment['twitter']['tweet_volume']} tweets")
    elif sentiment["twitter"]["score"] < -0.2:
        reasons.append(f"Twitter sentiment turning negative")

    if sentiment["news"]["score"] > 0.2:
        reasons.append(f"Recent news coverage is positive ({sentiment['news']['article_count']} articles)")

    if confidence > 70:
        reasons.append("Multiple signals aligning for strong conviction")
    elif confidence < 40:
        reasons.append("Mixed signals suggest caution")

    if not reasons:
        reasons.append("Neutral sentiment across sources, monitoring for breakout")

    return ". ".join(reasons) + "."

@app.get("/")
async def root():
    return {
        "service": "Goon AI Prediction API",
        "version": "1.0.0",
        "status": "operational",
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    symbol = request.symbol.upper()

    reddit = get_reddit_sentiment(symbol)
    twitter = get_twitter_sentiment(symbol)
    news = get_news_sentiment(symbol)

    sentiment_data = {
        "reddit": reddit,
        "twitter": twitter,
        "news": news,
    }

    confidence = calculate_confidence(sentiment_data)
    direction = "UP" if confidence > 50 else "DOWN"

    overall_score = (reddit["score"] + twitter["score"] + news["score"]) / 3
    overall_sentiment = (
        "BULLISH" if overall_score > 0.3
        else "BEARISH" if overall_score < -0.3
        else "NEUTRAL"
    )

    reasoning = generate_reasoning(symbol, sentiment_data, confidence)

    historical_accuracy = round(random.uniform(0.55, 0.72), 2)

    return PredictionResponse(
        symbol=symbol,
        confidence=confidence,
        direction=direction,
        reasoning=reasoning,
        sentiment=SentimentData(
            reddit_score=reddit["score"],
            twitter_score=twitter["score"],
            news_score=news["score"],
            overall_sentiment=overall_sentiment,
            mention_count=reddit["mention_count"],
        ),
        historical_accuracy=historical_accuracy,
        timestamp=datetime.utcnow().isoformat(),
    )

@app.get("/sentiment/{symbol}")
async def get_sentiment(symbol: str):
    symbol = symbol.upper()

    return {
        "symbol": symbol,
        "reddit": get_reddit_sentiment(symbol),
        "twitter": get_twitter_sentiment(symbol),
        "news": get_news_sentiment(symbol),
        "timestamp": datetime.utcnow().isoformat(),
    }

@app.get("/historical/{symbol}")
async def get_historical_predictions(symbol: str, days: int = 7):
    symbol = symbol.upper()
    predictions = []

    for i in range(days):
        date = datetime.utcnow() - timedelta(days=i)
        confidence = random.randint(30, 90)
        predictions.append({
            "date": date.date().isoformat(),
            "confidence": confidence,
            "direction": "UP" if confidence > 50 else "DOWN",
            "actual_return": round(random.uniform(-0.05, 0.08), 4),
        })

    return {
        "symbol": symbol,
        "predictions": predictions,
        "accuracy": round(random.uniform(0.5, 0.7), 2),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
