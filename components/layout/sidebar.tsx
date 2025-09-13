"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2,
  Users,
  Wrench,
  CreditCard,
  BarChart3,
  Settings,
  Home,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  collapsed?: boolean
  onToggleCollapse?: () => void
  userRole?: "landlord" | "manager" | "tenant" | "vendor"
}

const navigationItems = {
  landlord: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Tenants", href: "/tenants", icon: Users },
    { name: "Maintenance", href: "/maintenance", icon: Wrench, badge: "3" },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ],
  manager: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Tenants", href: "/tenants", icon: Users },
    { name: "Maintenance", href: "/maintenance", icon: Wrench, badge: "7" },
    { name: "Vendors", href: "/vendors", icon: Users },
    { name: "Payments", href: "/payments", icon: CreditCard },
  ],
  tenant: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Lease", href: "/lease", icon: Building2 },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Maintenance", href: "/maintenance", icon: Wrench, badge: "1" },
    { name: "Messages", href: "/messages", icon: Bell },
  ],
  vendor: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Job Board", href: "/jobs", icon: Wrench },
    { name: "My Jobs", href: "/my-jobs", icon: Building2, badge: "2" },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Messages", href: "/messages", icon: Bell },
  ],
}

export function Sidebar({ 
  collapsed = false, 
  onToggleCollapse,
  userRole = "landlord" 
}: SidebarProps) {
  const pathname = usePathname()
  const items = navigationItems[userRole] || navigationItems.landlord

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-foreground">PropertyOS</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-brand-600 text-white shadow-md" 
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "secondary" : "default"} 
                        className="h-5 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
                
                {collapsed && item.badge && (
                  <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <Link href="/settings">
          <div
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
              pathname === "/settings" && "bg-brand-600 text-white"
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </div>
        </Link>
        
        <Link href="/help">
          <div className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
            <HelpCircle className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Help & Support</span>}
          </div>
        </Link>
      </div>
    </div>
  )
}