<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Find Your Perfect Getaway</h1>
        <p>Discover amazing accommodations at unbeatable prices</p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <SearchBar />
    </section>

    <!-- Featured Destinations -->
    <section class="featured-destinations">
      <h2 class="section-title">Popular Destinations</h2>
      <div class="destinations-grid">
        <div 
          v-for="destination in destinations" 
          :key="destination.id"
          class="destination-card"
          :style="{ backgroundImage: `url(${destination.image})` }"
        >
          <div class="destination-overlay">
            <h3>{{ destination.name }}</h3>
            <p>{{ destination.properties }} properties</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Accommodations -->
    <section class="featured-accommodations">
      <h2 class="section-title">Featured Stays</h2>
      <div class="accommodations-grid">
        <AccommodationCard
          v-for="accommodation in featuredAccommodations"
          :key="accommodation.id"
          :accommodation="accommodation"
        />
      </div>
    </section>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import AccommodationCard from '../components/AccommodationCard.vue'

export default {
  name: 'Home',
  components: {
    SearchBar,
    AccommodationCard
  },
  data() {
    return {
      destinations: [
        { id: 1, name: 'Paris', properties: 1240, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Tokyo', properties: 890, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'New York', properties: 1560, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 4, name: 'Bali', properties: 730, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
      ],
      featuredAccommodations: [
        {
          id: 1,
          name: 'Luxury Villa with Ocean View',
          location: 'Bali, Indonesia',
          description: 'Beautiful villa with private pool and stunning ocean views.',
          rating: 4.8,
          guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          price: 299,
          originalPrice: 399,
          discount: 25,
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 2,
          name: 'Modern Apartment in City Center',
          location: 'Tokyo, Japan',
          description: 'Stylish apartment located in the heart of Tokyo.',
          rating: 4.5,
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 189,
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 3,
          name: 'Charming Parisian Studio',
          location: 'Paris, France',
          description: 'Cozy studio near Eiffel Tower with beautiful views.',
          rating: 4.7,
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 159,
          originalPrice: 199,
          discount: 20,
          image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 4,
          name: 'Beachfront Resort Suite',
          location: 'Maldives',
          description: 'Luxurious suite with direct beach access.',
          rating: 4.9,
          guests: 3,
          bedrooms: 1,
          bathrooms: 2,
          price: 459,
          image: 'https://images.unsplash.com/photo-1573843989-c9d7ad0b473d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(rgba(0, 113, 194, 0.8), rgba(0, 113, 194, 0.9)), 
              url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 80px 20px;
  border-radius: 8px;
  margin-bottom: 40px;
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 20px;
  opacity: 0.9;
}

.search-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.destination-card {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.destination-card:hover {
  transform: scale(1.05);
}

.destination-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  padding: 20px;
}

.destination-overlay h3 {
  font-size: 24px;
  margin-bottom: 5px;
}

.destination-overlay p {
  opacity: 0.8;
  font-size: 14px;
}

.accommodations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 36px;
  }
  
  .accommodations-grid {
    grid-template-columns: 1fr;
  }
}
</style>