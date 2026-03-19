# UI Components & Setup Guide

## 🎨 Installed Libraries

### Core UI
- **shadcn/ui** - Headless UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Form & Validation
- **react-hook-form** - Performant form library
- **@hookform/resolvers** - Validation resolvers
- **zod** - TypeScript-first schema validation

### Notifications
- **react-hot-toast** - Toast notification library

### Data Management
- **@tanstack/react-table** - Headless UI for tables
- **axios** - HTTP client with interceptors

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Form.tsx
│   │   ├── DataTable.tsx
│   │   └── index.ts
│   ├── FoodListingCard.tsx    # Feature component
│   └── index.ts               # Component exports
├── lib/
│   ├── utils.ts               # Helper functions (cn)
│   └── validationSchemas.ts   # Zod validation schemas
├── hooks/
│   └── useAsync.ts            # Custom async hooks
├── services/
│   └── apiService.ts          # Centralized API client
├── providers/
│   └── ToastProvider.tsx      # Toast notification setup
├── styles/                     # Styling
├── pages/                      # Page components
├── contexts/                   # React contexts
├── index.css                   # Tailwind directives
└── App.tsx
```

---

## 🚀 Usage Examples

### 1. Using Button Component
```tsx
import { Button } from '@/components'

export default function MyComponent() {
  return (
    <>
      <Button variant="primary" size="md">Primary Button</Button>
      <Button variant="outline" size="sm">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </>
  )
}
```

### 2. Creating Forms with Validation
```tsx
import { Form, Input, Button } from '@/components'
import { loginSchema, type LoginInput } from '@/lib/validationSchemas'

export default function LoginForm() {
  return (
    <Form
      schema={loginSchema}
      onSubmit={(data: LoginInput) => {
        console.log(data)
        // Call API
      }}
    >
      <FormField name="email" label="Email" />
      <FormField name="password" label="Password" type="password" />
      <Button type="submit">Login</Button>
    </Form>
  )
}
```

### 3. Using Food Listing Card
```tsx
import { FoodListingCard } from '@/components'

export default function FoodList() {
  return (
    <FoodListingCard
      id="1"
      foodType="Rice & Dal"
      quantity="10 kg"
      location="Mumbai, India"
      donor="John's Restaurant"
      expiresIn="In 2 hours"
      onView={() => console.log('View')}
      onClaim={() => console.log('Claim')}
    />
  )
}
```

### 4. Making API Calls
```tsx
import { apiService } from '@/services/apiService'
import toast from 'react-hot-toast'

// In component
const fetchListings = async () => {
  try {
    const response = await apiService.getFoodListings({ location: 'Mumbai' })
    console.log(response.data)
  } catch (error) {
    toast.error('Failed to fetch listings')
  }
}
```

### 5. Using Data Table
```tsx
import { DataTable } from '@/components'
import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

export default function UsersList() {
  return <DataTable columns={columns} data={users} />
}
```

### 6. Using Toast Notifications
```tsx
import toast from 'react-hot-toast'

// Success
toast.success('Food claimed successfully!')

// Error
toast.error('Failed to claim food')

// Loading
const id = toast.loading('Processing...')
toast.success('Done!', { id })
```

---

## 🔧 Configuration

### Tailwind Colors (in `tailwind.config.js`)
- Primary: `#10b981` (Green - for donation)
- Secondary: `#f59e0b` (Amber - for alerts)

Customize in `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: "#10b981",
      secondary: "#f59e0b",
    },
  },
}
```

### API Configuration
Set your API URL in `.env.local`:
```
VITE_API_URL=http://localhost:8080/api
```

---

## 📋 Available Components

### Base Components (`src/components/ui/`)
- `Button` - Customizable button with variants
- `Input` - Form input with validation
- `Card`, `CardHeader`, `CardBody`, `CardFooter` - Card layouts
- `Form` - Form wrapper with react-hook-form
- `DataTable` - Pagination table

### Feature Components
- `FoodListingCard` - Display food donation listings

---

## 🎯 Next Steps

1. **Update CreateListing.tsx** - Use Form + Input components
2. **Update BrowseFood.tsx** - Use FoodListingCard in a grid
3. **Update AdminUsers.tsx** - Use DataTable for user list
4. **Create FormField component** - Wrapper around Input for Form integration
5. **Add more UI components** - Modal, Dropdown, Tabs, etc.

---

## 📚 Documentation Links
- [react-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [TanStack Table](https://tanstack.com/table/v8)
