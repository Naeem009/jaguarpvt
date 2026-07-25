"use client";

import dynamic from "next/dynamic";

const AIChatWidget = dynamic(
  () => import("./AIChatWidget").then((module) => module.AIChatWidget),
  { ssr: false },
);

export function AIChatWidgetLazy() {
  return <AIChatWidget mode="floating" />;
}
