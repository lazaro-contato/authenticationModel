import React, {createContext, ReactNode, useState} from "react";
import {api} from "../services/api";
import Router from "next/router";

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  email: string
  permissions: string[]
  roles: string[]
}
interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  user?: User
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user
  const signIn = async ({email, password}: SignInCredentials) => {
    try {
      const response = await api.post('sessions',{
        email,
        password,
      })

      const {permissions, roles} = response.data

      setUser({
        email,
        permissions,
        roles
      })
      Router.push('/dashboard')

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <AuthContext.Provider value={{signIn, isAuthenticated, user}}>
      {children}
    </AuthContext.Provider>
  )

}