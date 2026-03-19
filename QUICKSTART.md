# 🚀 Quick Start Guide - FoodSecure Platform

## ⚡ 5-Minute Setup

### Step 1: Start the Development Server
```bash
cd "c:\Users\sivag\Desktop\FSD\vishnu"
npm run dev
```

The app will automatically open at `http://localhost:5173`

### Step 2: Choose Your Role & Login

Pick one of these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| 🥕 Donor | donor@food.com | 123456 |
| 🏢 Recipient | recipient@org.com | 123456 |
| 👨‍💼 Admin | admin@food.com | 123456 |
| 📊 Analyst | analyst@food.com | 123456 |

---

## 🥕 Donor Quick Tour

### Login as a Food Donor
1. Click the role selector → select "Food Donor"
2. Enter email: `donor@food.com`
3. Enter password: `123456`
4. Click **Login**

### Your Dashboard
- See statistics on available food and claims
- Quick overview of your impact

### List Food (Create Donation)
1. Click **"List Food"** in top menu
2. Fill the form:
   - **Food Name**: "Fresh Tomatoes"
   - **Description**: "Ripe, fresh tomatoes from local farm"
   - **Quantity**: 50
   - **Unit**: kg
   - **Category**: Vegetables
   - **Expiry**: Select a date (e.g., 2026-01-25)
   - **Location**: "Downtown Market, Aisle 5"
3. Click **"List Food"**
4. Success! Your donation is now visible to recipients

### Manage Your Listings
1. Click **"My Listings"** in top menu
2. View all your food listings in a table
3. See how many organizations claimed each item
4. Click **"View"** to see all claims for a specific listing
5. Update status (available → claimed → distributed)
6. Delete listing if needed

---

## 🏢 Recipient Organization Quick Tour

### Login as Recipient
1. Click the role selector → select "Recipient Organization"
2. Enter email: `recipient@org.com`
3. Enter password: `123456`
4. Click **Login**

### Your Dashboard
- See total food available
- Track your active claims
- Monitor completed distributions

### Browse Available Food
1. Click **"Browse Food"** in top menu
2. See all available food donations in card format
3. Filter by **Category** (Vegetables, Bakery, etc.)
4. Click **"Claim Food"** on any item

### Claim Food
1. Enter the **quantity** you need
2. (Optional) Add a message for the donor
3. Review your organization info
4. Click **"Submit Claim"**
5. Wait for donor approval

### Track Your Claims
1. Click **"My Claims"** in top menu
2. Filter by status (Pending, Approved, Completed, Rejected)
3. View claim details:
   - What food you claimed
   - How much you requested
   - Current status
   - Donor information
4. Mark as **"Completed"** once you pick up the food

---

## 👨‍💼 Admin Quick Tour

### Login as Admin
1. Click role selector → select "Admin"
2. Enter email: `admin@food.com`
3. Enter password: `123456`
4. Click **Login**

### Admin Dashboard
- Overview of all platform activity
- Total listings and claims
- Pending items needing action

### Moderate Claims
1. Click **"Moderation"** in top menu
2. See all pending claims that need approval
3. Click **"Review Claim"** on any claim
4. Review recipient organization and request
5. Click **✓ Approve** or **✗ Reject**
6. Claim status updates automatically

### Manage Users
1. Click **"Users"** in top menu
2. See all **Food Donors** with their:
   - Number of listings
   - Total food donated
   - Successful distributions
3. See all **Recipient Organizations** with their:
   - Total claims
   - Approved claims
   - Completed distributions

### View System Reports
1. Click **"System Reports"** in top menu
2. See platform-wide statistics:
   - Total listings & food available
   - All claims breakdown by status
   - Success rates and percentages

---

## 📊 Data Analyst Quick Tour

### Login as Analyst
1. Click role selector → select "Data Analyst"
2. Enter email: `analyst@food.com`
3. Enter password: `123456`
4. Click **Login**

### Analytics Dashboard
1. Click **"Reports"** in top menu
2. View key metrics:
   - **Waste Reduced (kg)**: 150 kg
   - **Food Donated (kg)**: 200 kg
   - **People Benefited**: 45 people
   - **Avg per Listing**: Food per listing ratio

### Data Visualizations
1. **Food Waste by Category Chart**
   - Bar chart showing waste reduction
   - Compares Vegetables, Bakery, Dairy, Grains
   - Identify most wasted categories

2. **Claim Distribution Status Chart**
   - Pie chart showing claim statuses
   - Pending, Approved, Completed, Rejected
   - See platform efficiency

### Detailed Metrics Table
- Total active listings
- Total claims submitted
- Completed claims
- Pending claims
- Success rates

---

## 🔄 Common Workflows

### Workflow 1: Donate Food (Donor → Recipient)
```
1. Donor lists fresh vegetables
2. Recipient browses and finds the listing
3. Recipient claims 25 kg
4. Admin approves the claim
5. Recipient picks up food
6. Recipient marks claim as completed
7. Analytics updated with donation impact
```

### Workflow 2: Track Impact (Analyst)
```
1. Analyst views reports
2. Sees 150 kg of waste reduced today
3. Sees 45 people benefited
4. Analyzes by category
5. Identifies Vegetables as most donated
6. Uses insights for future platform improvements
```

### Workflow 3: Admin Moderation
```
1. Recipient submits claim
2. System marks as "pending"
3. Admin receives notification
4. Admin reviews claim details
5. Admin approves legitimate claim
6. Recipient is notified
7. Donor can now prepare for pickup
```

---

## 🎯 Key Features to Explore

### 📱 Responsive Design
- Resize your browser to see mobile view
- All features work on mobile, tablet, desktop

### 🎨 Modern UI
- Gradient headers with smooth transitions
- Hover effects on interactive elements
- Status badges with color coding
- Clean typography and spacing

### 💾 Data Persistence
- Your login persists across page refreshes
- Food listings and claims are saved
- Analytics update in real-time

### 🔐 Role-Based Access
- Each role sees different menu items
- Routes are protected by authentication
- Unauthorized access is redirected to dashboard

---

## 🧪 Testing the Platform

### Test Case 1: Complete Donation Flow
1. **As Donor**: List fresh apples
2. **As Recipient**: Claim the apples
3. **As Admin**: Approve the claim
4. **As Recipient**: Mark as completed
5. **As Analyst**: See updated statistics

### Test Case 2: Multiple Categories
1. List food in different categories (Vegetables, Bakery, Dairy)
2. Filter by category in browse
3. Verify filtering works correctly

### Test Case 3: Admin Controls
1. Submit multiple claims
2. Approve some, reject others
3. See statistics change in real-time

### Test Case 4: Analytics
1. Make several donations and claims
2. View reports as Analyst
3. See charts update with new data

---

## 📋 Available Mock Data

### Sample Food Listings (Pre-loaded)
- Fresh Vegetables - 50 kg available
- Bakery Items - 30 items available

### Sample Claims
- Can be created by submitting claims as Recipient

### Sample Metrics
- Food waste reduced: 150 kg
- Food donated: 200 kg
- People benefited: 45

---

## 🆘 Troubleshooting

### App won't start?
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Login not working?
- Ensure you're using exact credentials from the table
- Try clearing browser cache
- Make sure you selected the correct role

### Data not showing?
- Refresh the page (data is in localStorage)
- Check browser console for errors
- Ensure you're logged in with correct role

### Port 5173 already in use?
```bash
# Kill the process on that port
# Or specify different port:
npm run dev -- --port 5174
```

---

## 🚀 Going Further

### Build for Production
```bash
npm run build
npm run preview
```

### Integrate with Backend API
1. Update API calls in contexts
2. Replace mock data with real API responses
3. Add authentication token handling

### Deploy to Cloud
- Build the project
- Deploy to Vercel, Netlify, or Azure
- Configure environment variables

---

## 📚 Additional Resources

- **Main Documentation**: README_COMPLETE.md
- **Feature Details**: FEATURES.md
- **Code Structure**: See src/ folder
- **Styling System**: See src/styles/ folder

---

## 💡 Tips & Tricks

✅ **Bookmark the demo credentials** - Easy access during testing
✅ **Test on multiple browsers** - Ensure cross-browser compatibility
✅ **Use browser DevTools** - Inspect network and console
✅ **Try all roles** - Each has unique features
✅ **Create test scenarios** - Maximize feature coverage

---

**Happy Testing! 🎉**

**Questions?** Refer to FEATURES.md for detailed documentation.

**Ready to deploy?** See README_COMPLETE.md for production guidelines.
