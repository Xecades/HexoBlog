---
title: 欧拉恒等式 e^(iπ)+1=0 的娱乐性证明
mathjax: true
date: 2020-02-28 09:20:07
tags:
 - 数学
categories:
 - 数学
---

<!-- placeholder -->

{% cq %} 欧拉恒等式，即 $e^{i\pi}+1=0$，
被称为“最奇妙的数学公式”，
因为它把 5 个最基本的数学常数简洁地连系起来 {% endcq %}

以下为通过数形结合和复平面的手段证明欧拉恒等式的方法

{% note warning warning %}
注意：由于是**娱乐性**证明，文中内容有不妥的地方
{% endnote %}

要严谨的证明，请见以下链接：

{% linkcard "https://blog.xecades.xyz/articles/EulerIdentity" "欧拉恒等式 e^(iπ)+1=0 的严谨证明" %}

<!-- more -->

## 引

看到这个公式，我们自然想到 $e^t$ 的导数就是其本身的性质，即：

$$\frac{\mathrm{d}}{\mathrm{d}t}e^t=e^t$$

这个性质的证明我也不必多说了

---

### $e^t$

假如有一个点向数轴的正方向直线运动，且用 $e^t$ 描述该点在数轴上的位置

![](/assets/EulerIdentity-pic1.png)

那么，该点的初始位置 ($t=0$) 为数轴上为 1 的点

由于其导数为 $e^t$，就说明该点在 $e^t$ 位置上的速度为 $e^t$

![](/assets/EulerIdentity-pic2.gif)

**显然随着 t 的增大，该点越来越远离初始位置，不会回到原位置**

---

### $e^{2t}$

假如该点以 $e^{2t}$ 的速度前进

![](/assets/EulerIdentity-pic3.png)

因为 $\frac{\mathrm{d}}{\mathrm{d}t}e^{2t}=2e^{2t}$

这说明该点在 $e^{2t}$ 的位置上速度为 $2e^{2t}$，**速度永远为坐标的两倍**

![](/assets/EulerIdentity-pic4.gif)

显然，该点是不可能回到初始位置 1 的

---

### $e^{-0.5t}$

我们再来看看负数：$e^{-0.5t}$

![](/assets/EulerIdentity-pic5.png)

有 $\frac{\mathrm{d}}{\mathrm{d}t}e^{-0.5t}=-0.5e^{-0.5t}$

说明其速度永远是坐标的 -0.5 倍，起始点为 1

![](/assets/EulerIdentity-pic6.gif)

该点会向着负方向运动，速度无限趋近于零，其坐标也无限趋近于零

---

## 复数呢？

若 t 乘的是正数，说明该点向着正方向运动，若 t 乘的是负数，说明该点向负方向运动

**那 t 乘的是单位复数 i 呢？**

**说明该点向着垂直数轴的方向运动**

{% note warning warning %}
注意：此处即为不妥的地方，但它的确可以证明
{% endnote %}

此时，单单一个数轴就不够用了，我们把数轴搬到复平面上. 

![](/assets/EulerIdentity-pic7.png)

$t=0$ 时，该点位于 $1+0\cdot i$，速度方向竖直向上，为 1. 

容易得到，速度方向始终与该点和原点的连线垂直，大小 (模长) 始终为 1

“该点和原点的连线”运动，构成一个**单位圆**

这说明，其速度式量始终与该单位圆相切，模长始终为 1

![](/assets/EulerIdentity-pic8.gif)

你想到了什么？

### 匀速圆周运动

线速度为 1，单位圆周长为 $2\pi$，说明：

1. 当 $t=\pi$ 时，该点转过半圈，到达 $-1+0\cdot i$
2. 当 $t=2\pi$ 时，该点转过一周，回到起点 $1+0\cdot i$

### 所以！

由 1 得出：$e^{i\cdot\pi}=-1$，也就是欧拉恒等式

由 2 得出：$e^{2i\cdot\pi}=e^{i\cdot\tau}=1$

而且，我们可以根据这个方法求出对于 $\forall t$，$e^{i\cdot t}$ 的值

---

的确挺娱乐的~