"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PageTransition } from "@/components/ui/page-transition"
import { 
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Building2,
  DollarSign,
  Users,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock analytics data
const mockAnalytics = {
  revenue: {
    current: 284500,
    previous: 262300,
    change: 8.5,
    trend: "up",
    monthlyData: [
      { month: "Jul", amount: 245000 },
      { month: "Aug", amount: 252000 },
      { month: "Sep", amount: 258000 },
      { month: "Oct", amount: 262300 },
      { month: "Nov", amount: 275000 },
      { month: "Dec", amount: 284500 },
    ]
  },
  occupancy: {
    current: 94.5,
    previous: 92.1,
    change: 2.4,
    trend: "up",
    byProperty: [
      { name: "Sunset Vista", occupancy: 96.8, units: 24, vacant: 1 },
      { name: "Downtown Loft", occupancy: 91.7, units: 12, vacant: 1 },
      { name: "Garden View", occupancy: 95.0, units: 8, vacant: 0 },
      { name: "Oak Street", occupancy: 88.9, units: 18, vacant: 2 },
    ]
  },
  expenses: {
    current: 85950,
    previous: 79200,
    change: 8.5,
    trend: "up",
    breakdown: [
      { category: "Maintenance", amount: 35400, percentage: 41.2 },
      { category: "Utilities", amount: 18700, percentage: 21.8 },
      { category: "Insurance", amount: 12300, percentage: 14.3 },
      { category: "Property Tax", amount: 10200, percentage: 11.9 },
      { category: "Management", amount: 6800, percentage: 7.9 },
      { category: "Other", amount: 2550, percentage: 3.0 },
    ]
  },
  maintenance: {
    totalRequests: 47,
    completed: 39,
    inProgress: 5,
    pending: 3,
    averageResolution: 3.2,
    categoryBreakdown: [
      { category: "Plumbing", count: 18, percentage: 38.3 },
      { category: "Electrical", count: 12, percentage: 25.5 },
      { category: "HVAC", count: 8, percentage: 17.0 },
      { category: "Appliances", count: 6, percentage: 12.8 },
      { category: "Other", count: 3, percentage: 6.4 },
    ]
  },
  tenants: {
    total: 187,
    new: 12,
    renewed: 8,
    moveOuts: 5,
    retentionRate: 89.2,
    demographics: [
      { ageGroup: "25-34", count: 78, percentage: 41.7 },
      { ageGroup: "35-44", count: 52, percentage: 27.8 },
      { ageGroup: "45-54", count: 32, percentage: 17.1 },
      { ageGroup: "55+", count: 25, percentage: 13.4 },
    ]
  }
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("last_6_months")
  const [selectedProperty, setSelectedProperty] = React.useState("all")
  const [refreshing, setRefreshing] = React.useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="space-y-6">
          {/* Header */}
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics & Reports</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Comprehensive insights into your property portfolio performance
              </p>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="w-full sm:w-auto"
                >
                  <RefreshCw className={cn("mr-2 h-4 w-4", refreshing && "animate-spin")} />
                  Refresh
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-brand-600 hover:bg-brand-700 w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Filter Controls */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
                <SelectItem value="year_to_date">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sunset_vista">Sunset Vista Apartments</SelectItem>
                <SelectItem value="downtown_loft">Downtown Loft Complex</SelectItem>
                <SelectItem value="garden_view">Garden View Townhomes</SelectItem>
                <SelectItem value="oak_street">Oak Street Properties</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Key Metrics Cards */}
          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatedCard delay={0} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-foreground">
                  {formatCurrency(mockAnalytics.revenue.current)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {mockAnalytics.revenue.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                  )}
                  <span className={mockAnalytics.revenue.trend === "up" ? "text-green-600" : "text-red-600"}>
                    +{formatPercentage(mockAnalytics.revenue.change)}
                  </span>
                  <span>from last period</span>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.1} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Occupancy Rate
                </CardTitle>
                <Building2 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-foreground">
                  {formatPercentage(mockAnalytics.occupancy.current)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">
                    +{formatPercentage(mockAnalytics.occupancy.change)}
                  </span>
                  <span>from last period</span>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-foreground">
                  {formatCurrency(mockAnalytics.expenses.current)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">
                    +{formatPercentage(mockAnalytics.expenses.change)}
                  </span>
                  <span>from last period</span>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Net Operating Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {formatCurrency(mockAnalytics.revenue.current - mockAnalytics.expenses.current)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="text-green-600">
                    {formatPercentage(((mockAnalytics.revenue.current - mockAnalytics.expenses.current) / mockAnalytics.revenue.current) * 100)} margin
                  </span>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>

          {/* Charts and Analytics */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedCard delay={0.1}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Monthly revenue over the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.revenue.monthlyData.map((item, index) => (
                      <div key={item.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.month}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-secondary rounded-full w-32">
                            <motion.div
                              className="h-2 bg-brand-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.amount / 300000) * 100}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            </motion.div>

            {/* Occupancy by Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AnimatedCard delay={0.2}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Occupancy by Property
                  </CardTitle>
                  <CardDescription>Current occupancy rates across properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.occupancy.byProperty.map((property, index) => (
                      <div key={property.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{property.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatPercentage(property.occupancy)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-secondary rounded-full">
                            <motion.div
                              className="h-2 bg-blue-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${property.occupancy}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground min-w-[60px] text-right">
                            {property.units - property.vacant}/{property.units} units
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            </motion.div>

            {/* Expense Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <AnimatedCard delay={0.3}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Expense Breakdown
                  </CardTitle>
                  <CardDescription>Operating expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.expenses.breakdown.map((expense, index) => (
                      <div key={expense.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ 
                              backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)` 
                            }}
                          />
                          <span className="text-sm font-medium">{expense.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">
                            {formatCurrency(expense.amount)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatPercentage(expense.percentage)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            </motion.div>

            {/* Maintenance Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AnimatedCard delay={0.4}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Maintenance Analytics
                  </CardTitle>
                  <CardDescription>Request volume and completion metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {mockAnalytics.maintenance.completed}
                        </div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {mockAnalytics.maintenance.inProgress}
                        </div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-600">
                          {mockAnalytics.maintenance.pending}
                        </div>
                        <div className="text-xs text-muted-foreground">Pending</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Avg Resolution Time</span>
                        <span className="text-sm text-muted-foreground">
                          {mockAnalytics.maintenance.averageResolution} days
                        </span>
                      </div>
                      <div className="space-y-2">
                        {mockAnalytics.maintenance.categoryBreakdown.slice(0, 3).map((category, index) => (
                          <div key={category.category} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{category.category}</span>
                            <span className="font-medium">
                              {category.count} ({formatPercentage(category.percentage)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}