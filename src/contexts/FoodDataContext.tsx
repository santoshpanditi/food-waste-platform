import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

export interface FoodListing {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
  location: string;
  latitude?: number;
  longitude?: number;
  donorId: string;
  donorName: string;
  status: 'available' | 'claimed' | 'distributed' | 'expired';
  image?: string;
  createdAt: string;
  claims?: FoodClaim[];
}

export interface FoodClaim {
  id: string;
  listingId: string;
  recipientId: string;
  recipientName: string;
  quantity: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  claimedAt: string;
  message?: string;
}

export interface DeliveryTracking {
  id: string;
  claimId: string;
  status: 'scheduled' | 'in-transit' | 'delivered' | 'failed';
  pickupTime?: string;
  deliveryTime?: string;
  distance: number;
  route?: string;
  proofPhotos: string[];
  notes?: string;
}

export interface FoodWasteMetric {
  date: string;
  wasteReduced: number;
  foodDonated: number;
  recipientsBenefited: number;
  co2Saved: number;
  mealsProvided: number;
  monetaryValue: number;
  categoriesWaste: { category: string; amount: number }[];
}

interface FoodDataContextType {
  listings: FoodListing[];
  claims: FoodClaim[];
  metrics: FoodWasteMetric[];
  deliveries: DeliveryTracking[];
  addListing: (listing: Omit<FoodListing, 'id' | 'createdAt'>) => void;
  updateListing: (id: string, listing: Partial<FoodListing>) => void;
  deleteListing: (id: string) => void;
  claimFood: (listingId: string, quantity: number, recipientId: string, recipientName: string) => void;
  updateClaim: (claimId: string, status: FoodClaim['status']) => void;
  createDelivery: (claimId: string, distance: number) => void;
  updateDelivery: (deliveryId: string, updates: Partial<DeliveryTracking>) => void;
  getDeliveriesByClaim: (claimId: string) => DeliveryTracking | undefined;
  getMetrics: () => FoodWasteMetric[];
}

const FoodDataContext = createContext<FoodDataContextType | undefined>(undefined);

const INITIAL_LISTINGS: FoodListing[] = [
  {
    id: '1',
    title: 'Fresh Vegetables',
    description: 'Assorted fresh vegetables from local farm',
    quantity: 50,
    unit: 'kg',
    category: 'Vegetables',
    expiryDate: '2026-01-25',
    location: 'Connaught Place, New Delhi',
    latitude: 28.6328,
    longitude: 77.1197,
    donorId: 'donor1',
    donorName: 'Haryana Organic Farms',
    status: 'available',
    createdAt: '2026-01-20',
    claims: []
  },
  {
    id: '2',
    title: 'Bakery Items',
    description: 'Day-old bread and pastries',
    quantity: 30,
    unit: 'items',
    category: 'Bakery',
    expiryDate: '2026-01-21',
    location: 'Bandra, Mumbai',
    latitude: 19.0596,
    longitude: 72.8295,
    donorId: 'donor2',
    donorName: 'Mumbai Bakery House',
    status: 'available',
    createdAt: '2026-01-20',
    claims: []
  }
];

const INITIAL_METRICS: FoodWasteMetric[] = [
  {
    date: '2026-01-20',
    wasteReduced: 150,
    foodDonated: 200,
    recipientsBenefited: 45,
    co2Saved: 45.5,
    mealsProvided: 180,
    monetaryValue: 12500,
    categoriesWaste: [
      { category: 'Vegetables', amount: 50 },
      { category: 'Bakery', amount: 40 },
      { category: 'Dairy', amount: 30 },
      { category: 'Grains', amount: 30 }
    ]
  }
];

export const FoodDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<FoodListing[]>(INITIAL_LISTINGS);
  const [claims, setClaims] = useState<FoodClaim[]>([]);
  const [metrics] = useState<FoodWasteMetric[]>(INITIAL_METRICS);
  const [deliveries, setDeliveries] = useState<DeliveryTracking[]>([]);

  const addListing = (listing: Omit<FoodListing, 'id' | 'createdAt'>) => {
    const newListing: FoodListing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setListings([...listings, newListing]);
  };

  const updateListing = (id: string, updates: Partial<FoodListing>) => {
    setListings(listings.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteListing = (id: string) => {
    setListings(listings.filter(l => l.id !== id));
  };

  const claimFood = (listingId: string, quantity: number, recipientId: string, recipientName: string) => {
    const newClaim: FoodClaim = {
      id: Date.now().toString(),
      listingId,
      recipientId,
      recipientName,
      quantity,
      status: 'pending',
      claimedAt: new Date().toISOString().split('T')[0]
    };
    setClaims([...claims, newClaim]);
    
    // Update listing claims
    setListings(listings.map(l => 
      l.id === listingId 
        ? { ...l, claims: [...(l.claims || []), newClaim] }
        : l
    ));
  };

  const updateClaim = (claimId: string, status: FoodClaim['status']) => {
    const targetClaim = claims.find(c => c.id === claimId);

    setClaims(prevClaims => prevClaims.map(c => c.id === claimId ? { ...c, status } : c));
    setListings(prevListings => prevListings.map(listing => {
      if (!listing.claims || listing.claims.length === 0) {
        return listing;
      }

      const updatedClaims = listing.claims.map(c => c.id === claimId ? { ...c, status } : c);

      let nextStatus = listing.status;
      if (status === 'approved') {
        nextStatus = 'claimed';
      } else if (status === 'completed') {
        nextStatus = 'distributed';
      } else if (status === 'rejected') {
        const hasActive = updatedClaims.some(c => c.status === 'approved' || c.status === 'pending');
        if (!hasActive && listing.status === 'claimed') {
          nextStatus = 'available';
        }
      }

      return { ...listing, claims: updatedClaims, status: nextStatus };
    }));

    if (status === 'approved' && targetClaim && !deliveries.some(d => d.claimId === claimId)) {
      const delivery: DeliveryTracking = {
        id: Date.now().toString(),
        claimId,
        status: 'scheduled',
        distance: 0,
        proofPhotos: [],
        pickupTime: new Date().toISOString()
      };
      setDeliveries(prevDeliveries => [...prevDeliveries, delivery]);
    }
  };

  const createDelivery = (claimId: string, distance: number) => {
    const delivery: DeliveryTracking = {
      id: Date.now().toString(),
      claimId,
      status: 'scheduled',
      distance,
      proofPhotos: [],
      pickupTime: new Date().toISOString()
    };
    setDeliveries([...deliveries, delivery]);
  };

  const updateDelivery = (deliveryId: string, updates: Partial<DeliveryTracking>) => {
    setDeliveries(deliveries.map(d => d.id === deliveryId ? { ...d, ...updates } : d));
  };

  const getDeliveriesByClaim = (claimId: string) => {
    return deliveries.find(d => d.claimId === claimId);
  };

  const getMetrics = () => metrics;

  return (
    <FoodDataContext.Provider value={{
      listings,
      claims,
      metrics,
      deliveries,
      addListing,
      updateListing,
      deleteListing,
      claimFood,
      updateClaim,
      createDelivery,
      updateDelivery,
      getDeliveriesByClaim,
      getMetrics
    }}>
      {children}
    </FoodDataContext.Provider>
  );
};

export const useFoodData = () => {
  const context = useContext(FoodDataContext);
  if (!context) {
    throw new Error('useFoodData must be used within FoodDataProvider');
  }
  return context;
};
