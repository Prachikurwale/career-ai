#Dream Route guider

AI-powered career counseling platform for Indian students built with Next.js, Auth.js, MongoDB, and NVIDIA Llama.

## Folder Structure

```text
app/
  api/auth/[...nextauth]/route.ts
  components/
    CareerChatbot.tsx
    DashboardClient.tsx
    LoadingScreen.tsx
    PathSelector.tsx
    ReportViewer.tsx
    StepCard.tsx
  dashboard/page.tsx
  data/careers.ts
actions/
  career-ai.ts
lib/
  db.ts
  rate-limit.ts
models/
  CareerHistory.ts
  User.ts
types/
  career.ts
```

## Features

- Interactive drill-down flow from level to path to specialization
- AI master report engine with structured JSON output
- Google authentication with protected dashboard
- MongoDB storage for users and saved career reports
- Sidebar dashboard with saved report history
- AI chatbot for follow-up career questions
- Basic in-memory rate limiting for chat and report generation
- Print-friendly PDF export via browser print flow

## Environment Setup

Copy `.env.example` values into `.env.local`:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
AUTH_SECRET=
MONGODB_URI=
NVIDIA_API_KEY=
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Implementation Flow

1. User lands on the marketing page and signs in with Google.
2. Protected `/dashboard` loads saved reports from MongoDB.
3. Student selects level, path, and specialization in the drill-down UI.
4. Final selection calls `generateCareerReport` in `actions/career-ai.ts`.
5. NVIDIA Llama returns structured JSON for the AI report.
6. Student can save the report to the `career_history` collection.
7. Student can revisit saved reports or ask the chatbot follow-up questions.

## Deployment Notes

- Deploy on Vercel.
- Add all environment variables in the Vercel project settings.
- Set the Google OAuth callback URL to your Vercel domain plus `/api/auth/callback/google`.
- MongoDB Atlas should whitelist your deployment IP policy appropriately.

## Suggested Next Upgrades

- Replace in-memory rate limiting with Upstash Redis or a database-backed limiter.
- Add true PDF generation with `@react-pdf/renderer` or server-side PDF export.
- Add report search and filtering in the sidebar.
- Add analytics for most-selected streams and report generation success rate.
