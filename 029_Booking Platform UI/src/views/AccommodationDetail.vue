<template>
  <div class="accommodation-detail">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <router-link to="/">Home</router-link>
      <i class="fas fa-chevron-right"></i>
      <router-link to="/search">Search</router-link>
      <i class="fas fa-chevron-right"></i>
      <span>{{ accommodation.name }}</span>
    </nav>

    <div class="detail-container">
      <!-- Main Content -->
      <div class="main-content">
        <!-- Gallery -->
        <div class="gallery">
          <div class="main-image">
            <img :src="accommodation.image" :alt="accommodation.name">
          </div>
          <div class="thumbnail-grid">
            <img 
              v-for="(img, index) in accommodation.gallery" 
              :key="index"
              :src="img" 
              :alt="`Image ${index + 1}`"
              @click="changeMainImage(img)"
              class="thumbnail"
            >
          </div>
        </div>

        <!-- Details Section -->
        <div class="details-section">
          <div class="header">
            <h1>{{ accommodation.name }}</h1>
            <div class="header-meta">
              <div class="rating">
                <i class="fas fa-star"></i>
                <span>{{ accommodation.rating }}</span>
                <span class="reviews">({{ accommodation.reviews }} reviews)</span>
              </div>
              <div class="location">
                <i class="fas fa-map-marker-alt"></i>
                {{ accommodation.location }}
              </div>
            </div>
          </div>

          <!-- Highlights -->
          <div class="highlights">
            <div class="highlight" v-for="highlight in highlights" :key="highlight.text">
              <i :class="highlight.icon"></i>
              <span>{{ highlight.text }}</span>
            </div>
          </div>

          <!-- Description -->
          <div class="description-section">
            <h2>About this place</h2>
            <p>{{ accommodation.description }}</p>
            <p class="expanded-description">{{ accommodation.fullDescription }}</p>
            <button class="show-more" @click="toggleDescription">
              {{ showFullDescription ? 'Show less' : 'Show more' }}
            </button>
          </div>

          <!-- Amenities -->
          <div class="amenities-section">
            <h2>What this place offers</h2>
            <div class="amenities-grid">
              <div class="amenity" v-for="amenity in amenities" :key="amenity">
                <i class="fas fa-check"></i>
                <span>{{ amenity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Sidebar -->
      <div class="sidebar">
        <BookingSummary :bookingData="bookingData" />
      </div>
    </div>
  </div>
</template>

<script>
import BookingSummary from '../components/BookingSummary.vue'

export default {
  name: 'AccommodationDetail',
  components: {
    BookingSummary
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      showFullDescription: false,
      mainImage: '',
      accommodation: {
        id: 1,
        name: 'Luxury Villa with Ocean View',
        location: 'Bali, Indonesia',
        description: 'Beautiful villa with private pool and stunning ocean views.',
        fullDescription: 'This luxurious villa offers breathtaking ocean views from every room. Featuring a private infinity pool, modern kitchen, and spacious living areas, it\'s the perfect retreat for couples or small families. The villa includes high-speed WiFi, air conditioning throughout, and daily cleaning service.',
        rating: 4.8,
        reviews: 128,
        price: 299,
        originalPrice: 399,
        discount: 25,
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1613977257362-975c06a6a73b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1613977257360-8c6b4f4b4b4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
      },
      highlights: [
        { icon: 'fas fa-swimming-pool', text: 'Private infinity pool' },
        { icon: 'fas fa-umbrella-beach', text: 'Ocean view from all rooms' },
        { icon: 'fas fa-wifi', text: 'High-speed WiFi' },
        { icon: 'fas fa-utensils', text: 'Fully equipped kitchen' },
        { icon: 'fas fa-wind', text: 'Air conditioning' },
        { icon: 'fas fa-car', text: 'Free parking' }
      ],
      amenities: [
        'Pool', 'WiFi', 'Kitchen', 'Air conditioning', 'Free parking',
        'Hot tub', 'Washer', 'Dryer', 'TV', 'BBQ grill', 'Fireplace',
        'Workspace', 'Pet friendly', 'Smoke alarm', 'Carbon monoxide alarm'
      ],
      bookingData: {
        checkIn: new Date(Date.now() + 86400000),
        checkOut: new Date(Date.now() + 259200000),
        guests: 2
      }
    }
  },
  created() {
    // In a real app, fetch accommodation data based on this.id
    this.mainImage = this.accommodation.image
    
    // Update page title
    document.title = `${this.accommodation.name} - TravelBook`
  },
  methods: {
    toggleDescription() {
      this.showFullDescription = !this.showFullDescription
    },
    changeMainImage(img) {
      this.mainImage = img
    }
  }
}
</script>

<style scoped>
.accommodation-detail {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
}

.breadcrumb a {
  color: #0071c2;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb i {
  font-size: 10px;
  opacity: 0.5;
}

.detail-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.gallery {
  margin-bottom: 40px;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.header {
  margin-bottom: 30px;
}

.header h1 {
  font-size: 32px;
  margin-bottom: 15px;
  color: #333;
}

.header-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.rating i {
  color: #ffc107;
}

.reviews {
  color: #666;
  font-weight: normal;
}

.location {
  color: #666;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  padding: 25px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.highlight {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
}

.highlight i {
  color: #0071c2;
  font-size: 20px;
  width: 24px;
}

.description-section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.description-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.description-section p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
}

.expanded-description {
  display: none;
}

.expanded-description.show {
  display: block;
}

.show-more {
  background: none;
  border: none;
  color: #0071c2;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
}

.show-more:hover {
  text-decoration: underline;
}

.amenities-section {
  margin-bottom: 40px;
}

.amenities-section h2 {
  font-size: 24px;
  margin-bottom: 25px;
  color: #333;
}

.amenities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.amenity {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

.amenity i {
  color: #28a745;
}

.sidebar {
  position: sticky;
  top: 100px;
}

@media (max-width: 1200px) {
  .detail-container {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .highlights,
  .amenities-grid {
    grid-template-columns: 1fr;
  }
  
  .main-image {
    height: 300px;
  }
  
  .thumbnail-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>