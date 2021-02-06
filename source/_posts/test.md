---
title: test - 内容模板
date: 2020-02-18 10:45:33
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

{% tiy "MarginCollapse1" %}