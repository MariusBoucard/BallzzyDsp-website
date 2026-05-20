<template>
  <div class="project-card">
    <div v-if="project.image" class="project-image">
      <img :src="getImageUrl(project.image)" :alt="project.editor" />
    </div>
    
    <div class="project-content">
      <h3>{{ project.editor }}</h3>
      <p class="type">Electron App</p>
      <p class="description">{{ project.description }}</p>
      
      <div class="meta">
        <span v-if="project.version" class="meta-item">v{{ project.version }}</span>
        <span v-if="project.releaseDate" class="meta-item">{{ formatDate(project.releaseDate) }}</span>
      </div>

      <div v-if="project.formats && project.formats.length" class="formats">
        <span v-for="format in project.formats" :key="format" class="format-tag">
          {{ format }}
        </span>
      </div>

      <div class="actions">
        <a v-if="project.downloadLink" :href="project.downloadLink" class="btn-link">Download</a>
        <a v-if="project.githubRepo" :href="project.githubRepo" class="btn-link" target="_blank">
          GitHub
        </a>
      </div>

      <p v-if="project.license" class="license">{{ project.license }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: string;
  editor: string;
  description: string;
  image?: any;
  downloadLink?: string;
  releaseDate?: string;
  version?: string;
  formats?: string[];
  githubRepo?: string;
  license?: string;
}

defineProps<{
  project: Project;
}>();

const getImageUrl = (image: any) => {
  if (!image) return '';
  if (image.url) return `http://strapi:3000${image.url}`;
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
.project-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #111827;
}

.type {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 600;
  text-transform: uppercase;
}

.description {
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.meta-item {
  display: inline-block;
}

.formats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.format-tag {
  display: inline-block;
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.btn-link:hover {
  background: #059669;
}

.license {
  margin: 0;
  font-size: 0.875rem;
  color: #9ca3af;
}
</style>
