import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import { Contact, Education, Projects, Services, Skills } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Education />
        <Services />
        <Contact />
      </main>
    </>
  );
}
