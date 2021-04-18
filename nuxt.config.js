import colors from 'vuetify/es5/util/colors'

const baseUrl = process.env.NODE_ENV === 'production' ? '/kuwatify/' : '/'

export default {
  target: 'static',

  head: {
    titleTemplate: '%s',
    title: 'Kuwatify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Kuwatifyで音楽を楽しもう！',
      },
      { name: 'twitter:card', content: 'summary' },
      {
        name: 'twitter:site',
        content: '@kuwappi_',
      },
      {
        property: 'og:url',
        content: 'https://noy4.github.io/kuwatify/',
      },
      {
        property: 'og:title',
        content: 'Kuwatify',
      },
      {
        property: 'og:description',
        content: 'Kuwatifyで音楽を楽しもう！',
      },
      {
        property: 'og:image',
        content: 'https://noy4.github.io/kuwatify/kuwatify_app.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}favicon.ico` },
      { rel: 'apple-touch-icon', href: `${baseUrl}kuwatify_app.png` },
    ],
  },

  router: {
    base: baseUrl,
  },

  plugins: [
    '~/plugins/vue-youtube',
    '~/plugins/target-url',
    '~/plugins/base-url',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/tailwindcss',
  ],

  modules: ['@nuxtjs/axios', '@nuxt/http'],

  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  privateRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    apiKey:
      process.env.NODE_ENV !== 'production' ? process.env.API_KEY : undefined,
    baseUrl,
  },
}
