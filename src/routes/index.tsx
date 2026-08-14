import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/frame/nav";
import { Hero } from "@/components/frame/hero";
import {
  Statement,
  Services,
  Differential,
  Process,
  Work,
  Credibility,
  Faq,
} from "@/components/frame/sections";
import { Solutions } from "@/components/frame/solutions";
import { Contact, Footer } from "@/components/frame/contact";
import { ScrollProgress, Cursor } from "@/components/frame/motion";


const title = "FRAME LABS — Design que transforma atenção em clientes";
const description =
  "Studio de design e experiências digitais. Websites, landing pages e interfaces premium criadas para posicionar marcas com mais força no digital.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "FRAME LABS",
          description,
          url: "/",
          slogan: "Design que transforma atenção em clientes",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Services />
        <Differential />
        <Process />
        <Work />
        <Credibility />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

