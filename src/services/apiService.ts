import axios from 'axios'
import type { AxiosInstance, AxiosError } from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Handle responses
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/auth'
          toast.error('Session expired. Please login again.')
        } else if (error.response?.status === 403) {
          toast.error('You do not have permission to perform this action.')
        } else {
          toast.error(
            (error.response?.data as any)?.message || 'An error occurred'
          )
        }
        return Promise.reject(error)
      }
    )
  }

  // Food Listings
  async getFoodListings(filters?: Record<string, any>) {
    return this.api.get('/food-listings', { params: filters })
  }

  async getFoodListingById(id: string) {
    return this.api.get(`/food-listings/${id}`)
  }

  async createFoodListing(data: any) {
    return this.api.post('/food-listings', data)
  }

  async updateFoodListing(id: string, data: any) {
    return this.api.put(`/food-listings/${id}`, data)
  }

  async deleteFoodListing(id: string) {
    return this.api.delete(`/food-listings/${id}`)
  }

  // Claims
  async claimFood(listingId: string, data: any) {
    return this.api.post(`/claims`, { foodListingId: listingId, ...data })
  }

  async getMyClaims() {
    return this.api.get('/claims/my-claims')
  }

  async updateClaimStatus(claimId: string, status: string) {
    return this.api.put(`/claims/${claimId}/status`, { status })
  }

  // Users
  async getUserProfile() {
    return this.api.get('/users/profile')
  }

  async updateUserProfile(data: any) {
    return this.api.put('/users/profile', data)
  }

  // Auth
  async login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password })
  }

  async register(data: any) {
    return this.api.post('/auth/register', data)
  }

  // Reports
  async submitReport(data: any) {
    return this.api.post('/reports', data)
  }

  async getReports() {
    return this.api.get('/reports')
  }
}

export const apiService = new ApiService()
