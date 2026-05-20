<template>
  <div class="projects-page">
    <h1>Projects</h1>
    <p class="subtitle">Electron applications and standalone projects</p>

    <div v-if="projects.length" class="grid">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>
    <div v-else class="loading">
      <p>Loading projects...</p>
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
.projects-page h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.subtitle {
  margin: 0 0 2rem 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
}
</style>
