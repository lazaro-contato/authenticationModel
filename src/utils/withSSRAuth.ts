import {destroyCookie, parseCookies} from "nookies";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult} from "next";
import {AuthTokenError} from "../errors/AuthTokenError";

export const withSSRAuth = <P>(fn: GetServerSideProps<P>) => {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    if (!cookies['nextauth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
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