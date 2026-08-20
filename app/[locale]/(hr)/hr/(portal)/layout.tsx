import Image from "next/image";
import { redirect } from "next/navigation";
import { getHrSession } from "@/lib/hr/auth";
import { HrLogoutButton } from "@/components/hr/HrLogoutButton";

export const dynamic = "force-dynamic";

export default async function HrPortalLayout({ children }: { children: React.ReactNode }) {
  if (!(await getHrSession())) {
    redirect("/hr/login");
  }

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="border-b border-ink/8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-4">
            <Image src="/logos/logo-dark.svg" alt="Jaguar" width={160} height={40} className="h-10 w-auto" />
            <p className="text-sm font-medium text-graphite">HR Careers</p>
          </div>
          <HrLogoutButton />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">{children}</div>
    </div>
  );
}
