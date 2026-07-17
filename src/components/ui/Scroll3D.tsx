import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Scroll3DProps {
  children: React.ReactNode;
}

export function Scroll3D({ children }: Scroll3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the element relative to viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate 3D rotation: tilts back as it enters, flattens, tilts forward as it leaves
  const rawRotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [15, 0, 0, -15]);
  const rawScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.93, 1, 1, 0.93]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const rawTranslateY = useTransform(scrollYProgress, [0, 0.25], [50, 0]);

  // Smooth springs for a fluid scrolling feel
  const rotateX = useSpring(rawRotateX, { stiffness: 80, damping: 15 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 15 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 15 });
  const translateY = useSpring(rawTranslateY, { stiffness: 80, damping: 15 });

  return (
    <div style={{ perspective: "1200px" }} className="w-full">
      <motion.div
        ref={ref}
        style={{
          rotateX,
          scale,
          opacity,
          y: translateY,
          transformOrigin: "center top",
          transformStyle: "preserve-3d",
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
