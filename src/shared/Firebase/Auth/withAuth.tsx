import React from 'react';
import { AuthContext, authContextProps } from './AuthContext';

export type withAuthProps = authContextProps;

export function withAuth<T extends withAuthProps = withAuthProps>(WrappedComponent: React.ComponentType<T>) {
  const WithAuth = (props: Omit<T, keyof withAuthProps>) => {
    return (
      <AuthContext.Consumer>
        {(authContextProps) => <WrappedComponent {...props as T} {...authContextProps}/>}
      </AuthContext.Consumer>
    )
  }
  return WithAuth
}