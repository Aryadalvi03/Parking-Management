document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle")
    const navLinks = document.getElementById("navLinks")
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active")
      })
    }
  
    // Load booking data from sessionStorage
    loadBookingData()
  
    // Payment tab switching
    const paymentTabs = document.querySelectorAll(".payment-tab")
    const paymentContents = document.querySelectorAll(".payment-tab-content")
  
    paymentTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab")
  
        // Remove active class from all tabs and contents
        paymentTabs.forEach((t) => t.classList.remove("active"))
        paymentContents.forEach((c) => c.classList.remove("active"))
  
        // Add active class to clicked tab and corresponding content
        tab.classList.add("active")
        document.getElementById(`${tabId}-content`).classList.add("active")
      })
    })
  
    // Credit card number formatting
    const cardNumberInput = document.getElementById("cardNumber")
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, "")
        let formattedValue = ""
  
        for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += " "
          }
          formattedValue += value[i]
        }
  
        e.target.value = formattedValue
      })
    }
  
    // Expiry date formatting
    const expiryDateInput = document.getElementById("expiryDate")
    if (expiryDateInput) {
      expiryDateInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "")
  
        if (value.length > 2) {
          value = value.substring(0, 2) + "/" + value.substring(2, 4)
        }
  
        e.target.value = value
      })
    }
  
    // Promo code application
    const applyPromoBtn = document.getElementById("applyPromo")
    const promoCodeInput = document.getElementById("promoCode")
    const promoMessage = document.getElementById("promoMessage")
    const discountRow = document.getElementById("discountRow")
    const discountAmount = document.getElementById("discount")
    const subtotalElement = document.getElementById("subtotal")
    const serviceFeeElement = document.getElementById("serviceFee")
    const finalTotalElement = document.getElementById("finalTotal")
  
    if (applyPromoBtn && promoCodeInput && promoMessage) {
      applyPromoBtn.addEventListener("click", () => {
        const promoCode = promoCodeInput.value.trim().toUpperCase()
  
        if (!promoCode) {
          showPromoMessage("Please enter a promo code", "error")
          return
        }
  
        // Show loading state
        applyPromoBtn.disabled = true
        applyPromoBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
  
        // Simulate API call to validate promo code
        setTimeout(() => {
          // For demo purposes, we'll accept specific promo codes
          const validPromoCodes = {
            PARK10: { discount: 2.0, type: "fixed" },
            PARK20: { discount: 0.2, type: "percentage" },
            WELCOME: { discount: 5.0, type: "fixed" },
          }
  
          if (validPromoCodes[promoCode]) {
            const promoDetails = validPromoCodes[promoCode]
            let discount = 0
  
            // Get current subtotal
            const subtotal = Number.parseFloat(subtotalElement.textContent.replace("$", ""))
  
            if (promoDetails.type === "fixed") {
              discount = promoDetails.discount
            } else {
              discount = subtotal * promoDetails.discount
            }
  
            // Update UI with discount
            discountAmount.textContent = `-$${discount.toFixed(2)}`
            discountRow.style.display = "flex"
  
            // Recalculate total
            const serviceFee = Number.parseFloat(serviceFeeElement.textContent.replace("$", ""))
            const newTotal = subtotal + serviceFee - discount
            finalTotalElement.textContent = `$${newTotal.toFixed(2)}`
  
            showPromoMessage(`Promo code ${promoCode} applied successfully!`, "success")
          } else {
            showPromoMessage("Invalid promo code. Please try again.", "error")
          }
  
          // Reset button state
          applyPromoBtn.disabled = false
          applyPromoBtn.innerHTML = "Apply"
        }, 500)
      })
    }
  
    function showPromoMessage(message, type) {
      promoMessage.textContent = message
      promoMessage.className = "promo-message"
      promoMessage.classList.add(type)
  
      // Clear message after 5 seconds
      setTimeout(() => {
        promoMessage.textContent = ""
        promoMessage.className = "promo-message"
      }, 5000)
    }
  
    // Complete payment button
    const completePaymentBtn = document.getElementById("completePayment")
    const paymentSuccessModal = document.getElementById("paymentSuccessModal")
    const viewReceiptBtn = document.getElementById("viewReceipt")
    const goToDashboardBtn = document.getElementById("goToDashboard")
  
    if (completePaymentBtn && paymentSuccessModal) {
      completePaymentBtn.addEventListener("click", () => {
        // Validate form fields (simplified for demo)
        const activeTab = document.querySelector(".payment-tab.active").getAttribute("data-tab")
  
        if (activeTab === "card") {
          const cardNumber = document.getElementById("cardNumber").value.trim()
          const cardName = document.getElementById("cardName").value.trim()
          const expiryDate = document.getElementById("expiryDate").value.trim()
          const cvv = document.getElementById("cvv").value.trim()
          const billingZip = document.getElementById("billingZip").value.trim()document.addEventListener("DOMContentLoaded", () => {
            // Mobile menu toggle
            const menuToggle = document.getElementById("menuToggle");
            const navLinks = document.getElementById("navLinks");
        
            if (menuToggle && navLinks) {
                menuToggle.addEventListener("click", () => {
                    navLinks.classList.toggle("active");
                });
            }
        
            // Load booking data from sessionStorage
            loadBookingData();
        
            // Payment tab switching
            const paymentTabs = document.querySelectorAll(".payment-tab");
            const paymentContents = document.querySelectorAll(".payment-tab-content");
        
            paymentTabs.forEach((tab) => {
                tab.addEventListener("click", () => {
                    const tabId = tab.getAttribute("data-tab");
                    
                    paymentTabs.forEach((t) => t.classList.remove("active"));
                    paymentContents.forEach((c) => c.classList.remove("active"));
                    
                    tab.classList.add("active");
                    document.getElementById(`${tabId}-content`).classList.add("active");
                });
            });
        
            // Credit card number formatting
            const cardNumberInput = document.getElementById("cardNumber");
            if (cardNumberInput) {
                cardNumberInput.addEventListener("input", (e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
                });
            }
        
            // Expiry date formatting
            const expiryDateInput = document.getElementById("expiryDate");
            if (expiryDateInput) {
                expiryDateInput.addEventListener("input", (e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 2) {
                        value = value.substring(0, 2) + "/" + value.substring(2, 4);
                    }
                    e.target.value = value;
                });
            }
        
            // Apply promo code
            const applyPromoBtn = document.getElementById("applyPromo");
            const promoCodeInput = document.getElementById("promoCode");
            const promoMessage = document.getElementById("promoMessage");
        
            if (applyPromoBtn) {
                applyPromoBtn.addEventListener("click", () => {
                    const promoCode = promoCodeInput.value.trim().toUpperCase();
                    if (!promoCode) {
                        showPromoMessage("Please enter a promo code", "error");
                        return;
                    }
                    
                    // Simulate API call for promo validation
                    setTimeout(() => {
                        const validPromoCodes = { PARK10: 2.0, PARK20: 0.2, WELCOME: 5.0 };
                        if (validPromoCodes[promoCode]) {
                            showPromoMessage(`Promo code ${promoCode} applied successfully!`, "success");
                        } else {
                            showPromoMessage("Invalid promo code. Please try again.", "error");
                        }
                    }, 500);
                });
            }
        
            function showPromoMessage(message, type) {
                promoMessage.textContent = message;
                promoMessage.className = "promo-message " + type;
                setTimeout(() => promoMessage.textContent = "", 5000);
            }
        
            // Complete payment button
            const completePaymentBtn = document.getElementById("completePayment");
            const paymentSuccessModal = document.getElementById("paymentSuccessModal");
            if (completePaymentBtn) {
                completePaymentBtn.addEventListener("click", () => {
                    setTimeout(() => {
                        paymentSuccessModal.classList.add("active");
                    }, 2000);
                });
            }
        
            function loadBookingData() {
                const bookingData = {
                    parkingName: "Downtown Parking Garage",
                    parkingAddress: "123 Main Street, City",
                    bookingDate: "March 28, 2025",
                    startTime: "09:00 AM",
                    endTime: "05:00 PM",
                    duration: "1",
                    rate: "$20.50/hour",
                    amount: "20.50",
                };
                
                document.getElementById("parkingLocation").textContent = bookingData.parkingName;
                document.getElementById("parkingAddress").textContent = bookingData.parkingAddress;
                document.getElementById("parkingDate").textContent = bookingData.bookingDate;
                document.getElementById("parkingTime").textContent = `${bookingData.startTime} - ${bookingData.endTime}`;
                document.getElementById("totalAmount").textContent = `$${bookingData.amount}`;
            }
        });
        
  
          if (!cardNumber || !cardName || !expiryDate || !cvv || !billingZip) {
            alert("Please fill in all required fields")
            return
          }
  
          // Basic validation
          if (cardNumber.replace(/\s/g, "").length < 15) {
            alert("Please enter a valid card number")
            return
          }
  
          if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("Please enter a valid expiry date (MM/YY)")
            return
          }
  
          if (!/^\d{3,4}$/.test(cvv)) {
            alert("Please enter a valid CVV code")
            return
          }
        }
  
        // Simulate payment processing
        completePaymentBtn.disabled = true
        completePaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
  
        setTimeout(() => {
          // Update confirmation details
          document.getElementById("confirmationNumber").textContent =
            "PK-" + Math.floor(10000000 + Math.random() * 90000000)
          document.getElementById("amountPaid").textContent = finalTotalElement.textContent
  
          const today = new Date()
          document.getElementById("paymentDate").textContent = today.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
  
          // Show success modal
          paymentSuccessModal.classList.add("active")
  
          // Reset button state
          completePaymentBtn.disabled = false
          completePaymentBtn.innerHTML = '<i class="fas fa-lock"></i> Complete Payment'
        }, 2000)
      })
    }
  
    // Modal buttons
    if (viewReceiptBtn) {
      viewReceiptBtn.addEventListener("click", () => {
        // In a real app, this would generate and open a receipt
        alert("Receipt functionality would open in a new tab")
      })
    }
  
    if (goToDashboardBtn) {
      goToDashboardBtn.addEventListener("click", () => {
        window.location.href = "dashboard.html"
      })
    }
  
    // Close modal when clicking outside
    if (paymentSuccessModal) {
      paymentSuccessModal.addEventListener("click", (e) => {
        if (e.target === paymentSuccessModal) {
          paymentSuccessModal.classList.remove("active")
        }
      })
    }
  
    // Function to load booking data from sessionStorage
    function loadBookingData() {
      // This would normally come from sessionStorage or API
      const bookingData = {
        parkingName: "Downtown Parking Garage",
        parkingAddress: "123 Main Street, City",
        bookingDate: "March 28, 2025",
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        duration: "8",
        rate: "$2.50/hour",
        amount: "20.00",
      }
  
      // Update booking summary
      document.getElementById("parkingLocation").textContent = bookingData.parkingName
      document.getElementById("parkingAddress").textContent = bookingData.parkingAddress
      document.getElementById("parkingDate").textContent = bookingData.bookingDate
      document.getElementById("parkingTime").textContent = `${bookingData.startTime} - ${bookingData.endTime}`
      document.getElementById("parkingDuration").textContent = `${bookingData.duration} hours`
      document.getElementById("parkingRate").textContent = bookingData.rate
      document.getElementById("totalAmount").textContent = `$${bookingData.amount}`
  
      // Update payment summary
      document.getElementById("subtotal").textContent = `$${bookingData.amount}`
  
      // Calculate final total (subtotal + service fee)
      const subtotal = Number.parseFloat(bookingData.amount)
      const serviceFee = 1.5 // Fixed service fee
      const finalTotal = subtotal + serviceFee
  
      document.getElementById("finalTotal").textContent = `$${finalTotal.toFixed(2)}`
    }
  
    // Function to process payment
    async function processPayment(paymentData) {
      try {
        const response = await fetch("api/process_payment.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Payment processing failed")
        }
  
        return await response.json()
      } catch (error) {
        console.error("Error processing payment:", error)
        throw error
      }
    }
  
    // Function to validate promo code
    async function validatePromoCode(promoCode) {
      try {
        const response = await fetch(`api/validate_promo.php?code=${promoCode}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        return await response.json()
      } catch (error) {
        console.error("Error validating promo code:", error)
        throw error
      }
    }
  
    // Helper function to get current user ID
    function getCurrentUserId() {
      // In a real app, this would get the user ID from session/localStorage
      return localStorage.getItem("userId") || sessionStorage.getItem("userId") || "1"
    }
  
    // Initialize the page with current date
    updateBookingDate()
  
    function updateBookingDate() {
      const dateElement = document.getElementById("parkingDate")
      if (dateElement) {
        const today = new Date()
        dateElement.textContent = today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }
    }
  })
  
  