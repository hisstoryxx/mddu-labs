"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryItem } from "@/lib/types/database";
import PageTransition from "@/app/components/ui/PageTransition";
import SectionTitle from "@/app/components/ui/SectionTitle";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle title="Gallery" subtitle="연구실 갤러리" />

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              갤러리가 준비 중입니다.
            </p>
            <p className="text-text-muted text-sm mt-2">
              관리자 페이지에서 이미지를 업로드해주세요.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedIndex(i)}
              >
                <div className="relative rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">
                        {item.title}
                      </p>
                      {item.event_date && (
                        <p className="text-white/70 text-xs mt-1">
                          {item.event_date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && items[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
            {selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 text-white/70 hover:text-white p-2"
                aria-label="이전"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            {selectedIndex < items.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 text-white/70 hover:text-white p-2"
                aria-label="다음"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl max-h-[85vh] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[selectedIndex].image_url}
                alt={items[selectedIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">
                  {items[selectedIndex].title}
                </p>
                {items[selectedIndex].description && (
                  <p className="text-white/60 text-sm mt-1">
                    {items[selectedIndex].description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
