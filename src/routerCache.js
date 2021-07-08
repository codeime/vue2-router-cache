function isDef(value) {
    return value !== undefined && value !== null;
}

function getFristComponentChild(children) {
    if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || (c.isComment && c.asyncFactory))) {
                return c;
            }
        }
    }
}

function removeWidgetCache(cache, key, current) {
    const cachedWidget = cache[key];
    if (cachedWidget && (!current || (current.key && key !== current.key) || cachedWidget.tag !== current.tag)) {
        cachedWidget.componentInstance.$destroy();
    }
    cache[key] = null;
}
export default {
    name: 'router-cache',
    abstract: true,
    props: {
        init: {
            type: Function,
            default: () => { }
        },
        genCacheKey: {
            type: [Function, null],
            default: null
        }
    },
    created() {
        this.cache = Object.create(null);
        this.init({
            removeCache: (key) => {
                this.removeCache(key);
            }
        })
    },
    destroyed() {
        for (const key in this.cache) {
            removeWidgetCache(this.cache, key, this._vnode);
        }
    },
    methods: {
        removeCache(key) {
            removeWidgetCache(this.cache, key, this._vnode);
        }
    },
    render() {
        const slot = this.$slots.default;
        const vnode = getFristComponentChild(slot);
        const componentOptions = vnode && vnode.componentOptions;
        if (componentOptions) {
            const { cache } = this;
            const key = vnode.key ??
                ((typeof this.genCacheKey === 'function')
                    ? this.genCacheKey(componentOptions)
                    : componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                );

            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance;
            } else {
                cache[key] = vnode;
            }
            vnode.data.keepAlive = true;
        }
        return vnode || (slot && slot[0]);
    }
}
