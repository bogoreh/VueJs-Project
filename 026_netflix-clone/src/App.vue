<template>
  <div class="app">
    <Navigation />
    <HeroBanner />
    
    <div class="content">
      <MovieRow 
        v-for="(row, index) in movieRows" 
        :key="row.id"
        :title="row.title"
        :movies="row.movies"
        :row-index="index"
      />
    </div>
    
    <MovieModal 
      v-if="selectedMovie" 
      :movie="selectedMovie" 
      @close="selectedMovie = null" 
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Navigation from './components/Navigation.vue'
import HeroBanner from './components/HeroBanner.vue'
import MovieRow from './components/MovieRow.vue'
import MovieModal from './components/MovieModal.vue'
import gsap from 'gsap'

export default {
  name: 'App',
  components: {
    Navigation,
    HeroBanner,
    MovieRow,
    MovieModal
  },
  setup() {
    const selectedMovie = ref(null)
    const movieRows = ref([
      {
        id: 1,
        title: 'Trending Now',
        movies: [
          { id: 1, title: 'Stranger Things', year: 2016, rating: 'TV-14', duration: '4 Seasons', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.', poster: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg', banner: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg', genre: ['Sci-Fi', 'Horror', 'Drama'] },
          { id: 2, title: 'The Queen\'s Gambit', year: 2020, rating: 'TV-MA', duration: '1 Season', description: 'Orphaned chess prodigy Beth Harmon struggles with addiction in a quest to become the greatest chess player.', poster: 'https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg', banner: 'https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg', genre: ['Drama'] },
          { id: 3, title: 'The Witcher', year: 2019, rating: 'TV-MA', duration: '3 Seasons', description: 'Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.', poster: 'https://image.tmdb.org/t/p/w500/A6oF3z5E7GWTq2h6yLkP1V9B4zW.jpg', banner: 'https://image.tmdb.org/t/p/original/7vjaCdMw15FEbXyLQTVa04URsPm.jpg', genre: ['Fantasy', 'Adventure', 'Action'] },
          { id: 4, title: 'Bridgerton', year: 2020, rating: 'TV-MA', duration: '2 Seasons', description: 'Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.', poster: 'https://image.tmdb.org/t/p/w500/kjQB8g5eR1PTvwNszVW4lNzj6R7.jpg', banner: 'https://image.tmdb.org/t/p/original/ucpgmER5M7ware3YVuK1qT5cJx2.jpg', genre: ['Drama', 'Romance'] },
          { id: 5, title: 'Money Heist', year: 2017, rating: 'TV-MA', duration: '5 Parts', description: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police.', poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg', banner: 'https://image.tmdb.org/t/p/original/pTeoYtBx9SqgK4xLQrbv3cC84hK.jpg', genre: ['Crime', 'Drama'] },
        ]
      },
      {
        id: 2,
        title: 'Popular on Netflix',
        movies: [
          { id: 6, title: 'Lucifer', year: 2016, rating: 'TV-14', duration: '6 Seasons', description: 'Lucifer Morningstar, the Devil, abandons Hell for Los Angeles where he runs a nightclub and becomes a consultant to the LAPD.', poster: 'https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg', banner: 'https://image.tmdb.org/t/p/original/hdXQxlD4mep7qtIUYHfvnz8QOwy.jpg', genre: ['Crime', 'Fantasy', 'Drama'] },
          { id: 7, title: 'The Crown', year: 2016, rating: 'TV-MA', duration: '6 Seasons', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.', poster: 'https://image.tmdb.org/t/p/w500/jYvIuPmFvqHbeHkY3UaYVnp5jOa.jpg', banner: 'https://image.tmdb.org/t/p/original/1M876KPjulVwppEpldhdc8V4o68.jpg', genre: ['Drama', 'History'] },
          { id: 8, title: 'Narcos', year: 2015, rating: 'TV-MA', duration: '3 Seasons', description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.', poster: 'https://image.tmdb.org/t/p/w500/5pb7IYI1O6xPww64d2eL8WkpmJj.jpg', banner: 'https://image.tmdb.org/t/p/original/6oLSQK5h9Y9kLJYqkV4O8SJy40e.jpg', genre: ['Crime', 'Drama'] },
          { id: 9, title: 'Black Mirror', year: 2011, rating: 'TV-MA', duration: '5 Seasons', description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', poster: 'https://image.tmdb.org/t/p/w500/7PRddO4wFjG1hVzUSk2Z1ZyshFM.jpg', banner: 'https://image.tmdb.org/t/p/original/5c6RUVuS8PAFzk9qE0ZLhq9jK2k.jpg', genre: ['Sci-Fi', 'Drama', 'Thriller'] },
          { id: 10, title: 'The Umbrella Academy', year: 2019, rating: 'TV-14', duration: '3 Seasons', description: 'A family of former child heroes, now grown apart, must reunite to continue to protect the world.', poster: 'https://image.tmdb.org/t/p/w500/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg', banner: 'https://image.tmdb.org/t/p/original/4N6zEMfZ57zNEQcM8gWeERFupMv.jpg', genre: ['Action', 'Adventure', 'Comedy'] },
        ]
      },
      {
        id: 3,
        title: 'Continue Watching',
        movies: [
          { id: 11, title: 'Ozark', year: 2017, rating: 'TV-MA', duration: '4 Seasons', description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.', poster: 'https://image.tmdb.org/t/p/w500/pxeqQX4uW4Nalqn8kfL4O6sLq6E.jpg', banner: 'https://image.tmdb.org/t/p/original/4N6zEMfZ57zNEQcM8gWeERFupMv.jpg', genre: ['Crime', 'Drama', 'Thriller'] },
          { id: 12, title: 'Peaky Blinders', year: 2013, rating: 'TV-MA', duration: '6 Seasons', description: 'A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor blades in the peaks of their caps.', poster: 'https://image.tmdb.org/t/p/w500/6PX0r5qrHEnbbK6gInGf7P4iVwM.jpg', banner: 'https://image.tmdb.org/t/p/original/6PX0r5qrHEnbbK6gInGf7P4iVwM.jpg', genre: ['Crime', 'Drama'] },
          { id: 13, title: 'Dark', year: 2017, rating: 'TV-MA', duration: '3 Seasons', description: 'The story follows characters from the fictional town of Winden as they pursue the truth in the aftermath of a child\'s disappearance.', poster: 'https://image.tmdb.org/t/p/w500/5Lo4e7aWe0IMC8y5g80TzI24kHL.jpg', banner: 'https://image.tmdb.org/t/p/original/5Lo4e7aWe0IMC8y5g80TzI24kHL.jpg', genre: ['Crime', 'Drama', 'Mystery'] },
          { id: 14, title: 'The Last Kingdom', year: 2015, rating: 'TV-MA', duration: '5 Seasons', description: 'As Alfred the Great defends his kingdom from Norse invaders, Uhtred - born a Saxon but raised by Vikings - seeks to claim his ancestral birthright.', poster: 'https://image.tmdb.org/t/p/w500/ic7YHRbTyz7cGcOo0sJcCCm1HhN.jpg', banner: 'https://image.tmdb.org/t/p/original/ic7YHRbTyz7cGcOo0sJcCCm1HhN.jpg', genre: ['Action', 'Drama', 'History'] },
          { id: 15, title: 'Better Call Saul', year: 2015, rating: 'TV-MA', duration: '6 Seasons', description: 'The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.', poster: 'https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7Icmdr3hLnZ5LQ1.jpg', banner: 'https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7Icmdr3hLnZ5LQ1.jpg', genre: ['Crime', 'Drama'] },
        ]
      },
      {
        id: 4,
        title: 'Top Picks for You',
        movies: [
          { id: 16, title: 'Breaking Bad', year: 2008, rating: 'TV-MA', duration: '5 Seasons', description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.', poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', banner: 'https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', genre: ['Crime', 'Drama', 'Thriller'] },
          { id: 17, title: 'The Mandalorian', year: 2019, rating: 'TV-14', duration: '3 Seasons', description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', poster: 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg', banner: 'https://image.tmdb.org/t/p/original/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg', genre: ['Sci-Fi', 'Action', 'Adventure'] },
          { id: 18, title: 'Sex Education', year: 2019, rating: 'TV-MA', duration: '4 Seasons', description: 'A teenage boy with a sex therapist mother teams up with a high school classmate to set up an underground sex therapy clinic at school.', poster: 'https://image.tmdb.org/t/p/w500/kZvC2JqP5Rjk8BfVtZ8PtfQ2rFw.jpg', banner: 'https://image.tmdb.org/t/p/original/kZvC2JqP5Rjk8BfVtZ8PtfQ2rFw.jpg', genre: ['Comedy', 'Drama'] },
          { id: 19, title: 'The Haunting of Hill House', year: 2018, rating: 'TV-MA', duration: '1 Season', description: 'Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.', poster: 'https://image.tmdb.org/t/p/w500/3e0s1QznR7x0Lmev4SVxXw017gp.jpg', banner: 'https://image.tmdb.org/t/p/original/3e0s1QznR7x0Lmev4SVxXw017gp.jpg', genre: ['Drama', 'Horror', 'Mystery'] },
          { id: 20, title: 'You', year: 2018, rating: 'TV-MA', duration: '4 Seasons', description: 'A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.', poster: 'https://image.tmdb.org/t/p/w500/vw6xXr5hA7Mia88EZEnrNxNcEfb.jpg', banner: 'https://image.tmdb.org/t/p/original/vw6xXr5hA7Mia88EZEnrNxNcEfb.jpg', genre: ['Crime', 'Drama', 'Romance'] },
        ]
      }
    ])

    const selectMovie = (movie) => {
      selectedMovie.value = movie
    }

    // Animation on initial load
    onMounted(() => {
      gsap.from('.movie-row', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out"
      })
    })

    return {
      movieRows,
      selectedMovie,
      selectMovie
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(20, 20, 20, 0.8) 0%, #141414 100%);
}

.content {
  padding: 0 4%;
  margin-top: -100px;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .content {
    padding: 0 3%;
    margin-top: -50px;
  }
}
</style>