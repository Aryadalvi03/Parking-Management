document.addEventListener("DOMContentLoaded", () => {
  const addParkingForm = document.getElementById("addParkingForm")
  const getCurrentLocationBtn = document.getElementById("getCurrentLocation")

  // Initialize date picker
  if (document.getElementById("availableFrom")) {
    flatpickr("#availableFrom", {
      dateFormat: "Y-m-d",
      defaultDate: "today",
      minDate: "today",
    })
  }

  // Get current location
  if (getCurrentLocationBtn) {
    getCurrentLocationBtn.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            document.getElementById("latitude").value = position.coords.latitude
            document.getElementById("longitude").value = position.coords.longitude
          },
          (error) => {
            console.error("Error getting location:", error)
            alert("Could not get your current location. Please enter coordinates manually.")
          },
        )
      } else {
        alert("Geolocation is not supported by this browser.")
      }
    })
  }

  // Form submission
  if (addParkingForm) {
    addParkingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        ownerName: document.getElementById("ownerName").value,
        parkingName: document.getElementById("parkingName").value,
        address: document.getElementById("address").value,
        totalSpaces: document.getElementById("totalSpaces").value,
        pricePerHour: document.getElementById("pricePerHour").value,
        availableFrom: document.getElementById("availableFrom").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
      }

      // In a real app, this would be an API call
      // Simulating API call for demo purposes
      setTimeout(() => {
        // Show success message
        alert("Parking space registered successfully!")

        // Reset form
        addParkingForm.reset()
      }, 1000)
    })
  }
})

