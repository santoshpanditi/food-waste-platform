# UI Components & Form Validation Guide

## Quick Start

### 1. Using the Form Component

```tsx
import { Form, Input, Button } from '@/components'
import { loginSchema, type LoginInput } from '@/lib/validationSchemas'

export function LoginForm() {
  return (
    <Form
      schema={loginSchema}
      onSubmit={async (data: LoginInput) => {
        // Handle submission
      }}
    >
      <Input name="email" label="Email" type="email" />
      <Input name="password" label="Password" type="password" />
      <Button type="submit">Login</Button>
    </Form>
  )
}
```

### 2. Using Pre-built Validation Schemas

Available schemas in `src/lib/validationSchemas.ts`:

```typescript
loginSchema           // Email + password validation
registerSchema        // Full registration with password confirm
createFoodListingSchema  // Food donation listing form
claimFoodSchema       // Claiming food donations
reportSchema          // Reporting issues
```

### 3. Using Components

#### Button Component
```tsx
<Button variant="primary" size="lg">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

#### Input Component
```tsx
<Input 
  name="username"
  label="Username"
  placeholder="Enter your username"
  type="text"
  error={error?.message}  // Error display
  hint="Min 3 characters"  // Helper text
/>
```

#### Card Component
```tsx
<Card>
  <CardHeader>
    <h2>Title</h2>
  </CardHeader>
  <CardBody>
    <p>Content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

#### FoodListingCard Component
```tsx
<FoodListingCard
  id="listing-1"
  foodType="Biryani"
  quantity="5 kg"
  location="Downtown"
  donor="John Doe"
  expiresIn="2 hours"
  onView={() => {}}
  onClaim={() => {}}
/>
```

#### DataTable Component
```tsx
import { DataTable } from '@/components'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
]

<DataTable columns={columns} data={users} />
```

---

## API Service Usage

```typescript
import { apiService } from '@/services/apiService'

// Food Listings
const listings = await apiService.getFoodListings()
const listing = await apiService.getFoodListingById('123')
await apiService.createFoodListing(data)
await apiService.updateFoodListing('123', updatedData)
await apiService.deleteFoodListing('123')

// Claims
await apiService.claimFood('listingId', claimData)
const claims = await apiService.getMyClaims()
await apiService.updateClaimStatus('claimId', 'APPROVED')

// Users
const profile = await apiService.getUserProfile()
await apiService.updateUserProfile(updatedData)

// Auth
await apiService.login('email@example.com', 'password')
await apiService.register(userData)

// Reports
await apiService.submitReport(reportData)
const reports = await apiService.getReports()
```

---

## Notifications

```typescript
import toast from 'react-hot-toast'

toast.success('Operation successful!')
toast.error('Something went wrong')
toast.loading('Loading...')
toast('Custom message')
```

---

## Validation Schemas

### Login
```typescript
{
  email: string (required, must be valid email)
  password: string (required, min 6 chars)
}
```

### Register
```typescript
{
  name: string (required, min 2 chars)
  email: string (required, valid email)
  password: string (required, min 6 chars)
  confirmPassword: string (must match password)
  phone: string (required, min 10 chars)
  address: string (required, min 5 chars)
}
```

### Create Food Listing
```typescript
{
  foodType: string (required)
  quantity: string (required)
  description: string (required, min 10 chars)
  location: string (required)
  latitude: number (optional)
  longitude: number (optional)
  expiresAt: string (required, ISO datetime)
  image: string (optional)
}
```

### Claim Food
```typescript
{
  requiredQuantity: string (required)
  notes: string (optional)
  pickupLocation: string (required)
}
```

### Report Issue
```typescript
{
  listingId: string (required)
  reason: enum ['fraud' | 'expired' | 'quality' | 'other']
  description: string (required, min 10 chars)
}
```

---

## Hooks

### useAsync
```typescript
import { useAsync } from '@/hooks/useAsync'

const { execute, status, value, error } = useAsync(
  () => apiService.getFoodListings(),
  true // Execute immediately
)

if (status === 'pending') return <div>Loading...</div>
if (status === 'error') return <div>Error: {error}</div>
return <div>{value}</div>
```

### useFormState
```typescript
import { useFormState } from '@/hooks/useAsync'

const { loading, errors, handleSubmit } = useFormState()

const onSubmit = async (data) => {
  return handleSubmit(
    () => apiService.createListing(data),
    (result) => {
      // On success
      navigate('/listings')
    }
  )
}
```

---

## Styling with Tailwind

All components use Tailwind CSS. Colors are defined in `tailwind.config.js`:

```javascript
colors: {
  primary: "#10b981",    // Green
  secondary: "#f59e0b",  // Amber
}
```

### Spacing Classes
- `p-4` = padding
- `m-4` = margin
- `gap-4` = gap between flex items
- `px-4 py-2` = horizontal and vertical padding

### Responsive Classes
```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive widths
</div>
```

---

## Icons

All icons from lucide-react are available:

```typescript
import { 
  Home, 
  MapPin, 
  Clock, 
  User, 
  Flame,
  Plus,
  Edit,
  Trash2,
  Search,
  Menu,
  // ... 100+ more icons
} from '@/components'

<Home size={24} className="text-primary" />
```

---

## Environment Variables

Create `.env.local` in project root:

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Vishnu Food Donation
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Example: Complete Login Page

```tsx
import { Form, Input, Button } from '@/components'
import { loginSchema, type LoginInput } from '@/lib/validationSchemas'
import { apiService } from '@/services/apiService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 
                    flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Login to your account</p>

        <Form
          schema={loginSchema}
          onSubmit={async (data: LoginInput) => {
            try {
              const response = await apiService.login(
                data.email,
                data.password
              )
              localStorage.setItem('auth_token', response.data.token)
              toast.success('Login successful!')
              navigate('/dashboard')
            } catch (error) {
              toast.error('Invalid credentials')
            }
          }}
          className="space-y-4"
        >
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
        </Form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
```

---

## Tips & Best Practices

1. **Always use schemas for validation** - Don't skip form validation
2. **Handle errors gracefully** - Show user-friendly error messages
3. **Use loading states** - Disable buttons during API calls
4. **Responsive design first** - Test on mobile devices
5. **Accessibility** - Use labels with inputs, semantic HTML
6. **Error boundaries** - Wrap components to catch rendering errors
7. **Memoization** - Use React.memo for expensive components

---

## Build & Deploy

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

---

## Troubleshooting

### Form not validating?
- Check schema definition
- Ensure input `name` attributes match schema keys
- Check console for validation errors

### Styles not applying?
- Run `npm run build` to apply Tailwind
- Clear browser cache
- Check Tailwind config in `tailwind.config.js`

### API calls failing?
- Check `.env.local` for correct API URL
- Verify backend is running
- Check network tab in DevTools
- Look for CORS errors

### Type errors?
- Ensure types are imported with `type` keyword
- Run `npm run build` to type-check
- Check TypeScript version compatibility

---

Ready to build! 🚀
