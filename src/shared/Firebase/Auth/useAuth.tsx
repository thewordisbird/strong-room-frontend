import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  return authContext
}