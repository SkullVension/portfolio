import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React",
  "Next.js",
  "Tailwind",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Firebase",
  "React Native",
  "Expo",
  "Three.js",
  "Framer Motion",
  "GSAP",
  "Vite",
  "Figma",
  "Bootstrap",
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgShapeRef.current || !sectionRef.current) return;

    gsap.to(bgShapeRef.current, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-32 lg:py-48 px-6 md:px-12 overflow-hidden w-full"
    >
      {/* Decorative background shape */}
      <div
        ref={bgShapeRef}
        className="absolute top-1/4 right-0 w-48 md:w-96 h-48 md:h-96 opacity-10 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            fill="currentColor"
            className="text-accent"
            d="M47.5,-57.2C59.9,-46.8,67.3,-31.6,71.1,-15.3C74.9,1.1,75.1,18.5,68.5,33.3C61.9,48.2,48.5,60.6,33.1,68.3C17.6,76,0.2,79.1,-15.6,76.4C-31.4,73.7,-45.6,65.2,-56.3,53.3C-66.9,41.4,-74,26,-77.1,9.5C-80.2,-7.1,-79.3,-24.5,-71.6,-38.1C-63.9,-51.7,-49.4,-61.4,-34.5,-71.1C-19.6,-80.8,-4.1,-90.5,10.3,-86.6C24.7,-82.7,35.1,-67.6,47.5,-57.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section heading */}
        <div className="mb-12 md:mb-16 lg:mb-24 overflow-hidden">
          <motion.h2
            ref={headingRef}
            className="font-pixel text-xl md:text-2xl lg:text-4xl mb-4"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            ABOUT
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-start">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-warm-700 mb-6 md:mb-8">
              I'm a creative developer based in Ethiopia, focused on building
              digital experiences that blend technical precision with thoughtful
              design.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-gray-warm-600 mb-6 md:mb-8">
              Full-stack developer with three years of experience building
              things that actually work and don't hurt to look at. I like the
              challenge of taking messy problems and turning them into clean,
              intuitive products - from pixel-perfect frontends to the backend
              logic holding it all together. Fast-paced, collaborative, and
              always curious.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-gray-warm-600">
              When I'm not coding, you can find me exploring new coffee spots or
              contributing to open source projects :3
            </p>
          </motion.div>

          {/* Right - Skills */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xs md:text-sm font-mono tracking-widest text-gray-warm-500 mb-4 md:mb-6"
            >
              THINGS I WORK WITH
            </motion.p>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-3 md:px-4 py-1.5 md:py-2 border border-gray-warm-300 text-xs md:text-sm font-medium hoverable hover:bg-near-black hover:text-off-white transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12"
        >
          {[
            { value: "3+", label: "Years Experience" },
            { value: "30+", label: "Projects Delivered" },
            { value: "3000+", label: "Hours of Coding" },
            { value: "∞", label: "Coffee Consumed" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.p
                className="font-pixel text-xl md:text-3xl lg:text-5xl mb-2 md:mb-3"
                style={{ fontFamily: '"Press Start 2P", cursive' }}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs md:text-sm text-gray-warm-600">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
