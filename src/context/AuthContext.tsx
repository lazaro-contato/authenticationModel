import React, {createContext, ReactNode, useEffect, useState} from "react";
import {api} from "../services/api";
import Router from "next/router";
import {destroyCookie, parseCookies, setCookie} from "nookies";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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

export const signOut = () => {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')
  Router.push('/')
}

interface AuthProviderProps {
  children: ReactNode
}
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const {'nextauth.token': token} = parseCookies()

    if (token) {
      api.get('/me').then(response => {
        const {email, permissions, roles} = response.data

        setUser({email, permissions, roles})
      }).catch(() => {
        signOut()
      })
    }

  },[])
  const signIn = async ({email, password}: SignInCredentials) => {
    try {
      const response = await api.post('sessions',{
        email,
        password,
      })

      const {token, refreshToken, permissions, roles} = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 + 24 * 30, //30 days
        path: '/',
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 + 24 * 30, //30 days
        path: '/',
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

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