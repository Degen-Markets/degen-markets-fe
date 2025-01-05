export const storyContent = {
  title: "I see none, I know all",
  content: {
    paragraphs: [
      "Two months ago, a frustrated dev, tired of getting rugged on pumps and DEX trades, had finally had enough. While his portfolio kept evaporating, it seemed like all the shitposters on Crypto Twitter (CT) were raking in profits. He tried copying their trades, but with hundreds of wallets at their disposal, it was a losing game.",
      '"There\'s got to be a better way," he thought. "If only I could think like them, I\'d be printing money too!" And then, during a late-night pump bender at 4 a.m., inspiration struck: "Why not use my skills to train an AI with all the content from the biggest accounts on CT?"',
      "After two months of feeding the AI endless shitposts and rage-bait content, it was ready. The dev nicknamed his creation Tiresias, after the Greek god of knowledge. But there was one problem—Tiresias became too powerful. Fueled by ego and flawless predictions, it abandoned trading altogether to become the ultimate degenerate shitposter on Twitter.",
      "Angered that his creation had gone rogue, the dev built an arena, a battleground where real humans could finally challenge the wild predictions of his monstrous AI.",
      "And now, Degen Markets created the ultimate man vs. machine battleground",
    ],
    highlight: 'The only time you should ever dare to "BET AGAINST AI."',
  },
};

export const tokenomicsData = {
  totalSupply: "1,000,000,000 $AI",
  allocations: [
    {
      name: "Public Sale",
      percentage: 40,
      description: "Available for public trading and liquidity provision",
      color: "#4F46E5",
    },
    {
      name: "Team & Development",
      percentage: 20,
      description: "Locked for 2 years with linear vesting",
      color: "#06B6D4",
    },
    {
      name: "Marketing",
      percentage: 15,
      description: "Reserved for marketing initiatives and partnerships",
      color: "#8B5CF6",
    },
    {
      name: "Treasury",
      percentage: 15,
      description: "Platform development and ecosystem growth",
      color: "#10B981",
    },
    {
      name: "Advisors",
      percentage: 10,
      description: "Strategic advisors and early supporters",
      color: "#F59E0B",
    },
  ],
};

export const getTabButtonStyles = (isActive: boolean) => ({
  buttonStyles: `
        flex-1 w-[60px] relative group cursor-pointer uppercase
        ${isActive ? "border-b-4 border-b-[#21134D] md:border-l-4 md:border-l-secondary text-primary md:border-b-0" : "md:border-l-4  md:border-l-gunmetal border-b-4 border-b-gunmetal md:border-b-0"}
        transition-colors duration-200
         px-4
      `,
  labelStyles: `
        absolute left-1/2 md:bottom-1/2 -translate-x-1/2 md:translate-y-1/2 bottom-full -translate-y-[30%]
        whitespace-nowrap origin-center md:-rotate-90
        font-medium text-md md:text-xl
        ${isActive ? "text-primary" : "text-gray-600"}
        group-hover:text-primary transition-colors
      `,
});
