import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { publicRoutes, privateRoutes } from '../index.ts'
import './style.scss'
import ProtectedPages from './ProtectedPages/index.tsx'


/**
 * Pages component
 * @returns {React.ReactElement}
 */
const Pages = (): React.ReactElement => {
  return (<Box>
     <Routes>
       {Object.keys(publicRoutes).map((routeKey: string) => {
          const { path, component: Component } = publicRoutes[routeKey]
          return (<Route
            key={path}
            path={path}
            element={<Component />}
          />)
       })}
    </Routes>
    <Routes>
      {Object.keys(privateRoutes).map((routeKey: string) => {
        const { path, component: Component } = privateRoutes[routeKey]
        return (<Route
          key={path}
          path={path}
          element={<ProtectedPages path={path}>
            <Component />
          </ProtectedPages>}
        />)
      })}
    </Routes>
  </Box>)
}

export default Pages
