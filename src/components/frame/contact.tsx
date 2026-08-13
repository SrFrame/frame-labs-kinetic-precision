import { useState } from "react";
import { z } from "zod";
import { Reveal, SectionLabel } from "./reveal";
import logoWhite from "@/assets/logo-white.png.asset.json";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  type: z.string().trim().min(1, "Selecione o tipo de projeto").max(60),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o projeto").max(1000),
});

const projectTypes = ["Website", "Landing Page", "Experiência Digital", "UI/UX Design"];

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const field =
    "w-full border-b border-white/20 bg-transparent py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

  return (
    <section id="contato" className="dark border-t border-hairline bg-background py-24 text-foreground md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel index="08" title="Contact" />
        </Reveal>

        <div className="mt-10 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal delay={60}>
              <h2 className="display-xl text-[clamp(2.2rem,5vw,4.2rem)]">
                Vamos construir algo <span className="text-accent">memorável.</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-6 max-w-[42ch] leading-relaxed text-muted-foreground">
                Conte sobre o projeto. Retornamos com uma conversa de alinhamento, escopo e
                cronograma.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <img src={logoWhite.url} alt="FRAME LABS" loading="lazy" className="mt-14 h-6 w-auto" />
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            {sent ? (
              <Reveal>
                <div className="border border-white/20 p-10">
                  <span className="label-mono text-accent">Recebido</span>
                  <p className="mt-4 font-display text-2xl tracking-tight">
                    Obrigado. Entraremos em contato em breve.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={onSubmit} noValidate className="space-y-8">
                  {[
                    { name: "name", label: "Nome", type: "text", ph: "Seu nome" },
                    { name: "email", label: "E-mail", type: "email", ph: "voce@empresa.com" },
                    { name: "company", label: "Empresa (opcional)", type: "text", ph: "Nome da empresa" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="label-mono text-muted-foreground">
                        {f.label}
                      </label>
                      <input
                        id={f.name}
                        name={f.name}
                        type={f.type}
                        placeholder={f.ph}
                        maxLength={255}
                        className={field}
                      />
                      {errors[f.name] && (
                        <p className="label-mono mt-2 text-destructive">{errors[f.name]}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="type" className="label-mono text-muted-foreground">
                      Tipo de projeto
                    </label>
                    <select id="type" name="type" defaultValue="" className={field}>
                      <option value="" disabled className="bg-background">
                        Selecione
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-background">
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className="label-mono mt-2 text-destructive">{errors.type}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="label-mono text-muted-foreground">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={1000}
                      placeholder="Objetivo, prazo e contexto do projeto"
                      className={`${field} resize-none`}
                    />
                    {errors.message && (
                      <p className="label-mono mt-2 text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="label-mono w-full border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:bg-transparent hover:text-foreground sm:w-auto"
                  >
                    Enviar projeto
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 border-t border-hairline px-5 py-8 label-mono text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} FRAME LABS</span>
        <span>Kinetic Precision — Design que transforma atenção em clientes</span>
      </div>
    </footer>
  );
}
