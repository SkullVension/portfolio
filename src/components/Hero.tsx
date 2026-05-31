import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ShinyText from "./ui/ShinyText";
import TextType from "./ui/TextType";

gsap.registerPlugin(ScrollTrigger);

const headlines = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Building things for the web",
];

const Hero: React.FC = () => {
  const [status, setStatus] = useState<
    | {
        status: string;
        activity: string;
      }
    | undefined
  >(undefined);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef1 = useRef<HTMLDivElement>(null);
  const bgRef2 = useRef<HTMLDivElement>(null);
  const bgRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      if (bgRef1.current) {
        gsap.to(bgRef1.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out",
        });
      }
      if (bgRef2.current) {
        gsap.to(bgRef2.current, {
          x: -xPos * 0.8,
          y: -yPos * 0.8,
          duration: 1.8,
          ease: "power2.out",
        });
      }
      if (bgRef3.current) {
        gsap.to(bgRef3.current, {
          x: -xPos * 0.5,
          y: yPos * 0.5,
          duration: 2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.to(".hero-bg-1", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero-bg-2", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const userId = "1411006542916091975";
        const url = `https://api.lanyard.rest/v1/users/${userId}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`,
          );
        }

        const data = await res.json();

        setStatus({
          status: data.data.discord_status,
          activity: data.data.activities?.[0]?.name || null,
        });

        console.log(data);
      } catch (err) {
        console.error(`Error fetching data:`, err);
      }
    };

    load();
  }, []);

  const buttonRef = useRef<HTMLAnchorElement>(null);

  const words = ["Hello,", "I'm Caleb"];

  const statusColor = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    offline: "bg-gray-500",
    dnd: "bg-red-500",
  } as const;

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={bgRef1}
          className="hero-bg-1 absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          ref={bgRef2}
          className="hero-bg-2 absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(10,10,10,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          ref={bgRef3}
          className="hero-bg-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(200,100,50,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          {status?.status &&
            status.status.toLocaleLowerCase() !== "offline" && (
              <span className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest text-gray-warm-600 bg-white/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full">
                <span
                  className={`w-2 h-2 rounded-full ${statusColor[status?.status?.toLowerCase() as keyof typeof statusColor]}`}
                />
                {status.activity
                  ? `${status.status} • ${status.activity}`
                  : status?.status}
              </span>
            )}
        </motion.div>

        {/* Main heading with staggered clip-path reveal */}
        {words.map((word, wordIndex) => (
          <div key={wordIndex} className="overflow-hidden mb-1 md:mb-2">
            <motion.h1
              className="font-pixel text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
              initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              transition={{
                clipPath: {
                  duration: 0.8,
                  delay: 0.3 + wordIndex * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                y: {
                  duration: 0.8,
                  delay: 0.3 + wordIndex * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
            >
              {word.split(" ").map((w, i) => (
                <span key={i}>
                  {w.toLowerCase() === "caleb" ? (
                    <ShinyText
                      text={w}
                      speed={2}
                      delay={1.375}
                      color="#ff6b35"
                      shineColor="#ffcfaf"
                      spread={120}
                      direction="left"
                      yoyo={false}
                      pauseOnHover={false}
                      disabled={false}
                    />
                  ) : (
                    w
                  )}
                  {i < word.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </motion.h1>
          </div>
        ))}

        {/* Typewriter headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-4 md:mt-8 h-8 md:h-12 lg:h-16"
        >
          <TextType
            text={headlines}
            typingSpeed={75}
            pauseDuration={1500}
            deletingSpeed={50}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-warm-700"
            showCursor
            cursorCharacter="|"
          />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl font-light text-gray-warm-600 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Turning caffeine and curiosity into things you can click on.
        </motion.p>

        {/* Magnetic CTA */}
        <motion.div
          className="mt-8 md:mt-12 lg:mt-16 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <motion.a
            ref={buttonRef}
            href="#work"
            className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-near-black text-off-white font-medium text-sm tracking-wide hoverable overflow-hidden rounded-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>VIEW WORK</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono tracking-widest text-gray-warm-500">
            SCROLL
          </span>
          <ChevronDown size={20} className="text-gray-warm-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
