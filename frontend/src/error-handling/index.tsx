import { FC } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

const getDisplayName = (WrappedComponent: FC) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
)
/**
 * withErrorHandler function
 * @param {FC<P>} Component - Component to wrap
 * @param {FC<FallbackProps>} Fallback - Fallback component
 * @returns {FC<P>}
 */
export const withErrorHandler = <P extends object>(
  Component: FC<P>, 
  Fallback: FC<FallbackProps>
): FC<P> => {
  function ComponentWithErrorHandling(props: P) {
    return (
      <ErrorBoundary FallbackComponent={Fallback}>
        <Component {...(props as P)} />
      </ErrorBoundary>
    );
  }

  ComponentWithErrorHandling.displayName = `WithErrorHandling${getDisplayName(
    Component as FC<unknown>,
  )}`

  return ComponentWithErrorHandling
}
