"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const [fixing, setFixing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFix = () => {
    setFixing(true);
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setFixing(false);
            reset();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

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
          <rect x="50" y="70" width="100" height="100" rx="10" fill="#8F7CFF" />

          {/* Robot head */}
          <rect x="60" y="40" width="80" height="60" rx="10" fill="#A596FF" />

          {/* Robot eyes */}
          <circle cx="85" cy="65" r="10" fill="white" />
          <circle cx="115" cy="65" r="10" fill="white" />

          {/* Robot mouth */}
          <path
            d={
              fixing ? "M 75 85 Q 100 105, 125 85" : "M 75 85 Q 100 75, 125 85"
            }
            stroke="white"
            strokeWidth="3"
            fill="none"
          />

          {/* Robot antenna */}
          <line
            x1="100"
            y1="40"
            x2="100"
            y2="20"
            stroke="#A596FF"
            strokeWidth="4"
          />
          <circle
            cx="100"
            cy="15"
            r="5"
            fill={fixing ? "#3FDA8D" : "#FF5C5C"}
          />

          {/* Robot arms */}
          <line
            x1="50"
            y1="100"
            x2="30"
            y2="120"
            stroke="#A596FF"
            strokeWidth="4"
          />
          <line
            x1="150"
            y1="100"
            x2="170"
            y2="120"
            stroke="#A596FF"
            strokeWidth="4"
          />

          {/* Robot legs */}
          <line
            x1="75"
            y1="170"
            x2="75"
            y2="190"
            stroke="#A596FF"
            strokeWidth="4"
          />
          <line
            x1="125"
            y1="170"
            x2="125"
            y2="190"
            stroke="#A596FF"
            strokeWidth="4"
          />
        </svg>
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in-dow">
          Oops! Something went wrong
        </h1>
        <p className="text-xl text-lavender-blue mb-8">
          {error.message ||
            "An unexpected error occurred. Let's try to fix it!"}
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Button onClick={handleFix} disabled={fixing}>
            {fixing ? "Fixing..." : "Try to fix"}
          </Button>
          {fixing && (
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-200 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <Link href="/">
            <Button intent="secondary">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
