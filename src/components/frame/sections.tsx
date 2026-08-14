import { useState } from "react";
import { Reveal, SectionLabel, Stagger, TextReveal, useSectionProgress } from "./motion";
import logoWhite from "@/assets/logo-white.png.asset.json";
import symbol from "@/assets/symbol.png.asset.json";

const services = [
  {
    n: "01",
    title: "Websites",
    text: "Sites institucionais premium criados para transformar a presença digital da sua empresa em uma experiência de marca.",
  },
  {
    n: "02",
    title: "Landing Pages",
    text: "Páginas estratégicas desenvolvidas para apresentar, convencer e converter.",
  },
  {
    n: "03",
    title: "Experiências Digitais",
    text: "Interfaces e experiências interativas pensadas para criar diferenciação e percepção de valor.",
  },
  {
    n: "04",
    title: "UI/UX Design",
    text: "Design de interfaces com foco em clareza, estética, usabilidade e experiência.",
  },
];

const process = [
  { n: "01", title: "Discover", text: "Entendemos a marca, negócio, público e objetivo." },
  { n: "02", title: "Strategy", text: "Definimos estrutura, posicionamento e experiência." },
  {
    n: "03",
    title: "Design",
    text: "Transformamos estratégia em uma interface visualmente poderosa.",
  },
  { n: "04", title: "Build", text: "Desenvolvemos, refinamos e entregamos a experiência final." },
];

const faqs = [
  {
    q: "Quanto custa um projeto?",
    a: "O investimento varia conforme escopo, número de páginas, nível de interação e prazo. Após entender o projeto, enviamos uma proposta com escopo e valor fechados.",
  },
  {
    q: "Quanto tempo leva para desenvolver um site?",
    a: "Depende da complexidade. Landing pages normalmente ocupam um ciclo curto; sites institucionais e experiências interativas exigem etapas adicionais de estratégia e design. O cronograma é definido antes do início.",
  },
  {
    q: "A FRAME LABS trabalha com empresas de qualquer segmento?",
    a: "Sim. O método é o mesmo: entender o negócio, definir posicionamento e traduzir isso em interface. O segmento muda o conteúdo, não o rigor do processo.",
  },
  {
    q: "Vocês criam apenas o design ou também desenvolvem o site?",
    a: "Os dois. Design e desenvolvimento acontecem dentro do mesmo processo, o que evita perdas entre a intenção do design e o resultado final em tela.",
  },
  {
    q: "Como funciona o início de um projeto?",
    a: "Você envia o formulário com o contexto do projeto. Retornamos com uma conversa de alinhamento e, em seguida, escopo, cronograma e proposta.",
  },
];

export function Statement() {
  return (
    <section className="border-t border-hairline py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="01" title="Positioning" />
        </Reveal>
        <h2 className="display-xl mt-10 max-w-[18ch] text-[clamp(2rem,5.5vw,4.5rem)]">
          <TextReveal
            lines={["Sua presença digital", "deveria fazer mais", "do que existir."]}
            step={110}
          />
        </h2>
        <Reveal variant="up" delay={160}>
          <p className="mt-10 max-w-[46ch] text-lg leading-relaxed text-muted-foreground md:ml-auto md:mt-16 md:text-xl">
            Ela deveria posicionar sua marca, comunicar seu valor e transformar atenção em
            oportunidade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="02" title="Services" />
        </Reveal>
        <h2 className="display-xl mt-8 text-[clamp(2rem,5vw,4rem)]">
          <TextReveal lines={["O que construímos."]} />
        </h2>

        <Stagger
          step={110}
          className="mt-16 grid gap-px border border-hairline bg-hairline sm:grid-cols-2"
        >
          {services.map((s) => (
            <article
              key={s.n}
              data-cursor="card"
              className="group lift relative h-full bg-background p-8 hover:bg-foreground hover:text-background md:p-12"
            >
              <span className="label-mono inline-block text-muted-foreground transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:text-background/60">
                {s.n}
              </span>
              <h3 className="mt-8 font-display text-2xl tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 md:text-3xl">
                {s.title}
              </h3>
              <span
                aria-hidden
                className="mt-5 block h-px w-full origin-left scale-x-0 bg-current opacity-30 transition-transform duration-400 ease-out group-hover:scale-x-100"
              />
              <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-background/70 md:text-base">
                {s.text}
              </p>
              <span
                aria-hidden
                className="absolute right-8 top-8 h-4 w-4 border-r border-t border-hairline transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-accent"
              />
              <span
                aria-hidden
                className="label-mono absolute bottom-8 right-8 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Differential() {
  const pillars = ["Estratégia", "Design", "Tecnologia", "Experiência"];
  return (
    <section className="dark border-t border-hairline bg-background py-24 text-foreground md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="03" title="Difference" />
        </Reveal>
        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="display-xl text-[clamp(2rem,5vw,4rem)]">
              <TextReveal lines={["Não criamos apenas páginas."]} />
              <span className="mt-3 block text-accent">
                <TextReveal lines={["Criamos percepção."]} delay={120} />
              </span>
            </h2>
            <Reveal delay={220}>
              <p className="mt-8 max-w-[48ch] leading-relaxed text-muted-foreground">
                Cada decisão de interface é uma decisão de negócio. A estrutura da página, o ritmo
                tipográfico, o tempo de uma transição — tudo isso define como sua marca é lida antes
                de qualquer texto ser lido.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            {/* system being assembled: cells snap into the grid one after another */}
            <Stagger step={120} className="grid grid-cols-2 gap-px border border-hairline bg-hairline">
              {pillars.map((p, i) => (
                <div
                  key={p}
                  className="group lift relative flex aspect-square flex-col justify-between overflow-hidden bg-background p-5"
                >
                  <span className="label-mono text-muted-foreground">0{i + 1}</span>
                  <span className="font-display text-lg tracking-tight transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent md:text-xl">
                    {p}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-x-100"
                  />
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  // map the section's travel to an active stage
  const eased = Math.min(1, Math.max(0, (progress - 0.18) / 0.55));
  const active = Math.min(process.length - 1, Math.floor(eased * process.length));

  return (
    <section id="processo" className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="04" title="Process" />
        </Reveal>
        <h2 className="display-xl mt-8 max-w-[16ch] text-[clamp(2rem,5vw,4rem)]">
          <TextReveal lines={["Do primeiro frame", "ao lançamento."]} />
        </h2>

        <div ref={ref} className="relative mt-16">
          {/* progress rail */}
          <span aria-hidden className="absolute left-0 top-0 hidden h-full w-px bg-hairline md:block" />
          <span
            aria-hidden
            className="absolute left-0 top-0 hidden w-px origin-top bg-accent transition-transform duration-200 ease-out md:block"
            style={{ height: "100%", transform: `scaleY(${eased.toFixed(3)})` }}
          />

          {process.map((p, i) => {
            const isActive = i === active;
            return (
              <Reveal key={p.n} variant="clip" delay={i * 60}>
                <div
                  data-active={isActive}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-t border-hairline py-8 transition-colors duration-300 last:border-b hover:bg-secondary/60 data-[active=true]:bg-secondary/40 md:grid-cols-12 md:gap-8 md:py-10 md:pl-8"
                >
                  <span className="display-xl text-[clamp(2rem,6vw,4.5rem)] text-muted-foreground/40 transition-colors duration-400 group-hover:text-foreground group-data-[active=true]:text-foreground md:col-span-3">
                    {p.n}
                  </span>
                  <h3 className="font-display text-xl tracking-tight transition-transform duration-400 group-data-[active=true]:translate-x-1 md:col-span-3 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="col-span-2 max-w-[46ch] text-sm leading-relaxed text-muted-foreground transition-opacity duration-400 group-data-[active=true]:text-foreground/80 md:col-span-6 md:col-start-7 md:text-base">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    tag: "Concept Project",
    title: "Atlas Capital",
    cat: "Website Institucional",
    text: "Estrutura editorial e hierarquia tipográfica para um posicionamento de autoridade.",
  },
  {
    tag: "Concept Project",
    title: "Nord Studio",
    cat: "Landing Page",
    text: "Página única construída em torno de um único objetivo de conversão.",
  },
  {
    tag: "Concept Project",
    title: "Vector Health",
    cat: "UI/UX Design",
    text: "Sistema de interface com foco em clareza, densidade de informação e leitura rápida.",
  },
];

export function Work() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const symbolShift = ((progress - 0.5) * 26).toFixed(2);

  return (
    <section id="projetos" className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="05" title="Selected Work" />
        </Reveal>
        <h2 className="display-xl mt-8 text-[clamp(2rem,5vw,4rem)]">
          <TextReveal lines={["Projetos que falam por nós."]} />
        </h2>

        {/* Main case: FRAME LABS — elements enter slightly off-grid, then align */}
        <div ref={ref}>
          <Reveal variant="frame" delay={80}>
            <article className="group mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-12">
              <div className="dark relative flex min-h-[320px] items-center justify-center overflow-hidden bg-background p-10 md:col-span-7 md:min-h-[460px]">
                <img
                  src={logoWhite.url}
                  alt="Identidade FRAME LABS aplicada em fundo escuro"
                  loading="lazy"
                  className="w-[70%] max-w-[420px] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute left-6 top-6 h-6 w-6 border-l border-t border-white/30 transition-all duration-500 ease-out group-hover:left-4 group-hover:top-4 group-hover:h-8 group-hover:w-8 group-hover:border-accent"
                />
                <span
                  aria-hidden
                  className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-white/30 transition-all duration-500 ease-out group-hover:bottom-4 group-hover:right-4 group-hover:h-8 group-hover:w-8 group-hover:border-accent"
                />
              </div>
              <div className="flex flex-col justify-between bg-background p-8 md:col-span-5 md:p-12">
                <div>
                  <span className="label-mono text-accent">Main Case</span>
                  <h3 className="mt-6 font-display text-3xl tracking-tight transition-transform duration-400 group-hover:translate-x-1 md:text-4xl">
                    FRAME LABS
                  </h3>
                  <p className="label-mono mt-3 text-muted-foreground">
                    Brand Identity / Digital Experience
                  </p>
                  <p className="mt-6 max-w-[42ch] text-sm leading-relaxed text-muted-foreground md:text-base">
                    Uma identidade construída sobre precisão, movimento e experimentação — traduzida
                    em uma experiência digital que funciona como extensão da própria marca.
                  </p>
                </div>
                <img
                  src={symbol.url}
                  alt="Símbolo FRAME LABS"
                  loading="lazy"
                  style={{ translate: `0 ${symbolShift}px` }}
                  className="float-slower mt-10 h-16 w-16 object-contain will-change-transform"
                />
              </div>
            </article>
          </Reveal>
        </div>

        <Stagger
          step={90}
          variant="clip"
          className="mt-px grid gap-px border-x border-b border-hairline bg-hairline md:grid-cols-3"
        >
          {projects.map((p) => (
            <article
              key={p.title}
              data-cursor="card"
              className="group lift relative h-full overflow-hidden bg-background p-8 hover:bg-secondary/60 md:p-10"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="label-mono text-muted-foreground">{p.tag}</span>
              <h3 className="mt-6 font-display text-2xl tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
                {p.title}
              </h3>
              <p className="label-mono mt-2 text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                {p.cat}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <span
                aria-hidden
                className="label-mono mt-6 inline-block translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                Ver detalhes →
              </span>
            </article>
          ))}
        </Stagger>
        <Reveal>
          <p className="label-mono mt-6 text-muted-foreground">
            Projetos conceituais — a FRAME LABS está construindo seu portfólio inicial.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Credibility() {
  const items = [
    { t: "Design estratégico", d: "Cada decisão visual sustenta um objetivo comercial definido." },
    { t: "Experiências premium", d: "Interface, ritmo e movimento tratados com o mesmo rigor." },
    { t: "Processo estruturado", d: "Etapas claras, escopo definido e entregas previsíveis." },
    { t: "Tecnologia moderna", d: "Código próprio, performance e acessibilidade como padrão." },
  ];
  return (
    <section className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="06" title="How we work" />
        </Reveal>
        <Stagger step={80} className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.t} className="group border-t border-foreground pt-5">
              <h3 className="font-display text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                {it.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="mask">
          <SectionLabel index="07" title="FAQ" />
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <h2 className="display-xl text-[clamp(2rem,4vw,3rem)] md:col-span-4">
            <TextReveal lines={["Perguntas frequentes."]} />
          </h2>
          <Stagger step={60} className="md:col-span-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="group border-t border-hairline last:border-b">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                        {f.q}
                      </span>
                      <span
                        aria-hidden
                        className={`label-mono shrink-0 transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-45 text-accent" : "group-hover:rotate-90"
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="max-w-[62ch] pb-6 text-sm leading-relaxed text-muted-foreground transition-[opacity,transform] duration-400 ease-out md:text-base"
                        style={{
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "none" : "translateY(-6px)",
                        }}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
