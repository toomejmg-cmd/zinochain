import { useEffect, useRef } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface BubbleAnimationProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

export function BubbleAnimation({
  count = 20,
  color = '#B19EEF',
  minSize = 20,
  maxSize = 100,
  speed = 1,
}: BubbleAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initBubbles = () => {
      bubblesRef.current = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: minSize + Math.random() * (maxSize - minSize),
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: 0.1 + Math.random() * 0.3,
      }));
    };

    initBubbles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size;
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size;
        if (bubble.y < -bubble.size) bubble.y = canvas.height + bubble.size;
        if (bubble.y > canvas.height + bubble.size) bubble.y = -bubble.size;

        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.size / 2
        );
        gradient.addColorStop(0, `${color}${Math.floor(bubble.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${color}${Math.floor(bubble.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `${color}${Math.floor(bubble.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, color, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
