import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    speedX: number;
    speedY: number;
    speedZ: number;
    opacity: number;
    hue: number;
}

export function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(0);

    const PARTICLE_COUNT = 80;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Init particles
        const particles: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 200 - 100,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                speedZ: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 180, // Blue-teal range
            });
        }
        particlesRef.current = particles;

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouse);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { x: mx, y: my } = mouseRef.current;

            for (const p of particlesRef.current) {
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                p.z += p.speedZ;

                // Mouse interaction - gentle push away
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    p.x += dx * force * 0.02;
                    p.y += dy * force * 0.02;
                }

                // Wrap around screen
                if (p.x < -50) p.x = canvas.width + 50;
                if (p.x > canvas.width + 50) p.x = -50;
                if (p.y < -50) p.y = canvas.height + 50;
                if (p.y > canvas.height + 50) p.y = -50;

                // Perspective scale (clamped to prevent negative radius)
                const scale = Math.max(0.1, 1 + p.z / 500);
                const size = Math.max(0.5, p.size * scale);

                // Draw particle
                const isDark = theme === "dark";
                const alpha = p.opacity * (isDark ? 1 : 0.4);

                if (size <= 0) continue;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
                gradient.addColorStop(0, `hsla(${p.hue}, 80%, ${isDark ? 60 : 40}%, ${alpha})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 80%, ${isDark ? 60 : 40}%, 0)`);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw connections between close particles
                for (const other of particlesRef.current) {
                    if (other === p) continue;
                    const ox = other.x;
                    const oy = other.y;
                    const oz = other.z;
                    const distP = Math.sqrt(
                        (p.x - ox) ** 2 +
                        (p.y - oy) ** 2 +
                        (p.z - oz) ** 2
                    );
                    if (distP < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(ox, oy);
                        const lineAlpha = (1 - distP / 150) * 0.15 * (isDark ? 1 : 0.5);
                        ctx.strokeStyle = `hsla(${p.hue}, 80%, ${isDark ? 60 : 40}%, ${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(frameRef.current);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}