import React, {createContext, ReactNode} from "react";
import {api} from "../services/api";

interface SignInCredentials {
  email: string
  password: string
}
interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}
export const AuthProvider = ({children}: AuthProviderProps) => {
  const isAuthenticated = false
  const signIn = async ({email, password}: SignInCredentials) => {
    try {
      const response = await api.post('sessions',{
        email,
        password,
      })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <AuthContext.Provider value={{signIn, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )

}