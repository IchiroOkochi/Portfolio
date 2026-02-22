import { MotionWrapper } from './MotionWrapper';

const logos = ['VaaniConnect', 'Purdue Space Program', 'Client Web Builds', 'AI + Automation Lab'];

export function LogoGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {logos.map((logo, i) => (
        <MotionWrapper key={logo} delay={i * 0.08}>
          <div className="rounded-xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">{logo} Logo</div>
        </MotionWrapper>
      ))}
    </div>
  );
}
