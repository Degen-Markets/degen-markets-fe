const HeroSection = () => (
  <section
    className="w-full overflow-hidden relative max-w-screen-2xl mx-auto text-center space-y-10 hidden md:flex flex-col items-center justify-center bg-cover bg-center bg-indigo-medium rounded-3xl px-4 py-16"
    style={{ backgroundImage: "url(/images/hero-bg.gif)" }}
  >
    <div className="backdrop-blur-lg bg-black-main/30 absolute right-0 left-0 top-0 bottom-0 z-0"></div>
    <h1 className="text-4xl md:text-8xl font-bold leading-none z-10">
      Decentralized Prediction <br /> Markets on Blinks
    </h1>
    <p className="w-full max-w-4xl mx-auto font-semibold text-lg  md:text-xl z-10">
      Make Predictions on Narrative-Driven Events Directly via Twitter. Predict
      Now to Claim YOUR Share of the $DGM AirDrop
    </p>
  </section>
);

export default HeroSection;
