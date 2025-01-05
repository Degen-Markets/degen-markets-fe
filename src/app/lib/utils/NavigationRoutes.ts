// eslint-disable-next-line import/no-anonymous-default-export

export interface RouteItem {
  routeName: string;
  link: string;
}

export interface NavItem {
  name: string;
  icon?: string;
  route: RouteItem[] | { [key: string]: string } | string;
  isExpandable: boolean;
  protected?: boolean;
  disabled?: boolean;
  statusLabel?: string;
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
        name: "Home",
        route: "/",
        isExpandable: false,
      },
      {
        name: "Bets",
        icon: "",
        route: "/pools",
        isExpandable: false,
      },
      {
        name: "Bet against AI",
        route: "/bet-against-ai",
        disabled: true,
        statusLabel: "Coming Soon",
        isExpandable: false,
      },
      {
        name: "Create bet",
        route: "/pools/create",
        isExpandable: false,
        protected: false,
      },
      {
        name: "Leaderboard",
        route: "/leaderboard",
        isExpandable: false,
      },
      {
        name: "Profile",
        route: "/my-profile",
        isExpandable: false,
        protected: true,
      },
    ],
  },
};

export default NavigationRoutes;
