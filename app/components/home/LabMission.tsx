"use client";

import { motion } from "framer-motion";

const lines = [
  { text: "We do", delay: 0 },
  { text: '"Design & Development"', delay: 0.1, accent: true },
  { text: "and...", delay: 0.2 },
  { text: '"Research & Evaluation"', delay: 0.3, accent: true },
  { text: "focusing on", delay: 0.4 },
  { text: '"Practical Healthcare Industry"', delay: 0.5, accent: true },
  { text: "within", delay: 0.6 },
  { text: '"Medical Device Regulation"', delay: 0.7, accent: true },
];

export default function LabMission() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-yonsei-dark">
      <div className="max-w-4xl mx-auto">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: line.delay, duration: 0.6 }}
            className={
              line.accent
                ? "text-3xl sm:text-4xl lg:text-5xl font-bold text-white my-3 font-heading"
                : "text-lg sm:text-xl text-white/50 my-2"
            }
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
