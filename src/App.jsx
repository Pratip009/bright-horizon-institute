// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Headers/Header";

import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Courses from "./Pages/Courses/Courses";
import CourseDetail from "./Pages/Courses/CourseDetail";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: false, // whether animation should happen only once
      easing: "ease-in-out", // animation easing
    });
  }, []);
  return (
    <Router>
    
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
