import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * FRAME LABS — Kinetic Precision motion system
 * Principles: Fast · Controlled · Structured · Directional · Intentional
 * All motion is transform/opacity only and honours reduced-motion.
 * ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Fine pointer (mouse) + no reduced motion — gates cursor & mouse parallax. */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/**
 * Single shared pointer listener → normalized -0.5..0.5 coordinates,
 * written straight to CSS custom properties on <html> (no React re-renders).
 * Layers then opt in with `translate3d(calc(var(--mx) * Npx), ...)`.
 */
export function usePointerField(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      root.style.setProperty("--mx", cx.toFixed(4));
      root.style.setProperty("--my", cy.toFixed(4));
      if (Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, [enabled]);
}

/** Element enters the viewport once. */
export function useInView<T extends HTMLElement>(threshold = 0.2, rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

/** 0..1 progress of an element travelling through the viewport. */
export function useSectionProgress<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const p = (vh - r.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return { ref, progress };
}

type RevealVariant = "up" | "clip" | "line" | "mask" | "frame";

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  threshold = 0.2,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
  threshold?: number;
  style?: CSSProperties;
}) {
  // Observe an unclipped wrapper: clip-path shrinks the intersection rect,
  // which would otherwise prevent the observer from ever firing.
  const { ref, visible } = useInView<HTMLDivElement>(threshold);
  return (
    <Tag ref={ref} data-visible={visible} className={className}>
      <div
        data-visible={visible}
        style={{ transitionDelay: `${delay}ms`, ...style }}
        className={cn(`reveal reveal-${variant}`)}
      >
        {children}
      </div>
    </Tag>
  );
}


/** Staggered container: children animate in sequence via --i index. */
export function Stagger({
  children,
  className,
  step = 70,
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  threshold?: number;
  as?: ElementType;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(threshold);
  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={{ "--step": `${step}ms`, "--base": `${delay}ms` } as CSSProperties}
      className={cn("stagger", className)}
    >
      {children}
    </Tag>
  );
}

/** Line-by-line masked text reveal. Text stays the protagonist. */
export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  step = 90,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.25);
  return (
    <span ref={ref} data-visible={visible} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={line} className={cn("line-mask block", lineClassName)}>
          <span
            className="line-mask-inner block"
            style={{ transitionDelay: `${delay + i * step}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="group/label flex items-center gap-3 label-mono text-muted-foreground">
      <span className="corner-tick inline-block h-2 w-2 border-l border-t border-current" aria-hidden />
      <span>
        {index} / {title}
      </span>
    </div>
  );
}

/** Directional CTA — arrow travels, surface inverts. */
export function Cta({
  href,
  children,
  variant = "solid",
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      data-cursor="link"
      className={cn(
        "cta label-mono group/cta relative inline-flex items-center gap-3 overflow-hidden border px-6 py-4",
        variant === "solid"
          ? "border-foreground bg-foreground text-background"
          : "border-hairline text-foreground hover:border-foreground",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="cta-arrow relative z-10">
        →
      </span>
    </a>
  );
}

/** Hairline scroll progress across the top of the page. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p)).toFixed(4)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px">
      <div ref={barRef} className="h-px origin-left scale-x-0 bg-accent" />
    </div>
  );
}

/** Minimal dot cursor — desktop, fine pointer, motion-allowed only. */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, select, textarea, [data-cursor]",
      ) as HTMLElement | null;
      ring.dataset["state"] = interactive ? "active" : "idle";
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-state="idle" />
    </div>
  );
}
