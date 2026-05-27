import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Quantum Theme",
    category: "VS Code Theme",
    year: "2025",
    image:
      "https://github.com/calebephrem/quantum-vscode/raw/main/assets/themes/quantum.png?raw=true",
    href: "https://marketplace.visualstudio.com/items?itemName=CalebEphrem.quantum",
    source: "https://github.com/calebephrem/quantum-vscode",
    description:
      "Best blue, lime, yellow, purple and cyan comboed vscode theme",
  },
  {
    id: 2,
    title: "QuillBot",
    category: "Discord Bot",
    year: "2026",
    image:
      "https://repository-images.githubusercontent.com/1114544402/1bbe0504-4b67-4d65-bda6-a5be0f76ef60",
    href: "https://discord.com/oauth2/authorize?client_id=1447982776740610058",
    source: "https://github.com/open-devhub/quillbot",
    description: "Advanced Discord developer assistant bot",
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-16 md:py-32 lg:py-48 px-6 md:px-12 bg-gray-warm-50 w-full overflow-hidden"
    >
      {/* Decorative SVG */}
      <div className="absolute top-32 left-0 w-32 md:w-64 h-32 md:h-64 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-near-black">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section heading */}
        <div className="mb-12 md:mb-16 lg:mb-24 overflow-hidden">
          <motion.h2
            className="font-pixel text-xl md:text-2xl lg:text-4xl"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            WORK
          </motion.h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <a
            href="https://github.com/calebephrem?tab=repositories&q=&type=&language=&sort=stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 font-medium text-base md:text-lg hoverable group"
          >
            <span className="relative overflow-hidden">
              View All Projects
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-near-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <ArrowUpRight
              size={18}
              className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 md:w-5 md:h-5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative overflow-hidden"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-warm-100 mb-4 md:mb-6">
          <motion.img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            // whileHover={{ scale: 1.35 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Card info */}
        <div className="flex justify-between items-start">
          <div>
            <motion.h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-1 md:mb-2 group-hover:text-accent transition-colors duration-300">
              {project.title}
            </motion.h3>
            <p className="text-xs md:text-sm text-gray-warm-600">
              {project.category}
            </p>
          </div>
          <span className="text-xs md:text-sm font-mono text-gray-warm-500">
            {project.year}
          </span>
        </div>
      </motion.div>
    </a>
  );
};

export default Projects;
