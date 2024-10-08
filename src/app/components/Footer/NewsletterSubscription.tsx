"use client";
import { Button } from "@/app/components/Button/Button";
import { FormEvent, useState } from "react";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess("Thank you for subscribing!");
        setEmail("");
      } else {
        setError("Subscription failed. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="absolute flex items-center justify-center w-full space-x-4 -top-40 bg-white rounded-lg py-12 z-10 h-40">
      <form onSubmit={handleSubmit} className="flex items-center space-x-12">
        <label htmlFor="email" className="text-3xl">
          Subscribe to Newsletters
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border rounded-full px-4 py-3 pr-36 w-96"
            required
          />
          <Button
            size="small"
            intent="primary"
            type="submit"
            className="absolute top-1 right-1  text-sm text-white"
          >
            Subscribe Now
          </Button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default NewsletterSubscription;
