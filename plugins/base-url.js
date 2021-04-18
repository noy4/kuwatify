export default ({ $config }, inject) => {
  const baseUrl = (path) => $config.baseUrl + path
  inject('baseUrl', baseUrl)
}
