<template>
  <NuxtLink :to="`/plugins/${plugin.id}`" class="plugin-card-link">
    <div class="plugin-card">
      <div v-if="plugin.image" class="plugin-image">
        <img :src="getImageUrl(plugin.image)" :alt="plugin.editor" />
      </div>
      
      <div class="plugin-content">
        <h3>{{ plugin.editor }}</h3>
        <p class="description">{{ plugin.description }}</p>
        
        <div class="meta">
          <span v-if="plugin.version" class="meta-item">v{{ plugin.version }}</span>
          <span v-if="plugin.releaseDate" class="meta-item">{{ formatDate(plugin.releaseDate) }}</span>
        </div>

        <div v-if="plugin.formats && plugin.formats.length" class="formats">
          <span v-for="format in plugin.formats" :key="format" class="format-tag">
            {{ format }}
          </span>
        </div>

        <div class="actions">
          <span class="btn-link view-details">View Details</span>
          <a v-if="plugin.downloadLink" :href="plugin.downloadLink" @click.stop class="btn-link">Download</a>
          <a v-if="plugin.githubRepo" :href="plugin.githubRepo" class="btn-link" target="_blank" @click.stop>
            GitHub
          </a>
        </div>

        <p v-if="plugin.license" class="license">{{ plugin.license }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Plugin {
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
  plugin: Plugin;
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
.plugin-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.plugin-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.plugin-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.plugin-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.plugin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plugin-content {
  padding: 1.5rem;
}

.plugin-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #111827;
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
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background 0.2s;
  border: none;
  cursor: pointer;
}

.btn-link:hover {
  background: #2563eb;
}

.view-details {
  background: #3b82f6;
}

.license {
  margin: 0;
  font-size: 0.875rem;
  color: #9ca3af;
}
</style>
