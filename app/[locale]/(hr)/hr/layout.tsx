import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR Careers",
  robots: { index: false, follow: false },
};

export default function HrRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
