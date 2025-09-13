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
import { StaggeredList } from "@/components/ui/staggered-list"
import { PropertiesService, type Property } from "@/lib/services/properties"
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  MoreVertical
} from "lucide-react"
import { cn } from "@/lib/utils"


export default function PropertiesPage() {
  const [properties, setProperties] = React.useState<Property[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filterType, setFilterType] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("name")

  // Load properties from API
  React.useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await PropertiesService.getProperties()
        setProperties(data)
      } catch (err: any) {
        setError(err.message || "Failed to load properties")
        console.error("Failed to load properties:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()
  }, [])

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || property.type.toLowerCase().includes(filterType.toLowerCase())
    return matchesSearch && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "vacant":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Properties</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your rental properties and track performance
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-brand-600 hover:bg-brand-700 w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Property
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
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="occupancy">Occupancy</SelectItem>
                  <SelectItem value="units">Units</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div 
              className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-48 mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-muted rounded h-4 w-3/4"></div>
                    <div className="bg-muted rounded h-3 w-1/2"></div>
                    <div className="bg-muted rounded h-3 w-full"></div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-red-600">Failed to load properties</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Try Again
              </Button>
            </motion.div>
          )}

          {/* Property Grid */}
          {!isLoading && !error && (
            <motion.div 
              className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {filteredProperties.map((property, index) => (
                  <AnimatedCard key={property.id} delay={index * 0.1} className="overflow-hidden">
                    {/* Property Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                      {property.imageUrl && (
                        <img 
                          src={property.imageUrl} 
                          alt={property.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge className={cn("text-xs font-medium", getStatusColor(property.status))}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[200px]">
                            {property.address.split(",")[1]?.trim() || property.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg font-semibold leading-tight line-clamp-1">
                            {property.name}
                          </CardTitle>
                          <CardDescription className="text-sm line-clamp-1 mt-1">
                            {property.address}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Property Type and Units */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{property.type}</span>
                        <span className="text-sm font-medium">{property.units} units</span>
                      </div>

                      {/* Occupancy and Revenue */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Occupancy</span>
                          </div>
                          <span className="font-medium">
                            {property.occupiedUnits}/{property.units} units
                          </span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-brand-600 h-2 rounded-full transition-all"
                            style={{ width: `${(property.occupiedUnits / property.units) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">Monthly Rent</span>
                        </div>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(property.monthlyRent)}
                        </span>
                      </div>

                      {/* Expenses */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-muted-foreground">Monthly Expenses</span>
                        </div>
                        <span className="font-medium text-red-500">
                          {formatCurrency(property.expenses)}
                        </span>
                      </div>

                      {/* Last Updated */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                        <Calendar className="h-3 w-3" />
                        <span>Updated {new Date(property.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </AnimatedCard>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredProperties.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base px-4">
                Try adjusting your search criteria or add a new property
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="bg-brand-600 hover:bg-brand-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Property
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </PageTransition>
    </DashboardLayout>
  )
}