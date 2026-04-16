import { motion, Variants } from "motion/react";

interface BlurRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  blur?: string;
  yOffset?: number;
  className?: string;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export default function BlurReveal({
  children,
  delay = 0,
  duration = 0.6,
  blur = "8px",
  yOffset = 12,
  className,
  once = true,
}: BlurRevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, filter: `blur(${blur})`, y: yOffset },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
