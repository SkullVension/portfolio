import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 md:py-12 px-6 md:px-12 bg-off-white border-t border-gray-warm-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-pixel text-xs md:text-sm tracking-tighter hoverable"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
            whileHover={{ scale: 1.05 }}
          >
            CALEB
          </motion.a>

          {/* Copyright */}
          <p className="text-xs md:text-sm text-gray-warm-600 order-3 md:order-2">
            © {currentYear} Caleb Ephrem. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.a
            href="#"
            className="text-sm font-medium hoverable group flex items-center gap-2 order-2 md:order-3"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
