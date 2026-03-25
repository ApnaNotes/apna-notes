// Senior Connect Platform
// Section: Exam Category Grid
// Mobile-first, Tailwind CSS, Next.js

const categories = [
  { title: "UPSC", subtitle: "GS, Optional, Essay" },
  { title: "JEE", subtitle: "Physics, Chemistry, Math" },
  { title: "NEET", subtitle: "Bio, Physics, Chemistry" },
  { title: "Class 12", subtitle: "CBSE, ISC, State Boards" },
  { title: "Class 10", subtitle: "Board foundation prep" },
  { title: "State Boards", subtitle: "Hindi + English support" },
];

export function ExamCategoryGridSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Explore by Exam Category
        </h2>
        <p className="text-muted-foreground mt-3 text-center text-sm md:text-base">
          Find notes and mentors by your exact target.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 md:grid-cols-3 md:gap-6">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{category.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
