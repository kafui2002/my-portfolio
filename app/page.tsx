import Contact from "@/components/Contact";
import DoodleCursor from "@/components/DoodleCursor";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import { About, Path, Skills, Work } from "@/components/Sections";
import SmoothScroll from "@/components/SmoothScroll";
import SvgDefs from "@/components/SvgDefs";
import ToastProvider from "@/components/Toast";
import Providers from "@/components/Providers";
import { profile } from "@/lib/content";

export default function Home() {
  return (
    <Providers>
      <SmoothScroll>
        <ToastProvider>
          <SvgDefs />
          <ScrollProgress />
          <Nav />
          <main id="top">
            <Hero />
            <About />
            <Work />
            <Skills />
            <Path />
            <Contact />
          </main>
          <footer>
            <div className="wrap foot">
              <span>© {new Date().getFullYear()} {profile.name}. Drawn by hand, trained by gradient descent.</span>
              <span className="hand" style={{ fontSize: "1.3rem" }}>thanks for scrolling!</span>
            </div>
          </footer>
          <DoodleCursor />
        </ToastProvider>
      </SmoothScroll>
    </Providers>
  );
}
