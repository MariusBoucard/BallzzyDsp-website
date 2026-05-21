<template>
  <div class="plugins-page">
    <div class="page-header">
      <h1>Audio Plugins</h1>
      <p class="page-subtitle">Professional audio plugins for music production</p>
    </div>

    <div v-if="plugins.length" class="grid-auto-fill">
      <PluginCard v-for="plugin in plugins" :key="plugin.id" :plugin="plugin" />
    </div>
    <div v-else class="loading">
      <p class="text-muted">Loading plugins...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStrapi } from '~/composables/useStrapi';

const plugins = ref<any[]>([]);
const { fetchPlugins } = useStrapi();

onMounted(async () => {
  plugins.value = await fetchPlugins();
});
</script>

<style scoped>
.plugins-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
  padding: var(--space-8) 0;
}

.page-header h1 {
  margin: 0;
  font-size: var(--font-5xl);
  background: var(--color-primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-lg);
}

.loading {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .page-header {
    padding: var(--space-6) 0;
  }

  .page-header h1 {
    font-size: var(--font-3xl);
  }
}
</style>
