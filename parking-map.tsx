"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Car, AlertTriangle, Ban, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// Fix Leaflet icon issues
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

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

interface MapProps {
  userLocation: [number, number]
  parkingSpots: ParkingSpot[]
  onSelectSpot: (spot: ParkingSpot) => void
}

// Custom marker icons
const createCustomIcon = (IconComponent: any, bgColor: string) => {
  const html = document.createElement("div")
  html.className = `flex items-center justify-center w-8 h-8 rounded-full shadow-lg`
  html.style.backgroundColor = bgColor

  const svgIcon = document.createElement("div")
  svgIcon.className = "text-white"
  html.appendChild(svgIcon)

  return L.divIcon({
    html: html.outerHTML,
    className: "custom-marker-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

function MapController({ userLocation }: { userLocation: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(userLocation, 15)
  }, [map, userLocation])

  return null
}

export default function ParkingMap({ userLocation, parkingSpots, onSelectSpot }: MapProps) {
  // Create custom icons for different marker types
  const parkingIcon = createCustomIcon(Car, "#22c55e") // green
  const restrictedIcon = createCustomIcon(AlertTriangle, "#eab308") // yellow
  const noParkingIcon = createCustomIcon(Ban, "#ef4444") // red
  const userLocationIcon = createCustomIcon(MapPin, "#3b82f6") // blue

  const handleBooking = (spot: ParkingSpot) => {
    // In a real app, this would make an API call to book the spot
    alert(`Booking confirmed at ${spot.name} for $${spot.price.toFixed(2)}`)
  }

  useEffect(() => {
    fixLeafletIcons()
  }, [])

  return (
    <MapContainer center={userLocation} zoom={15} style={{ height: "500px", width: "100%" }} className="z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController userLocation={userLocation} />

      {/* User location marker */}
      <Marker position={userLocation} icon={userLocationIcon}>
        <Popup>
          <div className="text-center">
            <h3 className="font-bold">Your Location</h3>
          </div>
        </Popup>
      </Marker>

      {/* Parking spots markers */}
      {parkingSpots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.latitude, spot.longitude]}
          icon={spot.type === "parking" ? parkingIcon : spot.type === "restricted" ? restrictedIcon : noParkingIcon}
          eventHandlers={{
            click: () => {
              onSelectSpot(spot)
            },
          }}
        >
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-bold text-lg">{spot.name}</h3>
              {spot.type === "parking" ? (
                <>
                  <p className="my-1">${spot.price.toFixed(2)} per hour</p>
                  <p className="my-1">{spot.availableSpaces} spaces available</p>
                  <Button
                    onClick={() => handleBooking(spot)}
                    className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white"
                    size="sm"
                  >
                    Book Now
                  </Button>
                </>
              ) : spot.type === "restricted" ? (
                <p className="my-1 text-yellow-600">Restricted parking area</p>
              ) : (
                <p className="my-1 text-red-600">No parking allowed</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

