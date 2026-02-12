export default function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card p-6 sm:p-7">
      <h3 className="h3">{title}</h3>
      <p className="p-sm mt-2">{desc}</p>
    </div>
  );
}
