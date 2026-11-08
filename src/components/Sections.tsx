import { education, profile, projects, services, skills, type Project } from "@/data/site";
import CopyEmail from "./CopyEmail";

function SectionHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div id={id} className="mb-12 max-w-2xl md:mb-16">
      <h2 className="display text-[clamp(2.6rem,6vw,4.2rem)] font-extrabold">{title}</h2>
      {lead && <p className="mt-5 text-lg text-mute">{lead}</p>}
    </div>
  );
}

const statusColor: Record<Project["status"], string> = {
  Completed: "text-[#5fd68a] border-[#5fd68a]/40",
  "In use": "text-[#5fd68a] border-[#5fd68a]/40",
  Built: "text-signal border-signal/40",
  "In progress": "text-amber border-amber/40",
  "In design": "text-mute border-line",
};

function ProjectRow({ p }: { p: Project }) {
  return (
    <article className="grid gap-8 border-t border-line py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:py-16">
      <div>
        <span
          className={`inline-block rounded-full border px-3 py-0.5 text-[0.8rem] font-medium ${statusColor[p.status]}`}
        >
          {p.status}
        </span>
        <h3 className="display mt-5 text-[clamp(2rem,4vw,2.9rem)] font-bold">{p.title}</h3>
        <p className="mt-3 text-[0.95rem] text-mute">{p.context}</p>
        {p.metric && (
          <p className="mt-8">
            <span className="display block text-6xl font-extrabold text-amber">{p.metric.value}</span>
            <span className="mt-2 block text-mute">{p.metric.label}</span>
          </p>
        )}
      </div>

      <div>
        <p className="max-w-[38rem] text-[1.15rem] leading-relaxed text-ink">{p.summary}</p>
        <ul className="mt-6 max-w-[38rem] space-y-3">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-mute">
              <span className="mt-[0.7rem] h-[2px] w-3 shrink-0 bg-amber" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tech stack">
          {p.stack.map((s) => (
            <li key={s} className="rounded-md bg-panel px-2.5 py-1 text-[0.85rem] text-ink/85">
              {s}
            </li>
          ))}
        </ul>
        {p.links && p.links.length > 0 && (
          <div className="mt-7 flex gap-5">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
      <SectionHeading
        id="work"
        title="Projects"
        lead="From medical image classification to software a shop runs on every day."
      />
      <div className="border-b border-line">
        {projects.map((p) => (
          <ProjectRow key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
      <SectionHeading id="skills" title="Skills" />
      <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.group}>
            <dt className="display text-xl font-bold text-amber">{g.group}</dt>
            <dd className="mt-3 space-y-1.5 text-ink/90">
              {g.items.map((i) => (
                <span key={i} className="block">
                  {i}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Education() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
      <SectionHeading id="education" title="Education" />
      <ol className="relative ml-1 border-l border-line">
        {education.map((e, i) => (
          <li key={e.degree} className="relative pb-10 pl-8 last:pb-0 md:grid md:grid-cols-[10rem_1fr] md:gap-8 md:pl-10">
            <span
              className={`absolute -left-[7px] top-[0.45rem] h-[13px] w-[13px] rounded-full border-2 ${
                i === 0 ? "border-amber bg-amber" : "border-line bg-night"
              }`}
            />
            <p className="text-mute">{e.years}</p>
            <div>
              <h3 className="display mt-1 text-2xl font-bold md:mt-0">
                {e.degree}
                {e.note && <span className="ml-3 align-middle text-sm font-medium text-amber">{e.note}</span>}
              </h3>
              <p className="mt-1 text-mute">{e.school}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Services() {
  const hire = [
    { label: "Fiverr", href: profile.links.fiverr },
    { label: "Upwork", href: profile.links.upwork },
  ].filter((l) => l.href);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
      <SectionHeading
        id="services"
        title="Freelance work"
        lead="I take on a small number of projects alongside my studies. Here is what I can build for you."
      />
      <div className="grid gap-x-12 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="border-t border-line py-8">
            <h3 className="display text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 max-w-md text-mute">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${profile.email}?subject=Project%20enquiry`}
          className="rounded-full bg-amber px-6 py-3 font-semibold text-night transition hover:bg-[#ffc865]"
        >
          Email me about a project
        </a>
        {hire.map((h) => (
          <a
            key={h.label}
            href={h.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3 font-semibold transition hover:border-amber"
          >
            Hire me on {h.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const social = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "LeetCode", href: profile.links.leetcode },
  ].filter((l) => l.href);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-40">
      <div id="contact" className="rounded-3xl bg-deep px-7 py-14 md:px-14 md:py-20">
        <h2 className="display max-w-3xl text-[clamp(2.6rem,6.5vw,5rem)] font-extrabold">
          Hiring, or have a project in mind?
        </h2>
        <p className="mt-6 max-w-xl text-lg text-mute">
          I&apos;m looking for AI/ML, backend and SDE roles, and I&apos;m open to relocating.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="display mt-10 inline-block break-all text-[clamp(1.5rem,4vw,2.6rem)] font-bold text-amber underline decoration-amber/30 decoration-2 underline-offset-[10px] transition hover:decoration-amber"
        >
          {profile.email}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmail email={profile.email} />
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-[0.95rem] font-medium transition hover:border-amber"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <footer className="mt-12 flex flex-wrap justify-between gap-4 text-sm text-mute">
        <p>© {new Date().getFullYear()} Rohit Gupta</p>
        <p>Built with Next.js and Three.js</p>
      </footer>
    </section>
  );
}
