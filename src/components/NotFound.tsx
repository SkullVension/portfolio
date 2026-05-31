import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FuzzyText from "./ui/FuzzyText";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-near-black text-off-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(255,107,53,0.3) 0%, transparent 50%)",
        }}
      />

      {/* Decorative diamond */}
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon
            points="100,10 190,100 100,190 10,100"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        {/* 404 fuzzy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <FuzzyText
            fontSize="clamp(6rem, 20vw, 18rem)"
            fontWeight={900}
            color="#FAFAFA"
            baseIntensity={0.15}
            hoverIntensity={0.6}
            enableHover={true}
            fuzzRange={35}
            direction="horizontal"
            transitionDuration={200}
          >
            404
          </FuzzyText>
        </motion.div>

        {/* Message */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p
            className="font-pixel text-xs md:text-sm text-accent"
            style={{ fontFamily: '"Press Start 2P", cursive' }}
          >
            PAGE NOT FOUND
          </p>
          <p className="text-base md:text-lg text-off-white/50 font-light max-w-sm leading-relaxed">
            Looks like this page got lost in the void. It happens to the best of
            us.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-near-black font-medium text-sm hoverable rounded-full"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Home size={16} />
            Back to Home
          </motion.button>

          <motion.button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-off-white/20 text-off-white/70 font-medium text-sm hoverable hover:border-off-white/50 transition-colors duration-200 rounded-full"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
