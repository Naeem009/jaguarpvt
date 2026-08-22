"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function HrLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const submitted = String(new FormData(event.currentTarget).get("password") ?? password);

    try {
      const response = await fetch("/api/hr/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: submitted }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to sign in.");
      }
      router.replace("/hr");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in.");
      setSubmitting(false);
    }
  }

  if (!configured) {
    return (
      <p className="text-sm leading-relaxed text-graphite">
        The HR portal is locked until <code className="font-mono">HR_CMS_PASSWORD</code> and{" "}
        <code className="font-mono">HR_CMS_SECRET</code> are set in Vercel (Production), then redeployed.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error ? <p className="text-sm text-error">{error}</p> : null}
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
