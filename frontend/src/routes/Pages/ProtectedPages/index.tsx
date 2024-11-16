import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/store/auth'
import { publicRoutes } from '@/routes'
import { PublicRoutes } from '@/routes/types'
import { PathProps } from './types'

const ProtectedPages = (props: PropsWithChildren<PathProps>): React.ReactElement => {
    const [currentUser] = useCurrentUser()

    if (!currentUser?.email) {
      return <Navigate to={ publicRoutes[PublicRoutes.Builder].path } />
    }

    return <>{ props.children }</>
}

export default ProtectedPages
