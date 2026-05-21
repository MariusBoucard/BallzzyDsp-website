<template>
  <div class="project-detail">
    <div class="back-link">
      <NuxtLink to="/projects">&larr; Back to Projects</NuxtLink>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading project...</p>
    </div>

    <div v-else-if="project" class="project-container">
      <div class="project-header">
        <div v-if="project.image" class="project-image">
          <img :src="getImageUrl(project.image)" :alt="project.editor" />
        </div>

        <div class="project-info">
          <h1>{{ project.editor }}</h1>
          <p class="type">Electron App</p>
          
          <div v-if="project.version || project.releaseDate" class="meta">
            <span v-if="project.version" class="meta-item">v{{ project.version }}</span>
            <span v-if="project.releaseDate" class="meta-item">{{ formatDate(project.releaseDate) }}</span>
          </div>

          <p v-if="project.description" class="description">{{ project.description }}</p>

          <div v-if="project.formats && project.formats.length" class="formats">
            <span v-for="format in project.formats" :key="format" class="format-tag">
              {{ format }}
            </span>
          </div>

          <div class="actions">
            <a v-if="project.downloadLink" :href="project.downloadLink" class="btn btn-primary">Download</a>
            <a v-if="project.githubRepo" :href="project.githubRepo" class="btn btn-secondary" target="_blank">
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
      <p>Project not found.</p>
      <NuxtLink to="/projects">Go back to Projects</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  padding: 2rem;
}

.back-link {
  margin-bottom: 2rem;
}

.back-link a {
  color: #10b981;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #059669;
}

.loading,
.not-found {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.not-found a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.not-found a:hover {
  background: #059669;
}

.project-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.project-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  align-items: start;
}

@media (max-width: 768px) {
  .project-header {
    grid-template-columns: 1fr;
  }
}

.project-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-info h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #111827;
}

.type {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 600;
  text-transform: uppercase;
}

.meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #6b7280;
}

.meta-item {
  display: inline-block;
}

.description {
  margin: 0 0 1.5rem 0;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
}

.formats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.format-tag {
  display: inline-block;
  background: #f3f4f6;
  color: #374151;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-primary:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.license {
  margin: 0;
  font-size: 0.875rem;
  color: #9ca3af;
}

.project-details {
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
}

.project-details h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #111827;
}

.project-details p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}
</style>
