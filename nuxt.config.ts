export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Hotel Operations Hub',
      meta: [
        { name: 'description', content: 'Fast and seamless hotel operations dashboard' }
      ]
    }
  },
  ui: {
    global: true,
    icons: ['heroicons']
  }
})
