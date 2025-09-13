import { create } from "zustand"
import { type User, type Organization, type LoginCredentials, type RegisterData, type AuthResponse } from "@/types/auth"
import { AuthService } from "@/lib/auth"
import api from "@/lib/api"

interface AuthStore {
  user: User | null
  organization: Organization | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  clearError: () => void
  refreshAuth: () => Promise<void>
  updateUser: (updates: Partial<User>) => void
  setLoading: (loading: boolean) => void
}


export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  organization: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null })
    
    try {
      // Call real backend API
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      })

      const authResponse = response.data as AuthResponse

      // Store tokens and user data
      AuthService.setTokens(authResponse.accessToken, authResponse.refreshToken)
      AuthService.setUser(authResponse.user)
      
      // Set cookies for middleware access
      document.cookie = `propertyos_access_token=${authResponse.accessToken}; path=/; max-age=${authResponse.expiresIn}; secure; samesite=strict`
      document.cookie = `propertyos_user=${encodeURIComponent(JSON.stringify(authResponse.user))}; path=/; max-age=${authResponse.expiresIn}; secure; samesite=strict`

      set({
        user: authResponse.user,
        organization: authResponse.organization,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed"
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null })
    
    try {
      // Call real backend API
      const response = await api.post('/auth/register', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        organizationName: data.organizationName,
        organizationType: data.organizationType,
      })

      const authResponse = response.data as AuthResponse

      AuthService.setTokens(authResponse.accessToken, authResponse.refreshToken)
      AuthService.setUser(authResponse.user)
      
      // Set cookies for middleware access
      document.cookie = `propertyos_access_token=${authResponse.accessToken}; path=/; max-age=${authResponse.expiresIn}; secure; samesite=strict`
      document.cookie = `propertyos_user=${encodeURIComponent(JSON.stringify(authResponse.user))}; path=/; max-age=${authResponse.expiresIn}; secure; samesite=strict`

      set({
        user: authResponse.user,
        organization: authResponse.organization,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed"
      set({
        error: errorMessage,
        isLoading: false,
      })
      throw error
    }
  },

  logout: () => {
    AuthService.clearAuth()
    
    // Clear cookies
    document.cookie = "propertyos_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    document.cookie = "propertyos_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    
    set({
      user: null,
      organization: null,
      isAuthenticated: false,
      error: null,
    })
  },

  clearError: () => {
    set({ error: null })
  },

  refreshAuth: async () => {
    const user = AuthService.getUser()
    const token = AuthService.getAccessToken()

    if (user && token) {
      try {
        // Validate token with the server
        const response = await api.get('/auth/me')
        const validatedUser = response.data.user
        
        set({
          user: validatedUser,
          isAuthenticated: true,
          organization: response.data.organization,
        })
      } catch (error) {
        // Token is invalid, clear auth
        AuthService.clearAuth()
        set({
          user: null,
          organization: null,
          isAuthenticated: false,
          error: null,
        })
      }
    }
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get()
    if (user) {
      const updatedUser = { ...user, ...updates }
      AuthService.setUser(updatedUser)
      set({ user: updatedUser })
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
}))

// Initialize auth state on app startup
if (typeof window !== "undefined") {
  useAuthStore.getState().refreshAuth()
}