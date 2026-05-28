import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 md:py-12 px-6 md:px-12 bg-off-white w-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gray-warm-200 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
      />
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="font-pixel text-xs md:text-sm tracking-tighter hoverable"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              visible: {
                clipPath: "inset(0 0% 0 0)",
                transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
            whileHover={{ scale: 1.05 }}
          >
            CALEB
          </motion.a>

          {/* Copyright */}
          <motion.p
            className="text-xs md:text-sm text-gray-warm-600 order-3 md:order-2"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            © {currentYear} Caleb Ephrem. All rights reserved.
          </motion.p>

          {/* Back to top */}
          <motion.a
            href="#"
            className="text-sm font-medium hoverable group flex items-center gap-2 order-2 md:order-3"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -2 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top
            <motion.span
              className="inline-block"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUp size={16} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
