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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore } from "@/stores/auth-store"
import { getRedirectPath } from "@/lib/auth"
import { Eye, EyeOff, Loader2, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/types/auth"

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["landlord", "manager", "tenant", "vendor"]),
  organizationName: z.string().optional(),
  organizationType: z.enum(["individual", "company", "enterprise"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  className?: string
  onToggleMode?: () => void
}

const roleDescriptions = {
  landlord: "Own and manage rental properties",
  manager: "Manage properties for landlords",
  tenant: "Rent and live in properties",
  vendor: "Provide maintenance services",
}

export function RegisterForm({ className, onToggleMode }: RegisterFormProps) {
  const router = useRouter()
  const { register: registerUser, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "landlord",
      organizationName: "",
      organizationType: "company",
    },
  })

  const selectedRole = watch("role")

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError()
      await registerUser(data)
      
      const user = useAuthStore.getState().user
      if (user) {
        const redirectPath = getRedirectPath(user.role)
        router.push(redirectPath)
      }
    } catch (error) {
      console.error("Registration failed:", error)
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
          <CardTitle className="text-2xl font-bold">Create account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join PropertyOS and manage your properties
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
                className={cn(errors.firstName && "border-red-500")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register("lastName")}
                className={cn(errors.lastName && "border-red-500")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={cn(
                  "pr-10",
                  errors.confirmPassword && "border-red-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={selectedRole}
              onValueChange={(value: UserRole) => setValue("role", value)}
            >
              <SelectTrigger className={cn(errors.role && "border-red-500")}>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="landlord">
                  <div>
                    <div className="font-medium">Landlord</div>
                    <div className="text-xs text-muted-foreground">
                      {roleDescriptions.landlord}
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="manager">
                  <div>
                    <div className="font-medium">Property Manager</div>
                    <div className="text-xs text-muted-foreground">
                      {roleDescriptions.manager}
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="tenant">
                  <div>
                    <div className="font-medium">Tenant</div>
                    <div className="text-xs text-muted-foreground">
                      {roleDescriptions.tenant}
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="vendor">
                  <div>
                    <div className="font-medium">Service Vendor</div>
                    <div className="text-xs text-muted-foreground">
                      {roleDescriptions.vendor}
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>

          {(selectedRole === "landlord" || selectedRole === "manager") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  placeholder="Your company or business name"
                  {...register("organizationName")}
                  className={cn(errors.organizationName && "border-red-500")}
                />
                {errors.organizationName && (
                  <p className="text-sm text-red-600">{errors.organizationName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationType">Organization Type</Label>
                <Select
                  value={watch("organizationType")}
                  onValueChange={(value: "individual" | "company" | "enterprise") => 
                    setValue("organizationType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
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
              Already have an account?{" "}
              <span className="text-brand-600 hover:text-brand-700 hover:underline">
                Sign in
              </span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}