import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Particles from "react-tsparticles";
import particlesConfig from "./config/ParticlesConfig";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      {/* Animated Background */}
      <Particles
        id="tsparticles"
        options={particlesConfig}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Layout>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </Layout>
      </div>
    </div>
  );
}

export default App;
