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
        name: "Profile",
        icon: "",
        route: "/my-profile",
        comingSoon: false,
        isExpandible: false,
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
};

export default NavigationRoutes;
