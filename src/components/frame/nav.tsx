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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-hairline" : ""
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10"
      >
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="FRAME LABS — início">
          <img src={logo.url} alt="FRAME LABS" className="h-5 w-auto md:h-6" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="label-mono border border-foreground bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Solicitar um projeto
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="label-mono border border-hairline px-3 py-2 md:hidden"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hairline bg-background px-5 py-6 md:hidden">
          <ul className="space-y-4">
            {links.map((l) => (
              <li key={l.href}>
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
            className="label-mono mt-6 inline-block bg-foreground px-4 py-3 text-background"
          >
            Solicitar um projeto
          </a>
        </div>
      )}
    </header>
  );
}
