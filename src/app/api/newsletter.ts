import axios from "axios";

export const subscribeToNewsletter = async (email: string) => {
  try {
    return await axios.post("/newsletter", { email });
  } catch (error) {
    throw new Error("Subscription failed. Please try again.");
  }
};
