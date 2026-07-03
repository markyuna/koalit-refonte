const expertises = [
  "Conception française",
  "Fabrication portugaise",
  "Matériaux certifiés",
  "Conseil personnalisé",
];

export default function ExpertiseSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9C45A]">
          Fabrication & expertise
        </span>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertises.map((item) => (
            <div
              key={item}
              className="rounded-[2rem] bg-[#FCFBF8] p-8 text-center text-lg font-bold text-[#103A63]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}