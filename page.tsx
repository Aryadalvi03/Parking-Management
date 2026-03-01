"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, AlertTriangle, Ban } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/parking-map"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-xl"></div>,
})

interface ParkingSpot {
  id: number
  name: string
  price: number
  availableSpaces: number
  totalSpaces: number
  latitude: number
  longitude: number
  type: "parking" | "restricted" | "no-parking"
}

export default function ParkingSearchPage() {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
          fetchParkingSpots(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default to a location if geolocation fails
          setUserLocation([40.7128, -74.006]) // New York City
          fetchParkingSpots(40.7128, -74.006)
        },
      )
    } else {
      // Default location if geolocation is not supported
      setUserLocation([40.7128, -74.006])
      fetchParkingSpots(40.7128, -74.006)
    }
  }, [])

  const fetchParkingSpots = async (lat: number, lng: number) => {
    try {
      // In a real app, this would be a real API call
      // const response = await axios.get(`/api/parking?lat=${lat}&lng=${lng}`)

      // Simulating API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data for demonstration
      const mockParkingSpots: ParkingSpot[] = [
        {
          id: 1,
          name: "Central Parking",
          price: 5.5,
          availableSpaces: 12,
          totalSpaces: 50,
          latitude: lat + 0.002,
          longitude: lng + 0.003,
          type: "parking",
        },
        {
          id: 2,
          name: "Downtown Garage",
          price: 8.75,
          availableSpaces: 3,
          totalSpaces: 100,
          latitude: lat - 0.001,
          longitude: lng + 0.002,
          type: "parking",
        },
        {
          id: 3,
          name: "City Center Parking",
          price: 4.25,
          availableSpaces: 25,
          totalSpaces: 75,
          latitude: lat + 0.003,
          longitude: lng - 0.002,
          type: "parking",
        },
        {
          id: 4,
          name: "Hospital Zone",
          price: 0,
          availableSpaces: 0,
          totalSpaces: 0,
          latitude: lat - 0.002,
          longitude: lng - 0.003,
          type: "restricted",
        },
        {
          id: 5,
          name: "School Area",
          price: 0,
          availableSpaces: 0,
          totalSpaces: 0,
          latitude: lat + 0.001,
          longitude: lng - 0.001,
          type: "no-parking",
        },
      ]

      setParkingSpots(mockParkingSpots)
    } catch (error) {
      console.error("Error fetching parking spots:", error)
      setParkingSpots([])
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = (spot: ParkingSpot) => {
    // In a real app, this would make an API call to book the spot
    alert(`Booking confirmed at ${spot.name} for $${spot.price.toFixed(2)}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Parking Near You</h1>
        <p className="text-gray-600">
          View available parking spots, restricted areas, and no-parking zones in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden border-b-4 border-r-4 border-b-gray-300 border-r-gray-300">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Parking Map</CardTitle>
              <CardDescription>
                {userLocation ? "Showing parking spots near your location" : "Loading your location..."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {userLocation && (
                <MapWithNoSSR userLocation={userLocation} parkingSpots={parkingSpots} onSelectSpot={setSelectedSpot} />
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-2 border-gray-200 shadow-xl rounded-2xl border-b-4 border-r-4 border-b-gray-300 border-r-gray-300">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle>Legend</CardTitle>
              <CardDescription>Map symbols explanation</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                    <Car className="w-4 h-4 text-white" />
                  </div>
                  <span>Available Parking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-md">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <span>Restricted Area</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-md">
                    <Ban className="w-4 h-4 text-white" />
                  </div>
                  <span>No Parking Zone</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span>Your Location</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedSpot && (
            <Card className="mt-6 border-2 border-gray-200 shadow-xl rounded-2xl border-b-4 border-r-4 border-b-gray-300 border-r-gray-300">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedSpot.name}</CardTitle>
                  <Badge
                    variant={
                      selectedSpot.type === "parking"
                        ? "success"
                        : selectedSpot.type === "restricted"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {selectedSpot.type === "parking"
                      ? "Available"
                      : selectedSpot.type === "restricted"
                        ? "Restricted"
                        : "No Parking"}
                  </Badge>
                </div>
                <CardDescription>
                  {selectedSpot.type === "parking"
                    ? `${selectedSpot.availableSpaces} of ${selectedSpot.totalSpaces} spaces available`
                    : selectedSpot.type === "restricted"
                      ? "Restricted parking area"
                      : "No parking allowed in this area"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {selectedSpot.type === "parking" && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per hour:</span>
                      <span className="font-semibold">${selectedSpot.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available spaces:</span>
                      <span className="font-semibold">{selectedSpot.availableSpaces}</span>
                    </div>
                  </div>
                )}
                {selectedSpot.type === "restricted" && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800">
                      This is a restricted parking area. Special permits may be required.
                    </p>
                  </div>
                )}
                {selectedSpot.type === "no-parking" && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-800">Parking is not allowed in this area. Vehicles may be towed.</p>
                  </div>
                )}
              </CardContent>
              {selectedSpot.type === "parking" && (
                <CardFooter>
                  <Button
                    onClick={() => handleBooking(selectedSpot)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl border-2 border-green-400 border-b-4 border-r-4 border-b-green-700 border-r-green-700"
                  >
                    Book Now
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Parking Spots</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2 border-gray-200 shadow-md rounded-xl animate-pulse">
                <CardHeader className="bg-gray-100 h-24"></CardHeader>
                <CardContent className="h-32"></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingSpots
              .filter((spot) => spot.type === "parking")
              .map((spot) => (
                <Card
                  key={spot.id}
                  className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl overflow-hidden border-b-4 border-r-4 border-b-gray-300 border-r-gray-300 cursor-pointer"
                  onClick={() => setSelectedSpot(spot)}
                >
                  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                    <CardTitle>{spot.name}</CardTitle>
                    <CardDescription>
                      {spot.availableSpaces} of {spot.totalSpaces} spaces available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per hour:</span>
                        <span className="font-semibold">${spot.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available spaces:</span>
                        <span className="font-semibold">{spot.availableSpaces}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${(spot.availableSpaces / spot.totalSpaces) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBooking(spot)
                      }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl border-2 border-green-400 border-b-4 border-r-4 border-b-green-700 border-r-green-700"
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

