import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/Layout';
import Projects from './components/sections/Projects';


function App() {
  return (
    <div className="App">
      <Layout>
      <section id="home">
        <h1>Welcome to My Portfolio</h1>
      </section>
      <section id="about">
        <h2>About Me</h2>
        <p>This is the about section.</p>
      </section>
      <Projects />
      <section id="contact">
        <h2>Contact Me</h2>
        <p>Feel free to reach out!</p>
      </section>
      </Layout>

    </div>

  );
}

export default App;
