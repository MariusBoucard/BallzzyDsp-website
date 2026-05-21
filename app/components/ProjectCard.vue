<template>
  <NuxtLink :to="`/projects/${project.id}`" class="project-card-link">
    <div class="card secondary project-card">
      <div v-if="project.image" class="project-image">
        <img :src="getImageUrl(project.image)" :alt="project.editor" />
      </div>
      
      <div class="project-content">
        <h3 class="card-title">{{ project.editor }}</h3>
        <p class="project-type">
          <span class="tag secondary">Electron App</span>
        </p>
        <p class="card-description">{{ project.description }}</p>

        <div v-if="project.formats && project.formats.length" class="formats">
          <span v-for="format in project.formats" :key="format" class="tag secondary">
            {{ format }}
          </span>
        </div>

        <div class="meta">
          <span v-if="project.version" class="meta-item">v{{ project.version }}</span>
          <span v-if="project.releaseDate" class="meta-item">{{ formatDate(project.releaseDate) }}</span>
        </div>

        <div class="actions">
          <span class="btn btn-secondary btn-sm">View Details</span>
          <a v-if="project.downloadLink" :href="project.downloadLink" @click.stop class="btn btn-secondary btn-sm">Download</a>
          <a v-if="project.githubRepo" :href="project.githubRepo" class="btn btn-outline btn-sm" target="_blank" @click.stop>
            GitHub
          </a>
        </div>

        <p v-if="project.license" class="license">{{ project.license }}</p>
      </div>
    </div>
  </NuxtLink>
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
.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.05));
  border-bottom: var(--border-width) solid var(--color-border);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: var(--space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.card-title {
  margin: 0;
  font-size: var(--font-xl);
  color: var(--color-text-primary);
}

.project-type {
  margin: 0;
}

.card-description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-sm);
  line-height: var(--line-height-relaxed);
  flex: 1;
}

.formats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--font-xs);
  color: var(--color-text-tertiary);
}

.meta-item {
  display: inline-block;
}

.actions {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding-top: var(--space-3);
  border-top: var(--border-width) solid var(--color-border);
}

.license {
  margin: 0;
  font-size: var(--font-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
