import { motion, useSpring } from "framer-motion";
import {
  ArrowRight,
  Github,
  Mail,
  MapPin,
  MessageCircle,
  Twitter,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import WordReveal from "./ui/WordReveal";

const Contact: React.FC = () => {
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      springX.set((e.clientX - centerX) * 0.01);
      springY.set((e.clientY - centerY) * 0.01);
    };

    const handleMouseLeave = () => {
      springX.set(0);
      springY.set(0);
    };

    const container = sectionRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 md:py-32 lg:py-48 px-6 md:px-12 bg-near-black text-off-white overflow-hidden w-full"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 md:w-96 h-32 md:h-96 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(255,107,53,0.3) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section heading */}
        <div className="mb-12 md:mb-16 lg:mb-24 overflow-hidden">
          <motion.h2
            className="font-pixel text-md md:text-xl lg:text-3xl"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            LET'S WORK TOGETHER
          </motion.h2>
          {/* <motion.div
            className="h-px bg-off-white/20 origin-left mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
          /> */}
        </div>

        {/* Large magnetic text */}
        <div ref={containerRef} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true }}
          >
            <motion.a
              href="mailto:calebephrem@proton.me"
              className="block group relative w-full"
              style={{ x: springX, y: springY }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <motion.h3
                className="font-pixel text-8xl md:text-6xl lg:text-8xl leading-none fill-text transition-all duration-500 group-hover:[-webkit-text-fill-color:#FAFAFA] hoverable text-center md:text-left"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  WebkitTextStrokeWidth: "2px",
                  WebkitTextStrokeColor: "#FAFAFA",
                  WebkitTextFillColor: "transparent",
                  animation: "blink-fill 3s step-end infinite",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                SAY HI
              </motion.h3>
            </motion.a>
          </motion.div>

          <div className="mt-8 md:mt-12 lg:mt-16">
            <WordReveal
              text=" Have a project in mind? I'd love to hear about it. Let's create something amazing together."
              className="text-lg md:text-xl lg:text-2xl font-light text-off-white/70 max-w-2xl leading-relaxed mb-6 md:mb-8"
              delay={0.1}
            ></WordReveal>

            <motion.a
              href="mailto:calebephrem@proton.me"
              className="inline-flex text-2xl items-center gap-3 …"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
            >
              <Mail size={20} className="md:w-6 md:h-6" />
              <span>calebephrem@proton.me</span>
              <motion.span
                className="inline-block"
                whileHover={{ x: 5, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </motion.a>
          </div>
        </div>

        {/* Bottom info */}
        <motion.div
          className="mt-16 md:mt-24 lg:mt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div
            className="w-full md:w-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <p className="text-xs md:text-sm font-mono tracking-widest text-off-white/50 mb-2 md:mb-3">
              LOCATION
            </p>
            <p className="text-base md:text-lg flex items-center gap-2">
              <MapPin size={16} className="md:w-5 md:h-5 text-accent" />
              Addis Ababa, Ethiopia
            </p>
          </motion.div>

          <motion.div
            className="w-full md:w-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            {" "}
            {/* AVAILABLE */}
            <p className="text-xs md:text-sm font-mono tracking-widest text-off-white/50 mb-2 md:mb-3">
              AVAILABILE
            </p>
            <p className="text-base md:text-lg flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Let's Build Something
            </p>
          </motion.div>

          <motion.div
            className="w-full md:w-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            {" "}
            {/* SOCIAL */}
            <p className="text-xs md:text-sm font-mono tracking-widest text-off-white/50 mb-2 md:mb-3">
              SOCIAL
            </p>
            <motion.div
              className="flex gap-4 md:gap-6 flex-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
            >
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  href: "https://github.com/calebephrem",
                },
                {
                  icon: MessageCircle,
                  label: "Discord",
                  href: "https://discord.gg/calebephrem",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://x.com/calebephrem",
                },
              ].map(({ icon: Icon, label, href }) => (
                <>
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg hoverable relative group flex items-center gap-3"
                  >
                    <Icon size={16} className="md:w-5 md:h-5" />
                    <span>{label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                </>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
