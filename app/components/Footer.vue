<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Ballzzy DSP</h3>
        <p>Audio plugins and projects built with passion.</p>
      </div>
      <div class="footer-section">
        <h4>Links</h4>
        <nav class="footer-nav">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/plugins">Plugins</NuxtLink>
          <NuxtLink to="/projects">Projects</NuxtLink>
        </nav>
      </div>
      <div class="footer-section">
        <h4>Social</h4>
        <SocialLinks v-if="socialLinks.length" :links="socialLinks" />
        <p v-else class="text-muted">Loading social links...</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Ballzzy DSP. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStrapi } from '~/composables/useStrapi';

const socialLinks = ref<any[]>([]);
const { fetchSocialLinks } = useStrapi();

onMounted(async () => {
  socialLinks.value = await fetchSocialLinks();
});
</script>

<style scoped>
.footer {
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-top: 0;
}

.footer-section p {
  color: #6b7280;
  margin: 0.5rem 0;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-nav a {
  color: #374151;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: #3b82f6;
}

.footer-bottom {
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

.text-muted {
  color: #9ca3af;
  font-size: 0.875rem;
}
</style>
