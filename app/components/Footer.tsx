import { SketchRipple } from "./sketch/SketchWave";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1180px] px-6 pb-14 sm:px-10 lg:px-16">
      <SketchRipple className="h-3 w-32 text-rule" />
      <div className="mt-7 flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-editorial text-[0.68rem] font-normal uppercase tracking-[0.28em] text-ink-faint">
          © {new Date().getFullYear()} Yifan
        </p>
        <p className="font-hand text-lg text-ink-faint">
          made slowly, by hand
        </p>
      </div>
    </footer>
  );
}

export default Footer;
