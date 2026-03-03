"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineHeroProps {
  sceneUrl: string;
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-yonsei-dark via-yonsei-blue to-accent" />
  );
}

export default function SplineHero({ sceneUrl }: SplineHeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {sceneUrl ? (
        <Suspense fallback={<HeroFallback />}>
          <div className="absolute inset-0">
            <Spline scene={sceneUrl} />
          </div>
          <div className="absolute inset-0 bg-yonsei-dark/40" />
        </Suspense>
      ) : (
        <HeroFallback />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight font-heading">
            MDDU Lab
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/80 font-light">
            Medical Device Design & Usability
          </p>
          <p className="mt-2 text-sm sm:text-base text-white/60">
            의료기기 설계 및 사용적합성 연구실 · 연세대학교 의과대학
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white/80 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
