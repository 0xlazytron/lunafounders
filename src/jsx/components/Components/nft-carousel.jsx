"use client";

import { useState, useEffect } from "react";
import LunaNFT from "../../../images/3DLunaNFT.png";

export default function NFTCarousel({
  images = [LunaNFT, LunaNFT, LunaNFT],
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const containerStyle = {
    width: "100%",
    position: "relative",
  };

  const carouselContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    position: "relative",
  };

  return (
    <div style={containerStyle} className={className || ""}>
      <div style={carouselContainerStyle}>
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index === activeIndex - 1 ||
            (activeIndex === 0 && index === images.length - 1);
          const isNext =
            index === activeIndex + 1 ||
            (activeIndex === images.length - 1 && index === 0);

          if (!isActive && !isPrev && !isNext) return null;

          const itemStyle = {
            position: "absolute",
            transition: "all 0.5s ease-in-out",
            transform: isActive
              ? "scale(1)"
              : isPrev
              ? "scale(0.85) translateX(-80%)"
              : "scale(0.85) translateX(80%)",
            opacity: isActive ? 1 : 0.7,
            zIndex: isActive ? 30 : 20,
          };

          const imgStyle = {
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0)",
            maxHeight: "400px",
            width: "auto",
          };

          return (
            <div key={index} style={itemStyle}>
              <img
                src={image || "/placeholder.svg"}
                alt={`NFT ${index + 1}`}
                style={imgStyle}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          gap: "8px",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              transition: "all 0.3s",
              backgroundColor: activeIndex === index ? "white" : "transparent",
              border: "white 1px solid",
              cursor: "pointer",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
