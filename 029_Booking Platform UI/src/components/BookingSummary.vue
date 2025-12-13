<template>
  <div class="booking-summary card">
    <h2 class="summary-title">Booking Summary</h2>
    
    <!-- Accommodation Details -->
    <div class="section accommodation-details">
      <h3 class="section-title">
        <i class="fas fa-home"></i> Accommodation Details
      </h3>
      <div class="accommodation-info">
        <img :src="bookingDetails.accommodationImage" :alt="bookingDetails.accommodationName" class="accommodation-img">
        <div class="accommodation-text">
          <h4>{{ bookingDetails.accommodationName }}</h4>
          <div class="rating">
            <i class="fas fa-star"></i>
            <span>{{ bookingDetails.rating }}</span>
          </div>
          <p class="location">
            <i class="fas fa-map-marker-alt"></i> {{ bookingDetails.location }}
          </p>
          <div class="accommodation-features">
            <span class="feature">
              <i class="fas fa-user-friends"></i>
              {{ bookingDetails.guests }} guests
            </span>
            <span class="feature">
              <i class="fas fa-bed"></i>
              {{ bookingDetails.bedrooms }} bedrooms
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dates & Guests -->
    <div class="section dates-section">
      <h3 class="section-title">
        <i class="fas fa-calendar-alt"></i> Dates & Guests
      </h3>
      <div class="dates-grid">
        <div class="date-info">
          <label>Check-in</label>
          <div class="date-value">
            <i class="fas fa-sign-in-alt"></i>
            {{ formatDate(bookingDetails.checkIn) }}
          </div>
        </div>
        <div class="date-info">
          <label>Check-out</label>
          <div class="date-value">
            <i class="fas fa-sign-out-alt"></i>
            {{ formatDate(bookingDetails.checkOut) }}
          </div>
        </div>
        <div class="date-info">
          <label>Duration</label>
          <div class="date-value">
            <i class="fas fa-clock"></i>
            {{ bookingDetails.nights }} night{{ bookingDetails.nights > 1 ? 's' : '' }}
          </div>
        </div>
        <div class="date-info">
          <label>Guests</label>
          <div class="date-value">
            <i class="fas fa-users"></i>
            {{ bookingDetails.guests }} guest{{ bookingDetails.guests > 1 ? 's' : '' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Price Breakdown -->
    <div class="section price-breakdown">
      <h3 class="section-title">
        <i class="fas fa-receipt"></i> Price Breakdown
      </h3>
      <div class="price-items">
        <div class="price-item">
          <span>${{ bookingDetails.pricePerNight }} × {{ bookingDetails.nights }} nights</span>
          <span>${{ calculateSubtotal() }}</span>
        </div>
        
        <div v-if="bookingDetails.cleaningFee" class="price-item">
          <span>Cleaning fee</span>
          <span>${{ bookingDetails.cleaningFee }}</span>
        </div>
        
        <div v-if="bookingDetails.serviceFee" class="price-item">
          <span>Service fee</span>
          <span>${{ bookingDetails.serviceFee }}</span>
        </div>
        
        <div v-if="bookingDetails.discount" class="price-item discount">
          <span>Discount</span>
          <span class="discount-amount">-${{ bookingDetails.discount }}</span>
        </div>
        
        <div class="price-item total">
          <span>Total (USD)</span>
          <span class="total-amount">${{ calculateTotal() }}</span>
        </div>
      </div>
    </div>

    <!-- Cancellation Policy -->
    <div class="section cancellation-policy">
      <h3 class="section-title">
        <i class="fas fa-info-circle"></i> Cancellation Policy
      </h3>
      <div class="policy-info">
        <div class="policy-type" :class="bookingDetails.cancellationPolicy.type">
          {{ bookingDetails.cancellationPolicy.type.charAt(0).toUpperCase() + bookingDetails.cancellationPolicy.type.slice(1) }}
        </div>
        <p class="policy-description">{{ bookingDetails.cancellationPolicy.description }}</p>
        <p class="policy-deadline">
          Free cancellation until {{ formatDate(bookingDetails.cancellationPolicy.freeCancellationUntil) }}
        </p>
      </div>
    </div>

    <!-- Booking Actions -->
    <div class="booking-actions">
      <button 
        class="btn btn-success btn-block" 
        @click="handleBookNow"
        :disabled="isProcessing"
      >
        <i class="fas fa-lock"></i>
        {{ isProcessing ? 'Processing...' : 'Book Now' }}
      </button>
      
      <p class="secure-booking">
        <i class="fas fa-shield-alt"></i>
        Your booking is secure and encrypted
      </p>
      
      <div class="payment-methods">
        <span>We accept:</span>
        <div class="payment-icons">
          <i class="fab fa-cc-visa"></i>
          <i class="fab fa-cc-mastercard"></i>
          <i class="fab fa-cc-amex"></i>
          <i class="fab fa-cc-paypal"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingSummary',
  props: {
    bookingData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isProcessing: false,
      bookingDetails: {
        accommodationName: 'Luxury Villa with Ocean View',
        accommodationImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        location: 'Bali, Indonesia',
        rating: 4.8,
        guests: 2,
        bedrooms: 1,
        checkIn: new Date(Date.now() + 86400000), // Tomorrow
        checkOut: new Date(Date.now() + 259200000), // 3 days from now
        nights: 2,
        pricePerNight: 299,
        cleaningFee: 50,
        serviceFee: 30,
        discount: 20,
        cancellationPolicy: {
          type: 'flexible',
          description: 'Free cancellation up to 24 hours before check-in',
          freeCancellationUntil: new Date(Date.now() + 86400000) // Tomorrow
        }
      }
    }
  },
  created() {
    // Merge props with default data
    if (this.bookingData) {
      this.bookingDetails = { ...this.bookingDetails, ...this.bookingData }
    }
    
    // Calculate nights if not provided
    if (this.bookingDetails.checkIn && this.bookingDetails.checkOut) {
      const oneDay = 24 * 60 * 60 * 1000
      const nights = Math.round(
        Math.abs((this.bookingDetails.checkOut - this.bookingDetails.checkIn) / oneDay)
      )
      this.bookingDetails.nights = nights || 1
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A'
      const d = new Date(date)
      return d.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    },
    calculateSubtotal() {
      return (this.bookingDetails.pricePerNight * this.bookingDetails.nights).toFixed(2)
    },
    calculateTotal() {
      let total = this.bookingDetails.pricePerNight * this.bookingDetails.nights
      total += this.bookingDetails.cleaningFee || 0
      total += this.bookingDetails.serviceFee || 0
      total -= this.bookingDetails.discount || 0
      return total.toFixed(2)
    },
    handleBookNow() {
      this.isProcessing = true
      
      // Simulate API call
      setTimeout(() => {
        this.isProcessing = false
        this.$emit('booking-confirmed', {
          bookingId: 'BK' + Date.now(),
          total: this.calculateTotal(),
          details: this.bookingDetails
        })
        
        // Navigate to confirmation page
        this.$router.push({
          name: 'BookingConfirmation',
          params: { id: 'BK' + Date.now() }
        })
      }, 1500)
    }
  },
  watch: {
    bookingData: {
      handler(newData) {
        if (newData) {
          this.bookingDetails = { ...this.bookingDetails, ...newData }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.booking-summary {
  position: sticky;
  top: 100px;
}

.summary-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
}

.section {
  margin-bottom: 30px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.accommodation-info {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
  align-items: start;
}

.accommodation-img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.accommodation-text h4 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.rating {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #003580;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 8px;
}

.location {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.accommodation-features {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.feature {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dates-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.date-info label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-weight: 500;
}

.date-value {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-weight: 500;
  color: #333;
}

.price-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.price-item.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #eee;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.total-amount {
  font-size: 24px;
  color: #0071c2;
}

.discount {
  color: #28a745;
}

.discount-amount {
  font-weight: bold;
}

.policy-type {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
}

.policy-type.flexible {
  background-color: #d4edda;
  color: #155724;
}

.policy-type.moderate {
  background-color: #fff3cd;
  color: #856404;
}

.policy-type.strict {
  background-color: #f8d7da;
  color: #721c24;
}

.policy-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
}

.policy-deadline {
  font-size: 14px;
  color: #28a745;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.booking-actions {
  margin-top: 30px;
}

.secure-booking {
  text-align: center;
  color: #28a745;
  font-size: 14px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.payment-methods {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.payment-methods span {
  display: block;
  margin-bottom: 10px;
  color: #666;
  font-size: 14px;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 24px;
}

.payment-icons i {
  color: #666;
  transition: color 0.3s;
}

.payment-icons i:hover {
  color: #0071c2;
}

.btn-success {
  background-color: #28a745;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-success:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .accommodation-info {
    grid-template-columns: 1fr;
  }
  
  .accommodation-img {
    height: 150px;
  }
  
  .dates-grid {
    grid-template-columns: 1fr;
  }
  
  .payment-icons {
    font-size: 20px;
    gap: 10px;
  }
}
</style>