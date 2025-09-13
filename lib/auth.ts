import { type User, type UserRole, ROLE_PERMISSIONS } from "@/types/auth"

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = "propertyos_access_token"
  private static readonly REFRESH_TOKEN_KEY = "propertyos_refresh_token"
  private static readonly USER_KEY = "propertyos_user"

  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  static getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static getUser(): User | null {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  static setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
  }

  static setUser(user: User): void {
    if (typeof window === "undefined") return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static clearAuth(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated(): boolean {
    const token = this.getAccessToken()
    const user = this.getUser()
    return !!(token && user)
  }

  static hasPermission(userRole: UserRole, resource: string, action: string): boolean {
    const permissions = ROLE_PERMISSIONS[userRole]
    
    // Check for admin wildcard permissions
    const adminPermission = permissions.find(p => p.resource === "*" && p.actions.includes("*"))
    if (adminPermission) return true
    
    // Check for resource wildcard permissions
    const wildcardPermission = permissions.find(p => p.resource === resource && p.actions.includes("*"))
    if (wildcardPermission) return true
    
    // Check for specific permission
    const specificPermission = permissions.find(p => p.resource === resource && p.actions.includes(action))
    return !!specificPermission
  }

  static canAccess(userRole: UserRole, resource: string, action: string = "read"): boolean {
    return this.hasPermission(userRole, resource, action)
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getAccessToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

// Role-based route access
export const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  "/dashboard": ["landlord", "manager", "tenant", "vendor"],
  "/properties": ["landlord", "manager"],
  "/properties/add": ["landlord"],
  "/tenants": ["landlord", "manager"],
  "/tenants/add": ["landlord", "manager"],
  "/maintenance": ["landlord", "manager", "tenant", "vendor"],
  "/vendors": ["landlord", "manager"],
  "/payments": ["landlord", "manager", "tenant"],
  "/reports": ["landlord", "manager"],
  "/settings": ["landlord", "manager", "tenant", "vendor"],
  "/jobs": ["vendor"],
  "/my-jobs": ["vendor"],
  "/lease": ["tenant"],
  "/messages": ["tenant", "vendor"],
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const allowedRoles = ROUTE_PERMISSIONS[route]
  return allowedRoles ? allowedRoles.includes(userRole) : false
}

export function getRedirectPath(userRole: UserRole): string {
  switch (userRole) {
    case "landlord":
    case "manager":
      return "/dashboard"
    case "tenant":
      return "/dashboard"
    case "vendor":
      return "/dashboard"
    case "admin":
      return "/admin"
    default:
      return "/dashboard"
  }
}