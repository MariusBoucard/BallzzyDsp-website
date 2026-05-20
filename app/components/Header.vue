<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <h1>Ballzzy DSPfdsfdsfsd</h1>
        <p class="tagline">Audio Plugins & Projects</p>
      </div>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/plugins">Plugins</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.header {
  border-bottom: 1px solid #e5e7eb;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

.tagline {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav a:hover {
  color: #3b82f6;
}

.nav a.router-link-active {
  color: #3b82f6;
}
</style>
