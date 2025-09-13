export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  organizationId: string
  organizationName: string
  avatar?: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type UserRole = "landlord" | "manager" | "tenant" | "vendor" | "admin"

export interface Organization {
  id: string
  name: string
  type: "individual" | "company" | "enterprise"
  logo?: string
  settings: OrganizationSettings
}

export interface OrganizationSettings {
  allowTenantRegistration: boolean
  requireVendorApproval: boolean
  enableAutomatedPayments: boolean
  timezone: string
  currency: string
}

export interface AuthState {
  user: User | null
  organization: Organization | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  organizationName?: string
  organizationType?: "individual" | "company" | "enterprise"
}

export interface AuthResponse {
  user: User
  organization: Organization
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface Permission {
  resource: string
  actions: string[]
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { resource: "*", actions: ["*"] }
  ],
  landlord: [
    { resource: "properties", actions: ["create", "read", "update", "delete"] },
    { resource: "tenants", actions: ["create", "read", "update", "delete"] },
    { resource: "maintenance", actions: ["create", "read", "update", "delete"] },
    { resource: "vendors", actions: ["create", "read", "update", "delete"] },
    { resource: "payments", actions: ["create", "read", "update", "delete"] },
    { resource: "reports", actions: ["read"] },
    { resource: "organization", actions: ["read", "update"] },
  ],
  manager: [
    { resource: "properties", actions: ["read", "update"] },
    { resource: "tenants", actions: ["create", "read", "update"] },
    { resource: "maintenance", actions: ["create", "read", "update", "delete"] },
    { resource: "vendors", actions: ["read", "update"] },
    { resource: "payments", actions: ["read", "update"] },
    { resource: "reports", actions: ["read"] },
  ],
  tenant: [
    { resource: "profile", actions: ["read", "update"] },
    { resource: "lease", actions: ["read"] },
    { resource: "maintenance", actions: ["create", "read"] },
    { resource: "payments", actions: ["create", "read"] },
    { resource: "messages", actions: ["create", "read"] },
  ],
  vendor: [
    { resource: "profile", actions: ["read", "update"] },
    { resource: "jobs", actions: ["read", "update"] },
    { resource: "maintenance", actions: ["read", "update"] },
    { resource: "payments", actions: ["read"] },
    { resource: "messages", actions: ["create", "read"] },
  ],
}