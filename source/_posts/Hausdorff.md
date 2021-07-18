---
title: 豪斯多夫维度
mathjax: true
date: 2020-02-25 23:22:46
tags:
 - 豪斯多夫维度
categories:
 - 数学
---

研究性学习需要，我学了一下豪斯多夫维度

{% cq %} 豪斯多夫维数 (Hausdorff Dimension) 由数学家豪斯多夫于 1918 年引入. 
通过豪斯多夫维数可以定义**任意度量空间**的子集之维数，包括像是**分形等复杂的集合**.  
其值可能会是一个**非整的有理数**或者**无理数**{% endcq %}

<!-- more -->

---
## 引入

我们看一个图：

![](/assets/Hausdorff-pic1.png)

长得还挺别致嘛！

好的，我告诉你，它不是二维，更不是三维. 

它是 $\log_34$ 维！

---

## $\sigma$-代数

By the way，前面的 $\sigma$ 是 $\Sigma$ 的小写

根据我的理解，它可以定义如下

对于 $\forall$ 集合 $X$，设它的子集为 $A_1,A_2\dots A_n$，即：

$$\bigcup_{i=1}^{n}A_i=X$$

其中，$\bigcup$ 表示把符合条件的集合并起来，类似于 $\Sigma$

$\sigma$-代数是 $X$ 的幂集的子集合，何为幂集呢？幂集就是 $X$ 的所有子集的集合，这也说明，它的集合元素也是个集合

$\sigma$-代数有如下性质（记$\sigma$-代数为$F$，$X$ 的幂集为 $P(x)$）

1. $X\in F$
2. 对于 $\forall T\subseteq X$, 有 $T\in F$
3. 对于 $\forall T\in F$, 有 $\complement_XT\in F$
4. 若 $A_1,A_2\dots A_n\in F(n \in \mathbb{N})$ , 则 $\bigcup_{i=1}^nA_i\in F$

该 $F$ 就是 $\sigma$-代数

### 举个栗子

$\sigma$-代数是盯着一个集合 $X$ 看的，我们举 $X=${$114,5,14$}

它的子集为 {$114$}$,${$5$}$,${$14$}$,${$114,5$}$,${$114,14$}$,${$5,14$}$,${$114,5,14$}，慢着，还有我们<span title="可恶的">**可爱的**</span> $\varnothing$ 呢

所以，该集合的 $\sigma$-代数为 {$\varnothing,${$114$}$,${$5$}$,${$14$}$,${$114,5$}$,${$114,14$}$,${$5,14$}$,${$114,5,14$}}

---
## 测度

{% note warning warning %}
注意，以下内容仅代表个人理解
{% endnote %}

{% cq %} 数学上，测度 (measure) 是一个函数，它对一个给定集合的某些子集指定一个数，
这个数可以比作大小、体积、概率等等.  {% endcq %}

传统的积分在区间上进行，后来人们希望把积分推广到**任意的**集合上，就发展出了测度的概念. 

对于集合 $X$，若集合 $A$ 是 $X$ 的 $\sigma$-代数，测度 $\mu$ 是定义在 $A$ 上的函数，其定义域为 $[0,\infty)$

{% note info info %}
严格讲，这种 $\mu$ 是**可数可加**的**正测度**
{% endnote %}

它有如下性质：

1. **非负性**，对于 $\forall E\in A$，有 $\mu(E)\geq0$
2. **空集合的测度为零**，$\mu(\varnothing)=0$
3. **可数可加性**($\sigma$-可加性)，对于 $\forall E_i, E_j\in A(i\neq j)$，且 $E_i\cap E_j=\varnothing$，有:

$$\mu(\bigcup_{i=1}^\infty E_i)=\sum_{i=1}^\infty\mu(E_i)$$

（别被吓到了，这还是比较好理解的）

通俗的说，测度把每个集合映射到**非负实数**来规定这个集合的大小：空集的测度是0；集合变大时测度至少不会减小（因为要加上变大的部分的测度，而那一部分的测度是非负的）

例如：

![](/assets/Hausdorff-pic3.png)

---
## 豪斯多夫维度

我们常用的维度法则为拓扑维度，维度数为整数，而豪斯多夫维度允许维度数为小数乃至无理数. 

由此可见前文略有疏漏，从拓扑维度的角度看，该图形是二维的，但从豪斯多夫维度看，它是 $\log_34$ 维的. 

---
## 表达式

{% note warning warning %}
知识所限，~~豪斯多夫维度的严谨表达式看不懂~~，以下为我的通俗理解
{% endnote %}

豪斯多夫维度的测量方法是看**测度**和**缩放系数**之间的关系

所谓测度，就是体积、面积、长度等属性

例如，线段放大两倍，其缩放系数为 2，测度（此时是长度）为 2，其豪斯多夫维就是 $\log_22=1$ 维

再如，正方形放大两倍，缩放系数为 2，测度（面积）为 4，豪斯多夫维为 $\log_24=2$

正方体同理，由此可见，他们的豪斯多夫维度和拓扑维度相等，都为 $\log_{缩放系数}测度$. 

---
## 例如 Koch 曲线

![](/assets/Hausdorff-pic1.png)

科赫曲线，其迭代规则见我的[另一篇博客](https://blog.xecades.xyz/articles/fractal/)


![](/assets/Hausdorff-pic2.png)

显然，对其测度属性的选择，我们选"长度"

一条长度为 $x$ 的线段经过科赫曲线的规则处理，形成 4 条长度为 $\dfrac{x}{3}$ 的线段，故缩放系数为 3，测度为 4

其豪斯多夫维度就为 $\log_34$

---
## 引用

Reference:
- [英文 Wikipedia: 测度](https://en.wikipedia.org/wiki/Measure_(mathematics)) by [Wikipedia](https://en.wikipedia.org/)
- [中文 Wikipedia: 测度](https://zh.wikipedia.org/wiki/测度) by [Wikipedia](https://zh.wikipedia.org/)
- [中文 Wikipedia: 豪斯多夫维度](https://zh.wikipedia.org/zh-hans/豪斯多夫维数) by [Wikipedia](https://zh.wikipedia.org/)
- [中文 Wikipedia: $\sigma$-代数](https://zh.wikipedia.org/wiki/Σ-代数) by [Wikipedia](https://zh.wikipedia.org/)
- [知乎匿名回答](https://www.zhihu.com/question/29183993/answer/94808353) at [知乎提问: 如何用通俗的语言解释豪斯多夫维数](https://www.zhihu.com/question/29183993)

---
目前我对豪斯多夫维度的认识还是比较肤浅，希望能够理解那些我看不懂的内容. 