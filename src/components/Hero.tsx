"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/site";

const NeuralSphere = dynamic(() => import("./NeuralSphere"), { ssr: false });

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] as const },
        };

  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-6 md:min-h-[92vh] md:grid-cols-[1.05fr_1fr]">
        {/* Text */}
        <div className="order-2 pb-16 md:order-1 md:pb-0">
          <motion.p {...rise(0.1)} className="mb-5 text-mute">
            Hi, I&apos;m
          </motion.p>
          <h1 className="display text-[clamp(4.2rem,11vw,8.5rem)] font-extrabold">
            <motion.span {...rise(0.18)} className="block">
              {first}
            </motion.span>
            <motion.span {...rise(0.3)} className="block text-amber">
              {last}
            </motion.span>
          </h1>

          <motion.p
            {...rise(0.45)}
            className="mt-7 font-[family-name:var(--font-display)] text-2xl font-medium text-ink md:text-[1.7rem]"
          >
            AI/ML engineer and backend developer
          </motion.p>
          <motion.p {...rise(0.52)} className="mt-3 max-w-[34rem] text-lg text-mute">
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.62)} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-amber px-6 py-3 font-semibold text-night transition hover:bg-[#ffc865]"
            >
              See my projects
            </a>
            {profile.resume ? (
              <a
                href={profile.resume}
                download
                className="rounded-full border border-line px-6 py-3 font-semibold text-ink transition hover:border-amber"
              >
                Download resume
              </a>
            ) : (
              <a
                href="#contact"
                className="rounded-full border border-line px-6 py-3 font-semibold text-ink transition hover:border-amber"
              >
                Contact me
              </a>
            )}
          </motion.div>

          <motion.p {...rise(0.72)} className="mt-9 flex max-w-[34rem] gap-3 text-[0.95rem] text-mute">
            <span className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-[#5fd68a] shadow-[0_0_10px_#5fd68a]" />
            {profile.status}
          </motion.p>
        </div>

        {/* Portrait inside the network */}
        <div className="relative order-1 mx-auto aspect-square w-full max-w-[560px] md:order-2">
          <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(245,181,68,0.30),rgba(108,207,246,0.10)_55%,transparent_70%)]" />
          <NeuralSphere />
          <motion.img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={720}
            height={878}
            className="portrait-mask pointer-events-none absolute bottom-0 left-1/2 w-[64%] -translate-x-1/2 select-none"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          />
        </div>
      </div>
    </section>
  );
}
