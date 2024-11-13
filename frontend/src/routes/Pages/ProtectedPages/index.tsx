import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/store/auth'
import { PathProps } from './types'

const ProtectedPages = (props: PropsWithChildren<PathProps>): React.ReactElement => {
    const [currentUser] = useCurrentUser()

    if (!currentUser?.email && props?.path) {
      return <Navigate to={ props.path } />
    }

    return <>{ props.children }</>
}

export default ProtectedPages
