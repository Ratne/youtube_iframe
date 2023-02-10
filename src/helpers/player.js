var webhookUrlsConsumed = []

/**
 * Calls the webhook
 *
 * @param {*} url
 * @returns
 */
const callWebhook = (url) => {
  if (webhookUrlsConsumed.indexOf(url) != -1) return

  webhookUrlsConsumed = [...webhookUrlsConsumed, url]
  fetch(url)
}

/**
 * Listens for playback times
 *
 * @returns
 */
export const listenForPlaybackTime = (player) => {
  if (!player || player.isMuted()) return

  const duration = player.getDuration()
  const url = new URLSearchParams(window.location.search)
  const wh_email = url.get('wh_email')

  if(!wh_email) return

  var playback_threshold = {
    25: '?email='+wh_email, //url webhook + email 
    50: '?email='+wh_email, //url webhook + email
    75: '?email='+wh_email, //url webhook + email
    100: '?email='+wh_email //url webhook + email
  }

  const thresholds = Object.keys(playback_threshold)
  const thresholds_urls = Object.values(playback_threshold)

  setInterval(() => {
    const percentage = (100 * player.getCurrentTime()) / duration
    var index = -1

    if (percentage >= thresholds[0] && percentage < thresholds[1]) {
      index = 0
    } else if (percentage >= thresholds[1] && percentage < thresholds[2]) {
      index = 1
    } else if (percentage >= thresholds[2] && percentage < thresholds[2]) {
      index = 2
    }else index = 3

    if (index != -1) callWebhook(thresholds_urls[index])
  }, 1000)
}

/**
 * Saves current playback time on LocalStorage
 */
export const saveCurrentPlaybackTime = (player) => {
  localStorage.setItem('played', player.getCurrentTime())
}
