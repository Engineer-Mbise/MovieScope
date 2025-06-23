<template>
  <div class="home-page container mt-5 pt-5">
    <!-- Search and Genre Filter Row -->
    <div class="row mb-4">
      <div class="col-md-6">
        <input 
          v-model="searchQuery"
          type="search" 
          class="form-control"
          placeholder="Search movies..."
        >
      </div>
      <div class="col-md-6">
        <select v-model="selectedGenre" class="form-select">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
    </div>

    <h1 class="mb-4">Featured Movies</h1>

    <div v-if="filteredMovies.length" class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="movie in filteredMovies" :key="movie.id" class="col">
        <div class="card h-100">
          <img 
            :src="getPosterUrl(movie.poster_path)" 
            class="card-img-top"
            style="height: 400px; object-fit: cover;"
            @error="setDefaultPoster"
          >
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            
            <!-- Rating Display -->
            <div class="rating mb-2">
              <span class="text-warning">★</span>
              <small>{{ movie.vote_average.toFixed(1) }} ({{ movie.vote_count }} votes)</small>
            </div>
            
            <p class="card-text">{{ movie.overview.substring(0, 100) }}...</p>
            <router-link 
              :to="`/player/${movie.id}`" 
              class="btn btn-primary"
            >
              Watch Now
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div ref="loadMoreTrigger" class="text-center my-5">
      <div v-if="loading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else-if="!hasMore" class="text-muted">You've reached the end 🚀</div>
    </div>

    <div class="mt-5 text-center">
      <img 
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
        width="100"
        alt="TMDB Logo"
        class="mb-2"
      >
      <p class="small text-muted">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Movie data and pagination
const movies = ref([]);
const page = ref(1);
const loading = ref(false);
const hasMore = ref(true);
const loadMoreTrigger = ref(null);
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Search and Filter
const searchQuery = ref('');
const selectedGenre = ref('');

// Genres list (Romance excluded)
const genres = ref([
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
]);

// Filtered movies based on search and genre
const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesGenre = !selectedGenre.value || movie.genre_ids.includes(Number(selectedGenre.value));
    return matchesSearch && matchesGenre;
  });
});

// Image handling
const getPosterUrl = (path) => {
  return path 
    ? `https://image.tmdb.org/t/p/w500${path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';
};

const setDefaultPoster = (event) => {
  event.target.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Found';
};

// Fetch movies from TMDB
const fetchMovies = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page.value}`
    );
    const data = await res.json();

    if (data.results?.length) {
      movies.value = [...movies.value, ...data.results];
      page.value++;
      hasMore.value = page.value <= data.total_pages;
    }
  } catch (err) {
    console.error("Error loading movies:", err);
  } finally {
    loading.value = false;
  }
};

// Infinite scroll setup
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => entries[0].isIntersecting && fetchMovies(),
    { threshold: 0.1 }
  );
  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value);
};

onMounted(() => {
  fetchMovies();
  setupIntersectionObserver();
});
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  gap: 5px;
}
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
</style>