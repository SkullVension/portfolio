import { motion } from "framer-motion";
import { Code2, Github, Layers, Palette, Server, Wand2 } from "lucide-react";
import React from "react";

const marqueeItems = [
  { text: "FULL STACK DEVELOPER", icon: Layers },
  { text: "UI/UX DESIGN", icon: Palette },
  { text: "FRONTEND DEVELOPER", icon: Code2 },
  { text: "CREATIVE DEVELOPER", icon: Wand2 },
  { text: "MERN STACK DEV", icon: Server },
  { text: "OPEN SOURCE CONTRIBUTOR", icon: Github },
];

const Marquee: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-off-white w-full overflow-hidden">
      {/* Row 1 - Left to right */}
      <div className="relative flex overflow-hidden mb-3 md:mb-4">
        <motion.div
          className="flex whitespace-nowrap gap-8 md:gap-16"
          animate={{ x: [0, "-100%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => {
            const Icon = item.icon;
            return (
              <span
                key={`row1-${index}`}
                className="inline-flex items-center gap-2 md:gap-4 font-pixel text-sm md:text-xl lg:text-3xl text-near-black"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                <Icon size={16} className="md:w-6 md:h-6 text-accent" />
                {item.text}
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Row 2 - Right to left */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-8 md:gap-16"
          animate={{ x: ["-100%", 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems].reverse().map((item, index) => {
            const Icon = item.icon;
            return (
              <span
                key={`row2-${index}`}
                className="inline-flex items-center gap-2 md:gap-4 font-pixel text-sm md:text-xl lg:text-3xl text-gray-warm-300"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
              >
                {item.text}
                <Icon size={16} className="md:w-6 md:h-6" />
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Marquee;
