<template>
  <div class="projects-page">
    <div class="page-header">
      <h1>Projects</h1>
      <p class="page-subtitle">Electron applications and standalone projects</p>
    </div>

    <div v-if="projects.length" class="grid-auto-fill">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
    <div v-else class="loading">
      <p class="text-muted">Loading projects...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStrapi } from '~/composables/useStrapi';

const projects = ref<any[]>([]);
const { fetchProjects } = useStrapi();

onMounted(async () => {
  projects.value = await fetchProjects();
});
</script>

<style scoped>
.projects-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
  padding: var(--space-8) 0;
}

.page-header h1 {
  margin: 0;
  font-size: var(--font-5xl);
  background: var(--color-secondary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-lg);
}

.loading {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--space-6) 0;
  }

  .page-header h1 {
    font-size: var(--font-3xl);
  }
}
</style>
