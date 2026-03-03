"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Monitor,
  Building2,
  BrainCircuit,
} from "lucide-react";

const categories = [
  {
    id: "CD",
    title: "Clinical Study Design",
    description: "임상시험 설계 및 유효성 평가",
    icon: Stethoscope,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "UD",
    title: "UX/UI Design & Usability",
    description: "의료기기 사용적합성 공학",
    icon: Monitor,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "MI",
    title: "Medical Industry Policy",
    description: "의료기기 산업 정책",
    icon: Building2,
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "BS",
    title: "Bio-Signal Processing & AI",
    description: "생체신호 처리 및 AI 진단",
    icon: BrainCircuit,
    color: "from-indigo-500 to-blue-600",
  },
];

export default function ResearchHighlights() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary font-heading">
          Research Areas
        </h2>
        <p className="mt-3 text-text-secondary text-lg">
          의료기기 전주기에 걸친 연구를 수행합니다
        </p>
        <div className="mt-4 h-1 w-16 bg-accent rounded-full mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/research?category=${cat.id}`}
              className="block group"
            >
              <div
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-white h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}
              >
                <cat.icon className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                <p className="text-white/70 text-sm">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
