import RouterCache from './routerCache';

let isInstall = false;

RouterCache.install = function (Vue) {
    if (isInstall) { return; };
    isInstall = true;
    Vue.component(RouterCache.name, RouterCache);
}


export default RouterCache;