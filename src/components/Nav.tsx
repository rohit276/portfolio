import { profile } from "@/data/site";

const links = [
  { href: "#work", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-night/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="display text-xl font-bold tracking-tight">
          Rohit<span className="text-amber">.</span>
        </a>
        <ul className="flex items-center gap-4 text-[0.95rem] text-mute sm:gap-7">
          {links.map((l, i) => (
            <li key={l.href} className={i === 2 || i === 3 ? "hidden md:block" : ""}>
              <a href={l.href} className="transition hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
          {profile.resume && (
            <li className="hidden sm:block">
              <a
                href={profile.resume}
                download
                className="rounded-full border border-amber/70 px-4 py-1.5 text-amber transition hover:bg-amber hover:text-night"
              >
                Resume
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
