import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {validateUserPermissions} from "../utils/validateUserPermissions";

interface useCanProps {
  permissions?: string[]
  roles?: string[]
}

export const useCan = ({permissions, roles}: useCanProps) => {
  const {user, isAuthenticated} = useContext(AuthContext)

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user, roles, permissions
  })

    return userHasValidPermissions
}