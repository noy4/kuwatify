<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-row justify="center">
        <!-- <v-icon size="200">mdi-spotify</v-icon> -->
        <v-img
          src="/kuwatify_logo.png"
          max-width="170"
          class="ma-4"
        />
      </v-row>
      <v-row justify="center" class="mb-2">
        <h2>{{title}}</h2>
      </v-row>
      <v-divider></v-divider>
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
    <v-app-bar
      fixed
      app
      color="#121212"
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-text-field
        value="検索"
        placeholder="未実装でーす"
        color="red"
        light
        background-color="white"
        flat
        rounded
        solo
        dense
        prepend-inner-icon="mdi-magnify"
        class="pt-7 shrink"
      ></v-text-field>
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-toolbar-title v-text="title" /> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      fixed
      app
    >
      <v-row>
        <v-col></v-col>
        <v-col cols="10" sm="8" md="6" class="pb-0">
          <v-row justify="center">
            <v-icon
              @click="previous"
              class="mx-4"
            >mdi-skip-backward</v-icon>
            <v-icon
              v-if="!isPlaying"
              @click="play"
              large
              class="mx-4"
            >mdi-play-circle-outline</v-icon>
            <v-icon
              v-else
              @click="pause"
              large
              class="mx-4"
            >mdi-pause-circle-outline</v-icon>
            <v-icon
              @click="next"
              class="mx-4"
            >mdi-skip-forward</v-icon>
          </v-row>
          <v-row>
            <div class="caption">1:43</div>
            <v-col class="pt-2">
              <v-progress-linear
                v-model="progress"
                buffer-value="100"
              ></v-progress-linear>
            </v-col>
            <div class="caption">5:49</div>
          </v-row>
        </v-col>
        <v-col></v-col>
      </v-row>
    <v-bottom-navigation
      value="value"
      grow
      class="hidden-sm-and-up"
    >
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
    >
      <span>{{item.title}}</span>
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
    </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home-variant',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-diamond-stone',
          title: 'Premium',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      title: 'Kuwatify',
      progress: 20,
      value: 'home'
    }
  },
  methods: {
    play() {
      this.$store.commit('setIsPlaying', true)
      this.$nuxt.$emit('play')
    },
    pause() {
      this.$store.commit('setIsPlaying', false)
      this.$nuxt.$emit('pause')
    },
    next() {
      this.$nuxt.$emit('next')
    },
    previous() {
      this.$nuxt.$emit('previous')
    }
  },
  computed: {
    ...mapState({
      isPlaying: 'isPlaying'
    })
  }
}
</script>

<style lang="scss" scoped>
.mdi-spotify {
  transform: rotate(-90deg);
}
footer {
  // margin-bottom: 55px;
}
</style>
