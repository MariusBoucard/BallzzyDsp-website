// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    strapiUrl: 'http://localhost:1337/api',  // overridden by NUXT_STRAPI_URL
    public: {
      strapiUrl: 'http://localhost:1337/api', // overridden by NUXT_PUBLIC_STRAPI_URL
    }
  }
})
