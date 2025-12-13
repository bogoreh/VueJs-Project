<template>
  <div class="search-bar card">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-group">
        <label for="destination">
          <i class="fas fa-map-marker-alt"></i> Destination
        </label>
        <input
          type="text"
          id="destination"
          v-model="searchParams.destination"
          placeholder="Where are you going?"
          required
        >
      </div>

      <div class="search-group">
        <label for="checkIn">
          <i class="fas fa-calendar-alt"></i> Check-in
        </label>
        <input
          type="date"
          id="checkIn"
          v-model="searchParams.checkIn"
          required
        >
      </div>

      <div class="search-group">
        <label for="checkOut">
          <i class="fas fa-calendar-alt"></i> Check-out
        </label>
        <input
          type="date"
          id="checkOut"
          v-model="searchParams.checkOut"
          required
        >
      </div>

      <div class="search-group">
        <label for="guests">
          <i class="fas fa-users"></i> Guests
        </label>
        <select id="guests" v-model="searchParams.guests">
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5+ Guests</option>
        </select>
      </div>

      <div class="search-group">
        <label>&nbsp;</label>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-search"></i> Search
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchParams: {
        destination: '',
        checkIn: this.getTomorrowDate(),
        checkOut: this.getDateInFuture(3),
        guests: '2'
      }
    }
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: '/search',
        query: this.searchParams
      })
    },
    getTomorrowDate() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    getDateInFuture(days) {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date.toISOString().split('T')[0]
    }
  }
}
</script>

<style scoped>
.search-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: end;
}

.search-group {
  display: flex;
  flex-direction: column;
}

.search-group label {
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-group input,
.search-group select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-group input:focus,
.search-group select:focus {
  outline: none;
  border-color: #0071c2;
}

.search-group button {
  height: 46px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .search-form {
    grid-template-columns: 1fr;
  }
}
</style>