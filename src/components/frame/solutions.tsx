import { Reveal, SectionLabel, Stagger, TextReveal } from "./motion";

const WHATSAPP_MESSAGE =
  "Olá, Patrick! Conheci a Frame Labs pelo site e gostaria de conversar sobre um projeto. Tenho interesse em saber mais sobre as soluções de Website, Landing Page, Experiência Digital. 🚀";

const WHATSAPP_URL = `https://w.app/framelabs?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

type Plan = {
  n: string;
  name: string;
  kicker: string;
  price: string;
  desc: string;
  items: string[];
  cta: string;
  badge?: string;
  featured?: boolean;
  combo?: boolean;
};

const plans: Plan[] = [
  {
    n: "01",
    name: "FRAME START",
    kicker: "Landing Page Estratégica",
    price: "R$ 2.497",
    desc: "Uma experiência digital enxuta e estratégica para apresentar uma oferta, serviço ou campanha com clareza e direcionar visitantes para uma ação.",
    items: [
      "Landing Page personalizada",
      "Design responsivo",
      "Microinterações",
      "Integração com WhatsApp",
      "SEO técnico básico",
    ],
    cta: "Quero uma Landing Page",
  },
  {
    n: "02",
    name: "FRAME BUSINESS",
    kicker: "Website Institucional Personalizado",
    price: "R$ 4.497",
    badge: "Mais escolhido",
    featured: true,
    desc: "Um website profissional desenvolvido para fortalecer a presença digital da sua empresa, apresentar seus serviços e transformar visitantes em oportunidades.",
    items: [
      "Website personalizado",
      "Até 6 páginas",
      "UX/UI estratégico",
      "Microinterações e animações leves",
      "SEO técnico básico",
      "Integração com WhatsApp",
    ],
    cta: "Quero um Website",
  },
  {
    n: "03",
    name: "FRAME SIGNATURE",
    kicker: "Website + Landing Page",
    price: "R$ 5.497",
    combo: true,
    desc: "Uma solução digital completa que combina um website institucional personalizado com uma Landing Page estratégica para fortalecer a presença da marca e criar uma estrutura preparada para gerar oportunidades.",
    items: [
      "Website institucional personalizado",
      "Landing Page estratégica",
      "Até 6 páginas no Website",
      "UX/UI personalizado",
      "Microinterações e animações",
      "Integração com WhatsApp",
      "SEO técnico básico",
      "Estrutura pensada para presença + conversão",
    ],
    cta: "Quero a solução completa",
  },
];

function WhatsAppLink({
  children,
  variant = "outline",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "cta label-mono group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden px-5 py-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const look =
    variant === "solid"
      ? "border border-foreground bg-foreground text-background"
      : "border border-hairline text-foreground hover:border-foreground";
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${look} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="cta-arrow relative z-10">
        →
      </span>
    </a>
  );
}

export function Solutions() {
  return (
    <section id="solucoes" className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="03" title="Solutions" />
        </Reveal>
        <h2 className="display-xl mt-8 max-w-[18ch] text-[clamp(2rem,5vw,4rem)]">
          <TextReveal lines={["Três níveis de projeto."]} />
        </h2>
        <Reveal variant="up" delay={140}>
          <p className="mt-6 max-w-[52ch] leading-relaxed text-muted-foreground">
            Escopos definidos para diferentes estágios de marca — do lançamento de uma oferta à
            presença digital completa.
          </p>
        </Reveal>

        <Stagger
          step={110}
          className="mt-14 grid gap-px border border-hairline bg-hairline lg:grid-cols-3"
        >
          {plans.map((p) => (
            <article
              key={p.name}
              data-cursor="card"
              className={`group lift relative flex h-full flex-col p-8 md:p-10 ${
                p.featured ? "bg-secondary/60 hover:bg-secondary" : "bg-background hover:bg-secondary/50"
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-px origin-left bg-accent transition-transform duration-500 ease-out ${
                  p.featured ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <div className="flex items-start justify-between gap-4">
                <span className="label-mono text-muted-foreground">{p.n}</span>
                {p.badge && (
                  <span className="label-mono border border-accent px-2.5 py-1 text-accent">
                    {p.badge}
                  </span>
                )}
                {p.combo && (
                  <span className="label-mono border border-hairline px-2.5 py-1 text-muted-foreground">
                    Website + LP
                  </span>
                )}
              </div>

              <h3 className="mt-8 font-display text-2xl tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                {p.name}
              </h3>
              <p className="label-mono mt-2 text-muted-foreground">{p.kicker}</p>

              {p.combo && (
                <p className="label-mono mt-5 border-y border-hairline py-3 text-foreground/80">
                  Presença <span className="text-accent">+</span> Conversão
                </p>
              )}

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                {p.desc}
              </p>

              <div className="mt-8">
                <span className="label-mono text-muted-foreground">A partir de</span>
                <p className="display-xl mt-1 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none">
                  {p.price}
                </p>
              </div>

              <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-sm text-muted-foreground">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <WhatsAppLink variant={p.featured ? "solid" : "outline"} className="w-full">
                  {p.cta}
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </Stagger>

        <Reveal delay={80}>
          <p className="mt-6 max-w-[70ch] text-xs leading-relaxed text-muted-foreground/80 md:text-sm">
            Cada projeto é único. O investimento final é definido de acordo com o escopo, objetivos e
            necessidades da sua marca.
          </p>
        </Reveal>

        <Reveal variant="clip" delay={120}>
          <div className="mt-16 flex flex-col gap-8 border border-hairline p-8 md:flex-row md:items-end md:justify-between md:p-12">
            <div>
              <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                Não sabe qual solução é ideal para sua empresa?
              </h3>
              <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                Converse diretamente com o fundador da Frame Labs e conte um pouco sobre o seu
                projeto.
              </p>
            </div>
            <WhatsAppLink variant="solid" className="shrink-0">
              Falar com o fundador
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
