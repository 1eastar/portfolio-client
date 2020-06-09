import { createContext } from 'react';

interface IAuth {
  user: any,
  setUser: any,
  auth: boolean,
  setAuth: any,
}

const authState: IAuth = {
  user: {},
  setUser: null,
  auth: false,
  setAuth: null,
};

const AuthContext = createContext(authState);

export default AuthContext;
