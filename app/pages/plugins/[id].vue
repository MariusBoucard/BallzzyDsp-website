<template>
  <div class="plugin-detail">
    <div class="back-link">
      <NuxtLink to="/plugins" class="nav-link">
        <span>&larr;</span>
        <span>Back to Plugins</span>
      </NuxtLink>
    </div>

    <div v-if="loading" class="loading">
      <p class="text-muted">Loading plugin...</p>
    </div>

    <div v-else-if="plugin" class="card plugin-container">
      <div class="plugin-header">
        <div v-if="plugin?.imageUrl" class="plugin-image">
          <img :src="plugin.imageUrl" :alt="plugin.editor" loading="lazy" />
        </div>

        <div class="plugin-info">
          <h1 class="detail-title">{{ plugin.editor }}</h1>
          
          <div v-if="plugin.version || plugin.releaseDate" class="meta">
            <span v-if="plugin.version" class="meta-item">v{{ plugin.version }}</span>
            <span v-if="plugin.releaseDate" class="meta-item">{{ formatDate(plugin.releaseDate) }}</span>
          </div>

          <p v-if="plugin.description" class="description">{{ plugin.description }}</p>

          <div v-if="plugin.formats && plugin.formats.length" class="formats">
            <span v-for="format in plugin.formats" :key="format" class="tag">
              {{ format }}
            </span>
          </div>

          <div class="actions">
            <a v-if="plugin.downloadLink" :href="plugin.downloadLink" class="btn btn-primary">Download</a>
            <a v-if="plugin.githubRepo" :href="plugin.githubRepo" class="btn btn-outline" target="_blank">
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
      <p class="text-muted">Plugin not found.</p>
      <NuxtLink to="/plugins" class="btn btn-primary">Go back to Plugins</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStrapi } from '~/composables/useStrapi';

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

.plugin-container {
  overflow: hidden;
}

.plugin-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-8);
  padding: var(--space-8);
  align-items: start;
}

.plugin-image {
  width: 100%;
  height: 300px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.05));
  border: var(--border-width) solid var(--color-border);
}

.plugin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-title {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-3xl);
  color: var(--color-text-primary);
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

.plugin-details {
  padding: var(--space-8);
  border-top: var(--border-width) solid var(--color-border);
}

.plugin-details h2 {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-2xl);
  color: var(--color-text-primary);
}

.plugin-details p {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

@media (max-width: 768px) {
  .plugin-header {
    grid-template-columns: 1fr;
  }

  .plugin-image {
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
