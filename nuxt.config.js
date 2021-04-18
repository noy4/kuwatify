import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',

  head: {
    titleTemplate: '%s',
    title: 'Kuwatify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/kuwatify/favicon.ico' },
    ],
  },

  plugins: ['~/plugins/vue-youtube', '~/plugins/target-url'],

  router: {
    base: '/kuwatify/',
  },

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/tailwindcss',
  ],

  modules: ['@nuxtjs/axios', '@nuxt/http'],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
  },
}
