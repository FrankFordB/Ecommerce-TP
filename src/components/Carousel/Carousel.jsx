import React, { useEffect, useState } from "react";
import "./Carousel.css";

const slides = [
  {
    image: "src/Img/mercadopulga5.jpg",
    title: "¡Oferta exclusiva en tecnología!",
  },
  {
    image: "src/Img/mercadopulga2.jpg",
    title: "Moda verano 2025",
  },
  {
    image: "src/Img/mercadopulga3.jpg",
    title: "Electrodomésticos con hasta 70% off",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  // useEffect (() => { 
  //     setTimeout(() => {
  //      setCurrentIndex((prev) => (prev + 1) % slides.length);
  //      return;
  //     }, 8000);
  // }, [nextSlide, goToSlide ])

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img
          src={slides[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
        />
        <div className="carousel-caption">
          <h3>{slides[currentIndex].title}</h3>
        </div>
        <button className="carousel-btn prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;