# Goon — AI Stock Predictions for Retail Traders

Stop guessing. Start trading with AI-powered confidence scores.

## What is Goon?

Goon is an AI-driven stock prediction platform built for retail traders. We simplify complex market analysis into a single **0-100% confidence score** so you can make smarter trades without drowning in noise.

### Core Differentiator

While other tools overwhelm you with indicators, Goon gives you one number: **Confidence %**. Our AI analyzes sentiment from Reddit, Twitter, and financial news to generate a simple score:
- **70-100%**: Strong buy signal
- **50-69%**: Moderate buy signal  
- **30-49%**: Weak signal, exercise caution
- **0-29%**: Strong sell signal

## Features

### Free Tier (Free forever)
- 5 stock watchlist
- 3 AI predictions per day
- 7-day prediction history
- Basic sentiment analysis

### Pro Tier ($29/month)
- **Unlimited** watchlist
- **Real-time** AI signals
- **Unlimited** predictions
- 30-day history
- Advanced sentiment analysis
- Email alerts

### Elite Tier ($79/month)
- Everything in Pro, plus:
- **API access** for algorithmic trading
- **Backtesting engine** to validate strategies
- **Custom AI models** tailored to your trading style
- 90-day history
- Priority support
- Webhook alerts

## Tech Stack

### Frontend (Next.js 15)
- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5 with JWT strategy
- **Styling**: Tailwind CSS
- **Charts**: Recharts for prediction visualization
- **Forms**: React Hook Form + Zod validation
- **State**: React Server Components + Client Components

### Backend (Python FastAPI)
- **Framework**: FastAPI for high-performance API
- **AI Engine**: Sentiment analysis from Reddit, Twitter, News
- **Prediction Algorithm**: Ensemble model combining technical + sentiment
- **Database**: PostgreSQL with Prisma ORM

### Infrastructure
- **Database**: PostgreSQL (Neon/DigitalOcean)
- **Payments**: Stripe for subscriptions
- **Deployment**: Vercel (frontend) + Railway (backend)
- **Monitoring**: Sentry for error tracking

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL database
- Stripe account (for payments)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/goon.git
cd goon

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Environment Variables

Create `.env` file in root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/goon"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (optional for development)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Backend API
BACKEND_API_URL="http://localhost:8000"
```

Create `backend/.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/goon"
REDDIT_CLIENT_ID="optional"
REDDIT_CLIENT_SECRET="optional"
TWITTER_BEARER_TOKEN="optional"
NEWS_API_KEY="optional"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### 4. Run Development Servers

```bash
# Terminal 1: Frontend (Next.js)
npm run dev
# Open http://localhost:3000

# Terminal 2: Backend (FastAPI)
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# API docs at http://localhost:8000/docs
```

## Project Structure

```
goon/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth v5
│   │   ├── register/route.ts            # User registration
│   │   ├── watchlist/route.ts          # Watchlist management
│   │   ├── predict/route.ts            # AI predictions
│   │   └── subscribe/route.ts         # Stripe subscriptions
│   ├── dashboard/page.tsx              # Protected dashboard
│   ├── login/page.tsx                  # Login page
│   ├── register/page.tsx               # Registration page
│   ├── pricing/page.tsx                # Pricing tiers
│   └── page.tsx                        # Landing page (existing)
├── components/                         # Reusable UI components
├── prisma/
│   └── schema.prisma                   # Database schema
├── backend/
│   ├── main.py                         # FastAPI application
│   └── requirements.txt                # Python dependencies
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## API Endpoints

### Frontend (Next.js)
- `POST /api/register` - User registration
- `GET/POST/DELETE /api/watchlist` - Watchlist CRUD
- `POST /api/predict` - Generate AI prediction
- `GET /api/predict/recent` - Fetch recent predictions
- `POST /api/subscribe` - Create Stripe subscription

### Backend (FastAPI)
- `POST /predict` - Generate prediction with sentiment analysis
- `GET /sentiment/{symbol}` - Get raw sentiment data
- `GET /historical/{symbol}` - Historical predictions
- `GET /health` - Health check

## Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Backend (Railway)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

### Environment Variables for Production
- Update `NEXTAUTH_URL` to your production domain
- Set `DATABASE_URL` to production PostgreSQL
- Configure Stripe webhooks for production

## Database Schema

### User
- `id`: Unique identifier
- `email`: User's email (unique)
- `password`: Hashed password (bcrypt)
- `tier`: FREE | PRO | ELITE
- `createdAt`: Account creation date

### Watchlist
- `id`: Unique identifier
- `userId`: Foreign key to User
- `symbol`: Stock symbol (e.g., AAPL)
- `addedAt`: When added to watchlist

### Prediction
- `id`: Unique identifier
- `userId`: Foreign key to User
- `symbol`: Stock symbol
- `confidence`: 0-100 integer
- `direction`: UP | DOWN
- `reasoning`: AI explanation
- `sentiment`: BULLISH | BEARISH | NEUTRAL
- `sentimentScore`: -1.0 to 1.0
- `createdAt`: Prediction timestamp

## Cookie-Cutter TODOs (For Future Contributors)

These are simplified TODOs that can be copy-pasted into fresh AI sessions:

### Easy (1-2 hours each)
- [ ] Add password reset flow (use NextAuth email provider)
- [ ] Add stock search autocomplete (use Alpha Vantage API)
- [ ] Add user settings page (notification preferences)
- [ ] Add prediction accuracy tracking (compare to actual returns)
- [ ] Add mobile responsive fixes for dashboard

### Medium (3-5 hours each)
- [ ] Integrate real Reddit API (replace mock sentiment)
- [ ] Integrate real Twitter API (replace mock sentiment)
- [ ] Add Stripe webhook handlers for subscription lifecycle
- [ ] Add email alerts with SendGrid/AWS SES
- [ ] Add prediction history chart (Recharts line chart)

### Hard (1-2 days each)
- [ ] Train custom LSTM model for price prediction
- [ ] Add backtesting engine (Elite tier)
- [ ] Add API rate limiting (Elite tier)
- [ ] Add custom AI model training UI (Elite tier)
- [ ] Add real-time WebSocket updates for Pro/Elite

## Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - feel free to fork and build your own!

## Support

- Twitter: [@goonapp](https://twitter.com/goonapp)
- Email: support@goon.app
- Discord: [Join our community](https://discord.gg/goon)

---

**Built with ❤️ for retail traders who are tired of guessing.**
