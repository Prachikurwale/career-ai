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
    <main className="h-[calc(100vh-4.75rem)] overflow-hidden bg-[linear-gradient(180deg,#f5e7fa_0%,#efd9f7_45%,#ead0f6_100%)] p-0 dark:bg-[linear-gradient(180deg,#150d1b_0%,#1c1024_48%,#140d1c_100%)]">
      <div className="h-full max-w-none">
        <DashboardClient
          initialReports={initialReports}
          initialLanguage={initialLanguage}
          userName={session.user.name}
          userImage={session.user.image}
          userEmail={session.user.email}
        />
      </div>
    </main>
  );
}
