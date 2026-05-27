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

interface MarqueeRowProps {
  items: typeof marqueeItems;
  direction?: "left" | "right";
  textColor: string;
  iconColor?: string;
  reverseIconOrder?: boolean;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  items,
  direction = "left",
  textColor,
  iconColor = "",
  reverseIconOrder = false,
}) => {
  const isLeft = direction === "left";

  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap gap-8 md:gap-16 pr-8 md:pr-16"
        animate={{ x: isLeft ? [0, "-50%"] : ["-50%", 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <span
              key={index}
              className={`inline-flex items-center gap-2 md:gap-4 font-pixel text-sm md:text-xl lg:text-3xl ${textColor}`}
              style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
              {/* Row 1 */}
              {!reverseIconOrder && (
                <Icon size={16} className={`md:w-6 md:h-6 ${iconColor}`} />
              )}

              {item.text}

              {/* Row 2 */}
              {reverseIconOrder && <Icon size={16} className="md:w-6 md:h-6" />}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

const Marquee: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-off-white w-full overflow-hidden flex flex-col gap-3 md:gap-4">
      {/* Row 1: Left to right */}
      <MarqueeRow
        items={marqueeItems}
        direction="left"
        textColor="text-near-black"
        iconColor="text-accent"
      />

      {/* Row 2: Right to left */}
      <MarqueeRow
        items={[...marqueeItems].reverse()}
        direction="right"
        textColor="text-gray-warm-300"
        reverseIconOrder={true}
      />
    </section>
  );
};

export default Marquee;
