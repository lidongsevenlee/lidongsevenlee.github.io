import { useEffect, useRef } from "react";

interface LeafData {
  stemLen: number;   // length of the petiole (stem)
  stemAngle: number; // angle of stem from branch base
  leafLen: number;   // blade length
  leafW: number;     // max blade width
  phase: number;     // individual sway phase offset
  freq: number;      // sway frequency multiplier
}

interface BranchData {
  // canvas-relative root position (0-1)
  rx: number;
  ry: number;
  baseAngle: number; // angle the whole branch grows toward
  leaves: LeafData[];
  swayPhase: number;
  swayFreq: number;
  swayAmp: number;   // max branch-level sway in radians
}

function buildBranches(W: number, H: number): BranchData[] {
  const seed = (n: number) => ((n * 1.6180339887) % 1);
  const branches: BranchData[] = [];

  // bottom-left corner — big tropical stalk
  branches.push({
    rx: -0.02, ry: 1.05,
    baseAngle: -Math.PI * 0.38,
    swayPhase: 0,
    swayFreq: 0.28,
    swayAmp: 0.055,
    leaves: Array.from({ length: 8 }, (_, i) => ({
      stemLen: 80 + seed(i * 7 + 1) * 60,
      stemAngle: (i - 3.5) * 0.22 + seed(i * 3) * 0.1,
      leafLen: 180 + seed(i * 11) * 100,
      leafW: 18 + seed(i * 5) * 14,
      phase: seed(i * 13) * Math.PI * 2,
      freq: 0.8 + seed(i * 17) * 0.6,
    })),
  });

  // top-right corner — drooping branch
  branches.push({
    rx: 1.04, ry: -0.03,
    baseAngle: Math.PI * 0.65,
    swayPhase: 1.1,
    swayFreq: 0.22,
    swayAmp: 0.045,
    leaves: Array.from({ length: 7 }, (_, i) => ({
      stemLen: 60 + seed(i * 9 + 2) * 55,
      stemAngle: (i - 3) * 0.26 + seed(i * 7 + 1) * 0.12,
      leafLen: 160 + seed(i * 13 + 1) * 90,
      leafW: 16 + seed(i * 11 + 1) * 12,
      phase: seed(i * 17 + 1) * Math.PI * 2,
      freq: 0.7 + seed(i * 19 + 1) * 0.7,
    })),
  });

  // right-center — medium branch
  branches.push({
    rx: 1.06, ry: 0.55,
    baseAngle: Math.PI * 0.82,
    swayPhase: 2.4,
    swayFreq: 0.35,
    swayAmp: 0.06,
    leaves: Array.from({ length: 6 }, (_, i) => ({
      stemLen: 50 + seed(i * 7 + 3) * 50,
      stemAngle: (i - 2.5) * 0.28 + seed(i * 5 + 2) * 0.1,
      leafLen: 130 + seed(i * 11 + 2) * 80,
      leafW: 14 + seed(i * 9 + 2) * 10,
      phase: seed(i * 13 + 2) * Math.PI * 2,
      freq: 0.9 + seed(i * 23 + 2) * 0.5,
    })),
  });

  // top-left — thin trailing branch
  branches.push({
    rx: 0.1, ry: -0.02,
    baseAngle: Math.PI * 0.48,
    swayPhase: 3.7,
    swayFreq: 0.31,
    swayAmp: 0.04,
    leaves: Array.from({ length: 5 }, (_, i) => ({
      stemLen: 40 + seed(i * 11 + 4) * 45,
      stemAngle: (i - 2) * 0.3 + seed(i * 7 + 3) * 0.1,
      leafLen: 100 + seed(i * 17 + 3) * 70,
      leafW: 12 + seed(i * 13 + 3) * 8,
      phase: seed(i * 19 + 3) * Math.PI * 2,
      freq: 1.0 + seed(i * 29 + 3) * 0.4,
    })),
  });

  return branches;
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  angle: number,
  length: number,
  width: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.beginPath();
  // left side of leaf
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    -width * 0.6, length * 0.25,
    -width * 0.5, length * 0.6,
    0, length,
  );
  // right side (mirror)
  ctx.bezierCurveTo(
    width * 0.5, length * 0.6,
    width * 0.6, length * 0.25,
    0, 0,
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function TreeShadow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    let branches: BranchData[] = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      branches = buildBranches(W, H);
    }
    resize();
    window.addEventListener("resize", resize);

    function getColor() {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      return dark
        ? "rgba(120, 200, 230, 0.08)"
        : "rgba(80, 110, 130, 0.11)";
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = getColor();

      for (const b of branches) {
        const bx = b.rx * W;
        const by = b.ry * H;
        // branch-level sway
        const branchSway = Math.sin(t * b.swayFreq + b.swayPhase) * b.swayAmp;

        for (const lf of b.leaves) {
          // leaf-level secondary sway
          const leafSway = Math.sin(t * lf.freq * b.swayFreq + lf.phase) * b.swayAmp * 0.6;
          const totalSway = branchSway + leafSway;

          // stem tip position
          const stemAngle = b.baseAngle + lf.stemAngle + totalSway;
          const tx = bx + Math.cos(stemAngle) * lf.stemLen;
          const ty = by + Math.sin(stemAngle) * lf.stemLen;

          // leaf grows at a slight further deviation
          const leafAngle = stemAngle + lf.stemAngle * 0.3;

          drawLeaf(ctx, tx, ty, leafAngle - Math.PI / 2, lf.leafLen, lf.leafW);
        }
      }

      rafRef.current = requestAnimationFrame((ts) => draw(ts / 1000));
    }

    rafRef.current = requestAnimationFrame((ts) => draw(ts / 1000));

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(14px)",
        opacity: 1,
      }}
      aria-hidden="true"
    />
  );
}
