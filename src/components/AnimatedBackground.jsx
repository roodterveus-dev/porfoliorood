import { motion } from "framer-motion";

const blobs = [
  {
    className: "w-[36rem] h-[36rem] bg-accent/25 top-[-10%] left-[-10%]",
    animate: { x: [0, 60, -20, 0], y: [0, 40, 80, 0] },
    duration: 26,
  },
  {
    className: "w-[30rem] h-[30rem] bg-accent-2/20 top-[20%] right-[-15%]",
    animate: { x: [0, -50, 30, 0], y: [0, 60, -30, 0] },
    duration: 32,
  },
  {
    className: "w-[26rem] h-[26rem] bg-accent/15 bottom-[-10%] left-[20%]",
    animate: { x: [0, 40, -60, 0], y: [0, -50, 20, 0] },
    duration: 30,
  },
];

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-20 overflow-hidden bg-bg"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
        />
      ))}
    </div>
  );
}
