import symbol from "@/assets/symbol.png.asset.json";
import { Cta, TextReveal, usePointerField, usePrefersReducedMotion, useFinePointer } from "./motion";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  usePointerField(fine && !reduced);

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-end overflow-hidden pt-28 pb-10 md:min-h-screen"
    >
      {/* structural grid lines — enter first, drawn top-down */}
      <div
        aria-hidden
        className="par-1 pointer-events-none absolute inset-0 mx-auto hidden max-w-[1400px] grid-cols-12 gap-4 px-10 lg:grid"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="anim-enter border-l border-hairline/60 last:border-r"
            style={{ animationDelay: `${40 + i * 22}ms`, animationDuration: "600ms" }}
          />
        ))}
      </div>

      {/* official symbol — masked scale-in, deepest mouse layer */}
      <div
        aria-hidden
        className="par-3 float-slow pointer-events-none absolute -right-[22%] top-[14%] w-[70vw] max-w-[620px] opacity-[0.06] md:-right-[6%] md:top-[10%] md:w-[38vw] md:opacity-[0.09]"
      >
        <img
          src={symbol.url}
          alt=""
          className="anim-corner w-full"
          style={{ animationDelay: "160ms" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <h1 className="par-2 display-xl max-w-[16ch] text-[clamp(2.6rem,9vw,7.5rem)]">
          <TextReveal lines={["Design que", "transforma atenção"]} delay={260} step={100} />
          <span className="line-mask block">
            <span
              className="line-mask-inner block"
              style={{ animation: "fl-line-up 760ms var(--ease-precise) 460ms both" }}
            >
              em <span className="text-accent">clientes.</span>
            </span>
          </span>
        </h1>

        <div
          className="anim-enter mt-10 grid gap-8 md:grid-cols-12"
          style={{ animationDelay: "580ms" }}
        >

          <p className="max-w-[52ch] text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-1 md:text-lg">
            Websites, landing pages e experiências digitais criadas para posicionar marcas com mais
            força no digital.
          </p>
          <div className="flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end">
            <Cta href="#contato">Solicitar um projeto</Cta>
            <Cta href="#projetos" variant="ghost">
              Ver nosso trabalho
            </Cta>
          </div>
        </div>

        <div
          className="anim-enter mt-14 flex items-center justify-end border-t border-hairline pt-4 label-mono text-muted-foreground"
          style={{ animationDelay: "700ms" }}
        >
          <span aria-hidden className="scroll-hint">
            ↓
          </span>
        </div>

      </div>
    </section>
  );
}
