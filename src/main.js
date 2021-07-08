import RouterCache from './routerCache'

let isInstall = false

RouterCache.install = function (Vue) {
    if (isInstall) { return }
    Vue.component('router-cache', RouterCache)
}


export default RouterCache