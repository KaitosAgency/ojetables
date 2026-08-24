import dynamic from "next/dynamic";

function PersonalizationProcessSkeleton() {
  return (
    <div className="min-h-[520px] animate-pulse rounded-2xl bg-brand-beige/40" aria-hidden />
  );
}

const PersonalizationProcessSection = dynamic(
  () =>
    import("@/components/personalization/personalization-process-section").then((module) => ({
      default: module.PersonalizationProcessSection,
    })),
  { loading: () => <PersonalizationProcessSkeleton /> },
);

export function PersonalizationSection() {
  return (
    <section id="personnalisation" className="section-padding scroll-mt-36 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <PersonalizationProcessSection />
      </div>
    </section>
  );
}
