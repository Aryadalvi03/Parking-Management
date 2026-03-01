document.addEventListener("DOMContentLoaded", () => {
  let map;
  let userLocation = [40.7128, -74.006]; // Default to NYC
  let parkingSpots = [];
  const markers = [];
  const exchangeRate = 83; // USD to INR conversion rate

  function initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation = [position.coords.latitude, position.coords.longitude];
          initializeMap(userLocation);
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
          initializeMap([40.7128, -74.006]); // Fallback to NYC
        }
      );
    } else {
      console.warn("Geolocation is not supported");
      initializeMap([40.7128, -74.006]); // Fallback to NYC
    }
  }
  
  function initializeMap(userLocation) {
    map = L.map("parkingMap").setView(userLocation, 15);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    const userIcon = createCustomIcon("fa-map-pin", "#3b82f6");
    L.marker(userLocation, { icon: userIcon })
      .bindPopup('<div class="text-center"><h3 style="font-weight: bold;">Your Location</h3></div>')
      .addTo(map);
  
    fetchParkingSpots();
  }

  function createCustomIcon(iconClass, bgColor) {
    return L.divIcon({
      html: `<div style="background-color: ${bgColor}; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <i class="fa-solid ${iconClass}" style="color: white;"></i>
              </div>`,
      className: "custom-marker-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

  function fetchParkingSpots() {
    setTimeout(() => {
      parkingSpots = [
        { id: 1, name: "Central Parking", price: 0.58, availableSpaces: 12, totalSpaces: 50, latitude: userLocation[0] + 0.002, longitude: userLocation[1] + 0.003, type: "parking" },
        { id: 2, name: "Downtown Garage", price: 0.24, availableSpaces: 3, totalSpaces: 100, latitude: userLocation[0] - 0.001, longitude: userLocation[1] + 0.002, type: "parking" },
        { id: 3, name: "City Center Parking", price: 0.47, availableSpaces: 25, totalSpaces: 75, latitude: userLocation[0] + 0.003, longitude: userLocation[1] - 0.002, type: "parking" },
      ];

      addMarkersToMap();
      renderParkingList();
      document.querySelector(".loading-spots").style.display = "none";
    }, 1500);
  }

  function addMarkersToMap() {
    parkingSpots.forEach((spot) => {
      let icon = createCustomIcon("fa-car", "#22c55e");
      const marker = L.marker([spot.latitude, spot.longitude], { icon })
        .bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">${spot.name}</h3>
            <p style="margin: 4px 0;">₹${(spot.price * exchangeRate).toFixed(2)} per hour</p>
            <p style="margin: 4px 0;">${spot.availableSpaces} spaces available</p>
            <button onclick="window.bookSpot(${spot.id})" style="background-color: #22c55e; color: white; border: none; padding: 4px 8px; border-radius: 4px; margin-top: 8px; cursor: pointer;">Book Now</button>
          </div>
        `)
        .addTo(map);

      marker.on("click", () => {
        selectSpot(spot);
      });

      markers.push(marker);
    });
  }

  function renderParkingList() {
    const parkingList = document.getElementById("parkingList");
    parkingList.innerHTML = "";

    parkingSpots.forEach((spot) => {
      const spotCard = document.createElement("div");
      spotCard.className = "parking-card";
      spotCard.innerHTML = `
        <div class="parking-card-header">
          <h3>${spot.name}</h3>
          <p>${spot.availableSpaces} of ${spot.totalSpaces} spaces available</p>
        </div>
        <div class="parking-card-body">
          <div class="parking-info">
            <span class="parking-info-label">Price per hour:</span>
            <span class="parking-info-value">₹${(spot.price * exchangeRate).toFixed(2)}</span>
          </div>
        </div>
        <div class="parking-card-footer">
          <button class="btn btn-primary" onclick="window.bookSpot(${spot.id});">Book Now</button>
        </div>
      `;
      parkingList.appendChild(spotCard);
    });
  }

  window.bookSpot = (spotId) => {
    const spot = parkingSpots.find((s) => s.id === spotId);
    if (spot) {
      alert(`Booking confirmed at ${spot.name} for ₹${(spot.price * exchangeRate).toFixed(2)}`);
    }
  };

  if (document.getElementById("parkingMap")) {
    initMap();
  }
});
