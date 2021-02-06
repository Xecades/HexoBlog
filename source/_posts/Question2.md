---
title: 一个有趣的数学问题的证明
mathjax: true
date: 2021-01-09 17:51:09
tags:
 - 数学
 - 证明
categories:
 - 数学
---

对 $\forall n\in N^*$，试证：

$$\boxed{\prod_{x=1}^{n-1}\sin\frac{x\pi}{n}=\frac{n}{2^{n-1}}}$$

<!-- more -->

我们要先知道如下两个引理：

## 引理一

> 对于 $\forall$ 单位复数 $z$，有：
> 
> $$\boxed{|z-1|=2\sin\frac{\theta}{2}}$$

构建单位圆，作辅助线如图：

![](/assets/Question2-pic1.svg)

其中 $H$ 为 $AB$ 的中点，$z$ 为 $\overrightarrow{OB}$ 对应的单位复数.

那么，我们可以用 $|z-1|$ 来表示复数 $z$ 对应的点和复数 $1+0i$ 对应的点的距离，在图中表示为 $|AB|$，即：

$$|z-1|=|AB|$$

稍作计算：

$$|z-1|=|AB|=2|AH|=2|OA|\sin\frac{\theta}{2}=2\sin\frac{\theta}{2}$$

其中 $\theta$ 表示复数 $z$ 的辐角.

因此我们得到：

$$\boxed{|z-1|=2\sin\frac{\theta}{2}}$$

---

## 引理二

> 若用 $\varepsilon^0,\varepsilon^1\cdots,\varepsilon^{n-1}$ 表示复数域上的方程 $x^n-1=0$ 的 $n$ 个根，则有：
> $$\boxed{\sum_{k=0}^{n-1}x^k=\prod_{k=1}^{n-1}(x-\varepsilon^k)}$$

此处使用 $\varepsilon^k$ 来表示 $x^n-1=0$ 的根的方法，属于**单位复数根模型**。

这个引理的证明过程是显然的，因为：

$$x^n-1=(x-1)(1+x+\cdots+x^{n-2}+x^{n-1})\tag{1}$$

又有：

$$x^n-1=(x-1)(x-\varepsilon^1)\cdots(x-\varepsilon^{n-2})(x-\varepsilon^{n-1})\tag{2}$$

显然 $x=1$ 不是 $1+x+\cdots+x^{n-2}+x^{n-1}=0$ 的根，对比 $(1)$ 和 $(2)$ 可得：

$$1+x+\cdots+x^{n-2}+x^{n-1}=(x-\varepsilon^1)\cdots(x-\varepsilon^{n-2})(x-\varepsilon^{n-1})$$

也就是：

$$\boxed{\sum_{k=0}^{n-1}x^k=\prod_{k=1}^{n-1}(x-\varepsilon^k)}$$

---

## 证明

> 对 $\forall n\in N^*$，试证：
> $$\boxed{\prod_{x=1}^{n-1}\sin\frac{x\pi}{n}=\frac{n}{2^{n-1}}}$$

下面我们开始证明这个命题.

在引理二中，令 $x=1$：

$$(1-\varepsilon^1)\cdots(1-\varepsilon^{n-2})(1-\varepsilon^{n-1})=n$$

又因为复数 $1-\varepsilon^k$（$k=1..n-1$） 的辐角之和为 $0$（请读者自证），故它们的乘积为它们模长的乘积，即：

$$|1-\varepsilon^1|\cdots|1-\varepsilon^{n-2}|\cdot|1-\varepsilon^{n-1}|=n\tag{3}$$

根据引理一和单位复数根模型的性质，可以推出：

$$\prod_{k=1}^{n-1}2\sin\frac{k\pi}{n}=n$$

稍作整理：

$$\boxed{\prod_{x=1}^{n-1}\sin\frac{x\pi}{n}=\frac{n}{2^{n-1}}}$$

证毕.