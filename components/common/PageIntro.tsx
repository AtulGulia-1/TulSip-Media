type PageIntroProps = {
  title: string;
  description: string;
};

export function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="section-shell section-y">
      <h1 className="font-display text-5xl font-semibold text-[#f6f0cf]">{title}</h1>
      <p className="theme-muted mt-4 max-w-2xl text-lg">{description}</p>
    </section>
  );
}
