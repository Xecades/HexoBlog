---
title: 斐波那契数列通项公式推导
mathjax: true
date: 2020-11-21 11:56:37
tags:
 - 斐波那契
 - 特征方程
categories:
 - 数学
---

<!-- placeholder -->

{% cq %} 斐波那契数列(Fibonacci sequence)，指数列：
1, 1, 2, 3, 5, 8, 13, 25, 38...
即后一项为前两项之和 {% endcq %}

我们不妨用 $\{a_n\}$ 表示斐波那契数列，那么有：

$$\left\{\begin{align*}
& a_n = a_{n-1}+a_{n-2} \\\\
& a_1 = a_2=1
\end{align*}\right.$$

我们采用特征方程来推导通项公式.

<!-- more -->

---

## 证明

设 $x$，$y$ 满足：

$$a_n-xa_{n-1}=y\cdot (a_{n-1}-xa_{n-2})$$

整理可得：$$a_n=(x+y)a_{n-1}-xy\cdot a_{n-2}$$

通过斐波那契的定义我们可以知道：$$a_n = a_{n-1}+a_{n-2}$$

故有：

$$\left\{\begin{align*}
& x+y = 1 \\\\
& -xy = 1
\end{align*}\right.$$

根据韦达定理，我们得出 $x$，$y$ 满足特征方程：

$$x^2-x-1=0$$

通过求根公式可以知道 $x,y=\frac{1\pm\sqrt{5}}{2}$

因为 $x$，$y$ 的位置是对称的，我们可以列出以下式子

$$\left\{\begin{align*}
& ①\space a_n-xa_{n-1}=(a_2-xa_1)\cdot y^{n-2}=y^{n-1} \\\\
& ②\space a_n-ya_{n-1}=(a_2-ya_1)\cdot x^{n-2}=x^{n-1}
\end{align*}\right.$$

$②-①$ 得：$(x-y)\cdot a_{n-1}=x^{n-1}-y^{n-1}$

$\Rightarrow a_{n-1}=\frac{x^{n-1}-y^{n-1}}{x-y}$

$\Rightarrow a_n=\frac{x^n-y^n}{x-y}$

由于 $x$，$y$ 的对称性，我们可以直接代入 $x,y=\frac{1\pm\sqrt{5}}{2}$：

$$a_n=\frac{(\frac{1+\sqrt{5}}{2})^n-(\frac{1-\sqrt{5}}{2})^n}{\sqrt{5}}$$

这样我们就得到了 $a_n$ 的通项. 最神奇的一点是，尽管式中包含无理数，$n$ 为整数时结果却仍是整数.

---

## 黄金分割比

相信大家都知道斐波那契后一项与前一项的比值会越来越趋近黄金分割率1.618.

也就是说：

$$\lim_{n\rightarrow+\infty}\frac{a_{n+1}}{a_n}=\frac{\sqrt{5}+1}{2}$$

下面的内容就十分简单了，读者可以试着自己证一下.

为了方便表述，我们还是用 $x$，$y$ 来表示斐波那契通项：

$$a_n=\frac{x^n-y^n}{x-y}$$

这里 $x$，$y$ 分别为：

$$\left\{\begin{align*}
& x=\frac{1+\sqrt{5}}{2} \\\\
& y=\frac{1-\sqrt{5}}{2}
\end{align*}\right.$$

则：

$$\begin{align*}
\frac{a_{n+1}}{a_n} &= \frac{\frac{x^{n+1}-y^{n+1}}{x-y}}{\frac{x^n-y^n}{x-y}} \\\\
&= \frac{x^{n+1}-y^{n+1}}{x^n-y^n} \\\\
&= \frac{x\cdot x^n-x\cdot y^n-(y-x)\cdot y^n}{x^n-y^n} \\\\
&= x+(x-y)\cdot\frac{y^n}{x^n-y^n} \\\\
&= x+(x-y)\cdot\frac{1}{(\frac{x}{y})^n-1}
\end{align*}$$

易得 $\frac{x}{y}>1$

故当 $n\rightarrow+\infty$ 时，$(\frac{x}{y})^n-1\rightarrow+\infty$

所以有：

$$\lim_{n\rightarrow+\infty}\frac{a_{n+1}}{a_n}=\lim_{n\rightarrow+\infty}[x+(x-y)\cdot\frac{1}{(\frac{x}{y})^n-1}]=x=\frac{1+\sqrt{5}}{2}$$

证毕.