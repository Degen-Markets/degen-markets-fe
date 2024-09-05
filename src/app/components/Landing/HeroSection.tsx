const HeroSection = () => (
  <section
    className="w-full max-w-screen-2xl mx-auto text-center space-y-10 hidden md:flex flex-col items-center justify-center bg-cover bg-center rounded-3xl px-4 py-16"
    style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
  >
    <h1 className="text-4xl md:text-8xl font-bold leading-none">
      Decentralized Prediction <br /> Markets on Blinks
    </h1>
    <p className="w-full max-w-4xl mx-auto font-semibold text-lg  md:text-xl">
      Make Predictions on Narrative-Driven Events Directly via Twitter. Predict
      Now to Claim YOUR Share of the $306,000 $DGM AirDrop
    </p>
  </section>
);

export default HeroSection;
