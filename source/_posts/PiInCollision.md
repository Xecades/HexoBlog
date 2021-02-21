---
title: 一种用物理方法求圆周率的证明
mathjax: true
date: 2020-03-07 21:15:31
tags:
 - 物理
 - 圆周率
categories:
 - 数学
---

n 久前看到一个 [3Blue1Brown](https://space.bilibili.com/88461692) 的视频 (该视频来自 [BiliBili](https://www.bilibili.com/video/av40873215))，挺有意思的

{% dplayer "url=/assets/PiInCollision-vid1.mp4" "loop=false" %}

下面以文字的格式证明碰撞求 $\pi$

<!-- more -->

---

## 守恒

首先，我们揪出两个守恒量：

<center>① 能量守恒：$\frac{1}{2}v_1^2m_1+\frac{1}{2}v_2^2m_2=\mathbf{const}$</center>

<center>② 动量守恒：$m_1v_1+m_2v_2=\mathbf{const}$</center>

值得注意的是，前者在任何情况下都是不会变的，而后者会在撞墙的时候发生变化，因为撞墙时速度反向，变为原来的相反数. 在其余时刻，后者是守恒的. 

![](/assets/PiInCollision-pic2.svg)

{% note warning warning %}
所有接触面是绝对光滑的
{% endnote %}

我们看到式 ①：

$$\frac{1}{2}v_1^2m_1+\frac{1}{2}v_2^2m_2=\mathbf{const}$$

$m_1$、$m_2$ 都是定值，唯一 (二？) 的变量就是 $v_1$、$v_2$，自然，我们可以联想到椭圆方程，可以画出图像

![](/assets/PiInCollision-pic3.svg)

这就和答案很接近了，为什么这样说呢？因为我们的目标是求出 $\pi$，有了椭圆，和圆很接近了嘛. 

---

## We hunt for π!

所以我们缩放 x 轴和 y 轴，让它恰好成为一个圆

令 $x=\sqrt{m_1}v_1$，$y=\sqrt{m_2}v_2$，则式 ① 可以转换为：

$$\frac{1}{2}x^2+\frac{1}{2}y^2=\mathbf{const}$$

即：

$$x^2+y^2=\mathbf{const}$$

怎么样？妥妥的圆方程. 

![](/assets/PiInCollision-pic4.svg)

式 ② 可以转化为：

$$\sqrt{m_1}x+\sqrt{m_2}y=\mathbf{const}$$

整理一下：

$$y=-\sqrt{\frac{m_1}{m_2}}x+\frac{\mathbf{const}}{\sqrt{m_2}}$$

想到了什么？

**直线方程**

斜率 $-\sqrt{\frac{m_1}{m_2}}$ 为定值

---

## 画图

我们考虑一下初始情况：

![](/assets/PiInCollision-pic5.svg)

题设中给出，$v_2=0$，$v_1=-1$

所以初始情况下，$x=-\sqrt{m_1}$，$y=0$，把它画在图上 (A 点)

![](/assets/PiInCollision-pic6.svg)

注意到，每次撞击后对应的点 (不妨称之为 ”状态“) **一定在圆上** (式 ①)，而且状态的变化是**突变型**的，并不连续. 

好了. 第一次，动量守恒和能量守恒同时满足，根据动量守恒 (式 ②)，初始状态和下一步的状态一定在斜率为 $-\sqrt{\frac{m_1}{m_2}}$ 的直线上. 

这说明，下一步的状态一定会转移到 B 点：


![](/assets/PiInCollision-pic7.svg)

然后呢？

---

## 撞墙

$v_1$ 不变，$v_2$ 反转，则下一步状态 (C) 的 x 坐标不变，y 坐标关于 x 轴对称. 

![](/assets/PiInCollision-pic8.svg)

因为式 ② 的曲线的斜率为 $-\sqrt{\frac{m_1}{m_2}}$，为定值，所以 $\theta$ 角也为定值. 

于是我们可以一直撞下去：

![](/assets/PiInCollision-pic9.svg)

它什么时候停止呢？

很容易得到，$v_2>0$ 且 $v_2>v_1$ 时，停止运动. 

所以我们画一条 $v_1=v_2$ 的直线，标记好停止运动的区域：

![](/assets/PiInCollision-pic10.svg)

当状态进入阴影区域，不再撞击. 

根据圆周角定理，每个 $\theta$ 角对应的弧长相等. 

$$\underset{n个2\theta}{\underbrace{2\theta+2\theta+\cdots+2\theta}}<2\pi$$

即：

$$n\cdot\theta<\pi$$

n 是满足该式的最大整数，**也就是我们要求的碰撞次数**. 

---

## Aha! Here goes π!

我们下一步的重点是求出 $\pi$. 

不妨假设 $m_1:m_2=100:1$ (其余情况以此类推)

斜率 $-\sqrt{\frac{m_1}{m_2}}=-10$

则 $\tan\theta=\frac{1}{10}=0.1$

则 $\theta=\arctan(0.1)$

然后我们看看 $y=\arctan(x)$ 的图像：

![](/assets/PiInCollision-pic11.png)

（橘色的为 $y=x$，蓝色的为 $y=\arctan(x)$）

可见，当 $x$ 较小时，$\arctan(x)\approx x$

所以 $\theta\approx0.1$

代入 $n\cdot\theta<\pi$：

$n<10\pi\approx31.4$

则 $n_{\max}=31$

而且，质量比越大，撞击次数越多，求得的值越接近 $\pi$

Q.E.D

---

可真是令人激动呢~