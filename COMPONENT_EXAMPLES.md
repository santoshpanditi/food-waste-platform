# 📖 UI Component Usage Examples

## Form with Validation

### Login Form Example
```tsx
import { Form, FormField, Button } from '@/components'
import { loginSchema, type LoginInput } from '@/lib/validationSchemas'
import { apiService } from '@/services/apiService'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = async (data: LoginInput) => {
    try {
      const response = await apiService.login(data.email, data.password)
      localStorage.setItem('auth_token', response.data.token)
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      
      <Form schema={loginSchema} onSubmit={handleLogin}>
        <FormField 
          name="email" 
          label="Email Address" 
          placeholder="you@example.com"
        />
        
        <FormField 
          name="password" 
          label="Password" 
          type="password"
          hint="At least 6 characters"
        />
        
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </Form>
    </div>
  )
}
```

---

## Food Listing Card

### Display Food Donations
```tsx
import { FoodListingCard } from '@/components'
import { useEffect, useState } from 'react'
import { apiService } from '@/services/apiService'

export default function BrowseFood() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await apiService.getFoodListings()
        setListings(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {listings.map((listing) => (
        <FoodListingCard
          key={listing.id}
          id={listing.id}
          foodType={listing.foodType}
          quantity={listing.quantity}
          location={listing.location}
          donor={listing.donorName}
          image={listing.imageUrl}
          expiresIn={`In ${listing.hoursLeft} hours`}
          onView={() => console.log('View:', listing.id)}
          onClaim={() => handleClaim(listing.id)}
        />
      ))}
    </div>
  )

  async function handleClaim(listingId: string) {
    const message = prompt('Enter quantity to claim:')
    if (!message) return

    try {
      await apiService.claimFood(listingId, { requiredQuantity: message })
      alert('Food claimed successfully!')
    } catch (error) {
      alert('Failed to claim food')
    }
  }
}
```

---

## Data Table for Admin

### User Management Table
```tsx
import { DataTable } from '@/components'
import { ColumnDef } from '@tanstack/react-table'
import { Button, Trash2, Edit } from '@/components'
import { useEffect, useState } from 'react'
import { apiService } from '@/services/apiService'

interface User {
  id: string
  name: string
  email: string
  role: string
  joinedDate: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getUserProfile()
        setUsers(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: (info) => (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'joinedDate',
      header: 'Joined',
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit size={16} />
          </Button>
          <Button size="sm" variant="outline" className="text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
```

---

## Create Food Listing

### Donation Form
```tsx
import { Form, FormField, Button, Card, CardBody } from '@/components'
import { createFoodListingSchema, type CreateFoodListingInput } from '@/lib/validationSchemas'
import { apiService } from '@/services/apiService'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
  const navigate = useNavigate()

  const handleSubmit = async (data: CreateFoodListingInput) => {
    const loading = toast.loading('Creating listing...')
    try {
      await apiService.createFoodListing(data)
      toast.success('Listing created successfully!', { id: loading })
      navigate('/my-listings')
    } catch (error) {
      toast.error('Failed to create listing', { id: loading })
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardBody>
          <h1 className="text-3xl font-bold mb-6">Donate Food</h1>
          
          <Form 
            schema={createFoodListingSchema} 
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <FormField 
              name="foodType" 
              label="Food Type"
              placeholder="e.g., Rice, Vegetables, Cooked meals"
            />
            
            <FormField 
              name="quantity" 
              label="Quantity"
              placeholder="e.g., 10 kg, 5 portions"
            />
            
            <FormField 
              name="location" 
              label="Pickup Location"
              placeholder="Your address"
            />
            
            <FormField 
              name="description" 
              label="Description"
              placeholder="Details about the food quality, freshness, etc."
            />
            
            <FormField 
              name="expiresAt" 
              label="Expires At"
              type="datetime-local"
            />
            
            <Button type="submit" className="w-full">
              Post Listing
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
```

---

## Report Food Listing

### Report Form with Toast
```tsx
import { Form, FormField, Button } from '@/components'
import { reportSchema, type ReportInput } from '@/lib/validationSchemas'
import { apiService } from '@/services/apiService'
import toast from 'react-hot-toast'

interface ReportFoodProps {
  listingId: string
  onClose: () => void
}

export default function ReportFood({ listingId, onClose }: ReportFoodProps) {
  const handleReport = async (data: ReportInput) => {
    const loadingId = toast.loading('Submitting report...')
    
    try {
      await apiService.submitReport({
        ...data,
        listingId,
      })
      
      toast.success('Report submitted successfully', { id: loadingId })
      onClose()
    } catch (error) {
      toast.error('Failed to submit report', { id: loadingId })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Report Listing</h2>
        
        <Form 
          schema={reportSchema} 
          onSubmit={handleReport}
          className="space-y-4"
        >
          <FormField 
            name="reason" 
            label="Reason for Report"
          />
          
          <FormField 
            name="description" 
            label="Details"
            placeholder="Provide more information..."
          />
          
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
            >
              Report
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
```

---

## Custom Hooks Usage

### Async Data Fetching
```tsx
import { useAsync } from '@/hooks/useAsync'
import { apiService } from '@/services/apiService'

export default function DashboardStats() {
  const { value, status, error } = useAsync(
    () => apiService.getFoodListings(),
    true  // Fetch immediately
  )

  if (status === 'pending') return <div>Loading...</div>
  if (status === 'error') return <div>Error: {error}</div>

  return (
    <div>
      <h2>Total Listings: {value?.data?.length}</h2>
    </div>
  )
}
```

---

## Button Variants

```tsx
import { Button } from '@/components'

export default function ButtonShowcase() {
  return (
    <div className="space-y-4 p-6">
      {/* Primary Button */}
      <Button variant="primary">Primary Button</Button>
      
      {/* Secondary Button */}
      <Button variant="secondary">Secondary Button</Button>
      
      {/* Outline Button */}
      <Button variant="outline">Outline Button</Button>
      
      {/* Ghost Button */}
      <Button variant="ghost">Ghost Button</Button>
      
      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      
      {/* Disabled */}
      <Button disabled>Disabled Button</Button>
    </div>
  )
}
```

---

## Icons

```tsx
import { 
  MapPin, 
  Clock, 
  User, 
  Flame,
  Plus,
  Edit,
  Trash2,
  Search
} from '@/components'

export default function IconShowcase() {
  return (
    <div className="flex gap-4">
      <MapPin size={24} className="text-primary" />
      <Clock size={24} className="text-secondary" />
      <User size={24} />
      <Flame size={24} className="text-orange-500" />
      <Plus size={24} />
      <Edit size={24} />
      <Trash2 size={24} className="text-red-600" />
      <Search size={24} />
    </div>
  )
}
```

---

## Card Component

```tsx
import { Card, CardHeader, CardBody, CardFooter, Button } from '@/components'

export default function CardExample() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <h2 className="text-xl font-bold">Card Title</h2>
      </CardHeader>
      
      <CardBody>
        <p>Card content goes here. You can put any content inside.</p>
      </CardBody>
      
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  )
}
```

All examples are production-ready! Customize as needed for your specific use cases. 🚀
