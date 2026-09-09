import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminContacts from "./components/AdminContacts";
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      {isLoggedIn ? (
        <AdminContacts onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
      <Footer />
    </>
  );
}

export default App;
