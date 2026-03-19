import React from 'react'
import { Form, Input, Button } from '@/components'
import { createFoodListingSchema, type CreateFoodListingInput } from '@/lib/validationSchemas'
import { apiService } from '@/services/apiService'
import { useFormState } from '@/hooks/useAsync'
import toast from 'react-hot-toast'

/**
 * Example component showing how to use:
 * - Form component with validation
 * - Input fields
 * - API integration
 * - Error handling
 */
export function ExampleFoodListingForm() {
  const { loading, handleSubmit } = useFormState()

  const onSubmit = async (data: CreateFoodListingInput) => {
    return handleSubmit(
      () => apiService.createFoodListing(data),
      (response) => {
        // Success callback
        console.log('Listing created:', response)
        // Reset form if needed
      }
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Food Listing</h1>
        <p className="text-gray-600 mb-8">Share your extra food with those in need</p>

        <Form
          schema={createFoodListingSchema}
          onSubmit={onSubmit}
          className="space-y-6"
        >
          {/* Single Input */}
          <Input
            name="foodType"
            label="Food Type"
            placeholder="e.g., Biryani, Rice, Vegetables"
            hint="What type of food are you sharing?"
          />

          {/* Input with error display handled by Form */}
          <Input
            name="quantity"
            label="Quantity"
            placeholder="e.g., 5 kg, 10 servings"
          />

          {/* Larger input for description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200
                resize-none h-24"
              placeholder="Describe the condition, ingredients, allergens..."
            />
          </div>

          {/* Location input */}
          <Input
            name="location"
            label="Pickup Location"
            placeholder="Street address or landmark"
          />

          {/* Expiry time */}
          <Input
            name="expiresAt"
            type="datetime-local"
            label="Expires At"
          />

          {/* Submit button with loading state */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </Button>
        </Form>

        {/* Info section */}
        <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">Tips:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Be honest about food condition</li>
            <li>• Provide allergen information</li>
            <li>• Set realistic expiry times</li>
            <li>• Use clear pickup location</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ExampleFoodListingForm
