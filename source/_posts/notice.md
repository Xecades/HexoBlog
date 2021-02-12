---
title: NOTICE
date: 2021-02-03 09:52:42
---

如你所见，本博客最近进行了大幅度更改.

UPD `2021 / 2 / 6`: PWA、ServiceWorker、InstantClick 支持以及一些小玩意.

<!-- more -->

---

~~目前正在考虑是否将博客部署到 Vercel，放弃 Coding.~~

~~打算国内用 Vercel + CDN，国外 Netlify + CDN.~~

博客已部署至 Vercel 平台，安装指令是：

```
npm install && cp kramed-inline.js node_modules/kramed/lib/rules/inline.js
```

（手动改 `node_modules` 真香）

编译指令是：

```
hexo generate
```

<!-- placeholder -->

---

## PWA 应用支持

支持将网站下载成应用，方便访问.

---

## Service Worker 支持

支持离线访问，加速页面跳转.

---

## Instant Click 支持

极大加速页面跳转，优化用户体验.

---

## 简化主页

使用 vue-router 写了一个无刷新跳转的主页.

地址：xecades.xyz

废弃：lab.xecades.xyz、me.xecades.xyz、friend.xecades.xyz

TODO:

1. ~~主页使用 React + Gastby 搭建，部署在 Netlify + Vercel.~~ （主页仍使用 vue，gatsby 相对较臃肿.）
2. 更换英文字体.
3. lab.xecades.xyz 等页重定向至 xecades.xyz/lab.


---

## 更换博客主题

由 NexT 切换至 Cards.

NexT 主题略显臃肿（我还是很喜欢这个主题的），优点是功能十分齐全，但我的魔改版加载需要十多秒钟，便忍痛割爱了.

Cards 主题轻便，访问迅速（目前还没完成速度优化），但是功能明显不足，博客很多组件都是我从 NexT 移植或自主编写的.

NexT 主题存有备份，如遇特殊情况，可以恢复.

⚐ 参见[「Theme Cards 文档」](https://theme-cards.ichr.me/)和[「博客组件测试页」](https://blog.xecades.xyz/articles/test/).

---

## 加速图片访问

本站全部 jpg、png 图片都有其对应 webp 格式的图片.

webp 是一种 ~~新兴的~~ 图片格式，和等效 jpg、png 相比，它能大幅度减少图片大小，大大提高加载速度.

除 safari 和 ie 外，其余主流浏览器均支持 webp（safari 最新版已支持）.

考虑到 safari 用户的体验，本博客使用 base64 文件头判断是否支持 webp，若支持，便显示 webp 图片，否则显示默认格式图片.

为了防止支持 webp 的浏览器意外加载默认格式的图片，我在本地将博客正文所有 \*.png、\*.jpg 内容替换为 \*.picSuffix（显然这样会引发加载错误），网页加载时再用 javascript 代码将 \*.picSuffix 替换为 \*.webp 或默认格式.

这样最大的缺点是，如果禁止网页执行脚本，本站正文图片将无法加载. 实际上，如果禁止执行脚本，本站的全部 MathJax 数学公式也无法加载，因此对访问者影响不大.

⚐ 参见[「谷歌 Webp 文档」](https://developers.google.cn/speed/webp/).

---

## JsDelivr CDN 加速

目前尚未完成.

本站评论系统的表情使用的就是 JsDelivr CDN 加速.

⚐ 参见[「JsDelivr 官网」](http://jsdelivr.com/)

---

## 添加文章图

我会在合适的文章添加合适的图片.

⚐ 参见文章[「2020 这一年」](https://blog.xecades.xyz/articles/2020-2021/)和[「康威生命游戏 | 元胞自动机」](https://blog.xecades.xyz/articles/LifeGame/).

---

## 更换 favicon

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

## By the way

欢迎来我的 Github 参观.

{% linkcard "https://github.com/Xecades" "Xecades" %}

目前大部分内容在 Coding 上，private 模式，之后会陆续搬过来.