<template>
  <div class="player-container text-center my-5">
    <h4>Preparing your movie...</h4>
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const tmdbId = ref(route.params.id);
const imdbId = ref('');

const VIDSRC_DOMAIN = 'https://vidsrc.icu'; // or .to, .me, etc.

// Access the API key here
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

onMounted(async () => {
  try {
    // Fetch IMDb ID
    const res = await fetch(
      // Use the TMDB_API_KEY constant here
      `https://api.themoviedb.org/3/movie/${tmdbId.value}/external_ids?api_key=${TMDB_API_KEY}`
    );
    const ids = await res.json();
    imdbId.value = ids.imdb_id;

    if (imdbId.value) {
      // Open player in new tab
      const playerUrl = `${VIDSRC_DOMAIN}/embed/movie/${imdbId.value}`;
      window.open(playerUrl, '_blank');

      // Go back to homepage after short delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
        console.warn('IMDb ID not found for this TMDB movie.');
        // Optionally, redirect or show an error to the user
        router.push('/'); // Redirect back if no IMDb ID found
    }
  } catch (err) {
    console.error('Failed to load movie:', err);
    // Handle error, e.g., redirect to home or show an error message
    router.push('/'); 
  }
});
</script>

<style scoped>
.player-container {
  padding: 2rem;
}
</style>