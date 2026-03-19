# 🌱 FoodSecure - Food Waste Reduction Platform

A comprehensive web-based platform designed to reduce food wastage and improve food security by connecting food donors with recipient organizations.

## 📋 Project Overview

**FSAD-PS09: Reduce food wastage and improve food security**

This platform offers solutions to manage food resources more efficiently, help people understand the impact of food waste, and improve overall food security through seamless coordination between multiple stakeholders.

## 👥 User Roles

### 1. **Admin**
- Manage platform content
- Oversee user interactions
- Ensure data accuracy
- Monitor all transactions
- Generate system reports

### 2. **Food Donor**
- List surplus food for donation
- Coordinate donations with recipient organizations
- Track donation impact
- View distribution status
- Manage active listings

### 3. **Recipient Organization**
- Browse available food donations
- Request food donations
- Manage logistics for pickup/delivery
- Distribute food to those in need
- Track received donations

### 4. **Data Analyst**
- Track food waste reduction trends
- Analyze platform data
- Generate detailed analytics reports
- Monitor key performance indicators
- Identify patterns and insights

## 🚀 Features

### Core Functionality
- ✅ User Authentication & Role-Based Access Control
- ✅ Food Listing Management (Create, Update, Delete)
- ✅ Food Claim/Request System
- ✅ Real-Time Status Tracking
- ✅ Admin Moderation Dashboard
- ✅ Analytics & Reporting
- ✅ User Management
- ✅ Responsive Design

### Dashboard Features
- 📊 Real-time Statistics
- 📈 Analytics Charts
- 🎯 Key Performance Indicators
- 📋 Activity Tracking
- 📱 Mobile-Friendly Interface

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **Routing**: React Router v6
- **Styling**: CSS3 with Gradient Effects
- **Charts**: Chart.js with React Wrapper
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: React Context API

## 📦 Project Structure

```
src/
├── components/
│   ├── AuthPage.tsx           # Login/Registration component
│   └── Navigation.tsx          # Main navigation bar
├── contexts/
│   ├── AuthContext.tsx         # Authentication context
│   └── FoodDataContext.tsx     # Food data management context
├── pages/
│   ├── Dashboard.tsx           # Main dashboard
│   ├── DonorListings.tsx       # Donor's food listings
│   ├── CreateListing.tsx       # Create new food listing
│   ├── BrowseFood.tsx          # Browse available food
│   ├── MyClaims.tsx            # Recipient's claims
│   ├── AnalyticsReports.tsx    # Analytics dashboard
│   ├── AdminUsers.tsx          # User management
│   ├── AdminModeration.tsx     # Claims moderation
│   └── AdminReports.tsx        # System reports
├── styles/
│   ├── Global.css              # Global styles
│   ├── Auth.css                # Authentication styles
│   ├── Navigation.css          # Navigation styles
│   ├── Dashboard.css           # Dashboard styles
│   └── Pages.css               # Page styles
├── contexts/
├── App.tsx                     # Main app component with routing
└── main.tsx                    # Entry point
```

## 🔑 Key Pages & Routes

### Authentication
- `/` - Login/Register page

### Donor Routes
- `/dashboard` - Donor dashboard
- `/donor/listings` - View and manage food listings
- `/donor/create` - Create new food listing

### Recipient Routes
- `/dashboard` - Recipient dashboard
- `/recipient/browse` - Browse available food donations
- `/recipient/claims` - View and manage food claims

### Analyst Routes
- `/analyst/reports` - View analytics and reports
- `/analyst/trends` - Analyze food waste trends

### Admin Routes
- `/admin/users` - Manage users and organizations
- `/admin/moderation` - Review and approve claims
- `/admin/reports` - View system statistics and reports

## 💾 Data Models

### Food Listing
```typescript
{
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string; // kg, items, liters, boxes, portions
  category: string;
  expiryDate: string;
  location: string;
  donorId: string;
  donorName: string;
  status: 'available' | 'claimed' | 'distributed' | 'expired';
  createdAt: string;
}
```

### Food Claim
```typescript
{
  id: string;
  listingId: string;
  recipientId: string;
  recipientName: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  claimedAt: string;
  message?: string;
}
```

## 🔐 Demo Credentials

For testing purposes, you can use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Donor | donor@food.com | 123456 |
| Recipient | recipient@org.com | 123456 |
| Admin | admin@food.com | 123456 |
| Analyst | analyst@food.com | 123456 |

## 📖 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd "c:\Users\sivag\Desktop\FSD\vishnu"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The application will automatically open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 UI/UX Features

- **Modern Gradient Design**: Purple and blue gradient theme
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Intuitive Navigation**: Role-based menu system
- **Real-time Feedback**: Instant status updates
- **Data Visualization**: Charts and analytics
- **Accessible Forms**: User-friendly input fields

## 📊 Analytics Dashboard

The Data Analyst dashboard includes:
- 📉 Food Waste Reduction Metrics
- 📦 Donation and Distribution Charts
- 👥 People Benefited Statistics
- 📈 Category-wise Waste Analysis
- 📋 Claim Status Distribution

## 🔄 Workflow Examples

### Donor Workflow
1. Login as Food Donor
2. Go to "List Food"
3. Fill in food details (quantity, expiry, location, etc.)
4. Submit listing
5. View claims on "My Listings"
6. Approve/manage donations

### Recipient Workflow
1. Login as Recipient Organization
2. Browse available food via "Browse Food"
3. Submit claim for needed food
4. Wait for donor approval
5. Track status in "My Claims"
6. Mark as completed after pickup

### Admin Workflow
1. Login as Admin
2. Review pending claims in "Moderation"
3. Approve or reject claims
4. Monitor users in "User Management"
5. View system reports and analytics

### Analyst Workflow
1. Login as Data Analyst
2. Access "Reports" section
3. View food waste trends
4. Analyze distribution patterns
5. Generate insights

## 🌟 Key Features

### Real-time Statistics
- Active food listings
- Pending claims
- Completed distributions
- Total waste reduced

### Smart Filtering
- Filter by food category
- Filter by status
- Date range filtering

### Secure Operations
- Role-based access control
- Protected routes
- User authentication

### Data Persistence
- Local storage for user sessions
- Context API for state management
- Mock data for demonstration

## 📱 Responsive Design

The platform is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1400px+)

## 🚀 Future Enhancements

- [ ] Real API Integration
- [ ] Email Notifications
- [ ] SMS Alerts
- [ ] GPS-based Location Tracking
- [ ] QR Code Generation
- [ ] Mobile App (React Native)
- [ ] Advanced Search Filters
- [ ] Review & Rating System
- [ ] Donation History Export
- [ ] Multi-language Support

## 📝 Notes

- All data is stored in local storage for demonstration
- The app uses mock data for initial setup
- User sessions persist across page refreshes
- All routes are protected with authentication checks

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and style guidelines.

## 📄 License

This project is part of the Full Stack Development program - FSAD-PS09.

## 📞 Support

For issues or questions, please refer to the documentation or contact the development team.

---

**Build with ❤️ to reduce food waste and improve food security**
