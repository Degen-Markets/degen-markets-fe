// eslint-disable-next-line import/no-anonymous-default-export

export interface RouteItem {
  routeName: string;
  link: string;
  comingSoon?: boolean;
}

export interface NavItem {
  name: string;
  icon: string;
  route: RouteItem[] | { [key: string]: string } | string;
  comingSoon?: boolean;
  isExpandible: boolean;
}

interface NavigationProps {
  header: {
    root: string;
    navbar: NavItem[];
  };
  [key: string]: any;
}

const NavigationRoutes: NavigationProps = {
  header: {
    root: "/",
    navbar: [
      {
        name: "Pools",
        icon: "/navIcons/pools.svg",
        route: "/pools",
        comingSoon: false,
        isExpandible: false,
      },
      {
        name: "Games",
        icon: "/navIcons/game.svg",
        route: [
          {
            routeName: "bull or bear",
            link: "/create-bet",
          },
          {
            routeName: "the price is right",
            link: "/games/price-is-right/create-bet",
          },
          {
            routeName: "moon or rug",
            link: "/",
            comingSoon: true,
          },
        ],
        comingSoon: true,
        isExpandible: true,
      },
      {
        name: "Community",
        icon: "/navIcons/community.svg",
        route: {
          twitter: "/",
          discord: "/",
          telegram: "/",
        },
        comingSoon: true,
        isExpandible: true,
      },
      {
        name: "LeaderBoard",
        icon: "/navIcons/leaderBoard.svg",
        route: "/leaderboard",
        comingSoon: true,
        isExpandible: false,
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

export default NavigationRoutes;
