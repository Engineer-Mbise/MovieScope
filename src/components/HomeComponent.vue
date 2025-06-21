<template>
  <div class="home-page container mt-5 pt-5">
    <h1 class="mb-4">Featured Movies</h1>

    <!-- Loading State for Initial Load -->
    <div v-if="initialLoading" class="text-center my-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading movies...</p>
    </div>

    <!-- Movie Grid -->
    <div v-else-if="movies.length" class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="movie in movies" :key="movie.id" class="col">
        <div class="card h-100 shadow-sm">
          <img 
            :src="getPosterUrl(movie.poster_path)" 
            :alt="movie.title"
            class="card-img-top"
            style="height: 400px; object-fit: cover;"
            @error="setDefaultPoster"
            loading="lazy"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text text-muted mb-3">
              {{ movie.overview.substring(0, 100) }}{{ movie.overview.length > 100 ? '...' : '' }}
            </p>
            <div class="mt-auto">
              <span class="badge bg-info text-dark me-2">
                Rating: {{ movie.vote_average.toFixed(1) }}
              </span>
              <router-link 
                :to="`/player/${movie.id}`" 
                class="btn btn-primary mt-2 w-100"
              >
                Watch Now
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-5">
      <div class="alert alert-warning">
        No movies found. Please try again later.
      </div>
    </div>

    <!-- Infinite Scroll Trigger -->
    <div ref="loadMoreTrigger" class="text-center my-5">
      <div v-if="loadingMore" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading more...</span>
      </div>
      <div v-else-if="!hasMore" class="text-muted py-3">
        <p>You've reached the end 🚀</p>
        <button class="btn btn-outline-primary" @click="resetAndReload">
          Reload Movies
        </button>
      </div>
    </div>

    <!-- TMDB Attribution -->
    <div class="mt-5 text-center">
      <img 
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
        width="100"
        alt="TMDB Logo"
        class="mb-2"
      >
      <p class="small text-muted">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Reactive state
const movies = ref([]);
const page = ref(1);
const initialLoading = ref(true);
const loadingMore = ref(false);
const hasMore = ref(true);
const loadMoreTrigger = ref(null);

// Configuration
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_API_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// Helper functions
const getPosterUrl = (path) => {
  if (!path) return 'https://via.placeholder.com/300x450?text=No+Poster';
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const setDefaultPoster = (event) => {
  event.target.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Found';
};

// API Fetch function
const fetchMovies = async () => {
  const loading = page.value === 1 ? initialLoading : loadingMore;
  loading.value = true;
  
  try {
    const response = await fetch(
      `${BASE_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page.value}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.results?.length) {
      movies.value = [...movies.value, ...data.results];
      page.value++;
      hasMore.value = page.value <= data.total_pages;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    hasMore.value = false;
  } finally {
    loading.value = false;
  }
};

// Reset and reload movies
const resetAndReload = () => {
  movies.value = [];
  page.value = 1;
  hasMore.value = true;
  fetchMovies();
};

// Intersection Observer for infinite scroll
let observer = null;

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasMore.value && !loadingMore.value) {
        fetchMovies();
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
};

// Lifecycle hooks
onMounted(async () => {
  await fetchMovies();
  setupIntersectionObserver();
});

onBeforeUnmount(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.load-more-trigger {
  height: 20px;
  width: 100%;
}
</style>