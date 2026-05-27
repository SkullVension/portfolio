import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Server, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const stackItems = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building interfaces that are fast, accessible, and built to scale. React, Next.js, and Tailwind are my tools of choice - with a focus on clean architecture, smooth interactions, and layouts that hold up across every device.",
  },
  {
    icon: Server,
    title: "Backend Systems",
    description:
      "Designing APIs and services with reliability and maintainability in mind. MongoDB, Express, Node.js, and cloud infrastructure - writing backend code that performs under pressure and stays readable long after it ships.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Great design removes friction. I work from design to production with careful attention to typography, spacing, and interaction - making sure the final product feels as considered as it looks.",
  },
  {
    icon: Sparkles,
    title: "Creative Development",
    description:
      "Exploring the edges of what's possible on the web. Three.js, generative art, and interactive experiments - crafting digital experiences that go beyond the expected and leave a lasting impression.",
  },
];

const Stack: React.FC = () => {
  return (
    <section
      id="stack"
      className="relative bg-near-black text-off-white w-full overflow-hidden"
    >
      {/* On desktop - horizontal scroll, on mobile - vertical scroll */}
      <div className="hidden md:block">
        <DesktopStack />
      </div>
      <div className="block md:hidden">
        <MobileStack />
      </div>
    </section>
  );
};

const DesktopStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const slides = slidesRef.current;
    const section = sectionRef.current;

    if (!container || !slides || !section) return;

    const totalWidth = (stackItems.length * 0.6 - 1) * window.innerWidth;

    const scrollTween = gsap.to(slides, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progressRef.current) {
            progressRef.current.style.width = `${progress * 100}%`;
          }
          const slideIndex = Math.min(
            Math.floor(progress * stackItems.length),
            stackItems.length - 1,
          );
          setActiveSlide(slideIndex);
        },
      },
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <article ref={sectionRef} className="relative" style={{ height: "100vh" }}>
      {/* Section heading */}
      <div className="absolute top-8 md:top-16 left-0 right-0 px-6 md:px-12 z-20">
        <motion.h2
          className="font-pixel text-xl md:text-2xl lg:text-4xl text-off-white"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          STACK
        </motion.h2>
      </div>

      {/* Progress line */}
      <div className="absolute top-24 md:top-32 left-6 md:left-12 right-6 md:right-12 h-px bg-off-white/20 z-20">
        <div
          ref={progressRef}
          className="h-full bg-accent transition-all duration-300"
          style={{ width: "0%" }}
        />
      </div>

      {/* Slides container */}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-visible"
      >
        <div
          ref={slidesRef}
          className="flex h-full items-center"
          style={{ width: `${stackItems.length * 60}vw`, paddingLeft: "10vw" }}
        >
          {stackItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[60vw] h-[70vh] flex items-center px-6 md:px-12"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-2xl">
                  <div className="mb-6 md:mb-8">
                    <Icon
                      size={60}
                      className="md:w-20 md:h-20 lg:w-24 lg:h-24 text-accent"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-2xl md:text-4xl lg:text-6xl font-semibold mb-4 md:mb-6 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed text-off-white/70 max-w-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 md:bottom-16 right-6 md:right-12 flex gap-2 z-20">
        {stackItems.map((_, index) => (
          <div
            key={index}
            className={`w-8 md:w-12 h-1 transition-all duration-300 ${
              index === activeSlide ? "bg-accent" : "bg-off-white/20"
            }`}
          />
        ))}
      </div>
    </article>
  );
};

const MobileStack: React.FC = () => {
  return (
    <article className="py-16 px-6">
      {/* Section heading */}
      <div className="mb-12 overflow-hidden">
        <motion.h2
          className="font-pixel text-xl text-off-white"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          STACK
        </motion.h2>
      </div>

      {/* Vertical stack on mobile */}
      <div className="space-y-12">
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <Icon size={48} className="text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-off-white/70">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </article>
  );
};

export default Stack;
