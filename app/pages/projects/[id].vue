<template>
  <div class="project-detail">
    <div class="back-link">
      <NuxtLink to="/projects" class="nav-link">
        <span>&larr;</span>
        <span>Back to Projects</span>
      </NuxtLink>
    </div>

    <div v-if="loading" class="loading">
      <p class="text-muted">Loading project...</p>
    </div>

    <div v-else-if="project" class="card secondary project-container">
      <div class="project-header">
        <div v-if="project.image" class="project-image">
          <img :src="getImageUrl(project.image)" :alt="project.editor" />
        </div>

        <div class="project-info">
          <h1 class="detail-title">{{ project.editor }}</h1>
          <p class="type">
            <span class="tag secondary">Electron App</span>
          </p>
          
          <div v-if="project.version || project.releaseDate" class="meta">
            <span v-if="project.version" class="meta-item">v{{ project.version }}</span>
            <span v-if="project.releaseDate" class="meta-item">{{ formatDate(project.releaseDate) }}</span>
          </div>

          <p v-if="project.description" class="description">{{ project.description }}</p>

          <div v-if="project.formats && project.formats.length" class="formats">
            <span v-for="format in project.formats" :key="format" class="tag secondary">
              {{ format }}
            </span>
          </div>

          <div class="actions">
            <a v-if="project.downloadLink" :href="project.downloadLink" class="btn btn-secondary">Download</a>
            <a v-if="project.githubRepo" :href="project.githubRepo" class="btn btn-outline" target="_blank">
              GitHub Repository
            </a>
          </div>

          <p v-if="project.license" class="license">License: {{ project.license }}</p>
        </div>
      </div>

      <div v-if="project.longDescription" class="project-details">
        <h2>Details</h2>
        <p>{{ project.longDescription }}</p>
      </div>
    </div>

    <div v-else class="not-found">
      <p class="text-muted">Project not found.</p>
      <NuxtLink to="/projects" class="btn btn-secondary">Go back to Projects</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStrapi } from '~/composables/useStrapi';

const route = useRoute();
const { getProject } = useStrapi();

interface Project {
  id: string;
  editor: string;
  description: string;
  longDescription?: string;
  image?: any;
  downloadLink?: string;
  releaseDate?: string;
  version?: string;
  formats?: string[];
  githubRepo?: string;
  license?: string;
}

const project = ref<Project | null>(null);
const loading = ref(true);

onMounted(async () => {
  const id = route.params.id as string;
  project.value = await getProject(id);
  loading.value = false;
});

const getImageUrl = (image: any) => {
  if (!image) return '';
  if (image.url) return `http://localhost:3000${image.url}`;
  return image;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>

<style scoped>
.project-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) 0;
}

.back-link {
  margin-bottom: var(--space-6);
}

.loading,
.not-found {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-tertiary);
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.project-container {
  overflow: hidden;
}

.project-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-8);
  padding: var(--space-8);
  align-items: start;
}

.project-image {
  width: 100%;
  height: 300px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.05));
  border: var(--border-width) solid var(--color-border);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-title {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-3xl);
  color: var(--color-text-primary);
}

.type {
  margin: 0 0 var(--space-4) 0;
}

.meta {
  display: flex;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.meta-item {
  display: inline-block;
}

.description {
  margin: 0 0 var(--space-6) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-base);
  line-height: var(--line-height-relaxed);
}

.formats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.license {
  margin: 0;
  font-size: var(--font-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-details {
  padding: var(--space-8);
  border-top: var(--border-width) solid var(--color-border);
}

.project-details h2 {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-2xl);
  color: var(--color-text-primary);
}

.project-details p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

@media (max-width: 768px) {
  .project-header {
    grid-template-columns: 1fr;
  }

  .project-image {
    height: 250px;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
