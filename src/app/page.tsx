import HomePageSections from "@/components/ui/home-page-sections";
import { siteUrl } from "@/lib/site-url";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ApnaNotes",
    url: siteUrl,
    description:
      "ApnaNotes helps students organize notes, revise faster, and get guidance through Senior Connect.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageSections />
    </>
  );
}
