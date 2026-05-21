<template>
  <NuxtLink :to="`/plugins/${plugin.id}`" class="plugin-card-link">
    <div class="card plugin-card">
      <div v-if="plugin.image" class="plugin-image">
        <img :src="getImageUrl(plugin.image)" :alt="plugin.editor" />
      </div>
      
      <div class="plugin-content">
        <h3 class="card-title">{{ plugin.editor }}</h3>
        <p class="card-description">{{ plugin.description }}</p>
        
        <div v-if="plugin.formats && plugin.formats.length" class="formats">
          <span v-for="format in plugin.formats" :key="format" class="tag">
            {{ format }}
          </span>
        </div>

        <div class="meta">
          <span v-if="plugin.version" class="meta-item">v{{ plugin.version }}</span>
          <span v-if="plugin.releaseDate" class="meta-item">{{ formatDate(plugin.releaseDate) }}</span>
        </div>

        <div class="actions">
          <span class="btn btn-primary btn-sm">View Details</span>
          <a v-if="plugin.downloadLink" :href="plugin.downloadLink" @click.stop class="btn btn-secondary btn-sm">Download</a>
          <a v-if="plugin.githubRepo" :href="plugin.githubRepo" class="btn btn-outline btn-sm" target="_blank" @click.stop>
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
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.plugin-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.05));
  border-bottom: var(--border-width) solid var(--color-border);
}

.plugin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.plugin-card:hover .plugin-image img {
  transform: scale(1.05);
}

.plugin-content {
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
