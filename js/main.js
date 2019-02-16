// Make sure sw are suppoted

if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../sw_cache_site.js')
            .then(reg => console.log('service worker registered'))
            .catch(err => console.log(`Serivice Worker Error : ${err}`))
    })
}