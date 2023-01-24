import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {withSSRAuth} from "../utils/withSSRAuth";
import {api} from "../services/apiClient";
import {setUpAPIClient} from "../services/api";
import {Can} from "../components/Can";

export const Dashboard = () => {
  const {user, signOut} = useContext(AuthContext)

  useEffect(() => {
      api.get('/me')
        .then(response => console.log(response))
        .catch(err => console.log(err))
    },[])

  return(
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={['metrics.list']}><div>Métricas</div></Can>
      <button onClick={signOut}>signOut</button>
    </>
  )
}

export default Dashboard

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setUpAPIClient(ctx)
    const response = await apiClient.get('/me')
  return {
    props: {
    }
}
})