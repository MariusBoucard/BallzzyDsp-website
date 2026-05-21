<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <h1 class="logo-title">Ballzzy DSP</h1>
        <p class="tagline">Audio Plugins & Projects</p>
      </div>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/plugins" class="nav-link">Plugins</NuxtLink>
        <NuxtLink to="/projects" class="nav-link">Projects</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  border-bottom: var(--border-width) solid var(--color-border);
  background: linear-gradient(180deg, var(--color-bg-dark) 0%, var(--color-bg-darker) 100%);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-8);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.logo-title {
  margin: 0;
  font-size: var(--font-2xl);
  background: var(--color-primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tagline {
  margin: 0;
  font-size: var(--font-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav {
  display: flex;
  gap: var(--space-8);
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
  position: relative;
  font-size: var(--font-sm);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-primary-gradient);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--transition-base);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-link.router-link-active::after {
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
  }

  .nav {
    gap: var(--space-4);
    width: 100%;
    justify-content: center;
  }

  .logo-title {
    font-size: var(--font-xl);
  }
}
</style>
