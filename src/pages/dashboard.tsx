import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {api} from "../services/api";

export const Dashboard = () => {
  const {user} = useContext(AuthContext)

  useEffect(() => {
      api.get('/me')
        .then(response => console.log(response))
        .catch(err => console.log(err))
    },[])

  return(
    <h1>Dashboard: {user?.email}</h1>
  )
}

export default Dashboard