// eslint-disable-next-line import/no-anonymous-default-export
export default {
  header: {
    root: "/",
    navbar: [
      {
        name: "Games",
        icon: "/navIcons/game.svg",
        route: "/games",
        comingSoon: false,
      },
      {
        name: "Pools",
        icon: "/navIcons/pools.svg",
        route: "/pools",
        comingSoon: true,
      },
      {
        name: "Community",
        icon: "/navIcons/community.svg",
        route: "/community",
        comingSoon: true,
      },
      {
        name: "LeaderBoard",
        icon: "/navIcons/leaderBoard.svg",
        route: "/leaderboard",
        comingSoon: true,
      },
    ],
  },
  bet: {
    existingBets: {
      root: "/bets",
      betWithId: (id: string) => `/bets/${id}`,
    },
    createBet: {
      bullOrBear: "/create-bet",
      priceIsRight: "/games/price-is-right/create-bet",
    },
  },
  account: {
    myBet: "/my-bets",
    myHistory: "/my-history",
  },
};
