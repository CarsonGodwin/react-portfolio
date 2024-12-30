import "./App.css";
import Layout from "./components/layout/Layout";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";

function App() {
  return (
    <div className="App">
      <Layout>
        <About />
        <Experience />
        <Projects />
        <Contact />
      </Layout>
    </div>
  );
}

export default App;
