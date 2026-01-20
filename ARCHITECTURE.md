# 🏗️ Technical Architecture Guide - FoodSecure

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FOODSECURE PLATFORM                  │
└─────────────────────────────────────────────────────────┘
           │
           ├─────────────────────┬──────────────────┐
           │                     │                  │
      ┌─────────────┐   ┌──────────────────┐   ┌─────────┐
      │  Frontend   │   │   State & Data   │   │  Styles │
      │  (React)    │   │   Management     │   │  (CSS)  │
      └─────────────┘   └──────────────────┘   └─────────┘
           │                     │
    ┌──────────────┐      ┌─────────────────┐
    │   Components │      │  Contexts API   │
    │   & Pages    │      │  (Auth/Data)    │
    └──────────────┘      └─────────────────┘
           │                     │
      ┌────────────┐        ┌──────────────┐
      │  Routing   │        │ LocalStorage │
      │  (Router)  │        │  Persistence │
      └────────────┘        └──────────────┘
```

---

## Technology Stack

### Frontend Framework
```
React 19.2.0
├── React Router v6 (Navigation)
├── Context API (State Management)
├── Chart.js (Analytics)
└── TypeScript (Type Safety)
```

### Build & Development
```
Vite 7.2.5
├── Hot Module Replacement (HMR)
├── Fast rebuild on save
├── Optimized production builds
└── Development server on port 5173
```

### Styling
```
CSS3
├── Gradient backgrounds
├── Flexbox & Grid layouts
├── Media queries for responsive design
├── CSS transitions & animations
└── CSS custom properties (optional)
```

---

## Project Structure

```
c:\Users\sivag\Desktop\FSD\vishnu\
│
├── src/
│   ├── components/
│   │   ├── AuthPage.tsx              # Login/Registration UI
│   │   └── Navigation.tsx             # Main navigation bar
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx            # Authentication state
│   │   └── FoodDataContext.tsx        # Food data management
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx              # Main dashboard (role-based)
│   │   ├── DonorListings.tsx          # Donor's listings
│   │   ├── CreateListing.tsx          # Create new listing
│   │   ├── BrowseFood.tsx             # Browse available food
│   │   ├── MyClaims.tsx               # Recipient's claims
│   │   ├── AnalyticsReports.tsx       # Analytics dashboard
│   │   ├── AdminUsers.tsx             # User management
│   │   ├── AdminModeration.tsx        # Claims moderation
│   │   └── AdminReports.tsx           # System reports
│   │
│   ├── styles/
│   │   ├── Global.css                 # Global styles & utilities
│   │   ├── Auth.css                   # Authentication page styles
│   │   ├── Navigation.css             # Navigation bar styles
│   │   ├── Dashboard.css              # Dashboard styles
│   │   └── Pages.css                  # Page-specific styles
│   │
│   ├── App.tsx                        # Main app with routing
│   └── main.tsx                       # Entry point
│
├── public/                            # Static assets
├── index.html                         # HTML entry point
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite config
├── README_COMPLETE.md                 # Full documentation
├── FEATURES.md                        # Feature documentation
├── QUICKSTART.md                      # Quick start guide
└── ARCHITECTURE.md                    # This file

```

---

## Data Flow Architecture

### Authentication Flow
```
User Input
    ↓
AuthPage Component
    ↓
AuthContext.login() / register()
    ↓
Create User Object
    ↓
Store in Context State
    ↓
Save to LocalStorage
    ↓
Navigate to Dashboard
```

### Food Data Flow
```
User Action
    ↓
Page Component
    ↓
Call FoodDataContext function
    ↓
Update Context State
    ↓
Components re-render
    ↓
UI reflects new data
```

### Example: Creating a Food Listing
```
1. User fills form on CreateListing page
2. Click "List Food" button
3. Form validation runs
4. addListing() called from FoodDataContext
5. New listing object created with ID
6. Added to listings array in state
7. Component re-renders with success message
8. User redirected to /donor/listings
9. New listing visible in table
```

---

## Component Architecture

### Smart Components (Connected to Context)
```typescript
Components that:
- Use useAuth() or useFoodData() hooks
- Dispatch state changes
- Render based on current state

Examples:
- Dashboard.tsx
- DonorListings.tsx
- BrowseFood.tsx
- AdminModeration.tsx
```

### Presentational Components
```typescript
Components that:
- Receive props
- Handle UI presentation
- Emit events via callbacks

Examples:
- Navigation.tsx
- AuthPage.tsx (input handling)
- Reusable form fields
```

### Page Components
```typescript
Full-page components:
- Dashboard
- DonorListings
- CreateListing
- BrowseFood
- MyClaims
- AnalyticsReports
- AdminUsers
- AdminModeration
- AdminReports
```

---

## State Management with Context API

### AuthContext
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'donor' | 'recipient' | 'analyst';
  organizationName?: string;
}

State:
- user: User | null
- isAuthenticated: boolean

Methods:
- login(email, password, role)
- logout()
- register(data)
```

### FoodDataContext
```typescript
State:
- listings: FoodListing[]
- claims: FoodClaim[]
- metrics: FoodWasteMetric[]

Methods:
- addListing(listing)
- updateListing(id, updates)
- deleteListing(id)
- claimFood(listingId, quantity, recipientId)
- updateClaim(claimId, status)
- getMetrics()
```

---

## Routing Architecture

### Route Structure
```
Protected Routes (require authentication):
├── /dashboard                 (all roles)
├── /donor/*                   (donor only)
│   ├── /listings
│   └── /create
├── /recipient/*               (recipient only)
│   ├── /browse
│   └── /claims
├── /analyst/*                 (analyst only)
│   └── /reports
└── /admin/*                   (admin only)
    ├── /users
    ├── /moderation
    └── /reports

Public Routes:
└── /                          (login page)
```

### ProtectedRoute Component
```typescript
Checks:
1. Is user authenticated?
2. Yes → Render protected component
3. No → Redirect to login

Role-specific protection:
- Check user.role
- Verify route authorization
- Redirect if unauthorized
```

---

## Data Persistence

### LocalStorage Strategy
```
Stored Data:
- User session: localStorage['user']
  └── Contains: id, name, email, role, organization

Persistence Flow:
1. On login → Save user to localStorage
2. On page refresh → Load user from localStorage
3. On logout → Clear localStorage['user']
4. App remains authenticated across sessions
```

### Context State (Session-only)
```
Food Data:
- Listings array
- Claims array
- Metrics array

Behavior:
- Stored in memory (Context)
- Lost on page refresh (can restore from localStorage)
- Updated in real-time for all components
```

---

## Styling Architecture

### CSS Organization
```
Global.css
├── Reset/normalize
├── Typography system
├── Button styles (primary, secondary, danger)
├── Badge styles
├── Form elements
├── Modal styles
└── Utility classes

Auth.css          → Authentication page specific
Navigation.css    → Navigation bar specific
Dashboard.css     → Dashboard specific
Pages.css         → All pages/tables specific
```

### Design System
```
Color Palette:
- Primary Gradient: #667eea → #764ba2
- Success Green: #4caf50
- Warning Orange: #ff9800
- Error Red: #f44336
- Info Blue: #2196f3
- Neutral: #333, #666, #999, #ccc

Typography:
- Font: 'Segoe UI', Tahoma, Geneva, Verdana
- Headings: 600-700 weight
- Body: 400-500 weight

Spacing:
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 40px
```

---

## Component Lifecycle Patterns

### Page Load Cycle
```
1. User navigates to /donor/listings
2. ProtectedRoute checks authentication
3. DonorListings component mounts
4. useFoodData() hook called
5. Component reads listings from context
6. Render listings table
7. User can interact (click, filter, etc.)
```

### Form Submission Cycle
```
1. User fills form on CreateListing
2. onChange events update local state
3. User clicks "List Food"
4. onSubmit handler triggers
5. Form validation runs
6. addListing() called from context
7. New listing added to state
8. Component updates with success message
9. Navigation to listings page
10. Listings page shows new item
```

### Real-time Update Cycle
```
1. User approves claim in admin panel
2. updateClaim() function called
3. Context state updated
4. All subscribed components re-render
5. Changes visible instantly across app
```

---

## Performance Considerations

### Optimization Techniques
```
1. Context Splitting
   - Separate auth and food data contexts
   - Prevents unnecessary re-renders

2. Controlled Components
   - Form inputs use local state
   - Context updates on submit only

3. Lazy Rendering
   - Modals only render when opened
   - Tables render visible rows

4. Memoization Opportunities
   - useMemo for expensive calculations
   - useCallback for stable function references
```

### Potential Bottlenecks
```
1. Large listings arrays
   - Solution: Pagination, filtering
   
2. Complex modal rendering
   - Solution: Lazy load modal content
   
3. Analytics chart calculations
   - Solution: Memoize chart data
   
4. Form validation on every keystroke
   - Solution: Validate on blur/submit
```

---

## Error Handling Strategy

### Authentication Errors
```typescript
try {
  await login(email, password, role)
} catch (error) {
  // Display error message
  // Stay on login page
}
```

### Data Operation Errors
```typescript
try {
  addListing(...)
} catch (error) {
  // Show alert/toast
  // Clear form on retry
}
```

### Navigation Errors
```typescript
// Unauthorized access
→ Redirect to dashboard

// Route not found
→ Navigate to 404 or dashboard
```

---

## Testing Strategy

### Unit Tests
```
- Context functions (login, addListing, etc.)
- Utility functions
- Custom hooks
```

### Integration Tests
```
- Authentication flow
- Food listing creation and claims
- Admin moderation workflow
- Analytics calculations
```

### E2E Tests
```
- Complete donor workflow
- Complete recipient workflow
- Admin moderation flow
- Data persistence
```

---

## Scalability Roadmap

### Phase 1 (Current)
- ✅ Frontend with mock data
- ✅ Context API for state
- ✅ LocalStorage persistence

### Phase 2
- [ ] Backend API integration
- [ ] Real database
- [ ] Authentication service
- [ ] Real-time notifications

### Phase 3
- [ ] Microservices architecture
- [ ] Message queue for async tasks
- [ ] Search service
- [ ] Analytics pipeline

### Phase 4
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Progressive Web App
- [ ] Offline support

---

## Deployment Architecture

### Development
```
Local Development
├── npm run dev
├── http://localhost:5173
├── Hot module reloading
└── Source maps enabled
```

### Production Build
```
npm run build
├── TypeScript compilation
├── Minification & bundling
├── Asset optimization
└── Output: dist/ folder
```

### Hosting Options
```
1. Vercel (recommended)
   - Zero-config deployments
   - Global CDN
   - Preview deployments

2. Netlify
   - Easy drag & drop
   - CI/CD integration
   - Environment variables

3. Azure Static Web Apps
   - Microsoft cloud platform
   - Built-in CI/CD
   - Function integration

4. GitHub Pages
   - Free hosting
   - GitHub integration
   - Custom domain support
```

---

## Security Considerations

### Current (Development)
```
- No real authentication
- Mock user validation
- Demo credentials visible
- LocalStorage for session (not encrypted)
```

### Production Readiness Checklist
```
☐ Real authentication service
☐ JWT token management
☐ HTTPS only
☐ Environment variables for secrets
☐ Input validation & sanitization
☐ CORS configuration
☐ Rate limiting
☐ Data encryption at rest
☐ Regular security audits
```

---

## API Integration Guide

### Converting to Real API
```typescript
// Current: Mock data
const login = async (email, password, role) => {
  const mockUser = { id, name, email, role }
  setUser(mockUser)
}

// Future: Real API
const login = async (email, password, role) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role })
  })
  const user = await response.json()
  setUser(user)
  localStorage.setItem('token', user.token)
}
```

### API Endpoints Needed
```
Authentication:
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/logout
- GET /api/auth/profile

Food Listings:
- GET /api/listings
- POST /api/listings
- PUT /api/listings/:id
- DELETE /api/listings/:id

Claims:
- GET /api/claims
- POST /api/claims
- PUT /api/claims/:id
- GET /api/claims/:id/approve
- GET /api/claims/:id/reject

Analytics:
- GET /api/analytics/metrics
- GET /api/analytics/reports
```

---

## Monitoring & Analytics

### What to Track
```
- User login frequency
- Feature usage by role
- Donation success rate
- Average claim approval time
- Platform growth metrics
- User engagement metrics
```

### Tools to Consider
```
- Google Analytics
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior
- Mixpanel for analytics
```

---

## Development Workflow

### Local Development Setup
```bash
1. Clone/pull repository
2. npm install
3. npm run dev
4. Open http://localhost:5173
5. Code changes auto-refresh
```

### Git Workflow
```
main branch (production)
    ↓
develop branch (staging)
    ↓
feature branches
    ├── feature/auth
    ├── feature/donors
    ├── feature/recipients
    └── feature/admin
```

### Deployment Workflow
```
1. Push to develop
2. Run tests
3. Deploy to staging
4. Manual testing
5. Merge to main
6. Deploy to production
```

---

## Debugging Tips

### React DevTools
- Install React DevTools extension
- View component hierarchy
- Inspect props and state
- Monitor re-renders

### Redux DevTools
- View state changes over time
- Replay actions
- Dispatch custom actions

### Network Inspection
- Check API calls
- Monitor performance
- Verify response data

### Console Debugging
```javascript
// Log context values
console.log(useFoodData())

// Check localStorage
console.log(localStorage)

// Verify state updates
const [data, setData] = useState()
console.log('State updated:', data)
```

---

**This architecture supports current functionality and scales to production needs.**

**Last Updated**: January 20, 2026
**Version**: 1.0.0
