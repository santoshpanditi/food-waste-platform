import React from 'react'
import { MapPin, Clock, User, Flame } from 'lucide-react'
import { Card, CardBody, CardFooter } from './ui/Card'
import { Button } from './ui/Button'

interface FoodListingCardProps {
  id: string
  image?: string
  foodType: string
  quantity: string
  location: string
  donor: string
  expiresIn: string
  onView: () => void
  onClaim: () => void
}

const FoodListingCard: React.FC<FoodListingCardProps> = ({
  image,
  foodType,
  quantity,
  location,
  donor,
  expiresIn,
  onView,
  onClaim,
}) => {
  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={foodType}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardBody>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{foodType}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span>{donor}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-orange-500" />
            <span>{quantity}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-secondary" />
            <span>{expiresIn}</span>
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={onView}>
          View Details
        </Button>
        <Button variant="primary" size="sm" onClick={onClaim}>
          Claim Now
        </Button>
      </CardFooter>
    </Card>
  )
}

export { FoodListingCard }
