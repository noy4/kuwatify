import { computed, reactive, toRefs, watch } from '@nuxtjs/composition-api'

const state = reactive({
  current: 0,
  videos: [],
  player: null,
  isPlaying: false,
  keywords: '',
  filteredVideos: [],
})

export default function usePlayer() {
  watch(
    () => [state.keywords, state.videos],
    () => {
      setCurrent(0)
      state.filteredVideos = state.videos.filter((video) => {
        const keywords = state.keywords || ''
        return video.snippet.title.includes(keywords.normalize('NFD'))
      })
    }
  )

  function setCurrent(value) {
    state.current = value
  }

  const currentVideoId = computed(() =>
    state.filteredVideos.length
      ? state.filteredVideos[state.current].snippet.resourceId.videoId
      : ''
  )

  function setVideos(items) {
    state.videos = items
  }

  function setIsPlaying(value) {
    state.isPlaying = value
  }

  function setPlayer(value) {
    state.player = value
    setIsPlaying(false)
  }

  async function play(index = null) {
    if (index !== null) {
      if (index === state.current && state.isPlaying) {
        pause()
        return
      }
      await setCurrent(index)
    }
    setIsPlaying(true)
    state.player.playVideo()
  }

  function pause() {
    setIsPlaying(false)
    state.player.pauseVideo()
  }

  async function next() {
    const isLast = state.current + 1 === state.filteredVideos.length
    if (isLast) return

    await setCurrent(state.current + 1)
    play()
  }

  async function previous() {
    const isFirst = state.current === 0
    if (isFirst) return

    await setCurrent(state.current - 1)
    play()
  }

  return {
    ...toRefs(state),
    setCurrent,
    currentVideoId,
    setIsPlaying,
    setPlayer,
    setVideos,
    play,
    pause,
    next,
    previous,
  }
}
