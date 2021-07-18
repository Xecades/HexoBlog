---
title: 关于正弦函数的泰勒级数展开的证明
mathjax: true
date: 2020-06-13 15:36:42
tags:
 - 泰勒展开
 - 证明
categories:
 - 数学
---

泰勒级数即无穷项泰勒多项式. 

$$\sin x=\dfrac{x^1}{1!}-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\dfrac{x^7}{7!}\cdots$$

这是正弦函数的泰勒级数展开形式，下面使用多阶导对其推导方式作证明. 

<!-- more -->

{% note warning warning %}
实际上，以下内容为泰勒公式中所取有任意阶导数的数值 $x_0$ 为 0 的情况，即麦克劳林级数. 
{% endnote %}

## 目标

我们要用一个多项式来尽可能得逼近 $\sin x$ 函数. 

其中一种方法（泰勒级数）就是保证该多项式在某个点的任意阶导数和原函数（$\sin x$）在该点的对应阶导数值相等. 

也就是说，原函数（$\sin x$）在横坐标为 $x_0$ 的点可求任意阶导数，有如下等式（记 $\sin x = f(x)$，所求多项式函数为 $P(x)$）：

$$\forall n (n\in \mathbb{N}^*), \dfrac{\mathrm{d}^nf}{\mathrm{d}x^n}(x_0)=\dfrac{\mathrm{d}^nP}{\mathrm{d}x^n}(x_0)$$

---

## 推导

设所求多项式 $P(x)$ 为：

$$P(x) = c_0 + c_1x + c_2x^2 + c_3x^3 + \cdots$$

此处，我们取 $x_0=0$

### (n = 0)

也就是不对两函数求导，取 $x=x_0=0$ 代入两式，由 $0 = c_0$，故 $c_0$ 为 0.

---

### n = 1

$$\dfrac{\mathrm{d}f}{\mathrm{d}x}(x) = (\sin x)' = \cos x$$

取 $x=x_0=0$ 时，代入式中，得：

$$\dfrac{\mathrm{d}f}{\mathrm{d}x}(x_0)=\cos0=1$$

而 $P(x)$ 的一阶导为 $c_1+2c_2x+3c_3x^2+\cdots$. 

取 $x=0$，得 $\dfrac{\mathrm{d}P}{\mathrm{d}x}(0)=c_1$

因 $\dfrac{\mathrm{d}f}{\mathrm{d}x}(0)=\dfrac{\mathrm{d}P}{\mathrm{d}x}(0)$，故 $c_1=1$

---

### n = 2

$$\dfrac{\mathrm{d}^2f}{\mathrm{d}x^2}(x) = (\sin x)'' = (\cos x)' = -\sin x$$

$$\dfrac{\mathrm{d}^2f}{\mathrm{d}x^2}(0) = -\sin 0 = 0$$

$$\dfrac{\mathrm{d}^2P}{\mathrm{d}x^2}(x) = 1\times 2\cdot c_2+2\times3\cdot c_3x+3\times4\cdot c_4x^2+\cdots$$

$$\dfrac{\mathrm{d}^2P}{\mathrm{d}x^2}(0) = 2c_2$$

$$\dfrac{\mathrm{d}^2f}{\mathrm{d}x^2}(0) = \dfrac{\mathrm{d}^2P}{\mathrm{d}x^2}(0)$$

$$\Rightarrow c_2=0$$

---

### n = 3

$$\dfrac{\mathrm{d}^3f}{\mathrm{d}x^3}(x) = -\cos x$$

$$\dfrac{\mathrm{d}^3P}{\mathrm{d}x^3}(x) = 1\times2\times3\cdot c_3+2\times3\times4\cdot c_4x+3\times4\times5\times\cdot c_5x^2+\cdots$$

$$\dfrac{\mathrm{d}^3f}{\mathrm{d}x^3}(0) = \dfrac{\mathrm{d}^3P}{\mathrm{d}x^3}(0)$$

$$\Rightarrow -\cos0 = 1\times2\times3\cdot c_3$$

$$\Rightarrow c_3=-\dfrac{1}{6}$$

---

### n = 4

$$\dfrac{\mathrm{d}^4f}{\mathrm{d}x^4}(x) = \sin x$$

$$\dfrac{\mathrm{d}^4P}{\mathrm{d}x^4}(x) = 4!\cdot c_4+\dfrac{5!}{1!}\cdot c_5x+\dfrac{6!}{2!}\cdot c_6x^2+\cdots$$

$$\dfrac{\mathrm{d}^4f}{\mathrm{d}x^4}(0) = \dfrac{\mathrm{d}^4P}{\mathrm{d}x^4}(0)$$

$$\Rightarrow \sin0 = 4!\cdot c_4$$

$$\Rightarrow c_4=0$$

---

### n = 5

我们注意到：

$$(\sin x)' = \cos x, \cos0=1$$

$$(\cos x)' = -\sin x, -\sin0=0$$

$$(-\sin x)' = -\cos x, -\cos0=-1$$

$$(-\cos x)' = \sin x, \sin0=0$$

四轮一个循环，故 $f(x)$ 的五阶导为 $\cos x$

易得，$P(x)$ 的五阶导取 $x=0$ 所得值为 $5!\cdot c_5$

$$\cos 0 = 5!\cdot c_5$$

$$\Rightarrow c_5 = \dfrac{1}{5!}$$

---

### 同理可得

$$c_6 = \dfrac{0}{6!} = 0$$

$$c_7 = \dfrac{-1}{7!} = -\dfrac{1}{7!}$$

$$\vdots$$

---

## 结论

我们已经解出了 $P(x)$ 各项的系数，分别为：

$$0, \dfrac{1}{1!}, 0, -\dfrac{1}{3!}, 0, \dfrac{1}{5!}, 0\cdots$$

即：

$$\sin x\approx P(x)=\dfrac{x^1}{1!}-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\dfrac{x^7}{7!}\cdots$$

完. 