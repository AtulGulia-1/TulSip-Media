import { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="theme-card rounded-2xl p-5">
      <h2 className="mb-4 font-display text-3xl font-semibold text-[#f6f0cf]">{title}</h2>
      {children}
    </section>
  );
}
