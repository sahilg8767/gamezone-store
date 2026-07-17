import { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, animate } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

function FloatingOrb({
    size,
    color,
    delay,
    duration,
    amplitude,
    children
}: {
    size: number;
    color: string;
    delay: number;
    duration: number;
    amplitude: number;
    children?: React.ReactNode;
}) {
    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at 30% 30%, ${color}44, ${color}11)`,
                border: `1px solid ${color}33`,
                boxShadow: `0 0 ${size}px ${color}22`,
            }}
            animate={{
                y: [0, -amplitude, 0, amplitude, 0],
                x: [0, amplitude * 0.5, 0, -amplitude * 0.5, 0],
                scale: [1, 1.05, 1, 0.95, 1],
                rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}

function RotatingRing({
    radius,
    color,
    speed,
    children
}: {
    radius: number;
    color: string;
    speed: number;
    children?: React.ReactNode;
}) {
    return (
        <motion.div
            className="absolute"
            style={{
                width: radius * 2,
                height: radius * 2,
                borderRadius: "50%",
                border: `1px solid ${color}22`,
                position: "absolute",
            }}
            animate={{ rotate: 360 }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <div
                className="absolute rounded-full"
                style={{
                    width: 6,
                    height: 6,
                    background: color,
                    boxShadow: `0 0 10px ${color}`,
                    top: -3,
                    left: "50%",
                    marginLeft: -3,
                }}
            />
            {children}
        </motion.div>
    );
}

export function Hero3DScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const primaryColor = isDark ? "#00d4ff" : "#2563eb";
    const accentColor = isDark ? "#a855f7" : "#7c3aed";
    const secondAccent = isDark ? "#f59e0b" : "#d97706";

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Auto-rotation
    useEffect(() => {
        const controls = animate(0, 360, {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            onUpdate: (latest) => {
                // We'll use this later if needed
            },
        });
        return () => controls.stop();
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: 1000 }}
        >
            {/* Main glow */}
            <div
                className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-3xl"
                style={{
                    background: `radial-gradient(circle, ${primaryColor}, transparent)`,
                    transform: "translateZ(-50px)",
                }}
            />

            {/* Central orb */}
            <motion.div
                className="relative flex items-center justify-center"
                style={{
                    translateX: useTransform(springX, [-1, 1], [-20, 20]),
                    translateY: useTransform(springY, [-1, 1], [-20, 20]),
                }}
            >
                <FloatingOrb
                    size={60}
                    color={primaryColor}
                    delay={0}
                    duration={3}
                    amplitude={10}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{
                                background: primaryColor,
                                boxShadow: `0 0 20px ${primaryColor}`,
                            }}
                        />
                    </div>
                </FloatingOrb>

                {/* Orbiting ring 1 */}
                <motion.div
                    style={{
                        translateX: useTransform(springX, [-1, 1], [-10, 10]),
                        translateY: useTransform(springY, [-1, 1], [-10, 10]),
                    }}
                >
                    <RotatingRing radius={80} color={primaryColor} speed={8}>
                        <motion.div
                            className="absolute"
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                background: primaryColor,
                                boxShadow: `0 0 15px ${primaryColor}`,
                                top: "50%",
                                right: -6,
                                marginTop: -6,
                            }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </RotatingRing>
                </motion.div>

                {/* Orbiting ring 2 */}
                <motion.div
                    style={{
                        translateX: useTransform(springX, [-1, 1], [10, -10]),
                        translateY: useTransform(springY, [-1, 1], [10, -10]),
                    }}
                >
                    <RotatingRing radius={120} color={accentColor} speed={12}>
                        <motion.div
                            className="absolute"
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: accentColor,
                                boxShadow: `0 0 12px ${accentColor}`,
                                top: -4,
                                left: "50%",
                                marginLeft: -4,
                            }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute"
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: secondAccent,
                                boxShadow: `0 0 10px ${secondAccent}`,
                                bottom: -3,
                                right: "25%",
                            }}
                            animate={{ scale: [1, 1.8, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
                        />
                    </RotatingRing>
                </motion.div>

                {/* Floating particles via small divs */}
                {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const r = 160 + Math.random() * 40;
                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 3,
                                height: 3,
                                background: i % 2 === 0 ? primaryColor : accentColor,
                                boxShadow: `0 0 6px ${i % 2 === 0 ? primaryColor : accentColor}`,
                                left: `calc(50% + ${Math.cos(angle) * r}px)`,
                                top: `calc(50% + ${Math.sin(angle) * r}px)`,
                                marginLeft: -1.5,
                                marginTop: -1.5,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random(),
                                delay: Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}