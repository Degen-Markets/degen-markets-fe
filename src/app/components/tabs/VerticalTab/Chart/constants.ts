export const CHART_CONSTANTS = {
  MOBILE: {
    BASE_SIZE: 300,
    SCALE: 0.7,
    VERTICAL_SPACING: 250, // Spacing between nodes
    LINE_LENGTH: 120, // Length of each line
    CURVE_OFFSET: 40, // Curve control point offset
    EXTENSIONS: {
      RIGHT: 50,
      RIGHT_MEDIUM: 60,
      RIGHT_MEDIUM_2: 40,
      LEFT: 60,
      LEFT_MEDIUM: 40,
    },
  },
  DESKTOP: {
    BASE_SIZE: 400,
    SCALE: 1,
  },
  LINE: {
    VERTICAL_OFFSET: {
      MOBILE: {
        SMALL: 40,
        MEDIUM: 90,
        LARGE: 135,
        LARGE_2: 150,
      },
      DESKTOP: {
        SMALL: 80,
        MEDIUM: 180,
        LARGE: 270,
        LARGE_2: 300,
      },
    },
    CONTROL_POINT: {
      MOBILE: {
        HALF: 20,
        FULL: 40,
      },
      DESKTOP: {
        HALF: 40,
        FULL: 80,
      },
    },
    SPACING: {
      MOBILE: {
        VERTICAL: 10,
      },
      DESKTOP: {
        VERTICAL: 20,
      },
    },
    HORIZONTAL_OFFSET: {
      MOBILE: {
        SMALL: 45,
        MEDIUM: 90,
        LARGE: 190,
      },
      DESKTOP: {
        SMALL: 90,
        MEDIUM: 180,
        LARGE: 380,
      },
    },
  },
  COLORS: {
    PRIVATE_SALE: "#E4D493",
    PUBLIC_SALE: "#A6B1D6",
    TEAM: "#DCDCDC",
    REWARDS_1: "#3FDA8D",
    REWARDS_2: "#8F7CFF",
  },
  PIE_SEGMENTS: [
    { percentage: 20, color: "#E4D493" },
    { percentage: 20, color: "#A6B1D6" },
    { percentage: 10, color: "#DCDCDC" },
    { percentage: 20, color: "#3FDA8D" },
    { percentage: 30, color: "#8F7CFF" },
  ],
} as const;

export const tokenSaleData = [
  {
    title: "PRIVATE SALE (10-12%)",
    items: [
      { text: "External investors and Super Crew holders" },
      { text: "6-month lockup", isLocked: true },
      {
        text: "1/10 Unlocked after 6 months",
        highlight: true,
        isLocked: false,
      },
      { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
    ],
    progress: 10,
    totalTokens: {
      amount: 759_000_000,
      total: 7_590_000_000,
      symbol: "MEME",
    },
  },
  {
    title: "PUBLIC SALE (10-12%)",
    items: [
      { text: "Public sale" },
      { text: "10-month lockup", isLocked: true },
      { text: "1/10 Unlocked after 10 months", isLocked: false },
      { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
    ],
    progress: 50,
    totalTokens: {
      amount: 759_000_000,
      total: 7_590_000_000,
      symbol: "MEME",
    },
  },
  {
    title: "TEAM (10-12%)",
    items: [
      { text: "Team and advisors" },
      { text: "10-month lockup", isLocked: true },
      { text: "1/10 Unlocked after 10 months", isLocked: false },
      { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
    ],
    progress: 60,
    totalTokens: {
      amount: 759_000_000,
      total: 7_590_000_000,
      symbol: "MEME",
    },
  },
  {
    title: "REWARDS (10-12%)",
    items: [
      { text: "Community rewards" },
      { text: "10-month lockup", isLocked: true },
      { text: "1/10 Unlocked after 10 months", isLocked: false },
      { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
    ],
    progress: 20,
    totalTokens: {
      amount: 759_000_000,
      total: 7_590_000_000,
      symbol: "MEME",
    },
  },
  {
    title: "REWARDS (10-12%)",
    items: [
      { text: "Community rewards" },
      { text: "10-month lockup", isLocked: true },
      { text: "1/10 Unlocked after 10 months", isLocked: false },
      { text: "9/10 Locked (daily unlock over 18 months)", isLocked: true },
    ],
    progress: 80,
    totalTokens: {
      amount: 759_000_000,
      total: 7_590_000_000,
      symbol: "MEME",
    },
  },
];
