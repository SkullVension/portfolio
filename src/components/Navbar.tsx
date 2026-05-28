import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

// Animation phases:
// 0 = pill dropped in + bounced (y settled, narrow width)
// 1 = pill expanded to full width
// 2 = contents visible
const PHASE_DURATION = {
  drop: 0.7, // pill falls from -100 and bounces
  expand: 0.55, // pill widens
  reveal: 0.4, // contents stagger in
};

const PHASE_DELAY = {
  drop: 0.1,
  expand: 0.85, // after drop settles
  reveal: 1.45, // after expand finishes
};

const MagneticNavItem: React.FC<{
  item: { label: string; href: string };
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  revealDelay: number;
}> = ({ item, isActive, onClick, revealDelay }) => {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);

  const handleMouseLeave = () => {
    if (!itemRef.current) return;
    itemRef.current.style.transform = "translate(0, 0)";
    setHover(false);
  };

  return (
    <motion.a
      ref={itemRef}
      href={item.href}
      onClick={(e) => onClick(e, item.href)}
      className="relative px-3 lg:px-4 py-2 text-sm font-medium tracking-wide hoverable group whitespace-nowrap"
      style={{
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: PHASE_DURATION.reveal,
        delay: PHASE_DELAY.reveal + revealDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10">{item.label}</span>

      {/* Sliding underline */}
      <motion.span
        className="absolute bottom-1 left-3 lg:left-4 h-0.5 bg-accent"
        animate={{ width: hover ? "calc(100% - 24px)" : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.a>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" },
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      lenis.destroy();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* ── Desktop Navbar ── */}
      <motion.nav
        className="fixed left-0 right-0 top-4 z-50 hidden md:flex justify-center pointer-events-none"
        // Phase 1: drop from above with a bounce
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: {
            duration: PHASE_DURATION.drop,
            delay: PHASE_DELAY.drop,
            ease: [0.22, 1.4, 0.36, 1],
          },
          opacity: {
            duration: 0.25,
            delay: PHASE_DELAY.drop,
          },
        }}
      >
        {/* Phase 2: pill expands width after bounce lands */}
        <motion.div
          className={`flex items-center gap-1 px-2 py-2 rounded-full pointer-events-auto transition-[background,border-color,box-shadow] duration-500 ${
            isScrolled
              ? "bg-white/30 backdrop-blur-3xl border border-white/40 shadow-lg shadow-black/10"
              : "bg-white/10 backdrop-blur-sm border border-white/20"
          }`}
          // Start narrow (logo-only width), expand to full
          initial={{ width: 80, overflow: "hidden" }}
          animate={{
            width: "auto",
            overflow: "visible",
            scale: isScrolled ? 0.98 : 1,
          }}
          transition={{
            width: {
              duration: PHASE_DURATION.expand,
              delay: PHASE_DELAY.expand,
              ease: [0.76, 0, 0.24, 1],
            },
            scale: { duration: 0.3 },
          }}
        >
          {/* Logo — first to appear, stays visible during narrow phase */}
          <motion.a
            href="#"
            className="px-4 py-2 font-pixel text-xs tracking-tighter hoverable whitespace-nowrap relative overflow-hidden group flex-shrink-0"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: PHASE_DELAY.drop + PHASE_DURATION.drop * 0.6,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">Caleb</span>
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 w-full bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Everything below fades in after pill expands */}

          {/* Divider */}
          <motion.div
            className="w-px h-6 bg-gray-warm-200 mx-2 flex-shrink-0"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              duration: 0.3,
              delay: PHASE_DELAY.reveal,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item, index) => (
              <MagneticNavItem
                key={item.href}
                item={item}
                isActive={activeSection === item.href}
                onClick={handleNavClick}
                revealDelay={index * 0.07}
              />
            ))}
          </div>

          {/* Divider */}
          <motion.div
            className="w-px h-6 bg-gray-warm-200 mx-2 flex-shrink-0"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              duration: 0.3,
              delay: PHASE_DELAY.reveal + 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center gap-2 px-4 lg:px-5 py-2.5 bg-near-black text-off-white text-sm font-medium rounded-full hoverable group whitespace-nowrap relative overflow-hidden flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: PHASE_DELAY.reveal + navItems.length * 0.07 + 0.05,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-accent rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <span>Let's Talk</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </motion.a>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Menu Button ── */}
      <motion.button
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: PHASE_DURATION.drop,
          delay: PHASE_DELAY.drop + 0.1,
          ease: [0.22, 1.4, 0.36, 1],
        }}
        className={`fixed top-4 right-4 z-50 md:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${
          isOpen
            ? "bg-near-black text-off-white"
            : "bg-white/80 backdrop-blur-md shadow-lg"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-off-white md:hidden overflow-hidden"
          >
            {/* Decorative accent line */}
            <motion.div
              className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <div className="flex flex-col items-center justify-center h-full w-full px-6 gap-2">
              {navItems.map((item, index) => (
                <div key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-2xl md:text-4xl font-pixel mb-6 md:mb-8 hoverable text-center block relative group"
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                    whileHover={{ x: 8, color: "#ff6b35" }}
                  >
                    <span>{item.label}</span>
                    <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-warm-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      0{index + 1}
                    </span>
                  </motion.a>
                </div>
              ))}

              <div className="overflow-hidden mt-4">
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-near-black text-off-white font-medium text-lg md:text-xl rounded-full hoverable"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + navItems.length * 0.1,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
