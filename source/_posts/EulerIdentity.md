---
title: 欧拉恒等式 e^(iπ)+1=0 的证明
mathjax: true
date: 2020-11-21 11:33:57
tags:
 - 证明
 - 欧拉恒等式
categories:
 - 数学
---

<!-- placeholder -->

{% cq %} 欧拉恒等式，即 $e^{i\pi}+1=0$，
被称为“最奇妙的数学公式”，
因为它把 5 个最基本的数学常数简洁地连系起来 {% endcq %}

下面给出关于欧拉恒等式我最喜欢的一种证明. 

<!-- more -->

---

## 引入

相信大家都知道复数有三种基本表达形式：

 - 坐标：$z = a + b\cdot i$
 - 三角：$z = r(\cos\theta+i\sin\theta)$
 - 指数：$z = r\cdot e^{i\theta}$

我们把复数 $z$ 的指数形式和三角形式写在一起，得：

$$e^{i\theta}=\cos\theta+i\sin\theta$$

该公式即为**欧拉公式**，我们令 $\theta=\pi$，便得到了大名鼎鼎的**欧拉恒等式**：

$$e^{i\pi}+1=0$$

我们尝试证明. 

---

## 证明

考虑单位复数：$z=\cos x+i\sin x$

求导得：$\dfrac{\mathrm{d}z}{\mathrm{d}x}=i\cos x-\sin x=i\cdot z$

因此：$\dfrac{\mathrm{d}z}{z}=i\cdot\mathrm{d}x$

两边积分得：$\int\dfrac{\mathrm{d}z}{z}=i\int\mathrm{d}x$

即：$\ln z=ix+\mathrm{C}$ （$\mathrm{C}$ 为常数）

下面我们尝试解出 $\mathrm{C}$.

令 $x=0$，则 $z=\cos0+i\sin0=1$

$\ln1=i\cdot0+\mathrm{C}$

则 $\mathrm{C}=0$，$\ln z=ix$

则 $e^{\ln z}=e^{ix}$，又有 $e^{\ln z}=z=\cos x+i\sin x$

故：

$$e^{ix}=\cos x+i\sin x$$

令 $x=\pi$ 可得：$e^{i\pi}+1=0$.

证毕.