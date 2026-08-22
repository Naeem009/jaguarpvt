import { redirect } from "next/navigation";
import { getHrSession, isHrCmsConfigured } from "@/lib/hr/auth";
import { HrLoginForm } from "@/components/hr/HrLoginForm";

export const dynamic = "force-dynamic";

export default async function HrLoginPage() {
  if (await getHrSession()) {
    redirect("/hr");
  }

  return (
    <main className="flex min-h-dvh items-center bg-paper px-4 py-16">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.06em] text-graphite">Jaguar (Pvt) Ltd.</p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-ink">HR Careers</h1>
          <p className="text-sm leading-relaxed text-graphite">
            Sign in to publish openings. Live roles appear on the Career page until the last date of application.
          </p>
        </div>
        <HrLoginForm configured={isHrCmsConfigured()} />
      </div>
    </main>
  );
}
