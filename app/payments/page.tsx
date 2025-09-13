"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AnimatedCard } from "@/components/ui/animated-card"
import { PageTransition } from "@/components/ui/page-transition"
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  Building2,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Receipt,
  Send,
  Banknote,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock payment data
const mockPayments = [
  {
    id: "pay-1",
    type: "rent",
    amount: 1850,
    status: "completed",
    method: "bank_transfer",
    tenantName: "Sarah Johnson",
    propertyName: "Sunset Vista Apartments",
    unit: "3B",
    dueDate: "2024-01-01",
    paidDate: "2024-01-01",
    description: "January 2024 Rent Payment",
    transactionId: "TXN-20240101-001",
    fees: 0,
    netAmount: 1850,
    category: "rent"
  },
  {
    id: "pay-2", 
    type: "rent",
    amount: 2200,
    status: "overdue",
    method: "credit_card",
    tenantName: "Michael Chen",
    propertyName: "Downtown Loft Complex",
    unit: "7A",
    dueDate: "2024-01-01",
    paidDate: null,
    description: "January 2024 Rent Payment",
    lateFee: 75,
    totalDue: 2275,
    daysPastDue: 11,
    category: "rent"
  },
  {
    id: "pay-3",
    type: "maintenance",
    amount: -150,
    status: "completed",
    method: "check",
    vendorName: "QuickFix Plumbing",
    propertyName: "Sunset Vista Apartments",
    unit: "3B",
    dueDate: "2024-01-10",
    paidDate: "2024-01-11",
    description: "Kitchen faucet repair - Emergency plumbing",
    transactionId: "TXN-20240111-002",
    invoiceNumber: "INV-2024-001",
    category: "maintenance"
  },
  {
    id: "pay-4",
    type: "deposit",
    amount: 1650,
    status: "completed",
    method: "bank_transfer",
    tenantName: "Emily Rodriguez",
    propertyName: "Garden View Townhomes",
    unit: "12",
    dueDate: "2023-03-01",
    paidDate: "2023-02-28",
    description: "Security deposit",
    transactionId: "TXN-20230228-003",
    category: "deposit"
  },
  {
    id: "pay-5",
    type: "utility",
    amount: -285,
    status: "pending",
    method: "ach",
    vendorName: "Metro Electric Company",
    propertyName: "Downtown Loft Complex",
    unit: "Building Common",
    dueDate: "2024-01-15",
    description: "December 2023 Electricity Bill",
    invoiceNumber: "ELEC-2023-12-001",
    category: "utilities"
  },
  {
    id: "pay-6",
    type: "rent", 
    amount: 1850,
    status: "scheduled",
    method: "auto_pay",
    tenantName: "Sarah Johnson",
    propertyName: "Sunset Vista Apartments",
    unit: "3B",
    dueDate: "2024-02-01",
    description: "February 2024 Rent Payment - Auto Pay",
    category: "rent"
  },
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [filterType, setFilterType] = React.useState("all")
  const [dateRange, setDateRange] = React.useState("this_month")

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.tenantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.vendorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesType = filterType === "all" || payment.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate summary statistics
  const totalIncome = mockPayments
    .filter(p => p.amount > 0 && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)
  
  const totalExpenses = mockPayments
    .filter(p => p.amount < 0 && p.status === "completed")
    .reduce((sum, p) => sum + Math.abs(p.amount), 0)
  
  const pendingIncome = mockPayments
    .filter(p => p.amount > 0 && (p.status === "pending" || p.status === "scheduled"))
    .reduce((sum, p) => sum + p.amount, 0)
  
  const overduePayments = mockPayments
    .filter(p => p.status === "overdue")
    .reduce((sum, p) => sum + (p.totalDue || p.amount), 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "rent":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "maintenance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "utility":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "deposit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      case "scheduled":
        return <Calendar className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
        return <CreditCard className="h-3 w-3" />
      case "bank_transfer":
      case "ach":
        return <Banknote className="h-3 w-3" />
      case "check":
        return <Receipt className="h-3 w-3" />
      default:
        return <DollarSign className="h-3 w-3" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not paid"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatPaymentMethod = (method: string) => {
    return method.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Payments</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Track rent payments, expenses, and financial transactions
              </p>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-brand-600 hover:bg-brand-700 w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Financial Summary Cards */}
          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatedCard delay={0} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">+8.2%</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.1} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Expenses
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpenses)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 text-red-600" />
                  <span className="text-red-600">+12.3%</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.2} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Income
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {formatCurrency(pendingIncome)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>2 scheduled payments</span>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={0.3} className="stats-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overdue Payments
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-red-600">
                  {formatCurrency(overduePayments)}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="text-red-600">1 overdue payment</span>
                </div>
              </CardContent>
            </AnimatedCard>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="utility">Utilities</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="this_year">This Year</SelectItem>
                  <SelectItem value="all_time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Payment List */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {filteredPayments.map((payment, index) => (
                <AnimatedCard key={payment.id} delay={index * 0.05}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Payment Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white font-semibold",
                          payment.amount > 0 
                            ? "bg-gradient-to-br from-green-500 to-green-600" 
                            : "bg-gradient-to-br from-red-500 to-red-600"
                        )}>
                          {payment.amount > 0 ? "+" : "-"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{payment.description}</h3>
                            <Badge className={cn("text-xs", getTypeColor(payment.type))}>
                              {payment.type}
                            </Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              {payment.tenantName ? (
                                <>
                                  <User className="h-3 w-3" />
                                  <span>{payment.tenantName}</span>
                                </>
                              ) : payment.vendorName ? (
                                <>
                                  <Building2 className="h-3 w-3" />
                                  <span>{payment.vendorName}</span>
                                </>
                              ) : null}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              <span className="truncate">{payment.propertyName}</span>
                              {payment.unit && <span>- {payment.unit}</span>}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1">
                              {getPaymentMethodIcon(payment.method)}
                              <span>{formatPaymentMethod(payment.method)}</span>
                            </div>
                          </div>
                          {payment.status === "overdue" && payment.daysPastDue && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                              <AlertTriangle className="h-3 w-3" />
                              <span>{payment.daysPastDue} days past due</span>
                              {payment.lateFee && (
                                <span>• ${payment.lateFee} late fee</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Amount and Status */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={cn(
                            "text-lg font-bold",
                            payment.amount > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            {payment.amount > 0 ? "+" : ""}{formatCurrency(payment.amount)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Due: {formatDate(payment.dueDate)}
                          </div>
                          {payment.paidDate && (
                            <div className="text-xs text-muted-foreground">
                              Paid: {formatDate(payment.paidDate)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Badge className={cn("text-xs flex items-center gap-1", getStatusColor(payment.status))}>
                            {getStatusIcon(payment.status)}
                            {payment.status.toUpperCase()}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    {(payment.transactionId || payment.invoiceNumber) && (
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs text-muted-foreground">
                        {payment.transactionId && (
                          <span>Transaction ID: {payment.transactionId}</span>
                        )}
                        {payment.invoiceNumber && (
                          <span>Invoice: {payment.invoiceNumber}</span>
                        )}
                        {payment.fees && payment.fees > 0 && (
                          <span>Fees: {formatCurrency(payment.fees)}</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </AnimatedCard>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No payments found</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base px-4">
                Try adjusting your search criteria or record a new payment
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Record New Payment
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}