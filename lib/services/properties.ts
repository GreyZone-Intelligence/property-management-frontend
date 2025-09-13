import api from '@/lib/api'

export interface Property {
  id: string
  name: string
  address: string
  type: 'apartment' | 'house' | 'commercial' | 'mixed'
  units: number
  occupiedUnits: number
  monthlyRent: number
  expenses: number
  imageUrl?: string
  status: 'active' | 'maintenance' | 'vacant'
  createdAt: string
  updatedAt: string
}

export interface PropertyAnalytics {
  occupancyRate: number
  monthlyRevenue: number
  totalExpenses: number
  netOperatingIncome: number
}

export interface CreatePropertyData {
  name: string
  address: string
  type: Property['type']
  units: number
  monthlyRent: number
  imageUrl?: string
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {}

export class PropertiesService {
  static async getProperties(): Promise<Property[]> {
    const response = await api.get('/properties')
    return response.data
  }

  static async getProperty(id: string): Promise<Property> {
    const response = await api.get(`/properties/${id}`)
    return response.data
  }

  static async createProperty(data: CreatePropertyData): Promise<Property> {
    const response = await api.post('/properties', data)
    return response.data
  }

  static async updateProperty(id: string, data: UpdatePropertyData): Promise<Property> {
    const response = await api.put(`/properties/${id}`, data)
    return response.data
  }

  static async deleteProperty(id: string): Promise<void> {
    await api.delete(`/properties/${id}`)
  }

  static async getPropertyAnalytics(id: string): Promise<PropertyAnalytics> {
    const response = await api.get(`/properties/${id}/analytics`)
    return response.data
  }

  static async getPropertyUnits(id: string) {
    const response = await api.get(`/properties/${id}/units`)
    return response.data
  }
}