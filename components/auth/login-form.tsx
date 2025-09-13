"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"
import { getRedirectPath } from "@/lib/auth"
import { Eye, EyeOff, Loader2, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  className?: string
  onToggleMode?: () => void
}

export function LoginForm({ className, onToggleMode }: LoginFormProps) {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError()
      await login(data)
      
      // Get user role and redirect appropriately
      const user = useAuthStore.getState().user
      if (user) {
        const redirectPath = getRedirectPath(user.role)
        router.push(redirectPath)
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  // Demo accounts for testing
  const demoAccounts = [
    { email: "landlord@propertyos.com", password: "demo123", role: "Landlord" },
    { email: "manager@propertyos.com", password: "demo123", role: "Manager" },
    { email: "tenant@propertyos.com", password: "demo123", role: "Tenant" },
    { email: "vendor@propertyos.com", password: "demo123", role: "Vendor" },
  ]

  const fillDemoAccount = (email: string, password: string) => {
    const emailInput = document.getElementById("email") as HTMLInputElement
    const passwordInput = document.getElementById("password") as HTMLInputElement
    
    if (emailInput && passwordInput) {
      emailInput.value = email
      passwordInput.value = password
      
      // Trigger form validation
      emailInput.dispatchEvent(new Event("input", { bubbles: true }))
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Building2 className="h-6 w-6" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your PropertyOS account
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Demo Accounts */}
        <div className="rounded-lg border border-border bg-accent/50 p-4">
          <p className="mb-3 text-sm font-medium text-foreground">Demo Accounts:</p>
          <div className="grid gap-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemoAccount(account.email, account.password)}
                className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <span className="font-medium">{account.role}</span>
                <span className="text-muted-foreground">{account.email}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={cn(
                  "pr-10",
                  errors.password && "border-red-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {onToggleMode && (
          <div className="text-center">
            <button
              type="button"
              onClick={onToggleMode}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Don't have an account?{" "}
              <span className="text-brand-600 hover:text-brand-700 hover:underline">
                Sign up
              </span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}