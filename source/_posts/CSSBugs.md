---
title: 关于 CSS 的 margin 塌陷和 margin 合并
mathjax: true
date: 2020-04-05 10:34:40
tags:
 - CSS
 - bug
categories:
 - 计算机
---

margin 塌陷和 margin 合并是 CSS 的两个经典 bug.

下面来讲一下它们的处理方法.

<!-- more -->

---

## margin 塌陷

### 框架

```html index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
```

这是文档的整体框架，父亲带了个儿子. 

{% note warning warning %}
以下的所有关于 margin 塌陷的 CSS 代码都以此 html 为框架. 
{% endnote %}

---

### 样式

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    height: 200px;
    width: 200px;
    background-color: #00ffff;
}

.son {
    height: 100px;
    width: 100px;
    background-color: #aaffaa;
}
```

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            height: 200px;
            width: 200px;
            background-color: #00ffff;
        }

        .son {
            height: 100px;
            width: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
{% endtiy %}

---

### 触发

我们给 `father` 来个 `margin-top: 200px`

<details>
<summary>单击展开</summary>

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    margin-top: 200px; /* Here */
    height: 200px;
    width: 200px;
    background-color: #00ffff;
}

.son {
    height: 100px;
    width: 100px;
    background-color: #aaffaa;
}
```
</details>

现在一切正常，父亲也带着他儿往下挪了

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            margin-top: 200px; /* Here */
            height: 200px;
            width: 200px;
            background-color: #00ffff;
        }

        .son {
            height: 100px;
            width: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
{% endtiy %}

---

我们再给 `son` 来个 `margin-top: 100px`

<details>
<summary>单击展开</summary>

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    margin-top: 200px;
    height: 200px;
    width: 200px;
    background-color: #00ffff;
}

.son {
    margin-top: 100px; /* Here */
    height: 100px;
    width: 100px;
    background-color: #aaffaa;
}
```
</details>

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            margin-top: 200px;
            height: 200px;
            width: 200px;
            background-color: #00ffff;
        }

        .son {
            margin-top: 100px; /* Here */
            height: 100px;
            width: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
{% endtiy %}

然后我们惊奇地发现，`son` 没动！

---

我们慢慢加 `son` 的 `margin-top` 值，一直没动？

直到，

`son` 的 `margin-top` 等于他爸的 `margin-top` 值，也就是 `200px`

看到这里你可能会认为，“哦，就是定位错了嘛，改改就好了”

但是，

当我们再加 `son` 的 `margin-top` 值……

<details>
<summary>单击展开</summary>

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    margin-top: 200px;
    height: 200px;
    width: 200px;
    background-color: #00ffff;
}

.son {
    margin-top: 300px; /* Here */
    height: 100px;
    width: 100px;
    background-color: #aaffaa;
}
```
</details>

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            margin-top: 200px;
            height: 200px;
            width: 200px;
            background-color: #00ffff;
        }

        .son {
            margin-top: 300px; /* Here */
            height: 100px;
            width: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
{% endtiy %}

`son` 的确动了，但却带着他爸跑了


---

### 分析

也就是说，垂直方向上，两个元素，其 margin 会**取两者的最大值**

就像他父亲的顶没了

---

### 方案一 残暴法

既然 `father` 的顶没了，我们给他加个顶呗

给 `father` 加上 `border-top: 1px solid transparent;`

<details>
<summary>单击展开</summary>

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    margin-top: 200px;
    height: 200px;
    width: 200px;
    background-color: #00ffff;
    border-top: 1px solid transparent; /* Here */
}

.son {
    margin-top: 100px;
    height: 100px;
    width: 100px;
    background-color: #aaffaa;
}
```
</details>

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            margin-top: 200px;
            height: 200px;
            width: 200px;
            background-color: #00ffff;
            border-top: 1px solid transparent; /* Here */
        }

        .son {
            margin-top: 100px;
            height: 100px;
            width: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
{% endtiy %}

但这个方案**极不推荐**.

---

### 方案二 BFC

BFC (Block Format Conte**x**t)，块级格式化上下文，用于改变渲染语法规则

平常，BFC 不常用，但一到 margin 塌陷这，它就成了解决 margin 塌陷最好的方法

怎么触发 BFC 呢？有以下方法，加到父级 (`father`) 上就好了

```css 其中一个即可
position: absolute;
display: inline-block;
float: left / right; /* 左右浮都可以 */
overflow: hidden;
```

显然，这些都或多或少有缺陷，因为添加了你不想要的规则，但没办法，使用的时候视情况而定

<details>
<summary>单击展开</summary>

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    margin-top: 200px;
    height: 200px;
    width: 200px;
    background-color: #00ffff;
    /* 下面五个选一个就好了 */
    position: absolute;
    /* display: inline-block; */
    /* float: left; */
    /* float: right; */
    /* overflow: hidden; */
}

.son {
    margin-top: 100px;
    height: 100px;
    width: 100px;
    background-color: #aaffaa;
}
```
</details>

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 塌陷</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            margin-top: 200px;
            height: 200px;
            width: 200px;
            background-color: #00ffff;
            /* 下面五个选一个就好了 */
            position: absolute;
            /* display: inline-block; */
            /* float: left; */
            /* float: right; */
            /* overflow: hidden; */
        }

        .son {
            margin-top: 100px;
            height: 100px;
            width: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
{% endtiy %}

这样就好使了

---

## margin 合并

### 框架

html 长这样：

```html index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>margin 合并</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="bro1"></div>
    <div class="bro2"></div>
</body>

</html>
```

初始的 CSS 长这样

```css style.css
* {
    margin: 0;
    padding: 0;
}

.bro1 {
    height: 100px;
    background-color: #00ffff;
}

.bro2 {
    height: 100px;
    background-color: #aaffaa;
}
```

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 合并</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .bro1 {
            height: 100px;
            background-color: #00ffff;
        }

        .bro2 {
            height: 100px;
            background-color: #aaffaa;
        }
    </style>
</head>

<body>
    <div class="bro1"></div>
    <div class="bro2"></div>
</body>

</html>
{% endtiy %}

---

### 触发

我们给 `bro1` 加个 `margin-bottom: 100px;`

再给 `bro2` 加个 `margin-top: 100px;`

理论上，他俩应该间隔 200 个像素

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 合并</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .bro1 {
            height: 100px;
            background-color: #00ffff;
            margin-bottom: 100px;
        }

        .bro2 {
            height: 100px;
            background-color: #aaffaa;
            margin-top: 100px;
        }
    </style>
</head>

<body>
    <div class="bro1"></div>
    <div class="bro2"></div>
</body>

</html>
{% endtiy %}

但实际上，只间隔了 100 像素

就像两个的 margin 和在了一起一样

---

### 用 BFC 解决

BFC 一样可以解决 margin 合并

就是给**下面的元素**加个父级，然后给父级 BFC 的属性 `overflow: hidden;`

<details>
<summary>html 代码</summary>

```html index.html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>margin 合并</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="bro1"></div>
    <div class="father">
        <div class="bro2"></div>
    </dic>
</body>

</html>
```
</details>

<details>
<summary>CSS 代码</summary>

```css style.css
* {
    margin: 0;
    padding: 0;
}

.father {
    overflow: hidden;
}

.bro1 {
    height: 100px;
    background-color: #00ffff;
    margin-bottom: 100px;
}

.bro2 {
    height: 100px;
    background-color: #aaffaa;
    margin-top: 100px;
}
```
</details>

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>margin 合并</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .father {
            overflow: hidden;
        }

        .bro1 {
            height: 100px;
            background-color: #00ffff;
            margin-bottom: 100px;
        }

        .bro2 {
            height: 100px;
            background-color: #aaffaa;
            margin-top: 100px;
        }
    </style>
</head>

<body>
    <div class="bro1"></div>
    <div class="father">
        <div class="bro2"></div>
    </div>
</body>

</html>
{% endtiy %}

的确解决了，但完美吗？

在实际项目中，html 必须是层次清晰的，在其中加上一个没框架作用的东西都是不允许的

所以……

我们选择不解决 margin 合并，因为直接改 CSS 中的 margin 值就好了