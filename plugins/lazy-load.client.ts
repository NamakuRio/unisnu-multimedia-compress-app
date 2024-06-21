export default defineNuxtPlugin(({ vueApp }) => {
  function lazyLoad() {
    var lazyImages: any = [].slice.call(document.querySelectorAll('img.lazy'))

    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyImage: any = entry.target
            lazyImage.src = lazyImage.dataset.src
            lazyImage.classList.remove('lazy')
            lazyImageObserver.unobserve(lazyImage)
          }
        })
      })

      lazyImages.forEach(function (lazyImage: any) {
        lazyImageObserver.observe(lazyImage)
      })
    }
  }

  function lazyLoadVideo() {
    var lazyVideos: any = [].slice.call(document.querySelectorAll('video.lazy'))

    if ('IntersectionObserver' in window) {
      let lazyVideoObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            let lazyVideo: any = entry.target
            lazyVideo.poster = lazyVideo.dataset.src
            lazyVideo.classList.remove('lazy')
            lazyVideoObserver.unobserve(lazyVideo)
          }
        })
      })

      lazyVideos.forEach(function (lazyVideo: any) {
        lazyVideoObserver.observe(lazyVideo)
      })
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    lazyLoad()
    lazyLoadVideo()
  })

  window.addEventListener('DOMNodeInserted', function () {
    lazyLoad()
    lazyLoadVideo()
  })
})
