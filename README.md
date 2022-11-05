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

## 登录后 vuex 需要做 3 件事

1. 在 Vuex state 中存储 userData 
1. 在 localstorage 中存储 userData
1. 在 axios header 中增加 token

