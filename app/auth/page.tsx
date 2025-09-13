"use client"

import * as React from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const [mode, setMode] = React.useState<"login" | "register">("login")

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div
            className={cn(
              "transition-all duration-500 ease-in-out",
              mode === "login" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
            )}
          >
            {mode === "login" && (
              <LoginForm onToggleMode={toggleMode} />
            )}
          </div>
          
          <div
            className={cn(
              "transition-all duration-500 ease-in-out",
              mode === "register" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute"
            )}
          >
            {mode === "register" && (
              <RegisterForm onToggleMode={toggleMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}