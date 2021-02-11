---
title: 网站更新
date: 2021-02-09 12:11:07
tags:
 - 总结
---

好好总结一下这次网站的大更新.

<!-- more -->

以下标题，方括号内的字符对应所述页面的 CNAME 解析值，例如，`[Blog]` 对应页面为 `blog.xecades.xyz`，特别地，`[Home]` 对应页面为 `xecades.xyz`. 若无方括号，默认为对多个页面生效.

每项更新后标注的链接为参考链接.

---

## [Blog] 更换 Cards 主题

为了追求极致的访问速度，将 hexo 博客由 NexT 主题切换至 Cards 主题.

NexT 主题自带的样式远多于 Cards 主题，所以我将 NexT 主题中我喜欢的模块移植到 Cards 中，并对 Cards 的 CSS 样式自定义美化.

**⚐ 参见**：

 - [「test - 内容模板」](https://blog.xecades.xyz/articles/test/)
 - [「Cards 主题文档」](https://theme-cards.ichr.me/)
 - [「NexT 主题文档」](https://theme-next.js.org/)
 - [「Github 仓库」](https://github.com/Xecades/HexoBlog)

---

## [Blog] 支持 PWA 网页应用

如图：

![](/assets/summary-pic1.png)

添加 `manifest` 和 `service worker`.

现支持大部分浏览器将网页作为应用安装（该技术称为 PWA），可以达到更好的沉浸式浏览体验，以及更快的访问速度.

**⚐ 参见**：

 - [「MDN：Manifest」](https://developer.mozilla.org/zh-CN/docs/Web/Manifest).
 - [「MDN：渐进式 Web 应用」](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
 - [「博客 Manifest」](https://blog.xecades.xyz/site.webmanifest)
 - [「博客 Service Worker」](https://blog.xecades.xyz/sw.js)

---

## [Blog] 支持 Service Worker 缓存

现支持博客内容的离线浏览（当然评论除外）.

加速博客访问.

采用 `hexo-service-worker` 插件，自动生成 `sw.js` 作 Service Worker.

**⚐ 参见**：

 - [「MDN：Service Worker」](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
 - [「博客 Service Worker」](https://blog.xecades.xyz/sw.js)
 - [「hexo-service-worker Github 仓库」](https://github.com/zoumiaojiang/hexo-service-worker)

---

## [Blog] Instant Click 优化体验

采用 Instant Click 库，加速博客内链接跳转的体验.

当用户鼠标移上内链时，自动开始加载链接对应页面，可以节约 200 到 300 毫秒的时间（别小看这点时间）.

此功能尚有漏洞，自动加载的页面的代码高亮会消失（个人认为无伤大雅）.

**⚐ 参见：**

 - [「Instant Click 官网」](http://instantclick.io/)

---

## [Blog] 使用 twikoo 评论系统

之前采用的 leancloud 没过几天就提醒超限使用了，贫苦学生没有钱……

所以换成 twikoo 了，感觉它比 valine 好用点.

输入框背景图目前只提供了 webp 格式，故部分 Safari 浏览器无法加载.

如图：

![](/assets/comment.webp)

**⚐ 参见**：

 - [「Twikoo 官网」](https://twikoo.js.org/)
 - [「Valine 官网」](https://valine.js.org/)

---

## [Blog] 文章图片 webp 支持

目前，文章的 png、jpg、jpeg 后缀的图片都有对应的 webp 后缀资源.

webp 格式图片是 google 开发的，相较于同样显示效果的 png 和 jpg，webp 图片的大小约为 60%. 采用 webp，可以大幅减少页面加载速度.

缺点在于，Safari 和 IE 浏览器尚不支持 webp 格式，因此我保留了原图，在用户访问时根据用户浏览器对 webp 的支持性来选择是否显示 webp 图片.

为了防止误加载 png、jpg、jpeg 格式图片，我使用一段 hexo 代码将所有文章内的 `<img>` 标签的 `src` 改成 `fakesrc`，然后将链接添加后缀 `.picSuffix`。待用户加载时运行 js，先将所有后缀 `.picSuffix` 改成 `.webp` 或删除，然后再将所有 `fakesrc` 替换成 `src`.

博客中的 webp 图片由一段 gulp 脚本生成，采用库 `gulp-webp`.

**⚐ 参见**：

 - [「谷歌 Webp 文档」](https://developers.google.cn/speed/webp/)
 - [「gulp-webp Github 仓库」](https://github.com/sindresorhus/gulp-webp)

---

## [Blog] 文章 Thumbnail

我会在合适的文章添加合适的配图.

绘图工具：MSPaint、Tikz.

**⚐ 参见文章**：

 - [「2020 这一年」](https://blog.xecades.xyz/articles/2020-2021/)
 - [「康威生命游戏 | 元胞自动机」](https://blog.xecades.xyz/articles/LifeGame/)

---

## [Home] 重构主页

如图：

![](/assets/summary-pic2.png)

更加简洁新颖，更加轻量.

这是个单页富应用程序（SPA），采用 vue-router 技术使得页面支持无刷新加载，在特殊页面间切换**不会**卡顿.

该技术原理是使用 History 的 API：

```js
history.replaceState(...);
```

使得更改地址栏显示而不刷新，下个页面内容由 vue 填写.

**⚐ 参见**：

 - [「MDN：History API 文档」](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)
 - [「Vue Router 官网」](https://router.vuejs.org/)
 - [「Github 仓库」](https://github.com/Xecades/Homepage)

---

## 原地址重定向

或许你已经注意到了，我的新 `lab`、`friend`、`about` 页移动了位置，现在它们都属于 `xecades.xyz` 的子页面.

为了使得之前的链接仍然可用，我使用页面跳转的方法.

由于域名魏备案无法添加解析跳转，所以我在 `lab.xecades.xyz` 等网站的 404 页面加入如下 js 代码：

```js
const direct = "xecades.xyz/lab";
window.location = window.location.href.replace(window.location.host, direct);
```

这样，之前的链接都可以正常使用.

**⚐ 参见示例**：

 - [「lab.xecades.xyz」](https://lab.xecades.xyz/)
 - [「friend.xecades.xyz」](https://friend.xecades.xyz/)
 - [「me.xecades.xyz」](https://me.xecades.xyz/)

---

## [TIY] 内容记忆功能

使用浏览器 `localStorage` API，支持缓存之前编辑的内容.（只要不清除浏览器缓存，它就可以当记事本用……）

**⚐ 参见**：

 - [「TIY 在线 HTML 编辑器」](https://tiy.xecades.xyz/)
 - [「MDN：LocalStorage API 文档」](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
 - [「Github 仓库」](https://github.com/Xecades/TIY)

---

## [Status] 网站监控系统

使用 Uptime Robot，实时检测各网站是否正常运行.

**⚐ 参见**：

 - [「Status 页面」](https://status.xecades.xyz/)
 - [「Uptime Robot 官网」](https://uptimerobot.com/)

---

## 全站部署 Vercel

全部页面都部署在 Github + Vercel 上，放弃 ~~难用~~ 仍需改进的 Coding.

（偷偷告诉你：还是有些留在了 Coding 懒得搬了）

**⚐ 参见**：

 - [「Vercel 官网」](https://vercel.com/)
 - [「我的 Github 项目」](https://github.com/Xecades/)

---

## [Blog] 评论表情 CDN 加速

评论的表情 fork 自一开源 Github 仓库，采用 JsDelivr 的 CDN 加速.

**⚐ 参见**：

 - [「Github 仓库」](https://github.com/Xecades/emotion)
 - [「表情示例」](https://cdn.jsdelivr.net/gh/Xecades/emotion@latest/aru/1.png)

---

## 更换 Favicon

更换到一个更加简洁美观的 favicon（我说这是我画的你信不信？）.

黑白模式：

![](/assets/notice-pic1.png)

白天模式：

![](/assets/notice-pic2.png)

夜晚模式：

![](/assets/notice-pic3.png)

**Copyright ©2021 Xecades**

目前只在 favicon 应用了黑白模式.

---

还有些许更改不便于公开.

欢迎参观我的 Github 主页：

{% linkcard "https://github.com/Xecades" "Xecades" %}