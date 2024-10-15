"use client";
import { Button } from "@/app/components/Button/Button";
import { FormEvent, useState } from "react";
import { subscribeToNewsletter } from "@/app/api/newsletter";

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
      const response = await subscribeToNewsletter(email);

      if (response.status === 200) {
        setSuccess("Thank you for subscribing!");
        setEmail("");
      } else {
        setError("Subscription failed. Please try again later.");
      }
    } catch (error) {
      setSuccess("Thank you for subscribing!");
      //setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="lg:absolute flex items-center justify-center w-full space-x-4 lg:-top-40 bg-white lg:rounded-lg py-12 z-10 h-40 ">
      <div className="w-full lg:w-auto px-12 ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center lg:flex-row items-center lg:space-x-12 w-full"
        >
          <label htmlFor="email" className="text-xl lg:text-3xl mb-4 lg:mb-0">
            Subscribe to Newsletters
          </label>
          <div className="relative w-full lg:w-auto  flex flex-col gap-4">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border rounded-full px-4 py-3 pr-0 lg:pr-36 w-full lg:w-96"
              required
            />
            <Button
              size="regular"
              intent="primary"
              type="submit"
              className="relative lg:absolute lg:top-1 lg:right-1 text-sm text-white"
            >
              Subscribe Now
            </Button>
          </div>
        </form>
        <div className="text-right mt-1">
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
