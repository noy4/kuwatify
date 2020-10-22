import { getIdFromUrl } from "vue-youtube";

const API_KEY = 'AIzaSyDb2UIHVSuGIl2x6pzS5xEUYCg2JtNyxZ0'

const videoUrls = [
  'https://www.youtube.com/watch?v=JsHEqU-NsAs',
  'https://www.youtube.com/watch?v=pFxOPWqjLnA',
  'https://www.youtube.com/watch?v=k5WnmJyQEx4',
  'https://www.youtube.com/watch?v=ODQu_81Tdks',
  'https://www.youtube.com/watch?v=NiiUlWUjSHM'
]

const videoIds = videoUrls.map(item => getIdFromUrl(item))
// console.log(videoIds);
// const videoIds = [
//   'EskhPEaR8Dk',
//   'k5WnmJyQEx4'
// ]

const videoQuery = videoIds.join('%2C');
// console.log(videoQuery);

const targetUrl = [
  'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=',
  videoQuery,
  '&key=',
  API_KEY
].join('');
// console.log(targetUrl);

export default (context, inject) => {
  inject('targetUrl', targetUrl)
}
