document.addEventListener("DOMContentLoaded", () => {
  const ownerLoginForm = document.getElementById("ownerLoginForm")

  if (ownerLoginForm) {
    ownerLoginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("ownerUsername").value
      const password = document.getElementById("ownerPassword").value

      // In a real app, this would be an API call
      // Simulating API call for demo purposes
      setTimeout(() => {
        // Simulate successful login
        const owner = { id: 1, username, name: "Parking Owner" }

        // Store owner in localStorage
        localStorage.setItem("owner", JSON.stringify(owner))

        // Redirect to add parking page
        window.location.href = "add-parking.html"
      }, 1000)
    })
  }
})

