import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./MagicCard.css";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  enableParticles?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  enableClickRipple?: boolean;
  enableGlow?: boolean;
  particleCount?: number;
  glowColor?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function MagicCard({
  children,
  className = "",
  enableParticles = true,
  enableTilt = true,
  enableMagnetism = true,
  enableClickRipple = true,
  enableGlow = true,
  particleCount = 12,
  glowColor = "177, 158, 239",
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const magnetX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const magnetY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    if (!enableParticles || !isHovered) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.vx;
          let newY = p.y + p.vy;
          let newVx = p.vx;
          let newVy = p.vy;

          if (newX < 0 || newX > 100) newVx = -newVx;
          if (newY < 0 || newY > 100) newVy = -newVy;

          newX = Math.max(0, Math.min(100, newX));
          newY = Math.max(0, Math.min(100, newY));

          return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered, enableParticles, particleCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    if (enableGlow) {
      const glowX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowY = ((e.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty("--glow-x", `${glowX}%`);
      cardRef.current.style.setProperty("--glow-y", `${glowY}%`);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableClickRipple || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = rippleIdRef.current++;
    setRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`magic-card ${className}`}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        x: enableMagnetism ? magnetX : 0,
        y: enableMagnetism ? magnetY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...(enableGlow
          ? {
              "--glow-color": glowColor,
            }
          : {}),
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}

      {enableParticles && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="magic-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `rgba(${glowColor}, 1)`,
            boxShadow: `0 0 6px rgba(${glowColor}, 0.6)`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: [0, 1, 0.3, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {enableClickRipple && ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="magic-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: `radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%)`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {enableGlow && isHovered && <div className="magic-glow" />}
    </motion.div>
  );
}
