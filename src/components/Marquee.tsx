import { Code2, Github, Layers, Palette, Server, Wand2 } from "lucide-react";
import ScrollVelocity from "./ui/ScrollVelocity";

const marqueeItems = [
  { text: "FULL STACK DEVELOPER", icon: Layers },
  { text: "UI/UX DESIGN", icon: Palette },
  { text: "FRONTEND DEVELOPER", icon: Code2 },
  { text: "CREATIVE DEVELOPER", icon: Wand2 },
  { text: "MERN STACK DEV", icon: Server },
  { text: "OPEN SOURCE CONTRIBUTOR", icon: Github },
];

const renderRow = (
  items: typeof marqueeItems,
  textColor: string,
  iconColor: string,
  reverseIconOrder: boolean,
) =>
  items.map((item, i) => {
    const Icon = item.icon;
    return (
      <span
        key={i}
        className={`inline-flex items-center gap-2 md:gap-4 text-sm md:text-xl lg:text-3xl ${textColor} mr-8 md:mr-16`}
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        {!reverseIconOrder && (
          <Icon size={16} className={`md:w-6 md:h-6 ${iconColor}`} />
        )}
        {item.text}
        {reverseIconOrder && <Icon size={16} className="md:w-6 md:h-6" />}
      </span>
    );
  });

const row1 = (
  <>{renderRow(marqueeItems, "text-near-black", "text-accent", false)}</>
);
const row2 = (
  <>{renderRow([...marqueeItems].reverse(), "text-gray-warm-300", "", true)}</>
);

const Marquee: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-off-white w-full overflow-hidden flex flex-col gap-3 md:gap-4">
      <ScrollVelocity
        texts={[row1, row2]}
        velocity={80}
        className=""
        parallaxClassName="w-full"
        scrollerClassName="flex items-center gap-0"
      />
    </section>
  );
};

export default Marquee;
