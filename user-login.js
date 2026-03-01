document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      // In a real app, this would be an API call
      // Simulating API call for demo purposes
      setTimeout(() => {
        // Simulate successful login
        const user = { id: 1, username, name: "John Doe" }

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(user))

        // Redirect to parking search page
        window.location.href = "parking-search.html"
      }, 1000)
    })
  }
})

