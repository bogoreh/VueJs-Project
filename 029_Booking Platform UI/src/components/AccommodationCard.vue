<template>
  <div class="accommodation-card">
    <div class="card-image">
      <img :src="accommodation.image" :alt="accommodation.name" />
      <span v-if="accommodation.discount" class="discount-badge">
        -{{ accommodation.discount }}%
      </span>
    </div>
    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title">{{ accommodation.name }}</h3>
        <div class="rating">
          <i class="fas fa-star"></i>
          <span>{{ accommodation.rating }}</span>
        </div>
      </div>
      <p class="card-location">
        <i class="fas fa-map-marker-alt"></i>
        {{ accommodation.location }}
      </p>
      <p class="card-description">{{ accommodation.description }}</p>
      <div class="card-features">
        <span class="feature">
          <i class="fas fa-user-friends"></i>
          {{ accommodation.guests }} guests
        </span>
        <span class="feature">
          <i class="fas fa-bed"></i>
          {{ accommodation.bedrooms }} bedrooms
        </span>
        <span class="feature">
          <i class="fas fa-bath"></i>
          {{ accommodation.bathrooms }} bathrooms
        </span>
      </div>
      <div class="card-footer">
        <div class="price-info">
          <span class="price">${{ accommodation.price }}</span>
          <span class="period">/ night</span>
          <span v-if="accommodation.originalPrice" class="original-price">
            ${{ accommodation.originalPrice }}
          </span>
        </div>
        <router-link 
          :to="`/accommodation/${accommodation.id}`"
          class="btn btn-primary"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccommodationCard',
  props: {
    accommodation: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.accommodation-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.accommodation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4757;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.card-content {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #003580;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.card-location {
  color: #666;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-features {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.period {
  color: #666;
  font-size: 14px;
}

.original-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
  margin-left: 10px;
}
</style>