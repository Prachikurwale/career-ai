import { redirect } from "next/navigation";
import { auth } from "../../auth";
import DashboardClient from "../components/DashboardClient";
import connectDB from "../../lib/db";
import CareerHistory from "../../models/CareerHistory";
import { parseLanguageCode } from "../../lib/i18n";

type DashboardPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

export default async function Page({ searchParams }: DashboardPageProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectDB();

  const savedReports = await CareerHistory.find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .lean();

  const initialReports = JSON.parse(JSON.stringify(savedReports));
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialLanguage =
    parseLanguageCode(resolvedSearchParams?.lang) ??
    initialReports[0]?.language ??
    "english";

  return (
    <main className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 md:p-8">
      <div className="mx-auto max-w-7xl">
        <DashboardClient
          initialReports={initialReports}
          initialLanguage={initialLanguage}
          userName={session.user.name}
        />
      </div>
    </main>
  );
}
