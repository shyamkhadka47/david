"use client";

import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PageWrapper({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
