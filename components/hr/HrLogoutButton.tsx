"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function HrLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/hr/logout", { method: "POST" });
    router.replace("/hr/login");
    router.refresh();
  }

  return (
    <Button type="button" variant="secondary" size="sm" onClick={logout}>
      Sign out
    </Button>
  );
}
