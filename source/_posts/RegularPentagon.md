---
title: 可推广的尺规作图思想 - 以正五边形为例
mathjax: true
date: 2020-02-27 21:56:13
tags:
 - 尺规作图
 - 复数
categories:
 - 数学
---

<!-- placeholder -->

{% cq %} 尺规作图 (Compass-and-straightedge) 是起源于古希腊的数学课题. 
只使用圆规和直尺，并且只准许使用有限次，来解决不同的平面几何作图题.  {% endcq %}

 - 直尺必须没有刻度，无限长，且只能使用直尺的固定一侧. 只可以用它来将两个点连在一起，不可以在上画刻度. 
 - 圆规可以开至无限宽，但上面亦不能有刻度. 它只可以拉开成你之前构造过的长度或一个任意的长度. 

{% note warning warning %}
尺规作正五边形有更简单的方法，此处使用正五边形为例只是叙述方便，实际上，这种方法可以作出正十七边形. 
{% endnote %}

下面是尺规作正五边形的方法. 

<!-- more -->

---

## 预备知识

若已知长度为 1 的线段 (不妨称之为单位线段). 尺规可作以下算式

### 两数之和 & 两数之差

无非就是把两条线段拼在一起，略. 

---

### 两数之积

已知单位线段、长度为 a 的线段和长度为 b 的线段，作长度为 a $\times$b 的线段

1. 随意做一个角 (顶点 O)
2. 在一边上取单位线段 OA
3. 在 A 点取一条长度为 a 的线段 AB
4. 在该角的另一条边上以 O 点为端点、长度为 b 的线段 OC
5. 连接 AC
6. 作 AC 的平行线 BD，交线段 AB 于点 B

CD 即为所求. 

![](/assets/RegularPentagon-pic1.svg)

---

### 两数之商

$a\div b = a\times\dfrac{1}{b}$

---

### 求倒数

已知单位线段和长度为 a 的线段，作长度为 $\dfrac{1}{a}$ 的线段

1. 随意作一角，顶点为 O
2. 在一条边上取长度为 a 的线段 OA
3. 在 A 点取一条单位线段 AB
4. 在该角另一条边处取单位线段 OC
5. 连接 AC
6. 作 AC 的平行线 BD，交线段 AB 于点 B

CD 即为所求. 

![](/assets/RegularPentagon-pic2.svg)

---

### 求平方根

已知单位线段和长度为 a 的线段，作长度为 $\sqrt{a}$ 的线段

1. 作一条单位线段 AC
2. 作一条与单位线段水平的长度为 a 的线段 CB，构成线段 ACB (AB)
3. 取线段 AB 中点 O
4. 以 O 为圆心，AB 为直径作圆 O
5. 过 C 点作 AB 的垂线段 CD，交圆 O 于点 D

CD 即为所求.

![](/assets/RegularPentagon-pic3.svg)

---

### 结论

{% cq %}任何可以用**有限次**加减乘除和开方运算表示出的实数，都能够用尺规作图作出.{% endcq %}

---

## 正文

### 目标

假定我们已经有了一个正五边形，其外接圆半径为 1，将其画入复平面

![](/assets/RegularPentagon-pic4.svg)

连接 OB，过 B 点作实轴的垂线，垂足为 F

![](/assets/RegularPentagon-pic5.svg)

记 $\angle BOF = \theta$，则 $OF = \cos\theta$

不难看出，作出 OF，作正五边形的问题也就解决了

**即用加减乘除和根号表示出 $\cos\theta$ ($\theta = 72^{\circ}$)**

---

### 标号

不妨设 A 对应复数 $\varepsilon_0$，B 点对应 $\varepsilon_1$，以此类推，E 点对应 $\varepsilon_4$

![](/assets/RegularPentagon-pic6.svg)

可得出表达式：

$$\varepsilon_k=\cos(k\cdot\theta)+i\cdot\sin(k\cdot\theta)\space(k\in\mathbb{N})$$

因为 $\varepsilon_k$ 在单位圆上，故有以下众所周知的定理：

1. $\varepsilon_k=\varepsilon_1^k$
2. $\varepsilon_5=\varepsilon_1^5=\varepsilon_0=1$
3. $\sum\limits_{k=0}^4\varepsilon_k=0$

---

### 推导

由定理 3 和定理 2 可得：

$$\varepsilon_1+\varepsilon_2+\varepsilon_3+\varepsilon_4=-1$$

注意到 $\varepsilon_1+\varepsilon_4=\cos\theta+i\sin\theta+\cos\theta-i\sin\theta=2\cos\theta$

所以 $\cos\theta=\dfrac{1}{2}(\varepsilon_1+\varepsilon_4)$

令 $x_1=\varepsilon_1+\varepsilon_4$，$x_2=\varepsilon_2+\varepsilon_3$

则：

$x_1+x_2=\varepsilon_1+\varepsilon_2+\varepsilon_3+\varepsilon_4=-1$

$$\begin{align*}
x_1\cdot x_2 &= (\varepsilon_1+\varepsilon_4)\cdot(\varepsilon_2+\varepsilon_3) \\
 &= \varepsilon_1\cdot\varepsilon_2+\varepsilon_4\cdot\varepsilon_2+\varepsilon_1\cdot\varepsilon_3+\varepsilon_4\cdot\varepsilon_3 \\
 &= \varepsilon_3+\varepsilon_6+\varepsilon_4+\varepsilon_7 \\
 &= \varepsilon_3+\varepsilon_1+\varepsilon_4+\varepsilon_2 \\
 &= -1
\end{align*}$$

我们得到了：

$$\left\{\begin{align*}
x_1+x_2=-1 \\
x_1\cdot x_2=-1
\end{align*}\right.$$

自然联想到**韦达定理**

$x_1,x_2$ 是方程 $x^2+x-1=0$ 的两个根

通过求根公式，我们可以得到

$$x=\dfrac{-1\pm\sqrt{5}}{2}$$

又因为 $x_1>0$，$x_2<0$

有 $x_1=\dfrac{-1+\sqrt{5}}{2}=2\cos\theta$

则 $\cos\theta=\dfrac{-1+\sqrt{5}}{4}$

完.

---

## 欣赏

高斯作正十七边形求出的 $\cos\dfrac{2\pi}{17}$：

$$\cos\dfrac{2\pi}{17}=\dfrac{1}{16}(-1+\sqrt{17}+\sqrt{2(17-\sqrt{17})}+2\sqrt{17+3\sqrt{17}-\sqrt{2(17-\sqrt{17})}-2\sqrt{2(17+\sqrt{17})}})$$