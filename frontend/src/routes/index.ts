import { PublicRoutes, PrivateRoutes, RouteConfig } from './types.ts'
import ComponentLoader from '@/utils/ComponentLoader'

/**
 * Routes configuration
 * @type {Record<string, RouteConfig>}
 */
export const publicRoutes: Record<string, RouteConfig> = {
  [PublicRoutes.Builder]: {
    component: ComponentLoader(() => import('@/pages/Builder')),
    path: '/',
    title: 'Home Page',
  },
  [PublicRoutes.Tutorial]: {
    component: ComponentLoader(() => import('@/pages/Tutorial')),
    path: '/tutorial',
    title: 'Tutorial',
  }
}

export const privateRoutes: Record<string, RouteConfig> = {
  [PrivateRoutes.MyTeams]: {
    component: ComponentLoader(() => import('@/pages/MyTeams')),
    path: '/my-teams',
    title: 'My Teams',
  }
}
