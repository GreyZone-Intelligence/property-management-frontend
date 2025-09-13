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
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Wrench,
  Zap,
  Home,
  Car,
  Thermometer,
  MoreVertical,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Tool,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock maintenance request data
const mockMaintenanceRequests = [
  {
    id: "req-1",
    title: "Kitchen Faucet Leak",
    description: "Kitchen faucet has been leaking for 2 days. Water drips constantly even when turned off completely.",
    category: "Plumbing",
    priority: "high",
    status: "assigned",
    propertyName: "Sunset Vista Apartments",
    unit: "3B",
    tenantName: "Sarah Johnson",
    tenantPhone: "(555) 123-4567",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-11",
    estimatedCost: 150,
    assignedVendor: {
      id: "vendor-1",
      name: "QuickFix Plumbing",
      rating: 4.8,
      completedJobs: 127,
      phone: "(555) 999-1234",
      specialties: ["Plumbing", "Emergency Repairs"],
      avatar: "/api/placeholder/40/40",
    },
    images: ["kitchen-leak-1.jpg", "kitchen-leak-2.jpg"],
  },
  {
    id: "req-2", 
    title: "HVAC Not Heating",
    description: "Heating system stopped working yesterday. Temperature won't go above 60°F despite thermostat being set to 72°F.",
    category: "HVAC",
    priority: "urgent",
    status: "in_progress",
    propertyName: "Downtown Loft Complex",
    unit: "7A",
    tenantName: "Michael Chen",
    tenantPhone: "(555) 234-5678",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-11",
    estimatedCost: 450,
    assignedVendor: {
      id: "vendor-2",
      name: "Arctic Air Solutions",
      rating: 4.9,
      completedJobs: 89,
      phone: "(555) 888-5678",
      specialties: ["HVAC", "Refrigeration", "Electrical"],
      avatar: "/api/placeholder/40/40",
    },
    images: ["hvac-unit.jpg"],
  },
  {
    id: "req-3",
    title: "Electrical Outlet Not Working",
    description: "Living room outlet near TV stopped working. No power output, checked breakers - all seem fine.",
    category: "Electrical",
    priority: "medium",
    status: "pending",
    propertyName: "Garden View Townhomes",
    unit: "12",
    tenantName: "Emily Rodriguez",
    tenantPhone: "(555) 345-6789",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
    estimatedCost: 200,
    suggestedVendors: [
      {
        id: "vendor-3",
        name: "Bright Spark Electric",
        rating: 4.7,
        completedJobs: 156,
        phone: "(555) 777-9999",
        specialties: ["Electrical", "Smart Home", "Panel Upgrades"],
        matchScore: 95,
        estimatedCost: 180,
        availability: "Same Day",
      },
      {
        id: "vendor-4",
        name: "PowerPro Electrical",
        rating: 4.6,
        completedJobs: 203,
        phone: "(555) 666-8888",
        specialties: ["Electrical", "Industrial", "Emergency"],
        matchScore: 88,
        estimatedCost: 220,
        availability: "Within 2 hours",
      },
    ],
    images: ["outlet-issue.jpg"],
  },
  {
    id: "req-4",
    title: "Dishwasher Making Noise",
    description: "Dishwasher makes loud grinding noise during wash cycle. Still cleans dishes but very loud.",
    category: "Appliances",
    priority: "low",
    status: "completed",
    propertyName: "Sunset Vista Apartments",
    unit: "5A", 
    tenantName: "David Wilson",
    tenantPhone: "(555) 456-7890",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-10",
    completedAt: "2024-01-10",
    actualCost: 120,
    assignedVendor: {
      id: "vendor-5",
      name: "Home Appliance Pros",
      rating: 4.5,
      completedJobs: 92,
      phone: "(555) 555-0123",
      specialties: ["Appliances", "Kitchen Repairs"],
      avatar: "/api/placeholder/40/40",
    },
    images: ["dishwasher-before.jpg", "dishwasher-after.jpg"],
  },
]

export default function MaintenancePage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [filterCategory, setFilterCategory] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("created")

  const filteredRequests = mockMaintenanceRequests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesCategory = filterCategory === "all" || request.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "assigned":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Plumbing":
        return <Wrench className="h-4 w-4" />
      case "Electrical":
        return <Zap className="h-4 w-4" />
      case "HVAC":
        return <Thermometer className="h-4 w-4" />
      case "Appliances":
        return <Home className="h-4 w-4" />
      default:
        return <Tool className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "assigned":
        return <User className="h-4 w-4" />
      case "pending":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
      month: "short",
      day: "numeric",
      year: "numeric",
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Maintenance</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage maintenance requests and vendor assignments
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-brand-600 hover:bg-brand-700 w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                New Request
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
                placeholder="Search maintenance requests..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Appliances">Appliances</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Maintenance Request Cards */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {filteredRequests.map((request, index) => (
                <AnimatedCard key={request.id} delay={index * 0.1}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                              {getCategoryIcon(request.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold">{request.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {request.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("text-xs", getPriorityColor(request.priority))}>
                            {request.priority.toUpperCase()}
                          </Badge>
                          <Badge className={cn("text-xs flex items-center gap-1", getStatusColor(request.status))}>
                            {getStatusIcon(request.status)}
                            {request.status.replace("_", " ").toUpperCase()}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Property and Tenant Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Property:</span>
                          <span className="font-medium truncate">{request.propertyName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Home className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Unit:</span>
                          <span className="font-medium">{request.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Tenant:</span>
                          <span className="font-medium truncate">{request.tenantName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Created:</span>
                          <span className="font-medium">{formatDate(request.createdAt)}</span>
                        </div>
                      </div>

                      {/* Vendor Assignment Section */}
                      {request.status === "pending" && request.suggestedVendors ? (
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            AI-Matched Vendors
                          </h4>
                          <div className="grid gap-3">
                            {request.suggestedVendors.map((vendor) => (
                              <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                                    {vendor.name.slice(0, 2)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{vendor.name}</span>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-muted-foreground">{vendor.rating}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>{vendor.completedJobs} jobs</span>
                                      <span>{formatCurrency(vendor.estimatedCost)}</span>
                                      <span className="text-green-600">{vendor.availability}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {vendor.matchScore}% match
                                  </Badge>
                                  <Button size="sm">Assign</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : request.assignedVendor ? (
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Assigned Vendor
                          </h4>
                          <div className="flex items-center justify-between p-3 border rounded-lg bg-accent/30">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                                {request.assignedVendor.name.slice(0, 2)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{request.assignedVendor.name}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs text-muted-foreground">{request.assignedVendor.rating}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>{request.assignedVendor.completedJobs} completed jobs</span>
                                  <span>{request.assignedVendor.specialties.join(", ")}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="mr-1 h-3 w-3" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="mr-1 h-3 w-3" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* Cost Information */}
                      <div className="flex items-center justify-between pt-2 border-t text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">
                            {request.status === "completed" ? "Final Cost:" : "Estimated Cost:"}
                          </span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(request.status === "completed" ? request.actualCost || 0 : request.estimatedCost)}
                          </span>
                        </div>
                        {request.images?.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {request.images.length} photo{request.images.length !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Wrench className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No maintenance requests found</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base px-4">
                Try adjusting your search criteria or create a new maintenance request
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Request
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}