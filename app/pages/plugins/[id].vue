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

    <div v-else-if="plugin" class="plugin-container">
      <!-- Hero Section -->
      <section class="hero">
        <div v-if="plugin?.imageUrl" class="hero-image">
          <img :src="plugin.imageUrl" :alt="plugin.editor" loading="lazy" />
        </div>
      </section>

      <!-- Main Content -->
      <section class="main-content">
        <!-- Header -->
        <div class="header-section">
          <div>
            <h1 class="plugin-title">{{ plugin.editor }}</h1>
            <p v-if="plugin.description" class="plugin-description">{{ plugin.description }}</p>
            
            <div v-if="plugin.version || plugin.releaseDate" class="meta">
              <span v-if="plugin.version" class="meta-item">
                <strong>Version:</strong> v{{ plugin.version }}
              </span>
              <span v-if="plugin.releaseDate" class="meta-item">
                <strong>Released:</strong> {{ formatDate(plugin.releaseDate) }}
              </span>
            </div>
          </div>

          <div class="header-actions">
            <a v-if="plugin.githubRepo" :href="plugin.githubRepo" class="btn btn-outline" target="_blank" @click.stop>
              <span>→</span> GitHub
            </a>
          </div>
        </div>

        <!-- Grid Section for Details -->
        <div class="details-grid">
          <!-- Formats Section -->
          <section v-if="plugin.formats && plugin.formats.length" class="detail-card">
            <h2 class="section-title">Supported Formats</h2>
            <div class="format-list">
              <div v-for="format in plugin.formats" :key="format.id" class="format-badge">
                <img v-if="getFormatLogoUrl(format)" :src="getFormatLogoUrl(format)" :alt="format.name" class="format-logo" />
                <span>{{ format.name }}</span>
              </div>
            </div>
          </section>

          <!-- Operating Systems Section -->
          <section v-if="plugin.formats && plugin.formats.length" class="detail-card">
            <h2 class="section-title">Supported OS</h2>
            <div class="os-list">
              <div v-for="format in plugin.formats" :key="`${format.id}-os`" class="os-badge">
                <img v-if="format.os_supported?.logo" :src="format.os_supported?.logo" :alt="format.os_supported?.name" class="os-logo" />
                <span>{{ format.os_supported?.name }}</span>
              </div>
            </div>
          </section>

          <!-- Downloads Section -->
          <section v-if="plugin.download_links && plugin.download_links.length" class="detail-card full-width">
            <h2 class="section-title">Downloads</h2>
            <div class="download-grid">
              <a 
                v-for="dl in plugin.download_links" 
                :key="dl.id" 
                :href="dl.link" 
                @click.stop
                class="download-card"
                :title="`Download ${dl.format?.name || 'Format'} for ${dl.format?.os_supported?.name || 'OS'}`"
              >
                <div class="download-info">
                  <span class="download-format">{{ dl.format?.name }}</span>
                  <span class="download-os">{{ dl.format?.os_supported?.name }}</span>
                </div>
                <span class="download-arrow">↓</span>
              </a>
            </div>
          </section>

          <!-- License & Info Section -->
          <section class="detail-card">
            <h2 class="section-title">Information</h2>
            <div class="info-list">
              <div class="info-item">
                <span class="info-label">By</span>
                <span class="info-value">{{ plugin.editor }}</span>
              </div>
              <div v-if="plugin.license" class="info-item">
                <span class="info-label">License</span>
                <span class="info-value">{{ plugin.license }}</span>
              </div>
            </div>
          </section>

          <!-- Long Description Section -->
          <section v-if="plugin.longDescription" class="detail-card full-width">
            <h2 class="section-title">Description</h2>
            <p class="description-text">{{ plugin.longDescription }}</p>
          </section>
        </div>
      </section>
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

interface Format {
  id: number;
  documentId: string;
  name: string;
  logo?: any;
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
  documentId: string;
  editor: string;
  description: string;
  longDescription?: string;
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

const getFormatLogoUrl = (format: Format): string => {
  if (!format.logo) return '';
  if (typeof format.logo === 'object' && format.logo.url) {
    return format.logo.url;
  }
  if (typeof format.logo === 'string') {
    return format.logo;
  }
  return '';
};
</script>

<style scoped>
.plugin-detail {
  padding: var(--space-8) 0;
}

.back-link {
  max-width: 1200px;
  margin: 0 auto var(--space-6) auto;
  padding: 0 var(--space-6);
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

/* Hero Section */
.hero {
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.05));
  border-bottom: var(--border-width) solid var(--color-border);
}

.hero-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
  padding-bottom: var(--space-8);
  border-bottom: var(--border-width) solid var(--color-border);
}

.plugin-title {
  margin: 0 0 var(--space-3) 0;
  font-size: var(--font-4xl);
  color: var(--color-text-primary);
  font-weight: 700;
}

.plugin-description {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
}

.meta {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.meta-item {
  display: inline-flex;
  gap: var(--space-2);
}

.meta-item strong {
  color: var(--color-text-primary);
}

.header-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.details-grid .full-width {
  grid-column: 1 / -1;
}

/* Detail Cards */
.detail-card {
  background: var(--color-bg-secondary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
}

.detail-card:hover {
  border-color: var(--color-border-active);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  margin: 0 0 var(--space-4) 0;
  font-size: var(--font-lg);
  color: var(--color-text-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Formats Section */
.format-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.format-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.format-badge:hover {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.format-logo {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* OS Section */
.os-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.os-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}

.os-badge:hover {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.os-logo {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

/* Downloads Grid */
.download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}

.download-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(255, 0, 128, 0.02));
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-base);
  cursor: pointer;
}

.download-card:hover {
  border-color: var(--color-accent);
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.05));
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 212, 255, 0.2);
}

.download-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.download-format {
  font-weight: 600;
  color: var(--color-text-primary);
}

.download-os {
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.download-arrow {
  font-size: var(--font-xl);
  color: var(--color-accent);
  transition: transform var(--transition-base);
}

.download-card:hover .download-arrow {
  transform: translateY(2px);
}

/* Info List */
.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-value {
  color: var(--color-text-primary);
  font-size: var(--font-base);
}

/* Description Text */
.description-text {
  margin: 0;
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-base);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero {
    height: 250px;
  }

  .main-content {
    padding: var(--space-6) var(--space-4);
  }

  .header-section {
    flex-direction: column;
    margin-bottom: var(--space-8);
  }

  .plugin-title {
    font-size: var(--font-2xl);
  }

  .plugin-description {
    font-size: var(--font-base);
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .download-grid {
    grid-template-columns: 1fr;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero {
    height: 200px;
  }

  .main-content {
    padding: var(--space-4) var(--space-3);
  }

  .plugin-title {
    font-size: var(--font-xl);
  }

  .meta {
    flex-direction: column;
    gap: var(--space-2);
  }

  .download-card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}
</style>
