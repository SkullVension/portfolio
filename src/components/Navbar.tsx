import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
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
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="fixed left-0 right-0 top-4 z-50 hidden md:flex justify-center transition-all duration-500"
        style={{
          top: "16px",
        }}
      >
        <motion.div
          className={`flex items-center gap-1 px-2 py-2 rounded-full max-w-4xl w-max transition-all duration-500 ${
            isScrolled
              ? "bg-white/30 backdrop-blur-3xl border border-white/40 shadow-lg shadow-black/10"
              : "bg-white/10 backdrop-blur-sm border border-white/20"
          }`}
          animate={{ scale: isScrolled ? 0.98 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="px-4 py-2 font-pixel text-xs tracking-tighter hoverable whitespace-nowrap"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            whileHover={{ scale: 1.05 }}
          >
            Caleb
          </motion.a>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-warm-200 mx-2" />

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative px-3 lg:px-4 py-2 text-sm font-medium tracking-wide hoverable group whitespace-nowrap"
              >
                <span className="relative z-10">{item.label}</span>

                {/* Sliding underline */}
                <motion.span
                  className="absolute bottom-1 left-3 lg:left-4 h-0.5 bg-accent transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "calc(100% - 24px)" }}
                />

                {/* Active indicator dot */}
                <AnimatePresence>
                  {activeSection === item.href && (
                    <motion.span
                      className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-warm-200 mx-2" />

          {/* CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center gap-2 px-4 lg:px-5 py-2.5 bg-near-black text-off-white text-sm font-medium rounded-full hoverable group whitespace-nowrap"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Talk</span>
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </motion.a>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed top-4 right-4 z-50 md:hidden flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ${
          isOpen
            ? "bg-near-black text-off-white"
            : "bg-white/80 backdrop-blur-md shadow-lg"
        }`}
        onClick={() => setIsOpen(!isOpen)}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-off-white md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full w-full px-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-2xl md:text-4xl font-pixel mb-6 md:mb-8 hoverable text-center"
                  style={{ fontFamily: '"Press Start 2P", cursive' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-near-black text-off-white font-medium text-lg md:text-xl rounded-full hoverable mt-6 md:mt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Let's Talk</span>
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
