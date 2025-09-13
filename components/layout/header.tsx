"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Mail,
} from "lucide-react"

interface HeaderProps {
  className?: string
  userRole?: "landlord" | "manager" | "tenant" | "vendor"
  userName?: string
  organizationName?: string
}

export function Header({ 
  className, 
  userRole = "landlord", 
  userName = "John Doe",
  organizationName = "Acme Properties"
}: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const [showNotifications, setShowNotifications] = React.useState(false)

  const notifications = [
    {
      id: 1,
      title: "New maintenance request",
      description: "Unit 3B - Kitchen faucet repair",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment received",
      description: "$1,500 rent payment from Jane Smith",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Lease renewal due",
      description: "Sunset Apartments Unit 2A expires in 30 days",
      time: "2 hours ago",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className={cn("flex h-16 items-center justify-between border-b border-border bg-background px-6", className)}>
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties, tenants, vendors..."
            className="pl-10 pr-4"
          />
        </div>
        
        {/* Quick Actions */}
        <div className="hidden gap-2 lg:flex">
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            Add Tenant
          </Button>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative h-9 w-9"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-lg border border-border bg-background shadow-lg">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="font-semibold">Notifications</h3>
                <Button variant="ghost" size="sm">
                  Mark all read
                </Button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "border-b border-border p-4 transition-colors hover:bg-accent",
                      notification.unread && "bg-accent/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-brand-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border p-2">
                <Button variant="ghost" className="w-full justify-center text-sm">
                  View all notifications
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Mail className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="gap-2 px-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-medium">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden flex-col items-start lg:flex">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground">{organizationName}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-lg border border-border bg-background shadow-lg">
              <div className="border-b border-border p-3">
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-muted-foreground">{organizationName}</p>
                <Badge variant="outline" className="mt-1 text-xs capitalize">
                  {userRole}
                </Badge>
              </div>
              
              <div className="p-2">
                <Link href="/profile">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
              
              <div className="border-t border-border p-2">
                <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}