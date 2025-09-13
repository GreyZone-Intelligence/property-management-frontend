"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
  userRole?: "landlord" | "manager" | "tenant" | "vendor"
  userName?: string
  organizationName?: string
}

export function DashboardLayout({
  children,
  className,
  userRole = "landlord",
  userName = "John Doe",
  organizationName = "Acme Properties",
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed)
  }, [sidebarCollapsed])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        userRole={userRole}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header
          userRole={userRole}
          userName={userName}
          organizationName={organizationName}
        />

        {/* Page Content */}
        <main className={cn("flex-1 overflow-auto p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  )
}