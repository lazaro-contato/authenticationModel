import React from "react";
import {withSSRAuth} from "../utils/withSSRAuth";
import {setUpAPIClient} from "../services/api";

export const Metrics = () => {
  return(
    <>
      <h1>Metrics</h1>
    </>
  )
}

export default Metrics

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setUpAPIClient(ctx)
  const response = await apiClient.get('/me')

  return {
    props: {
    }
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator'],
})