# 🇮🇳 BharatSecure - Food Waste Reduction Platform (India)

## Localization Overview

The platform has been fully localized for India with Indian locations, organizations, currency (INR), and context.

## 🗺️ Geographic Updates

### Locations & Coordinates
All food listings now use major Indian cities:

| Location | Coordinates | State |
|----------|------------|-------|
| Connaught Place, New Delhi | 28.6328°N, 77.1197°E | Delhi |
| Bandra, Mumbai | 19.0596°N, 72.8295°E | Maharashtra |

**Map Center**: New Delhi, India (28.6139°N, 77.2090°E)
**Map Zoom Level**: 6 (India-wide view with major cities visible)

## 💰 Currency Localization

- **Old**: USD ($)
- **New**: Indian Rupees (₹ / INR)
- **Valuation**: ₹250 per successful delivery
- **Formatting**: Indian number locale `en-IN` (e.g., ₹1,23,456)

## 🏢 Indian Organizations

### Demo Credentials Updated:

**Donor Organization**:
- Email: `haryana@greenfarmsindian.com`
- Organization: Haryana Organic Farms
- Password: `123456`

**Recipient Organization**:
- Email: `delhi@foodbankindia.org`
- Organization: Delhi Food Bank India
- Password: `123456`

**Admin Account**:
- Email: `admin@bharatsecure.gov`
- Organization: BharatSecure Administrative
- Password: `123456`

**Analyst Account**:
- Email: `analyst@ngo-india.org`
- Organization: India NGO Analytics
- Password: `123456`

## 🎯 Platform Name & Branding

| Element | Old | New |
|---------|-----|-----|
| Platform Name | FoodSecure | BharatSecure |
| Navigation Logo | 🌱 FoodSecure | 🇮🇳 BharatSecure - Food Waste Reduction |
| Certificate Org | Food Waste Reduction & Food Security Platform | Bharat Food Waste Reduction & Food Security Platform |
| Tax Reference | 501(c)(3) (US Tax code) | 80G NGO (Indian Tax Act) |

## 📄 Tax Deduction Framework

### Indian Compliance:
- **Tax Act Reference**: Section 80G (Income Tax Act, 1961)
- **Certificate Language**: Updated to Indian tax context
- **Advisory**: "This platform is not a registered 80G NGO. Please verify tax deduction eligibility with appropriate Indian tax authorities."

### Impact Certificate Updates:
- Currency: ₹ (Indian Rupees)
- Tax term: "80G deduction" (India's tax deduction for charitable donations)
- Compliance notice includes Indian tax authority reference

## 📊 Impact Metrics Updates

- **CO₂ Saved**: 45.5 kg (baseline)
- **Meals Provided**: 180 meals
- **Recipients Benefited**: 45 individuals
- **Monetary Value**: ₹12,500 (updated from $2,500)

**Calculation Basis**:
- 1 meal ≈ 1.1 kg of food
- CO₂ saved per delivery ≈ 2.5 kg
- Average food value ≈ ₹250 per delivery

## 🗣️ Language Integration

- **Greeting**: "स्वागत है (Welcome)" in Hindi + English
- **Dashboard Header**: "स्वागत है, [User]! 🇮🇳"
- **All labels**: Maintained in English for accessibility

## 🚚 Indian Delivery Context

### Cities Integrated:
1. **New Delhi** - National Capital Region
2. **Mumbai** - Financial Hub (Western India)
3. **Scalable**: Add more cities from tier-1/tier-2 cities

### Future Expansion Cities:
- Bengaluru, Karnataka
- Hyderabad, Telangana
- Chennai, Tamil Nadu
- Kolkata, West Bengal
- Pune, Maharashtra
- Ahmedabad, Gujarat

## ✅ What's Been Localized

✅ Geographic coordinates (Indian cities)
✅ Currency (INR/₹)
✅ Organization names (Indian NGOs/Farms)
✅ Demo credentials (Indian emails)
✅ Tax compliance (80G reference)
✅ Platform branding (BharatSecure)
✅ Navigation labels
✅ Impact metrics calculations
✅ Certificate formatting
✅ Greeting messages (Hindi-English bilingual)
✅ Map center and zoom levels

## 🔧 How to Add More Indian Cities

Edit `src/contexts/FoodDataContext.tsx`:

```typescript
{
  id: '3',
  title: 'Dairy Products',
  description: 'Fresh milk and cheese',
  quantity: 100,
  unit: 'liters',
  category: 'Dairy',
  expiryDate: '2026-01-23',
  location: 'Indiranagar, Bengaluru',  // New city
  latitude: 13.0020,                     // Bengaluru coordinates
  longitude: 77.6445,
  donorId: 'donor3',
  donorName: 'Karnataka Dairy Cooperative',
  status: 'available',
  createdAt: '2026-01-20',
  claims: []
}
```

## 📱 Using with Indian Phone Numbers (Future)

When adding phone numbers, use Indian format:
- Format: `+91-XXXXX-XXXXX` or `+91XXXXXXXXXX`
- Area codes start with 2-9 (no leading 0 for international format)

## 🌍 Regional Considerations for Future

1. **Languages**: Add support for Hindi, Tamil, Bengali, Telugu, Kannada
2. **Food Categories**: Add Indian food preferences (vegetarian/vegan options)
3. **Holidays**: Integration with Indian national holidays and festivals
4. **Regional Cuisines**: Location-specific food types
5. **Payment Gateway**: Integration with Indian payment systems (RazorPay, PayU, etc.)

## 📞 Support & Compliance

For Indian compliance questions:
- Tax: Consult with CA (Chartered Accountant) for 80G registration
- Food Safety: Follow FSSAI (Food Safety and Standards Authority of India) guidelines
- NGO Registration: Refer to Ministry of Corporate Affairs (MCA)

## 🎉 Localization Complete

The platform is now fully operational for the Indian market with:
- Indian city locations
- INR currency
- Indian organization names
- Tax compliance framework
- Bilingual greetings
- Indian branding

**Ready to deploy and serve food waste reduction initiatives across India! 🇮🇳**

---

*Last Updated: January 20, 2026*
*Localization Status: ✅ Complete*
