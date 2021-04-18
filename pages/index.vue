<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="w-full max-w-xl">
      <v-responsive :aspect-ratio="16 / 9">
        <youtube
          ref="youtube"
          :video-id="currentVideoId"
          :player-vars="playerVars"
          width="100%"
          height="100%"
          @playing="setIsPlaying(true)"
          @paused="setIsPlaying(false)"
          @ended="next"
        />
      </v-responsive>
    </div>
    <div class="h-20 flex-grow overflow-y-scroll p-1 max-w-xl w-full">
      <div
        v-for="(video, index) in filteredVideos"
        :key="index"
        :class="{
          'grey darken-4': video.snippet.resourceId.videoId === currentVideoId,
        }"
        class="flex p-3 cursor-pointer"
        @click="play(index)"
      >
        <div>
          <v-img
            :lazy-src="video.snippet.thumbnails.medium.url"
            :src="video.snippet.thumbnails.medium.url"
            aspect-ratio="1"
            width="100"
          />
        </div>
        <div class="ml-4">
          <h5>{{ video.snippet.title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
  useStatic,
} from '@nuxtjs/composition-api'
import usePlayer from '../hooks/use-player'

const playerVars = {
  playsinline: 1,
}

export default defineComponent({
  setup() {
    const {
      currentVideoId,
      setVideos,

      setIsPlaying,
      setPlayer,
      play,
      next,
      filteredVideos,
    } = usePlayer()

    const youtube = ref(null)
    const player = computed(() => (youtube.value ? youtube.value.player : {}))

    onMounted(() => {
      setPlayer(player)
    })

    const { $http, $targetUrl } = useContext()

    useStatic(
      async () => {
        const data = await $http.$get($targetUrl)

        setVideos(data.items)
      },
      ref('videos'),
      'videos'
    )

    return {
      currentVideoId,
      youtube,
      setIsPlaying,
      play,
      next,
      filteredVideos,
      playerVars,
    }
  },
})
</script>
