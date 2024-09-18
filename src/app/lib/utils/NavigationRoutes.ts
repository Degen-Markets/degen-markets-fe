// eslint-disable-next-line import/no-anonymous-default-export

export interface RouteItem {
  routeName: string;
  link: string;
}

export interface NavItem {
  name: string;
  icon: string;
  route: RouteItem[] | { [key: string]: string } | string;
  isExpandable: boolean;
  protected?: boolean;
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
        icon: "",
        route: "/",
        isExpandable: false,
      },
      {
        name: "Leaderboard",
        icon: "",
        route: "/#leaderboard",
        isExpandable: false,
      },
      {
        name: "Profile",
        icon: "",
        route: "/my-profile",
        isExpandable: false,
        protected: true,
      },
    ],
  },
};

export default NavigationRoutes;
