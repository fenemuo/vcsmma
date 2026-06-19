import ExploreCard from "./ExploreCard";

export default function ExploreGrid({ items }: { items: { href: string; title: string; description: string }[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <ExploreCard key={it.href} href={it.href} title={it.title} description={it.description} />
      ))}
    </div>
  );
}
