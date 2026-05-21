<template>
  <div class="plugin-detail">
    <div class="back-link">
      <NuxtLink to="/plugins">&larr; Back to Plugins</NuxtLink>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading plugin...</p>
    </div>

    <div v-else-if="plugin" class="plugin-container">
      <div class="plugin-header">
        <div v-if="plugin.image" class="plugin-image">
          <img :src="getImageUrl(plugin.image)" :alt="plugin.editor" />
        </div>

        <div class="plugin-info">
          <h1>{{ plugin.editor }}</h1>
          
          <div v-if="plugin.version || plugin.releaseDate" class="meta">
            <span v-if="plugin.version" class="meta-item">v{{ plugin.version }}</span>
            <span v-if="plugin.releaseDate" class="meta-item">{{ formatDate(plugin.releaseDate) }}</span>
          </div>

          <p v-if="plugin.description" class="description">{{ plugin.description }}</p>

          <div v-if="plugin.formats && plugin.formats.length" class="formats">
            <span v-for="format in plugin.formats" :key="format" class="format-tag">
              {{ format }}
            </span>
          </div>

          <div class="actions">
            <a v-if="plugin.downloadLink" :href="plugin.downloadLink" class="btn btn-primary">Download</a>
            <a v-if="plugin.githubRepo" :href="plugin.githubRepo" class="btn btn-secondary" target="_blank">
              GitHub Repository
            </a>
          </div>

          <p v-if="plugin.license" class="license">License: {{ plugin.license }}</p>
        </div>
      </div>

      <div v-if="plugin.longDescription" class="plugin-details">
        <h2>Details</h2>
        <p>{{ plugin.longDescription }}</p>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Plugin not found.</p>
      <NuxtLink to="/plugins">Go back to Plugins</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { getPlugin } = useStrapi();

interface Plugin {
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

const plugin = ref<Plugin | null>(null);
const loading = ref(true);

onMounted(async () => {
  const id = route.params.id as string;
  plugin.value = await getPlugin(id);
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
.plugin-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  margin-bottom: 2rem;
}

.back-link a {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #2563eb;
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
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.not-found a:hover {
  background: #2563eb;
}

.plugin-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.plugin-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem;
  align-items: start;
}

@media (max-width: 768px) {
  .plugin-header {
    grid-template-columns: 1fr;
  }
}

.plugin-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f4f6;
}

.plugin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plugin-info h1 {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  color: #111827;
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
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
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

.plugin-details {
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
}

.plugin-details h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: #111827;
}

.plugin-details p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}
</style>
