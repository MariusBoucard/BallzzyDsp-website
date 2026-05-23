<template>
  <NuxtLink :to="`/plugins/${plugin.id}`" class="plugin-card-link">
    <div class="card plugin-card">
      <div v-if="plugin.imageUrl" class="plugin-image">
        <img :src="plugin.imageUrl" :alt="plugin.editor" loading="lazy" />
      </div>
      
      <div class="plugin-content">
        <h3 class="card-title">{{ plugin.editor }}</h3>
        <p class="card-description">{{ plugin.description }}</p>
        
        <div v-if="plugin.formats && plugin.formats.length" class="formats-section">
          <h4 class="section-title">Formats</h4>
          <div class="formats">
            <div v-for="format in plugin.formats" :key="format.id" class="format-item">
              <img v-if="getFormatLogoUrl(format)" :src="getFormatLogoUrl(format)" :alt="format.name" class="logo" />
              <span class="format-name">{{ format.name }}</span>
            </div>
          </div>
        </div>
        <div v-if="plugin.formats && plugin.formats.length" class="os-section">
          <h4 class="section-title">Supported OS</h4>
          <div class="os-supporteds">
            <div v-for="os in plugin.formats" :key="os.id" class="os-item">
              <img v-if="os.os_supported?.logo" :src="os.os_supported?.logo" :alt="os.os_supported?.name" class="logo" />
              <span class="os-name">{{ os.os_supported?.name }}</span>
            </div>
          </div>
        </div>

        <div class="meta">
          <span v-if="plugin.version" class="meta-item">v{{ plugin.version }}</span>
          <span v-if="plugin.releaseDate" class="meta-item">{{ formatDate(plugin.releaseDate) }}</span>
        </div>
        <div v-if="plugin.download_links && plugin.download_links.length" class="downloads-section">
          <h4 class="section-title">Download</h4>
          <div class="download-buttons">
            <a 
              v-for="dl in plugin.download_links" 
              :key="dl.id" 
              :href="dl.link" 
              @click.stop
              class="btn btn-secondary btn-sm download-btn"
              :title="`Download ${dl.format?.name || 'Format'} for ${dl.format?.os_supported?.name || 'OS'}`"
            >
              {{ dl.format?.name }} ({{ dl.format?.os_supported?.name }})
            </a>
          </div>
        </div>

        <div class="actions">
          <span class="btn btn-primary btn-sm">View Details</span>
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
interface Format {
  id: number;
  documentId: string;
  name: string;
  logo?: any; // Can be an image object or string URL
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  os_supported?: OsSupported;
}

interface OsSupported {
  id: number;
  documentId: string;
  name: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DownloadLink {
  id: number;
  documentId: string;
  os_supported?: OsSupported;
  format?: Format;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Plugin {
  id: string;
  editor: string;
  description: string;
  imageUrl?: string;
  image?: any;
  downloadLinksingle?: string;
  download_links?: DownloadLink[];
  releaseDate?: string;
  version?: string;
  formats?: Format[];
  os_supporteds?: OsSupported[];
  githubRepo?: string;
  license?: string;
}

defineProps<{
  plugin: Plugin;
}>();

const getFormatLogoUrl = (format: Format): string => {
  if (!format.logo) return '';
  // Handle if logo is an object with url property (image object from API)
  if (typeof format.logo === 'object' && format.logo.url) {
    return format.logo.url;
  }
  // Handle if logo is already a string URL
  if (typeof format.logo === 'string') {
    return format.logo;
  }
  return '';
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

.section-title {
  margin: 0;
  font-size: var(--font-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text-tertiary);
  font-weight: 600;
}

.formats-section,
.os-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.formats,
.os-supporteds {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.format-item,
.os-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
  transition: background-color var(--transition-base);
}

.format-item:hover,
.os-item:hover {
  background: var(--color-bg-tertiary);
}

.logo {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.format-name,
.os-name {
  white-space: nowrap;
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

.downloads-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.download-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.download-btn {
  flex: 1;
  min-width: 120px;
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
