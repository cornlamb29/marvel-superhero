export enum PublicRoutes {
  Builder
}

export enum PrivateRoutes {
  MyTeams
}

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title: string;
}