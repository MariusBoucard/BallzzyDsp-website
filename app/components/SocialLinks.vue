<template>
  <div class="social-links">
    <a
      v-for="link in links"
      :key="link.id"
      :href="link.url"
      :title="link.platform"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
    >
      <span class="icon">{{ getIcon(link.platform) }}</span>
      <span class="label">{{ link.platform }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

defineProps<{
  links: SocialLink[];
}>();

const getIcon = (platform: string) => {
  const icons: { [key: string]: string } = {
    GitHub: '🐙',
    Twitter: '𝕏',
    LinkedIn: '💼',
    Discord: '💬',
    Email: '📧',
    Website: '🌐',
  };
  return icons[platform] || '🔗';
};
</script>

<style scoped>
.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  text-decoration: none;
  color: #374151;
  transition: all 0.2s;
}

.social-link:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #f0f4ff;
}

.icon {
  font-size: 1.25rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
