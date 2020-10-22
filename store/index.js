export const state = () => ({
  isPlaying: false,
  current: 0
})

export const mutations = {
  setIsPlaying(state, payload) {
    console.log('isPlaying', state.isPlaying);
    state.isPlaying = payload
  },
  incrementCurrent(state, isLast) {
    state.current = isLast ? 0 : state.current + 1
  },
  decrementCurrent(state, payload) {
    state.current = payload.isFirst
    ? payload.videoCount - 1 : state.current - 1
  },
  setCurrent(state, value) {
    state.current = value
  }
}
