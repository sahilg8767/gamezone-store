import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export function Cursor3D() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const mouseRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(0);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.matchMedia("(max-width: 768px)").matches || 
                           ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0);
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            cursor.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select');
            if (target) {
                cursor.classList.add("cursor-hide-all");
                follower.classList.add("cursor-hide-all");
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select');
            if (target) {
                cursor.classList.remove("cursor-hide-all");
                follower.classList.remove("cursor-hide-all");
            }
        };

        document.addEventListener("mousemove", handleMouse);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        // Animate follower with lag
        const animate = () => {
            const { x, y } = mouseRef.current;
            const currentX = parseFloat(follower.style.left) || 0;
            const currentY = parseFloat(follower.style.top) || 0;
            const dx = x - currentX;
            const dy = y - currentY;
            follower.style.left = `${currentX + dx * 0.15}px`;
            follower.style.top = `${currentY + dy * 0.15}px`;
            frameRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            document.removeEventListener("mousemove", handleMouse);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(frameRef.current);
        };
    }, [isMobile]);

    if (isMobile) return null;

    const isDark = theme === "dark";

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    transition: "width 0.2s, height 0.2s, backgroundColor 0.2s, opacity 0.2s",
                    transform: "translate3d(0, 0, 0)",
                }}
            />
            <div
                ref={followerRef}
                className="fixed pointer-events-none z-[9998]"
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `2px solid ${isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)"}`,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    left: 0,
                    top: 0,
                    transform: "translate(-50%, -50%)",
                    transition: "width 0.3s, height 0.3s, borderColor 0.3s, opacity 0.3s",
                    backdropFilter: "blur(4px)",
                }}
            />
            <style>{`
                @media (pointer: fine) {
                    html, body {
                        cursor: none;
                    }
                    a, button, select, [role="button"] {
                        cursor: pointer !important;
                    }
                    input, textarea {
                        cursor: text !important;
                    }
                }
                .cursor-hide-all {
                    opacity: 0 !important;
                    width: 0px !important;
                    height: 0px !important;
                }
            `}</style>
        </>
    );
}