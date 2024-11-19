export enum PublicRoutes {
  Builder = 'builder',
  Tutorial = 'tutorial',
}

export enum PrivateRoutes {
  MyTeams = 'my-teams',
}

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title: string;
}