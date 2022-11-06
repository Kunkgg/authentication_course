# test

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### start backend

```sh
node server.js
```

### start

```sh
npm run start
```

## 目标

1. 注册
1. 登录
1. 访问受保护的数据

- 参考 [JWT](https://jwt.io/introduction)

## 注册及登录后 vuex 需要做 3 件事

1. 在 Vuex state 中存储 userData 
1. 在 localstorage 中存储 userData
1. 在 axios header 中增加 token

## 登出

1. 清除 localstorage 中存储的 userData
1. 清除 Vuex state 中的 userDate 和 axios header 中的 token, 使用 location.reload() 可以实现

## navigation guard 仅登录用户可以访问受保护路由

- 给 `/dashboard` 路由增加 `meta: {requireAthu: true}`
- `router.beforeEach` 判断当路由有 `meta.requireAthu` 时是否已登录,
  - 如果未登录, `next('/')`
  - 如果已登录, `next()`
- 参考 [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- 参考 [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html#typescript)

## 保持登录

- 登录后， 刷新页面或者关闭页面标签仍保持登录状态
  - 从 localstorage 取出 userData, 调用 Vuex action

## 恶意伪造 token 处理

当攻击者试图使用伪造的 token 访问受保护资源, 中断并立即登出

```js
    new Vue({
      router,
      store,
      created () {
    	...
    	axios.interceptors.response.use(
            response => response, // simply return the response 
    		error => {
    		    if (error.response.status === 401) { // if we catch a 401 error
    		     this.$store.dispatch('logout') // force a log out 
    		}
    		return Promise.reject(error) // reject the Promise, with the error as the reason
    	    }
    	)
      },
      render: h => h(App)
    }).$mount('#app')
```
