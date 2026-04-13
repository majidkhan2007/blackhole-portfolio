"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function SectionParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let nodes: NodePoint[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const createNodes = (width: number, height: number) => {
      const count = Math.max(150, Math.min(280, Math.floor((width * height) / 11000)));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: 1 + Math.random() * 1.8,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes(rect.width, rect.height);
    };

    const drawWave = (width: number, height: number, offsetY: number, amplitude: number, phase: number, opacity: number) => {
      context.beginPath();

      for (let x = 0; x <= width; x += 12) {
        const progress = x / width;
        const y =
          height * offsetY +
          Math.sin(progress * 8 + phase) * amplitude +
          Math.sin(progress * 18 + phase * 0.6) * (amplitude * 0.28);

        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      context.lineWidth = 1;
      context.stroke();
    };

    const render = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      const phase = time * 0.00035;
      drawWave(width, height, 0.24, 12, phase, 0.11);
      drawWave(width, height, 0.48, 16, phase + 1.6, 0.14);
      drawWave(width, height, 0.72, 14, phase + 3.1, 0.1);
      drawWave(width, height, 0.86, 10, phase + 4.2, 0.08);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;

        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 180 && distance > 0.001) {
            const force = (180 - distance) / 180;
            node.x -= (dx / distance) * force * 0.9;
            node.y -= (dy / distance) * force * 0.9;
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          const pointerDistanceA = pointer.active
            ? Math.hypot(pointer.x - a.x, pointer.y - a.y)
            : 9999;
          const pointerDistanceB = pointer.active
            ? Math.hypot(pointer.x - b.x, pointer.y - b.y)
            : 9999;
          const emberBoostA = pointerDistanceA < 150 ? (150 - pointerDistanceA) / 150 : 0;
          const emberBoostB = pointerDistanceB < 150 ? (150 - pointerDistanceB) / 150 : 0;
          const emberBoost = Math.max(emberBoostA, emberBoostB);

          if (distance < 175) {
            const opacity = (1 - distance / 175) * (0.26 + emberBoost * 0.42);
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle =
              emberBoost > 0.08
                ? `rgba(255,159,67,${Math.min(0.82, opacity)})`
                : `rgba(255,255,255,${Math.min(0.38, opacity)})`;
            context.lineWidth = emberBoost > 0.08 ? 1.6 : 1.2;
            context.stroke();
          }
        }
      }

      for (const node of nodes) {
        const pointerDistance = pointer.active
          ? Math.hypot(pointer.x - node.x, pointer.y - node.y)
          : 9999;
        const activeBoost = pointerDistance < 160 ? (160 - pointerDistance) / 160 : 0;

        context.beginPath();
        context.arc(node.x, node.y, node.size + activeBoost * 1.5, 0, Math.PI * 2);
        context.fillStyle =
          activeBoost > 0.08 ? "rgba(255,159,67,0.98)" : "rgba(255,255,255,0.78)";
        context.shadowColor =
          activeBoost > 0.08 ? "rgba(255,159,67,0.34)" : "rgba(255,255,255,0.16)";
        context.shadowBlur = activeBoost > 0.08 ? 22 : 10;
        context.fill();
      }

      context.shadowBlur = 0;
      animationFrame = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    render(0);

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />
    </div>
  );
}
