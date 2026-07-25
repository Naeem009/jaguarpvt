"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localeOptions } from "@/lib/navigation/content";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export type ExamplePrompt = {
  question: string;
  answer: string;
};

export type AIChatWidgetProps = {
  mode: "floating" | "embedded";
  context?: string;
  locale?: string;
  title?: string;
  subhead?: string;
  examplePrompts?: ExamplePrompt[];
  className?: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ title: string; href: string }>;
};

const defaultPrompts: ExamplePrompt[] = [
  {
    question: "Can you produce GOTS-certified organic cotton knits at [X] units per month?",
    answer:
      "Based on our published capability data, we support certified organic cotton knits across selected facilities. Capacity varies by season and program — connect with our team for a current availability review.",
  },
  {
    question: "Which of your facilities handle denim finishing and washing?",
    answer:
      "Denim finishing and washing are listed among our denim category capabilities. Specific facility assignments depend on order profile and compliance requirements.",
  },
  {
    question: "What sustainability certifications do you currently hold?",
    answer:
      "Certifications including GOTS, OEKO-TEX, and WRAP appear in our published governance materials. Certification scope varies by facility and product line.",
  },
];

export function AIChatWidget({
  mode,
  context,
  title,
  subhead,
  examplePrompts = defaultPrompts,
  className,
}: AIChatWidgetProps) {
  const t = useTranslations("ai");

  if (mode === "floating") {
    return <FloatingAIChatWidget />;
  }

  return (
    <EmbeddedAIChatTeaser
      context={context}
      title={title ?? t("title")}
      subhead={subhead ?? t("subhead")}
      examplePrompts={examplePrompts}
      className={className}
    />
  );
}

function FloatingAIChatWidget() {
  const t = useTranslations("ai");
  const tCommon = useTranslations("common");
  const siteLocale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [responseLocale, setResponseLocale] = useState<Locale>(siteLocale);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResponseLocale(siteLocale);
  }, [siteLocale]);

  async function sendMessage(text: string) {
    const query = text.trim();
    if (!query || loading) return;

    setMessages((current) => [...current, { role: "user", content: query }]);
    setInput("");
    setLoading(true);
    setLiveMessage(t("preparing"));

    try {
      const response = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          locale: responseLocale,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Assistant request failed");
      }

      const data = (await response.json()) as {
        answer: string;
        citations: Array<{ title: string; href: string }>;
      };

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer, citations: data.citations },
      ]);
      setLiveMessage(data.answer);
    } catch {
      const fallback = t("fallbackError");
      setMessages((current) => [...current, { role: "assistant", content: fallback }]);
      setLiveMessage(fallback);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open ? (
        <div
          ref={panelRef}
          className="fixed end-4 bottom-24 z-50 flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-ink/8 bg-white shadow-[var(--shadow-card-hover)]"
          role="dialog"
          aria-label={t("chatAriaLabel")}
        >
          <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink">{t("panelTitle")}</p>
              <p className="text-xs text-graphite">{t("panelSubtitle")}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t("closeChat")}>
              ✕
            </button>
          </div>

          <label className="border-b border-ink/8 px-4 py-2 text-xs text-graphite">
            {t("responseLanguage")}
            <select
              value={responseLocale}
              onChange={(event) => setResponseLocale(event.target.value as Locale)}
              className="mt-1 block w-full rounded-[var(--radius-card)] border border-ink/10 px-2 py-1 text-sm text-ink"
            >
              {localeOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.nativeLabel}
                </option>
              ))}
            </select>
          </label>

          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.length === 0 ? (
              <p className="text-sm text-graphite">{t("emptyPrompt")}</p>
            ) : null}
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  "rounded-[var(--radius-card)] px-3 py-2 text-sm",
                  message.role === "user" ? "bg-mist text-ink" : "bg-accent-tint text-ink",
                )}
              >
                <p>{message.content}</p>
                {message.citations?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.citations.map((citation) => (
                      <Link
                        key={citation.href}
                        href={citation.href}
                        className="rounded-full bg-white px-2 py-1 text-xs text-accent hover:text-accent-dark"
                      >
                        {citation.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {loading ? <p className="text-sm text-graphite">{liveMessage}</p> : null}
          </div>

          <form
            className="border-t border-ink/8 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(input);
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t("inputPlaceholder")}
              className="mb-3 w-full rounded-[var(--radius-card)] border border-ink/10 px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <div className="flex items-center justify-between gap-3">
              <Link href="/contact" className="text-xs font-medium text-accent hover:text-accent-dark">
                {t("talkToHuman")}
              </Link>
              <Button type="submit" size="sm" disabled={loading || !input.trim()}>
                {tCommon("send")}
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed end-4 bottom-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white shadow-[var(--shadow-card-hover)] hover:bg-accent-dark"
        aria-expanded={open}
      >
        {open ? t("launcherClose") : t("launcherOpen")}
      </button>
    </>
  );
}

function EmbeddedAIChatTeaser({
  context,
  title,
  subhead,
  examplePrompts,
  className,
}: {
  context?: string;
  title: string;
  subhead: string;
  examplePrompts: ExamplePrompt[];
  className?: string;
}) {
  const t = useTranslations("ai");
  const [activePrompt, setActivePrompt] = useState<ExamplePrompt | null>(
    examplePrompts[0] ?? null,
  );

  return (
    <section className={cn("bg-accent-tint py-16 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={title}
          subhead={subhead}
          className="mb-10 md:mb-12"
        />

        <Card className="mx-auto max-w-4xl overflow-hidden p-0">
          <div className="border-b border-ink/8 bg-white px-6 py-4">
            <p className="text-sm font-medium text-ink">{t("panelTitle")}</p>
            {context ? <p className="mt-1 text-sm text-graphite">{context}</p> : null}
          </div>

          <div className="space-y-6 bg-paper px-6 py-8">
            <div className="flex flex-wrap gap-3">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt.question}
                  type="button"
                  onClick={() => setActivePrompt(prompt)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-left text-sm transition-colors",
                    activePrompt?.question === prompt.question
                      ? "border-accent bg-accent-tint text-accent-dark"
                      : "border-ink/10 bg-white text-graphite hover:border-accent hover:text-accent-dark",
                  )}
                >
                  {prompt.question}
                </button>
              ))}
            </div>

            {activePrompt ? (
              <div className="space-y-4 rounded-[var(--radius-card-lg)] border border-ink/8 bg-white p-6">
                <p className="text-sm font-medium text-graphite">{t("youAsked")}</p>
                <p className="text-base text-ink">{activePrompt.question}</p>
                <p className="text-sm font-medium text-graphite">{t("assistant")}</p>
                <p className="text-base leading-relaxed text-ink">{activePrompt.answer}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-graphite">
                    {t("sourceProducts")}
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-graphite">
                    {t("sourceGovernance")}
                  </span>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-4 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-graphite">{t("disclaimer")}</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="secondary" size="sm">
                  {t("talkToHuman")}
                </Button>
                <Link href="/contact" className="text-sm font-medium text-accent hover:text-accent-dark">
                  {t("startConversation")}
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
