<template>
  <div class="booking-confirmation">
    <div class="confirmation-container">
      <!-- Success Icon -->
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>

      <!-- Confirmation Message -->
      <div class="confirmation-message">
        <h1>Booking Confirmed!</h1>
        <p>Your booking has been successfully confirmed. We've sent a confirmation email to your inbox.</p>
        <div class="booking-id">
          Booking ID: <strong>{{ bookingId }}</strong>
        </div>
      </div>

      <!-- Booking Details -->
      <div class="booking-details card">
        <h2>Booking Details</h2>
        
        <div class="details-grid">
          <div class="detail-item">
            <span class="label">Accommodation:</span>
            <span class="value">{{ booking.accommodationName }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Location:</span>
            <span class="value">{{ booking.location }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Check-in:</span>
            <span class="value">{{ formatDate(booking.checkIn) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Check-out:</span>
            <span class="value">{{ formatDate(booking.checkOut) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Guests:</span>
            <span class="value">{{ booking.guests }} guest{{ booking.guests > 1 ? 's' : '' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Total Amount:</span>
            <span class="value total-amount">${{ booking.total }}</span>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="next-steps card">
        <h2>What's Next?</h2>
        <div class="steps">
          <div class="step">
            <div class="step-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="step-content">
              <h3>Confirmation Email</h3>
              <p>Check your email for the booking confirmation and receipt.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="step-content">
              <h3>Add to Calendar</h3>
              <p>Add the booking dates to your calendar to stay organized.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-icon">
              <i class="fas fa-comments"></i>
            </div>
            <div class="step-content">
              <h3>Contact Host</h3>
              <p>You can now message your host for any special requests.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="confirmation-actions">
        <router-link to="/" class="btn btn-primary">
          <i class="fas fa-home"></i> Back to Home
        </router-link>
        <button class="btn btn-outline" @click="downloadConfirmation">
          <i class="fas fa-download"></i> Download Receipt
        </button>
        <button class="btn btn-outline" @click="printConfirmation">
          <i class="fas fa-print"></i> Print Confirmation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingConfirmation',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bookingId: '',
      booking: {
        accommodationName: 'Luxury Villa with Ocean View',
        location: 'Bali, Indonesia',
        checkIn: new Date(Date.now() + 86400000),
        checkOut: new Date(Date.now() + 259200000),
        guests: 2,
        total: '598.00'
      }
    }
  },
  created() {
    // Use the ID from route params or generate one
    this.bookingId = this.id || 'BK' + Date.now()
    
    // Update page title
    document.title = `Booking Confirmation #${this.bookingId} - TravelBook`
    
    // In a real app, fetch booking details using this.bookingId
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      })
    },
    downloadConfirmation() {
      alert('Download functionality would be implemented here')
      // Implementation would generate and download a PDF
    },
    printConfirmation() {
      window.print()
    }
  }
}
</script>

<style scoped>
.booking-confirmation {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
}

.confirmation-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.success-icon {
  font-size: 80px;
  color: #28a745;
  margin-bottom: 30px;
  animation: successBounce 0.6s ease;
}

@keyframes successBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.confirmation-message h1 {
  font-size: 36px;
  margin-bottom: 15px;
  color: #333;
}

.confirmation-message p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.booking-id {
  font-size: 16px;
  padding: 12px 24px;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: inline-block;
  margin-top: 20px;
}

.booking-details {
  margin: 40px 0;
  text-align: left;
}

.booking-details h2 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.value {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.total-amount {
  color: #28a745;
  font-size: 20px;
}

.next-steps {
  margin-bottom: 40px;
  text-align: left;
}

.next-steps h2 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
  text-align: center;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.step {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.step-icon {
  width: 50px;
  height: 50px;
  background-color: #0071c2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.step-content p {
  color: #666;
  line-height: 1.6;
}

.confirmation-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  font-size: 16px;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #0071c2;
  color: #0071c2;
}

.btn-outline:hover {
  background-color: #0071c2;
  color: white;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .steps {
    grid-template-columns: 1fr;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
  
  .confirmation-actions .btn {
    width: 100%;
    justify-content: center;
  }
}

@media print {
  .confirmation-actions,
  .next-steps .step-icon {
    display: none;
  }
}
</style>