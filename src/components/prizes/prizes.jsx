import React, { useEffect, useState } from "react";
import "./prizes.css";
import right from "@/assets/Landing/right2.svg";
import Image from "next/image";
import top_left from "../../assets/backgrounds/about/topleft.png";
import bottom_right from "../../assets/backgrounds/about/bottomright.png";
import circle2 from "../../assets/backgrounds/about/2circle.png";

function Pricing() {
  const [startCount, setStartCount] = useState(false);
  const prizeAmounts = [10000, 25000, 5000];

  useEffect(() => {
    const handleScroll = () => {
      const pricingSection = document.querySelector(".pricing-section");
      const rect = pricingSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        // Start counting prizes
        setTimeout(() => {
          setStartCount(true);
        }, 1000);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pricing-section pt-[120px]" id="prizes">
      <Image
        className="bottom-right"
        src={bottom_right}
        alt="bot-right"
      />
      <Image className="top-left12" src={top_left} />
      <Image className="circle21 scale-[1.5] right-[100px] opacity-60" src={circle2} />
      <div className="absolute right-0 left-0 top-0 bottom-0" />
      {/* <div className="absolute bg-gradient-to-b from-transparent from-95% to-[#2d0c14] bg-no-repeat inset-0" /> */}
      <h1 className="text-5xl tracking-wider pricing-header font-base-neue-bold max-md:text-4xl">
        PRIZES
      </h1>
      <p className="text-[18px] max-md:text-sm pricing-subheader font-syne-medium pb-[60px]">
        Win exciting prizes in our hackathon!
      </p>
      <div className="tracking-wider pricing-cards font-syne-semibold z-50">
        <div className="pricing-card second-prize glass-card">
          <div className="icon icon-website"></div>
          <h2 className="prize-title font-syne-medium">Second Prize</h2>
          <div className="price">
            ₹{startCount ? <CyclingCount end={prizeAmounts[0]} /> : 0}
          </div>
        </div>

        <div className="pricing-cards first-prize glass-card">
          <div className="icon icon-app"></div>
          <h2 className="prize-title font-syne-medium">First Prize</h2>
          <div className="price">
            ₹{startCount ? <CyclingCount end={prizeAmounts[1]} /> : 0}
          </div>
        </div>

        <div className="pricing-cards third-prize glass-card">
          <div className="icon icon-branding"></div>
          <h2 className="prize-title font-syne-medium">Third Prize</h2>
          <div className="price">
            ₹{startCount ? <CyclingCount end={prizeAmounts[2]} /> : 0}
          </div>
        </div>
      </div>
    </div>
  );
}

function CyclingCount({ end }) {
  const [displayedCount, setDisplayedCount] = useState("0000");
  const endString = end.toString().padStart(4, "0");

  useEffect(() => {
    let frame = 0;
    const duration = 2000;
    const steps = Math.ceil(duration / 50);

    const counter = setInterval(() => {
      frame++;
      const newDisplay = endString.split("").map((digit, index) => {
        if (frame >= steps) return digit;
        return Math.floor(Math.random() * 10);
      });

      setDisplayedCount(newDisplay.join(""));

      if (frame >= steps) {
        clearInterval(counter);
        setDisplayedCount(endString);
      }
    }, 50);

    return () => clearInterval(counter);
  }, [end, endString]);

  return <span>{displayedCount}</span>;
}

export default Pricing;
