"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button/Button";

export default function NotFound() {
  const [blink, setBlink] = useState(false);
  const [searchDirection, setSearchDirection] = useState("left");
  const [foundSomething, setFoundSomething] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 3000);

    const searchInterval = setInterval(() => {
      setSearchDirection((prev) => (prev === "left" ? "right" : "left"));
    }, 2000);

    const foundInterval = setInterval(() => {
      setFoundSomething(true);
      setTimeout(() => setFoundSomething(false), 1000);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(searchInterval);
      clearInterval(foundInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <svg
          className="w-64 h-64 mx-auto mb-8"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Robot body */}
          <rect
            x="50"
            y="70"
            width="100"
            height="100"
            rx="10"
            fill="#8F7CFF"
            className={`transition-transform duration-500 ease-in-out ${searchDirection === "left" ? "-translate-x-2" : "translate-x-2"}`}
          />

          {/* Robot head */}
          <rect
            x="60"
            y="40"
            width="80"
            height="60"
            rx="10"
            fill="#A596FF"
            className={`transition-transform duration-500 ease-in-out ${searchDirection === "left" ? "-translate-x-4 -rotate-6" : "translate-x-4 rotate-6"}`}
          />

          {/* Robot eyes */}
          <circle
            cx="85"
            cy="65"
            r="10"
            fill={blink ? "#8F7CFF" : "white"}
            className={`transition-all duration-500 ${searchDirection === "left" ? "-translate-x-4" : "translate-x-4"}`}
          />
          <circle
            cx="115"
            cy="65"
            r="10"
            fill={blink ? "#8F7CFF" : "white"}
            className={`transition-all duration-500 ${searchDirection === "left" ? "-translate-x-4" : "translate-x-4"}`}
          />

          {/* Robot mouth */}
          <path
            d={
              foundSomething
                ? "M 75 85 Q 100 105, 125 85"
                : "M 75 85 Q 100 95, 125 85"
            }
            stroke="white"
            strokeWidth="3"
            fill="none"
            className={`transition-all duration-500 ${searchDirection === "left" ? "-translate-x-4" : "translate-x-4"}`}
          />

          {/* Robot antenna */}
          <line
            x1="100"
            y1="40"
            x2="100"
            y2="20"
            stroke="#A596FF"
            strokeWidth="4"
            className={`transition-transform duration-500 origin-bottom ${searchDirection === "left" ? "-rotate-15" : "rotate-15"}`}
          />
          <circle
            cx="100"
            cy="15"
            r="5"
            fill={foundSomething ? "#3FDA8D" : "#FF5C5C"}
            className="transition-colors duration-300"
          />

          {/* Robot arms */}
          <line
            x1="50"
            y1="100"
            x2="30"
            y2="120"
            stroke="#A596FF"
            strokeWidth="4"
            className={`transition-transform duration-500 origin-top-right ${searchDirection === "left" ? "rotate-30" : "-rotate-15"}`}
          />
          <line
            x1="150"
            y1="100"
            x2="170"
            y2="120"
            stroke="#A596FF"
            strokeWidth="4"
            className={`transition-transform duration-500 origin-top-left ${searchDirection === "left" ? "rotate-15" : "-rotate-30"}`}
          />

          {/* Magnifying glass */}
          <circle
            cx={searchDirection === "left" ? "20" : "180"}
            cy="150"
            r="15"
            stroke="#FFDEAA"
            strokeWidth="4"
            className="transition-all duration-500"
          />
          <line
            x1={searchDirection === "left" ? "30" : "170"}
            y1="160"
            x2={searchDirection === "left" ? "50" : "150"}
            y2="180"
            stroke="#FFDEAA"
            strokeWidth="4"
            className="transition-all duration-500"
          />
        </svg>
        <h1 className="text-4xl font-bold text-swhite mb-4 animate-fade-in-down">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-lavender-blue mb-8 animate-fade-in-up">
          Oops! Our robot is searching for the missing page...
        </p>
        <div className="animate-fade-in flex justify-center">
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
