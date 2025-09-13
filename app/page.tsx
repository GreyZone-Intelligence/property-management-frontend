import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Building2, Users, Wrench, CreditCard, BarChart3, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm">
            <Shield className="mr-2 h-4 w-4 text-brand-600" />
            Enterprise-Grade Property Management
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
              PropertyOS
            </span>
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground">
            Advanced property management platform with AI-powered vendor marketplace, 
            predictive maintenance, and enterprise-grade workflows.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Everything you need to manage properties
          </h2>
          <p className="text-lg text-muted-foreground">
            From property portfolios to vendor marketplaces, all in one platform
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="property-card">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                <Building2 className="h-6 w-6" />
              </div>
              <CardTitle>Property Portfolio</CardTitle>
              <CardDescription>
                Manage multiple properties with advanced analytics and performance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  Property performance dashboards
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  Occupancy and vacancy tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                  NOI and cash flow forecasting
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="property-card">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-success-100 text-success-600">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>
                Comprehensive tenant lifecycle management with screening and communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success-600" />
                  Automated tenant screening
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success-600" />
                  Digital lease management
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-success-600" />
                  Communication portal
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="property-card">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-warning-100 text-warning-600">
                <Wrench className="h-6 w-6" />
              </div>
              <CardTitle>Vendor Marketplace</CardTitle>
              <CardDescription>
                AI-powered vendor matching with triangular communication workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning-600" />
                  Smart vendor matching
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning-600" />
                  Work order automation
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning-600" />
                  Escrow payment system
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="property-card">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <CreditCard className="h-6 w-6" />
              </div>
              <CardTitle>Payment Processing</CardTitle>
              <CardDescription>
                Advanced payment processing with multi-party transactions and automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Online rent collection
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Automated late fees
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  Split payment processing
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="property-card">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Comprehensive reporting and predictive analytics for informed decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Predictive maintenance
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Financial forecasting
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Performance insights
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="property-card">
            <CardHeader>
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <Shield className="h-6 w-6" />
              </div>
              <CardTitle>Enterprise Security</CardTitle>
              <CardDescription>
                Bank-grade security with compliance and audit-ready features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  SOC2 compliance ready
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  Role-based access control
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  Audit trail logging
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to transform your property management?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join property managers and landlords who are scaling their operations with PropertyOS
          </p>
          <Button size="lg" className="group">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  )
}