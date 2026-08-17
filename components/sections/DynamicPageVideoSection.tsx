import { resolvePageKeyFromPath } from "@/lib/seo/resolve-page";
import { PageVideoSection } from "./PageVideoSection";

export async function DynamicPageVideoSection({ pathname }: { pathname: string }) {
  const pageKey = resolvePageKeyFromPath(pathname);
  if (!pageKey) {
    return null;
  }

  return <PageVideoSection pageKey={pageKey} />;
}
