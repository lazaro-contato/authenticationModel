import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export const Dashboard = () => {

  const {user} = useContext(AuthContext)
  return(
    <h1>Dashboard: {user?.email}</h1>
  )
}

export default Dashboard