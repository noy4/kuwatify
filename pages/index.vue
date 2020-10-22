<template>
  <v-row justify="center">
    <v-col cols="auto">
      <div
        v-for="(videoRow, rowIndex) in videoRows"
        :key="rowIndex">
        <div
          class="d-flex overflow-x-auto"
        >
          <v-card
            v-for="(item, colIndex) in videoRow"
            :key="item.id"
            class="card mx-5"
          >
            <v-hover v-slot:default="{hover}">
              <div
                v-if="index(rowIndex, colIndex) !== current || !isPlaying"
                class="thumbnail-wrapper"
                @click="onClick(index(rowIndex, colIndex))"
              >
                <v-img
                  v-if="index(rowIndex, colIndex) !== current"
                  :src="item.snippet.thumbnails.medium.url"
                  aspect-ratio="1"
                  width="200"
                  class="thumbnail"
                  :class="{'thumbnail-hover': hover}"
                  :lazy-src="item.snippet.thumbnails.medium.url"
                >
                </v-img>
                <v-icon
                  :color="hover || index(rowIndex, colIndex) === current ? 'white' : 'transparent'"
                  class="play-button"
                  size="100"
                >mdi-play-circle-outline</v-icon>
              </div>
            </v-hover>
            <div class="youtube-wrapper">
              <youtube
                :video-id="item.id"
                :ref="item.id"
                @playing="playing(index(rowIndex, colIndex))"
                @paused="paused(index(rowIndex, colIndex))"
                @ended="ended"
                width="200px"
                height="200px"
                :player-vars="playerVars"
              ></youtube>
            </div>
            <div class="contents pa-2">
              <div class="subtitle-2 font-weight-bold grey--text text--lighten-3">
                {{ item.snippet.title }}
              </div>
            </div>
          </v-card>
        </div>
        <v-divider class="mt-5 mb-10"/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  async asyncData({ $axios, $targetUrl }) {
    const { data } = await $axios.get($targetUrl);
    return { videos: data.items };
  },
  data() {
    return {
      colCount: 3,
      title: "",
      playerVars: {
        // controls: 0,
        // modestbranding: 0,
      },
    };
  },
  methods: {
    playVideo() {
      this.player.playVideo();
    },
    pauseVideo() {
      this.player.pauseVideo();
    },
    next() {
      this.player.pauseVideo();
      this.incrementCurrent(this.isLast)
      this.player.playVideo()
    },
    previous() {
      this.player.pauseVideo();
      this.decrementCurrent({
        isFirst: this.isFirst,
        videoCount: this.videos.length
      })
      this.player.playVideo()
    },
    playing(index) {
      console.log(this.current);
      console.log(index);
      console.log("playing!");
      if (this.current !== index) {
        this.player.pauseVideo()
        this.setCurrent(index)
      }
      this.setIsPlaying(true)
    },
    paused(index) {
      if (index === this.current) {
        this.setIsPlaying(false)
      }
    },
    ended() {
      this.incrementCurrent(this.isLast)
      this.player.playVideo()
    },
    onClick(index) {
      if (this.isPlaying) {
        if (this.current !== index) {
          this.player.pauseVideo()
          this.setCurrent(index)
          this.player.playVideo()
        } else {
          this.player.pauseVideo()
        }
      } else {
        this.setCurrent(index)
        this.player.playVideo()
      }
    },
    index(rowIndex, colIndex) {
      return rowIndex * this.colCount + colIndex
    },
    ...mapMutations([
      'setCurrent',
      'incrementCurrent',
      'decrementCurrent',
      'setIsPlaying'
    ])
  },
  computed: {
    player() {
      return this.$refs[this.videos[this.current].id][0].player;
    },
    isLast() {
      return this.current === this.videos.length - 1
    },
    isFirst() {
      return this.current === 0
    },
    videoRows() {
      let videoRows = []
      for(let i = 0; i < this.videos.length; i += this.colCount) {
        videoRows.push(this.videos.slice(i, i + this.colCount));
    }
      return videoRows
    },
    ...mapState([
      'isPlaying',
      'current'
    ])
  },
  async created() {
    this.$nuxt.$on("play", this.playVideo);
    this.$nuxt.$on("pause", this.pauseVideo);
    this.$nuxt.$on("next", this.next);
    this.$nuxt.$on("previous", this.previous)
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 960px;
}
.card {
  position: relative;
  flex: 0 0 auto;
  width: 200px;
  height: 300px;
  overflow: hidden;
}
.thumbnail-wrapper {
  cursor: pointer;
  position: absolute;
}
.thumbnail {
  transition: .2s;
}
.thumbnail-hover {
  filter: invert(100%);
}
.play-button {
  position: absolute;
  top: 50px;
  left: 50px;
}
.youtube-wrapper {
  height: 200px;
}
.contents {
  width: 200px;
}
</style>
