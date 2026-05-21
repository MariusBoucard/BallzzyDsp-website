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
  gap: var(--space-3);
  flex-wrap: wrap;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: all var(--transition-base);
  background: rgba(0, 212, 255, 0.05);
}

.social-link:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(0, 212, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.icon {
  font-size: var(--font-lg);
}

.label {
  font-size: var(--font-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
