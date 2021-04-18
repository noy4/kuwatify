<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-row justify="center">
        <img
          src="/kuwatify_logo.png"
          width="170"
          class="mt-8 mb-4 filter drop-shadow-lg"
        />
      </v-row>
      <v-row justify="center" class="mb-2">
        <h2 class="text-xl font-bold">Kuwatify</h2>
      </v-row>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="transparent" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-slide-x-reverse-transition>
        <v-text-field
          v-show="search || keywords"
          v-model="keywords"
          placeholder="検索"
          color="red"
          dark
          flat
          rounded
          solo
          dense
          autofocus
          class="pt-7 shrink"
          @blur="setSearch(Boolean(keywords))"
        >
          <v-icon slot="prepend-inner" color="grey darken-1"
            >mdi-magnify</v-icon
          >
        </v-text-field>
      </v-slide-x-reverse-transition>
      <v-icon
        v-if="$route.path === '/'"
        v-show="!(search || keywords)"
        @click="setSearch(true)"
        >mdi-magnify</v-icon
      >
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer fixed app class="bg-gradient-to-r from-red-500 to-blue-500">
      <div v-if="$route.path === '/'" class="flex justify-center mb-4">
        <v-icon class="mx-4" @click="previous()">mdi-skip-backward</v-icon>
        <v-icon v-if="!isPlaying" large class="mx-4" @click="play()"
          >mdi-play-circle-outline</v-icon
        >
        <v-icon v-else large class="mx-4" @click="pause()"
          >mdi-pause-circle-outline</v-icon
        >
        <v-icon class="mx-4" @click="next()">mdi-skip-forward</v-icon>
      </div>
      <v-bottom-navigation grow class="hidden-sm-and-up">
        <v-btn v-for="(item, i) in items" :key="i" :to="item.to">
          <span>{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import usePlayer from '../hooks/use-player'

const items = [
  {
    icon: 'mdi-home-variant',
    title: 'Home',
    to: '/',
  },
  {
    icon: 'mdi-diamond-stone',
    title: 'Premium',
    to: '/premium',
  },
]

export default defineComponent({
  setup() {
    const { isPlaying, play, pause, next, previous, keywords } = usePlayer()

    const drawer = ref(false)
    const search = ref(false)

    function setSearch(value) {
      search.value = value
    }

    return {
      items,
      drawer,
      play,
      pause,
      next,
      previous,
      isPlaying,
      keywords,
      search,
      setSearch,
    }
  },
})
</script>
