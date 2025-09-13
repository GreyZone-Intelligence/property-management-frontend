"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PageTransition } from "@/components/ui/page-transition"
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react"

export default function DashboardPage() {
  // Mock data for demonstration
  const stats = [
    {
      title: "Total Properties",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: Building2,
      description: "2 properties added this month",
    },
    {
      title: "Active Tenants", 
      value: "187",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: Users,
      description: "94.5% occupancy rate",
    },
    {
      title: "Monthly Revenue",
      value: "$284,500",
      change: "+8.1%", 
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Rent collection rate: 98.2%",
    },
    {
      title: "NOI This Month",
      value: "$198,650",
      change: "-2.3%",
      changeType: "negative" as const, 
      icon: TrendingUp,
      description: "Higher maintenance costs",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "maintenance",
      title: "Maintenance request completed",
      description: "Kitchen faucet repair at Sunset Apartments Unit 3B",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "payment",
      title: "Rent payment received",
      description: "$1,500 from Jane Smith - Oak Street Property",
      time: "4 hours ago", 
      status: "completed",
    },
    {
      id: 3,
      type: "tenant",
      title: "New tenant application",
      description: "Michael Johnson applied for Pine Avenue Unit 2A",
      time: "6 hours ago",
      status: "pending",
    },
    {
      id: 4,
      type: "maintenance",
      title: "Work order assigned",
      description: "HVAC maintenance at Downtown Complex Unit 12C",
      time: "8 hours ago",
      status: "in_progress",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Lease renewal reminder",
      description: "Send renewal notice to 3 tenants expiring next month",
      dueDate: "Tomorrow",
      priority: "high",
    },
    {
      id: 2,
      title: "Property inspection",
      description: "Quarterly inspection for Maple Grove Apartments",
      dueDate: "In 3 days",
      priority: "medium",
    },
    {
      id: 3,
      title: "Vendor payment processing",
      description: "Process payments for 5 completed work orders",
      dueDate: "In 5 days",
      priority: "low",
    },
  ]

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          {/* Welcome Section */}
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back, David</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Here's what's happening with your properties today.</p>
            </div>
            <motion.div 
              className="flex gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </motion.div>
          </motion.div>

          {/* KPI Cards */}
          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimatedCard 
                  key={stat.title} 
                  delay={index * 0.1}
                  className="stats-card"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {stat.changeType === "positive" ? (
                        <ArrowUpRight className="h-3 w-3 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-600" />
                      )}
                      <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>
                      <span>from last month</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </AnimatedCard>
              )
            })}
          </motion.div>

          <motion.div 
            className="grid gap-6 lg:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Recent Activities */}
            <AnimatedCard delay={0.1}>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates from your properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div 
                    key={activity.id} 
                    className="flex items-start gap-4 rounded-lg border border-border p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                      {activity.type === "maintenance" && <AlertCircle className="h-4 w-4" />}
                      {activity.type === "payment" && <DollarSign className="h-4 w-4" />}
                      {activity.type === "tenant" && <Users className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        <Badge
                          variant={
                            activity.status === "completed" 
                              ? "secondary" 
                              : activity.status === "pending" 
                              ? "outline" 
                              : "secondary"
                          }
                          className="text-xs w-fit"
                        >
                          {activity.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </AnimatedCard>

            {/* Upcoming Tasks */}
            <AnimatedCard delay={0.2}>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Items that need your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <motion.div 
                    key={task.id} 
                    className="flex items-start gap-4 rounded-lg border border-border p-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                      {task.priority === "high" && <AlertCircle className="h-4 w-4 text-red-600" />}
                      {task.priority === "medium" && <Clock className="h-4 w-4 text-yellow-600" />}
                      {task.priority === "low" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-xs text-muted-foreground">Due {task.dueDate}</span>
                        <Badge
                          variant={
                            task.priority === "high" 
                              ? "destructive" 
                              : task.priority === "medium" 
                              ? "outline" 
                              : "secondary"
                          }
                          className="text-xs w-fit"
                        >
                          {task.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </AnimatedCard>
          </motion.div>
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}