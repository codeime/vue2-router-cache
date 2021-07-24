# vue2 路由缓存视图组件

基于keep-alive更改，可以手动移除路由缓存。
用于tab页式的路由管理，在移除tab页时销毁该页对应的路由实例
## 安装
```
npm i vue2-router-cache
```
## 使用

### 全局

```
import RouterCache from 'vue2-router-cache';

Vue.use(RouterCache)

```
### 局部
```
import RouterCache from 'vue2-router-cache';

export default {
    //....
    
    components:{
        'router-cache':RouterCache
    }
}
```

### event

init     @params { removeCache:(key)=>void }

返回一个对象，包含removeCache方法，可以调用该方法传入key移除对应的路由视图实例
*也可以直接通过调用组件内部的removeCache到达相同目的

```
<router-cache @init="onRoterCacheInit">
    <router-view :key="xxx"><router-view>
<router-cache>
```

### props

genCacheKey fn  传入一个方法，当路由视图上没有设置key时，可以通过该方法生成


