---
title: Code Snippets
date: 2021-02-07 00:12:45
tags:
 - Snippets
---

<!-- placeholder -->

{% cq %} 记录常用代码片段. {% endcq %}

<!-- more -->

---

## Javascript

### 展示 DOM 边框（debug）

![](/assets/snippets-pic1.png)

```js
function toggleBorder() {
    !window.TOG && document.body.appendChild((window.TOG = document.createElement("style")));
    (window.CHK = !window.CHK)
        ? (TOG.innerHTML = `*{box-shadow: 0 0 0 1px cyan}`)
        : (TOG.innerHTML = "");
}
```

执行 `toggleBorder()` 函数，页内所有 DOM 元素会显示蓝绿色边框，再次执行，不再显示.

若需 `localStorage` 的记忆功能，略微修改即可.

此处的边框生成方法并非 `border`，而是 `box-shadow`，这样不会占用 DOM 空间，缺点是页内原来的阴影效果消失.

---

### 动态加载 JS 和 CSS

```js HTML.js
function loadJS(src) {
    return new Promise(resolve => {
        var script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

function loadCSS(src) {
    return new Promise(resolve => {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = src;
        link.onload = resolve;
        document.getElementsByTagName("head")[0].appendChild(link);
    });
}
```

这两个函数用于加载 JS 文件和 CSS 文件，返回一个 `promise` 对象.

如果愿意，可以使用下面的 `construct.js` 来同步加载资源.

```js construct.js
(async () => {
    await loadCSS("https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.2/css/all.min.css");
    await loadCSS("https://cdn.bootcdn.net/ajax/libs/basscss/8.1.0/css/basscss.min.css");

    await loadJS("https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js");
    await loadJS("https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.2/js/all.min.js");
})();
```

注意，这样只会在第一个资源加载完成后加载下一个，但一旦有文件无法获得，后续内容都不会加载.

这样设计是因为后面的文件可能依赖之前的文件.

---

## C++

### Monkey Patch

实在是取不来名字了...

```cpp
#define int long long

//...

signed main()
{
    //...
    return 0;
}
```

懂的都懂.

---

### 快速读入模板

用于快读读入数字型数据，速度远高于 `cin`，高于 `scanf`.

```cpp
int Read()
{
    #define cg ch = getchar()
    int x = 0, f = 1;
    char cg;
    while (ch < '0' || ch > '9')
    {
        if (ch == '-')
            f = -1; //保证输入为正数时，这句话可以省略
        cg;
    }
    while (ch >= '0' && ch <= '9')
    {
        x = (x << 1) + (x << 3) + (ch ^ 48); //相当于x = x * 10 + ch - '0'
        cg;
    }
    return x * f; //正负号
}
```