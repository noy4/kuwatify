const API_KEY = 'AIzaSyDb2UIHVSuGIl2x6pzS5xEUYCg2JtNyxZ0'
const PLAYLIST_ID = 'PLd-lTb-XbZv3nY-wg_O5pnWValXX_v2rR'

export default (context, inject) => {
  const targetUrl = [
    'https://www.googleapis.com/youtube/v3/playlistItems',
    '?part=snippet',
    `&playlistId=${PLAYLIST_ID}`,
    '&maxResults=50',
    `&key=${API_KEY}`,
  ].join('')

  inject('targetUrl', targetUrl)
}
