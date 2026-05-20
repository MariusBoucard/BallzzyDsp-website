<template>
  <div class="plugins-page">
    <h1>Audio Plugins</h1>
    <p class="subtitle">Professional audio plugins for music production</p>

    <div v-if="plugins.length" class="grid">
      <PluginCard v-for="plugin in plugins" :key="plugin.id" :plugin="plugin" />
    </div>
    <div v-else class="loading">
      <p>Loading plugins...</p>
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
.plugins-page h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.subtitle {
  margin: 0 0 2rem 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
}
</style>
