<template>
  <div class="home-page container mt-5 pt-5">
    <h1 class="mb-4">Featured Movies</h1>

    <div v-if="movies.length" class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="movie in movies" :key="movie.id" class="col">
        <div class="card h-100">
          <img 
            :src="getPosterUrl(movie.poster_path)" 
            :alt="movie.title"
            class="card-img-top"
            style="height: 400px; object-fit: cover;"
            @error="setDefaultPoster"
          >
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
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
        <span class="visually-hidden">Loading more...</span>
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
import { ref, onMounted, watch } from 'vue';

const movies = ref([]);
const page = ref(1);
const loading = ref(false);
const hasMore = ref(true);
const loadMoreTrigger = ref(null);

// Access the API key here
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Get TMDB image
const getPosterUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/300x450?text=No+Poster';
  return `https://image.tmdb.org/t/p/w500${path}`;
};

// Fallback image
const setDefaultPoster = (event) => {
  event.target.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Found';
};

// Load movies from TMDB with pagination
const fetchMovies = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    const res = await fetch(
      // Use the TMDB_API_KEY constant here
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page.value}`
    );
    const data = await res.json();

    if (data.results.length) {
      movies.value.push(...data.results);
      page.value++;
    }

    if (page.value > data.total_pages) {
      hasMore.value = false;
    }
  } catch (err) {
    console.error("Error loading more movies:", err);
    hasMore.value = false;
  } finally {
    loading.value = false;
  }
};

// Observe scrolling near the bottom
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value) {
        fetchMovies();
      }
    },
    { threshold: 1.0 }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
};

onMounted(() => {
  fetchMovies();
  setupIntersectionObserver();
});
</script>