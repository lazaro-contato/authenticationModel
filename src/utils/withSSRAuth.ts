import {destroyCookie, parseCookies} from "nookies";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {AuthTokenError} from "../errors/AuthTokenError";
import decode from 'jwt-decode'
import {validateUserPermissions} from "./validateUserPermissions";

interface WithSSRAuthOptions {
  permissions?: string[]
  roles?: string[]
}

export const withSSRAuth = <P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) => {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies['nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    if (options) {
      const user = decode<{permissions: string[], roles: string[]}>(token)

      const {permissions, roles} = options

      const userHasValidPermissions = validateUserPermissions({
        user, roles, permissions
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          }
        }
      }
    }





    try{
      return await fn(ctx)
    } catch (e) {
      if (e instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token')
        destroyCookie(ctx, 'nextauth.refreshToken')
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }

  }
}