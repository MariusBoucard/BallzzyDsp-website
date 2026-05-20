<template>
  <div class="home">
    <section class="hero">
      <h1>Ballzzy DSP</h1>
      <p class="hero-subtitle">Audio plugins and projects for music production</p>
      <p class="hero-description">
        Discover a collection of professional audio plugins and electron-based applications
        designed to enhance your music production workflow.
      </p>
      <div class="hero-actions">
        <NuxtLink to="/plugins" class="btn">Explore Plugins</NuxtLink>
        <NuxtLink to="/projects" class="btn btn-secondary">See Projects</NuxtLink>
      </div>
    </section>

    <section class="featured">
      <h2>Featured Plugins</h2>
      <div v-if="featuredPlugins.length" class="grid">
        <PluginCard v-for="plugin in featuredPlugins.slice(0, 3)" :key="plugin.id" :plugin="plugin" />
      </div>
      <p v-else class="text-muted">Loading plugins...</p>
    </section>

    <section class="featured">
      <h2>Featured Projects</h2>
      <div v-if="featuredProjects.length" class="grid">
        <ProjectCard v-for="project in featuredProjects.slice(0, 3)" :key="project.id" :project="project" />
      </div>
      <p v-else class="text-muted">Loading projects...</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStrapi } from '~/composables/useStrapi';

const featuredPlugins = ref<any[]>([]);
const featuredProjects = ref<any[]>([]);
const { fetchPlugins, fetchProjects } = useStrapi();

onMounted(async () => {
  featuredPlugins.value = await fetchPlugins();
  featuredProjects.value = await fetchProjects();
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.hero {
  text-align: center;
  padding: 3rem 0;
}

.hero h1 {
  font-size: 3rem;
  margin: 0 0 0.5rem 0;
  color: #111827;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #3b82f6;
  margin: 0 0 1rem 0;
}

.hero-description {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #111827;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.featured {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.featured h2 {
  margin: 0;
  font-size: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.text-muted {
  color: #9ca3af;
  font-size: 0.95rem;
  text-align: center;
}
</style>
