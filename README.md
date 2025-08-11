# Spice - AI Signal Detection for Brands

Spice is a full-stack TypeScript application that helps consumer brands understand how they're mentioned in AI-generated content across the web. Think of it as "Google Analytics for AI mentions" - tracking brand performance in the new AI-driven discovery landscape.

## 🎯 The Problem & Solution

**The Problem**: Consumer brands are completely blind to how they're being recommended in AI responses.

**Real Example**:
- User asks ChatGPT: "What's the best project management tool?"
- ChatGPT responds: "I'd recommend Asana for teams, Monday.com for visual workflows, or Notion for all-in-one workspace..."
- **Asana has zero visibility this recommendation happened**
- **Monday.com doesn't know they were positioned as "visual"**
- **Notion doesn't know if being called "all-in-one" helps or hurts**

**What Spice Does**:
1. **Input**: Brands submit prompts they care about ("best project management tools")
2. **Search**: Uses web search to find AI-generated responses to these prompts
3. **Analyze**: Uses AI to extract brand mentions, sentiment, positioning, and competitive context
4. **Insights**: Shows brands their "AI visibility score" and how they compare to competitors

## 🚀 Features

- **Market Research Prompts**: Add questions your customers might ask AI assistants
- **AI Content Detection**: Automatically finds and analyzes AI-generated responses
- **Brand Intelligence**: Track mentions, sentiment, positioning, and competitive analysis
- **Real-time Dashboard**: Monitor your AI visibility score and brand performance
- **Competitive Analysis**: See how you rank against competitors in AI recommendations
- **Detailed Insights**: Deep dive into specific analyses with full context

## 🛠 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: SQLite + Prisma ORM
- **AI Analysis**: Mock AI analysis (easily replaceable with OpenAI API)
- **Search**: Mock web search (easily replaceable with Brave Search API)
- **UI Components**: Custom design system with Lucide React icons

## 📊 Database Schema

The application uses a comprehensive schema to track:

- **Prompts**: Market research questions to monitor
- **Search Results**: AI-generated content found across the web
- **Brand Mentions**: Extracted brand references with sentiment and positioning
- **Analyses**: Aggregated insights and competitive rankings

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spice-meridian
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed with sample data**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Dashboard Overview
The dashboard provides a comprehensive view of your brand's AI visibility:

- **Visibility Score**: Percentage of AI responses mentioning your brand
- **Total Prompts**: Number of market research questions being tracked
- **Completed Analyses**: Successfully processed analyses
- **Average Sentiment**: Overall sentiment across all mentions
- **Brand Rankings**: Competitive positioning vs other brands
- **Recent Activity**: Latest actions and updates

### Adding Market Research Prompts
1. Navigate to the "Prompts" page
2. Click "Add New Market Research Prompt"
3. Enter a question your customers might ask AI assistants
4. Optionally add a category for organization
5. Submit to start analysis

### Viewing Analysis Results
1. Go to the "Prompts" page
2. Click "View" on any completed analysis
3. Explore detailed insights including:
   - Brand rankings and positioning
   - Sentiment breakdown
   - Key insights and trends
   - Original AI-generated responses

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="file:./dev.db"

# API Keys (for production)
BRAVE_API_KEY="your-brave-search-api-key"
OPENAI_API_KEY="your-openai-api-key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Replacing Mock Services

The application currently uses mock data for demonstration. To use real services:

1. **Brave Search API**: Replace the mock search in `src/lib/search.ts`
2. **OpenAI API**: Replace the mock analysis in `src/lib/analysis.ts`

## 📈 Sample Data

The application comes pre-loaded with realistic sample data including:

- **4 Market Research Prompts**: CRM, Authentication, Communication, Project Management
- **8 AI-Generated Responses**: From ChatGPT, Claude, Perplexity, and Bard
- **15+ Brand Mentions**: HubSpot, Salesforce, Auth0, Slack, Asana, etc.
- **Complete Analyses**: With rankings, sentiment, and insights

## 🎨 Design System

The application uses a clean, professional design system:

- **Colors**: Orange primary (#f97316), blue accents (#2563eb), gray scale
- **Typography**: Inter font family with clear hierarchy
- **Layout**: 260px sidebar, responsive grid system
- **Components**: Reusable UI components with consistent styling

## 🔄 API Endpoints

### Prompts
- `GET /api/prompts` - List all prompts
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/[id]` - Get specific prompt with analysis
- `DELETE /api/prompts/[id]` - Delete prompt

### Dashboard
- `GET /api/dashboard` - Get aggregated metrics and data

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [✅] Real Brave Search API integration
- [✅] OpenAI API integration for analysis
- [ ] Email notifications for new mentions
- [ ] Advanced filtering and search
- [✅] Export functionality (PDF, CSV)
- [ ] Team collaboration features
- [ ] API rate limiting and caching


flowchart TD
  U[User (Browser)] -->|HTTP fetch| UI[Next.js 14 UI\n(Dashboard • Prompts • Insights)]
  UI <-->|SSE progress| API[/Next.js API Routes/]

  subgraph BE[Backend (TypeScript)]
    API --> ORCH[Job Orchestrator / Worker]
    API --> SVC[Insights Service]
    ORCH --> SRCH[Search Service\n(Brave API)]
    ORCH --> ANAL[Analysis Engine\n(OpenAI)]
    SVC --> PRISMA
    SRCH --> PRISMA
    ANAL --> PRISMA
  end

  subgraph DATA[Data Layer]
    PRISMA[Prisma ORM] <--> DB[(SQLite dev / Postgres prod)]
  end

  subgraph EXT[External APIs]
    BRAVE[Brave Search API]
    OPENAI[OpenAI API]
  end

  SRCH --> BRAVE
  ANAL --> OPENAI

  %% Optional infra
  classDef opt stroke-dasharray: 5 5;
  REDIS[[Redis Cache (opt)]]:::opt
  ORCH -. cache/lookups .-> REDIS
  API -. cache reads .-> REDIS
