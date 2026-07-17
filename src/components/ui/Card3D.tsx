import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum rotation in degrees (default: 12)
  glareOpacity?: number; // Maximum glare opacity (default: 0.25)
}

export function Card3D({
  children,
  className = "",
  maxRotation = 12,
  glareOpacity = 0.25,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse positions relative to the card dimensions, normalized from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Create smooth springs for rotation angles
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotation, -maxRotation]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotation, maxRotation]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5
  });

  // Smooth springs for glare coordinates and opacity
  const springGlareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const springGlareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  
  const glareOpacityValue = useSpring(
    useTransform(x, (val) => (isHovered ? glareOpacity : 0)),
    { stiffness: 150, damping: 20 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize position from -0.5 to 0.5
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Convert glare spring coordinates into radial gradient CSS variables
  const glareBackground = useTransform(
    [springGlareX, springGlareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`
  );

  return (
    <div style={{ perspective: "1000px" }} className={className}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        <div 
          style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
          className="w-full h-full relative"
        >
          {/* Child Content */}
          <div style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }} className="w-full h-full">
            {children}
          </div>

          {/* Dynamic glare/reflection overlay */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: glareBackground,
              opacity: glareOpacityValue,
              pointerEvents: "none",
              zIndex: 30,
            }}
            className="rounded-xl transition-opacity duration-300"
          />
        </div>
      </motion.div>
    </div>
  );
}
