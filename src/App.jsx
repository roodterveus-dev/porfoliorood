import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import ParticleField from "./components/ParticleField";

export default function App() {
  return (
    <div className="min-h-screen text-text">
      <AnimatedBackground />
      <ParticleField />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
