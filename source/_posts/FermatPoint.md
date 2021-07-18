---
title: 使用复数方法寻找凸多边形的费马点
mathjax: true
date: 2021-01-09 20:23:17
tags:
 - 证明
 - 复数
categories:
 - 数学
---

<!-- placeholder -->

{% cq %} 费马点（Fermat's point）又称托里切利点（Torricelli's Point），
费马点 $O$ 是位于凸多边形内的一个点，
它满足到各顶点距离之和最小，
这样的点是存在且唯一的. {% endcq %}

定理如下：

> 对于任意 $n$ 边形，其顶点为 $A_1..A_n$，
> 取 $O$ 点满足 $\angle A_1OA_2=\angle A_2OA_3=\cdots=\dfrac{2\pi}{n}$
> 那么对于任意点 $P$，有：
> $$\boxed{\sum_{k=1}^{n}|PA_k|\geq\sum_{k=1}^{n}|OA_k|}$$

实际上这里的 $O$ 点就是费马点.

下面对该定理进行证明.

<!-- more -->

---

注意到 $\overrightarrow{OA_k}$ 是把 $2\pi$ 均分的，联想到单位复数根模型，考虑把 $\overrightarrow{OA_k}$ 进行旋转变换.

记向量 $\overrightarrow{OA_k}$ 对应的复数为 $a_k$.

记向量 $\overrightarrow{OP}$ 对应的复数为 $z$.

记 $\varepsilon^k\space (k\in[0,n-1])$ 为 $x^n-1=0$ 在复数域上的第 $k$ 个根.

显然，对于每个 $a_k$，一定可以找到唯一的一个 $\varepsilon^t$，使得 $a_k\cdot\varepsilon^t$ 为实数.

因为 $a_k$ 是无序的，不妨假设这里的 $t$ 就是 $k$.

可以得到：

$$\begin{align*}
\mathrm{RHS} &= \sum|OA_k|\\
&= \sum|a_k|\\
&= \sum|a_k\varepsilon^k| &(\text{因为 }|\varepsilon^k|=1)\\
&= |\sum a_k\varepsilon^k| &(\text{因为 }a_k\cdot\varepsilon^k\in\mathbb{R})
\end{align*}\tag{1}$$

和

$$\begin{align*}
\mathrm{LHS} &= \sum|PA_k|\\
&= \sum|a_k-z|\\
&= \sum|(a_k-z)\cdot\varepsilon^k|\\
&\geq |\sum(a_k-z)\cdot\varepsilon^k|\\
&= |\sum a_k\varepsilon^k-\sum z\varepsilon^k|\\
&= |\sum a_k\varepsilon^k| &(\text{因为 }\sum\varepsilon^k=0)\\
&= \mathrm{RHS}
\end{align*}\tag{2}$$

由式 $(1)$ 和式 $(2)$ 得：$\mathrm{LHS}\geq\mathrm{RHS}$，即：

$$\boxed{\sum_{k=1}^{n}|PA_k|\geq\sum_{k=1}^{n}|OA_k|}$$

证毕.