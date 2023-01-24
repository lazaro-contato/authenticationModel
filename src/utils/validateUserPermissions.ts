
interface User {
  permissions: string[]
  roles: string[]
}

interface ValidateUserPermissionsProps {
  user: User
  permissions?: string[]
  roles?: string[]
}
export const validateUserPermissions = ({permissions, user, roles}: ValidateUserPermissionsProps) => {
  console.log(permissions)
  console.log(user)
  console.log(roles)

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every(permission => {
      return user?.permissions.includes(permission)
    })

    if (!hasAllPermissions) {
      return false
    }

    if (roles?.length > 0) {
      const hasAllRoles = permissions?.some(role => {
        return user?.roles.includes(role)
      })

      if (!hasAllRoles) {
        return false
      }
    }
    return true
}}