---
title: 另一种计算 π 的方法
mathjax: true
date: 2020-12-18 16:02:32
tags:
 - 圆周率
categories:
 - 数学
---

可以证明:

$$\pi=\lim_{n\rightarrow\infty}3\times2^n\cdot\underbrace{\sqrt{2-\sqrt{2+\cdots+\sqrt{2+\sqrt{3}}}}}_{共 n 个 2}$$

也就是说一共有 $n+1$ 个根号。注意**最外层根号里是减号**，最内层为 $\sqrt{3}$.

<!-- more -->

随着 $n$ 的增加，计算值越来越接近真实值：

![](/assets/pi-pic1.png)

---

## 推导

我们考虑一个单位圆 $O$，它的半径 $r=1$，其周长 $C=2\pi$.

在其中作等腰三角形 $OAB$，因此有 $\alpha=60^\circ$.

![](/assets/pi-pic2.svg)

此时，$\overset{\frown}{AB}$ 可近似看为 $AB$.

则：

$$\begin{align*}
\pi&=3\cdot\overset{\frown}{AB}\\
 &\approx3\cdot AB\\
 &=3\cdot(2\cdot AO\cdot\sin\frac{\alpha}{2})\\
 &=3\times2\cdot\sin\frac{\alpha}{2}
\end{align*}$$

---

对于 $\overset{\frown}{AB}$，我们作 $\angle AOB$ 的角平分线 $OC$，与 $\odot O$ 交于 $C$ 点.

此时，有 $\alpha_1=\frac{\alpha}{2}=30^\circ$.

![](/assets/pi-pic3.svg)

将 $\overset{\frown}{AB}$ 近似看为 $AC+CB$.

则：

$$\begin{align*}
\pi&=3\cdot\overset{\frown}{AB}\\
 &\approx3\cdot(AC+CB)\\
 &=3\times2\cdot AC\\
 &=3\times2\cdot(2\cdot AO\cdot\sin\frac{\alpha_1}{2})\\
 &=3\times2^2\cdot\sin\frac{\alpha}{2^2}
\end{align*}$$

---

以此类推，可以对 $\alpha_1$ 继续分割.

![](/assets/pi-pic4.svg)

得到 $\alpha_2=\frac{\alpha}{2^2}=15^\circ$.

则：

$$\pi\approx3\times2^3\cdot\sin\frac{\alpha}{2^3}$$

---

按照这样的方法，一直进行分割，估算的 $C$ 值也越来越接近 $2\pi$，故有：

$$\pi=\lim_{n\rightarrow\infty}3\times2^n\cdot\sin\frac{\alpha}{2^n}$$

但是，用 $\sin$ 来表示 $\pi$ 显然是不妥的，我们需要找到普通方法吧 $\sin\frac{\alpha}{2^n}$ 展开（当然不是泰勒展开）.

---

我们都知道二倍角公式：

$$\cos2\theta=2\cos^2\theta-1$$

变一下形：

$$2\cos\frac{\theta}{2}=\sqrt{2+2\cos\theta}$$

考虑数列：

$$\begin{align*}
a_0&=2\cos\alpha=\sqrt{3}\\
a_1&=2\cos\frac{\alpha}{2}\\
&\vdots\\
a_n&=2\cos\frac{\alpha}{2^n}
\end{align*}$$

显然，$a_n$ 满足如下递推关系：

$$\left\{\begin{align*}
&a_0=\sqrt{3}\\
&a_n=\sqrt{2+a_{n-1}}
\end{align*}\right.$$

这样，$a_n$ 的表达式中就不包含任何三角函数了，可以用来计算 $\pi$.

则：

$$2\sin\frac{\alpha}{2^n}=2\cdot\sqrt{1-\cos^2\frac{\alpha}{2^n}}=2\cdot\sqrt{1-\frac{a_n^2}{4}}=\sqrt{4-a_n^2}=\sqrt{2-a_{n-1}}$$

那么：

$$\begin{align*}
\pi&=\lim_{n\rightarrow\infty}3\times2^n\cdot\sin\frac{\alpha}{2^n}\\
&=\lim_{n\rightarrow\infty}3\times2^{n-1}\cdot2\sin\frac{\alpha}{2^n}\\
&=\lim_{n\rightarrow\infty}3\times2^{n-1}\cdot\sqrt{2-a_{n-1}}\\
&=\lim_{n\rightarrow\infty}3\times2^n\cdot\sqrt{2-a_n}
\end{align*}$$

把 $a_n$ 展开，也就得到本文开头的式子：

$$\pi=\lim_{n\rightarrow\infty}3\times2^n\cdot\underbrace{\sqrt{2-\sqrt{2+\cdots+\sqrt{2+\sqrt{3}}}}}_{共 n 个 2}$$