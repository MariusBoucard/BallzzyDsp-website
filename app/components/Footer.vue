<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3 class="footer-title">Ballzzy DSP</h3>
        <p class="footer-desc">Audio plugins and projects built with passion and precision.</p>
      </div>
      <div class="footer-section">
        <h4 class="footer-subtitle">Links</h4>
        <nav class="footer-nav">
          <NuxtLink to="/" class="footer-link">Home</NuxtLink>
          <NuxtLink to="/plugins" class="footer-link">Plugins</NuxtLink>
          <NuxtLink to="/projects" class="footer-link">Projects</NuxtLink>
        </nav>
      </div>
      <div class="footer-section">
        <h4 class="footer-subtitle">Social</h4>
        <SocialLinks v-if="socialLinks.length" :links="socialLinks" />
        <p v-else class="text-muted">Loading social links...</p>
      </div>
    </div>
    <div class="footer-divider"></div>
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
  background: linear-gradient(180deg, var(--color-bg-dark) 0%, var(--color-bg-darker) 100%);
  border-top: var(--border-width) solid var(--color-border);
  margin-top: var(--space-16);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-4);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-8);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer-title {
  font-size: var(--font-xl);
  background: var(--color-primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.footer-subtitle {
  font-size: var(--font-sm);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

.footer-desc {
  color: var(--color-text-secondary);
  font-size: var(--font-sm);
  line-height: var(--line-height-relaxed);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-sm);
  transition: color var(--transition-base);
  position: relative;
}

.footer-link::before {
  content: '→';
  margin-right: var(--space-2);
  opacity: 0;
  transition: opacity var(--transition-base), margin var(--transition-base);
  color: var(--color-primary);
}

.footer-link:hover {
  color: var(--color-primary);
}

.footer-link:hover::before {
  opacity: 1;
  margin-right: var(--space-3);
}

.footer-divider {
  height: var(--border-width);
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  margin: var(--space-8) 0;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: var(--font-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    padding: var(--space-8) var(--space-4);
  }
}
</style>
