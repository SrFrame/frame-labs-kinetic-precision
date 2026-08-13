import { useEffect, useRef } from "react";
import symbol from "@/assets/symbol.png.asset.json";

export function Hero() {
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = symbolRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-end overflow-hidden pt-28 pb-10 md:min-h-screen"
    >
      {/* grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1400px] grid-cols-12 gap-4 px-10 lg:grid"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-l border-hairline/60 last:border-r" />
        ))}
      </div>

      {/* symbol */}
      <div
        ref={symbolRef}
        aria-hidden
        className="pointer-events-none absolute -right-[18%] top-[6%] w-[78vw] max-w-[820px] transition-transform duration-500 ease-out md:-right-[8%] md:top-0 md:w-[52vw]"
      >
        <img
          src={symbol.url}
          alt=""
          className="anim-corner w-full opacity-[0.07] md:opacity-[0.12]"
          style={{ animationDelay: "120ms" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="anim-corner label-mono mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <span className="text-foreground">FRAME LABS</span>
          <span>Kinetic Precision</span>
          <span className="hidden sm:inline">Digital Experience Studio</span>
        </div>

        <h1 className="display-xl max-w-[16ch] text-[clamp(2.6rem,9vw,7.5rem)]">
          <span className="anim-enter block" style={{ animationDelay: "160ms" }}>
            Design que
          </span>
          <span className="anim-enter block" style={{ animationDelay: "260ms" }}>
            transforma atenção
          </span>
          <span className="anim-enter block" style={{ animationDelay: "360ms" }}>
            em <span className="text-accent">clientes.</span>
          </span>
        </h1>

        <div className="anim-enter mt-10 grid gap-8 md:grid-cols-12" style={{ animationDelay: "520ms" }}>
          <p className="max-w-[52ch] text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-1 md:text-lg">
            Websites, landing pages e experiências digitais criadas para posicionar marcas com mais
            força no digital.
          </p>
          <div className="flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end">
            <a
              href="#contato"
              className="label-mono border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:bg-transparent hover:text-foreground"
            >
              Solicitar um projeto
            </a>
            <a
              href="#projetos"
              className="label-mono border border-hairline px-6 py-4 transition-colors hover:border-foreground"
            >
              Ver nosso trabalho
            </a>
          </div>
        </div>

        <div
          className="anim-enter mt-14 flex items-center justify-between border-t border-hairline pt-4 label-mono text-muted-foreground"
          style={{ animationDelay: "680ms" }}
        >
          <span>Scroll</span>
          <span className="hidden sm:inline">Precision — Movement — Structure — Experimentation</span>
          <span aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}
