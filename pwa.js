// Register the service worker so Trail Pal can be installed and used offline.
// Service workers require HTTPS, except when running on localhost.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch((error) => {
        console.error('Trail Pal could not register its service worker:', error);
      });
  });
}
