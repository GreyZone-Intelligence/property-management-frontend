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
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  User,
  MoreVertical,
  FileText,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock tenant data
const mockTenants = [
  {
    id: "tenant-1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    propertyName: "Sunset Vista Apartments",
    unit: "3B",
    address: "123 Sunset Boulevard, Unit 3B",
    leaseStart: "2023-01-15",
    leaseEnd: "2024-01-14",
    monthlyRent: 1850,
    securityDeposit: 1850,
    rentStatus: "current",
    avatar: "/api/placeholder/80/80",
    emergencyContact: {
      name: "John Johnson",
      phone: "(555) 987-6543",
      relationship: "Husband"
    },
    notes: "Excellent tenant, always pays on time",
    lastPayment: "2024-01-01",
    maintenanceRequests: 2,
  },
  {
    id: "tenant-2", 
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@email.com",
    phone: "(555) 234-5678",
    propertyName: "Downtown Loft Complex",
    unit: "7A",
    address: "456 Main Street, Unit 7A",
    leaseStart: "2023-06-01",
    leaseEnd: "2024-05-31",
    monthlyRent: 2200,
    securityDeposit: 2200,
    rentStatus: "late",
    avatar: "/api/placeholder/80/80",
    emergencyContact: {
      name: "Lisa Chen",
      phone: "(555) 876-5432",
      relationship: "Wife"
    },
    notes: "Generally good tenant, occasional late payment",
    lastPayment: "2023-12-15",
    maintenanceRequests: 1,
  },
  {
    id: "tenant-3",
    firstName: "Emily",
    lastName: "Rodriguez", 
    email: "emily.rodriguez@email.com",
    phone: "(555) 345-6789",
    propertyName: "Garden View Townhomes",
    unit: "12",
    address: "789 Garden Ave, Unit 12",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-02-28",
    monthlyRent: 1650,
    securityDeposit: 1650,
    rentStatus: "current",
    avatar: "/api/placeholder/80/80",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "(555) 765-4321",
      relationship: "Father"
    },
    notes: "New tenant, very responsive and responsible",
    lastPayment: "2024-01-01",
    maintenanceRequests: 0,
  },
]

export default function TenantsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("name")

  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = 
      tenant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || tenant.rentStatus === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "late":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle className="h-3 w-3" />
      case "late":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Calendar className="h-3 w-3" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tenants</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage tenant information and track rent payments
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-brand-600 hover:bg-brand-700 w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </motion.div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="late">Late Payment</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="rent">Rent Amount</SelectItem>
                  <SelectItem value="date">Lease Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Tenant Grid */}
          <motion.div 
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {filteredTenants.map((tenant, index) => (
                <AnimatedCard key={tenant.id} delay={index * 0.1} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                          {tenant.firstName[0]}{tenant.lastName[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold leading-tight">
                            {tenant.firstName} {tenant.lastName}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {tenant.propertyName}
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{tenant.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">{tenant.address}</span>
                      </div>
                    </div>

                    {/* Rent Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(tenant.rentStatus)}
                        <span className="text-sm text-muted-foreground">Rent Status</span>
                      </div>
                      <Badge className={cn("text-xs font-medium", getStatusColor(tenant.rentStatus))}>
                        {tenant.rentStatus.charAt(0).toUpperCase() + tenant.rentStatus.slice(1)}
                      </Badge>
                    </div>

                    {/* Rent Amount */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3 w-3 text-green-600" />
                        <span className="text-sm text-muted-foreground">Monthly Rent</span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(tenant.monthlyRent)}
                      </span>
                    </div>

                    {/* Lease Info */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease Start:</span>
                        <span>{formatDate(tenant.leaseStart)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease End:</span>
                        <span>{formatDate(tenant.leaseEnd)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Payment:</span>
                        <span>{formatDate(tenant.lastPayment)}</span>
                      </div>
                    </div>

                    {/* Maintenance Requests */}
                    {tenant.maintenanceRequests > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Maintenance Requests</span>
                        <Badge variant="outline" className="text-xs">
                          {tenant.maintenanceRequests} pending
                        </Badge>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <FileText className="mr-1 h-3 w-3" />
                        View Lease
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredTenants.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No tenants found</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base px-4">
                Try adjusting your search criteria or add a new tenant
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Tenant
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}