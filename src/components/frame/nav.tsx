import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#projetos", label: "Projetos" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        scrolled ? "border-b border-hairline bg-background/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 transition-[padding] duration-500 ease-out md:px-10 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="FRAME LABS — início">
          <img
            src={logo.url}
            alt="FRAME LABS"
            className={`w-auto transition-[height,opacity] duration-500 ease-out ${
              scrolled ? "h-4 md:h-5" : "h-5 md:h-6"
            }`}
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link label-mono relative text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="cta label-mono group/cta relative inline-flex items-center gap-2 overflow-hidden border border-foreground bg-foreground px-4 py-2.5 text-background"
          >
            <span className="relative z-10">Solicitar um projeto</span>
            <span aria-hidden className="cta-arrow relative z-10">
              →
            </span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="label-mono border border-hairline px-3 py-2 transition-colors duration-200 hover:border-foreground md:hidden"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </nav>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out md:hidden"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-hairline bg-background px-5 py-6">
            <ul className="space-y-4">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  className="transition-[opacity,transform] duration-400 ease-out"
                  style={{
                    transitionDelay: open ? `${60 + i * 45}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(8px)",
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl tracking-tight"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="label-mono mt-6 inline-flex items-center gap-2 bg-foreground px-4 py-3 text-background"
            >
              Solicitar um projeto <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
