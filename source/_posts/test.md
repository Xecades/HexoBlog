---
title: test - 内容模板
date: 2020-02-18 10:45:33
tags:
 - 模板
 - 站点
categories:
 - 计算机
---

My Awesome Test!

本博客包含的组件，作测试用.

<!-- more -->

## 文本居中标签

{% cq %} 我不去想是否能够成功，既然选择了远方，便只顾风雨兼程.  {% endcq %}

## 代码块

``` cpp Hello World https://xecades.xyz/ homepage
cout << "Hello World" << endl;
```

删减行

``` diff
- cout << "Goodbye World" << endl;
+ cout << "Hello World" << endl;
```

## note 标签

{% note info info %}
**info** note tag
{% endnote %}

{% note important important %}
**important** note tag
{% endnote %}

{% note tip tip %}
**tip** note tag
{% endnote %}

{% note caution caution %}
**caution** note tag
{% endnote %}

{% note warning warning %}
**warning** note tag
{% endnote %}

## Label 标签

{% cq %}I heard the echo, {% label default@from the valleys and the heart %}
Open to the lonely soul of {% label info@sickle harvesting %}
Repeat outrightly, but also repeat the well-being of
Eventually {% label warning@swaying in the desert oasis %}
{% label success@I believe %} I am
{% label primary@Born as the bright summer flowers %}
Do not withered undefeated fiery demon rule
Heart rate and breathing to bear {% label danger@the load of the cumbersome %}
Bored{% endcq %}

## Spoiler 隐藏文字

{% spoiler You can't see me! %}

## Dplayer 视频播放器

{% dplayer "url=/assets/fractal-vid1.mp4" "loop=true" "preload=auto" %}

## Keyboard 标签

 - {% kbd W %}
 - {% kbd Ctrl %} + {% kbd Alt %} + {% kbd Delete %}
 - {% kbd Enter %}
 - {% kbd Shift %}
 - {% kbd Command %}
 - {% kbd Option %}

可用于展示按键操作.

## 隐藏文章

`hexo-generator-index-pin-top`

```yaml Front Matter
hidden: true
```

{% note caution caution %}
以下内容为博主开发（或修改），可能会有不少漏洞.
{% endnote %}

## Linkcard

{% linkcard "https://www.luogu.com.cn/" "Luogu" %}

{% linkcard "https://xecades.xyz/" "Xecades" %}

## TIY html 代码展示

`hexo-tag-tiy`

{% tiy %}
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="utf-8">
    <title>Cursor</title>
    <style>
        #cursor {
            position: fixed;
            width: 16px;
            height: 16px;
            background: #000;
            border-radius: 8px;
            opacity: 0.25;
            z-index: 10086;
            pointer-events: none;
            transition: 0.2s ease-in-out;
            transition-property: background, opacity, transform;
        }

        #cursor.hidden {
            opacity: 0;
        }

        #cursor.hover {
            opacity: 0.1;
            transform: scale(2.5);
        }

        #cursor.active {
            opacity: 0.5;
            transform: scale(0.5);
        }

        /*************************/

        a {
            color: rgb(0, 93, 146);
            opacity: .7;
            transition: opacity .2s;
            text-decoration: none;
        }

        a:hover {
            opacity: 1;
        }

        #clickME {
            cursor: pointer;
            display: inline-block;
            border: 1px solid #000;
        }
    </style>
</head>

<body>
    <a href="#">我是可以点击的链接</a>
    <p>在一段不可以点击的文字中的<a href="#">可以点击的链接</a>。</p>
    <div id="clickME" onclick="console.log(`我是个假的链接`)">我是一个 div 元素，但我可以点击</div>
    <script>
        var CURSOR;

        Math.lerp = (a, b, n) => (1 - n) * a + n * b;

        const getStyle = (el, attr) => {
            try {
                return window.getComputedStyle
                    ? window.getComputedStyle(el)[attr]
                    : el.currentStyle[attr];
            } catch (e) { }
            return "";
        };

        class Cursor {
            constructor() {
                this.pos = { curr: null, prev: null };
                this.pt = [];
                this.create();
                this.init();
                this.render();
            }

            move(left, top) {
                this.cursor.style["left"] = `${left}px`;
                this.cursor.style["top"] = `${top}px`;
            }

            create() {
                if (!this.cursor) {
                    this.cursor = document.createElement("div");
                    this.cursor.id = "cursor";
                    this.cursor.classList.add("hidden");
                    document.body.append(this.cursor);
                }

                var el = document.getElementsByTagName('*');
                for (let i = 0; i < el.length; i++)
                    if (getStyle(el[i], "cursor") == "pointer")
                        this.pt.push(el[i].outerHTML);
                document.body.appendChild((this.scr = document.createElement("style")));
                this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto !important}`;
            }

            refresh() {
                this.scr.remove();
                this.cursor.classList.remove("hover");
                this.cursor.classList.remove("active");
                this.pos = { curr: null, prev: null };
                this.pt = [];
                this.create();
                this.init();
                this.render();
            }

            init() {
                document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
                document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
                document.onmousemove = e => { (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; this.cursor.classList.remove("hidden"); };
                document.onmouseenter = e => this.cursor.classList.remove("hidden");
                document.onmouseleave = e => this.cursor.classList.add("hidden");
                document.onmousedown = e => this.cursor.classList.add("active");
                document.onmouseup = e => this.cursor.classList.remove("active");
            }

            render() {
                if (this.pos.prev) {
                    this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
                    this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
                    this.move(this.pos.prev.x, this.pos.prev.y);
                } else {
                    this.pos.prev = this.pos.curr;
                }
                requestAnimationFrame(() => this.render());
            }
        }

        (() => {
            CURSOR = new Cursor();
        })();
    </script>
</body>

</html>
{% endtiy %}