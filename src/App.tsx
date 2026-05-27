import Lenis from "lenis";
import { useEffect } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ScrollProgress from "./components/ScrollProgress";
import Stack from "./components/Stack";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative bg-off-white text-near-black w-full overflow-x-hidden">
      <Navbar />
      <ScrollProgress />

      <main className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Marquee />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
