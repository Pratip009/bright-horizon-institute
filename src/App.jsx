// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Headers/Header";
import PaymentOptions from "./Pages/Payment/PaymentOption";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Courses from "./Pages/Courses/Courses";
import CourseDetail from "./Pages/Courses/CourseDetail";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";
import PaymentAccept from "./Pages/Payment/PaymentAccept";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import Blog from "./Pages/Blog/blog";
import BlogDetails from "./Pages/Blog/BlogDetails";
import Gallery from "./Pages/Gallery/Gallery";
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/payment/:id" element={<PaymentAccept />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route path="/success" element={<PaymentSuccess />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
// 2d9e64f5529b81d9b6f82e2fe38b04dfa54cbe9bd50f8dadf59ca3a545f6108498dab5b14d328ecd469ed318f8d9edfdadbf44f66c01aa68dbb9a04c8b4853f146111b7cba8955e4b20206d823d7792c06a5dd75f57116848a38487779cccf87502e5cabaf64c80c5287c3272eb4adf779d6be098e3e5c35032649dc2215d2ef