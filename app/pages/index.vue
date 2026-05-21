<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Ballzzy DSP</h1>
        <p class="hero-subtitle">Professional Audio Solutions</p>
        <p class="hero-description">
          Discover a collection of professional audio plugins and electron-based applications
          designed to enhance your music production workflow.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/plugins" class="btn btn-primary btn-lg">
            Explore Plugins
          </NuxtLink>
          <NuxtLink to="/projects" class="btn btn-outline btn-lg">
            See Projects
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="featured section">
      <div class="section-header">
        <h2>Featured Plugins</h2>
        <p class="section-subtitle">Cutting-edge audio processors</p>
      </div>
      <div v-if="featuredPlugins.length" class="grid-auto-fit">
        <PluginCard v-for="plugin in featuredPlugins.slice(0, 3)" :key="plugin.id" :plugin="plugin" />
      </div>
      <p v-else class="text-muted text-center">Loading plugins...</p>
    </section>

    <section class="featured section">
      <div class="section-header">
        <h2>Featured Projects</h2>
        <p class="section-subtitle">Standalone applications</p>
      </div>
      <div v-if="featuredProjects.length" class="grid-auto-fit">
        <ProjectCard v-for="project in featuredProjects.slice(0, 3)" :key="project.id" :project="project" />
      </div>
      <p v-else class="text-muted text-center">Loading projects...</p>
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
  gap: var(--space-16);
}

.hero {
  padding: var(--space-12) 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(0, 212, 255, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-5xl);
  margin-bottom: var(--space-4);
  background: var(--color-primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: var(--font-xl);
  color: var(--color-secondary);
  margin-bottom: var(--space-4);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-description {
  font-size: var(--font-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-8);
  line-height: var(--line-height-relaxed);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.section-header h2 {
  margin: 0;
  font-size: var(--font-4xl);
  color: var(--color-text-primary);
}

.section-subtitle {
  font-size: var(--font-lg);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
}

@media (max-width: 768px) {
  .home {
    gap: var(--space-12);
  }

  .hero {
    padding: var(--space-8) 0;
  }

  .hero-title {
    font-size: var(--font-3xl);
  }

  .hero-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .section-header h2 {
    font-size: var(--font-2xl);
  }
}
</style>
