---
title: Hexo 插件 — 在线 HTML 编辑器
date: 2021-03-22 22:59:31
tags:
 - TIY
 - Hexo
categories:
 - 计算机
thumbnail: /assets/HexoTagTIY-thumbnail.png
---

前几天拿我开发的 TIY 写了个 Hexo 封装版本，叫 `hexo-tag-tiy`，可用作在线 HTML 代码展示、运行和调试.

<!-- more -->

例如：

{% tiy %}
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Hello</title>
</head>

<body>
    <p>Hi, TIY!</p>
    <script>
        console.log("Greetings from Xecades!");
    </script>
</body>

</html>
{% endtiy %}

这部分对应 tag 代码为：

```html
{% tiy %}
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Hello</title>
</head>

<body>
    <p>Hi, TIY!</p>
    <script>
        console.log("Greetings from Xecades!");
    </script>
</body>

</html>
{% endtiy %}
```

<!-- placeholder -->

---

## 简介

TIY 是我开发的 HTML 在线编辑器，地址：

{% linkcard "https://tiy.xecades.xyz/" "TIY | Xecades" %}

> TIY 是 "Try It Yourself" 的缩写，此处特指 [Xecades](https://github.com/Xecades/) 开发的版本.

代码开源，无后端，Github 仓库：[`Xecades :: TIY`](https://github.com/Xecades/TIY).

`hexo-tag-tiy` 是 TIY 对应的 Hexo 插件，能够实现 Hexo 博客内嵌、自定义 TIY.

代码同样开源：

 - Github 仓库：[`Xecades :: hexo-tag-tiy`](https://github.com/Xecades/hexo-tag-tiy)
 - npm 地址：[`Xecades :: hexo-tag-tiy`](https://www.npmjs.com/package/hexo-tag-tiy)

---

## 安装

直接在 Hexo 根目录使用 npm 安装即可.

```bash
npm install hexo-tag-tiy --save
```

<!-- placeholder -->

---

## 使用方法

```html
{% tiy %}
// Your code goes here.
{% endtiy %}
```

例如：

```html
{% tiy %}
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Hello</title>
</head>

<body>
    <p>Hi, TIY!</p>
    <script>
        console.log("Greetings from Xecades!");
    </script>
</body>

</html>
{% endtiy %}
```

<!-- placeholder -->

---

## 可选参数

请在博客**根目录** `_config.yml` 文件中配置（以下填入的均为默认值）：

```yaml
# TIY
## Author: Xecades
## Repository: https://github.com/Xecades/hexo-tag-tiy
tiy:
    enable: true                         # 是否启用插件
    base_url: "https://tiy.xecades.xyz/" # 基础 URL
    height_pc: 500px                     # 电脑版高度
    height_mobile: 700px                 # 手机版高度
    width_pc: 100%                       # 电脑版宽度
    width_mobile: 100%                   # 手机版宽度
    margin: "1rem 0"                     # margin，遵循 CSS 格式
    border: "1px solid #eee"             # 边框样式，遵循 CSS 格式
```

<!-- placeholder -->

---

## LICENSE

MIT