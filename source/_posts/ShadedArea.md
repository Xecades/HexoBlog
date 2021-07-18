---
title: 「小学数学」求阴影部分面积
date: 2021-06-21 22:27:45
categories: 数学
tags:
 - 钓鱼
 - 阴影部分
---

![](/assets/ShadedArea-pic1.svg)

<!-- more -->

> 忠告：千万不要把这道题给你在读小学的朋友做，如果出事我不负责🙏.

（你大可以放心大胆地使用你所知道的高等数学知识，毕竟这是一道著名的钓鱼题.）

---

## 假装是小学难度的几何方法

首先我们拿起笔，胸有成竹地作几条显而易见的辅助线：

![](/assets/ShadedArea-pic2.svg)

$S = S_1 + S_2$，不就是两个弓形相加嘛！

显然有 $S_2 = S_{\text{扇形}ABC} - S_{\triangle ABC}$，$S_1 = S_{\text{扇形}EBC} - S_{\triangle EBC}$.

再来几条辅助线：

![](/assets/ShadedArea-pic3.svg)

显然，我们可以得到 $\triangle ABE \sim \triangle BHC$，那么，$\angle BAE = \angle HBC$，那么：

$$\dfrac{CH}{BH} = \dfrac{BE}{AB} = \dfrac{2}{4} = \dfrac{1}{2}$$

而 $BE = EC = 2$，设 $EH = x$，那么我们可以根据勾股定理得到这个方程：

$$\sqrt{4 - x ^ 2} \times 2 = 2 + x$$

解得，$EH = \dfrac{6}{5}$，$CH = \dfrac{8}{5}$.

记 $\angle CBH = \theta$，由小学二年级的知识，有：

$$\boxed{\theta = \arctan\dfrac{1}{2}}$$

那么，$\angle BEC = \pi - 2\theta$，$\angle BAC = 2\theta$.（如果你疑问小学为什么学了弧度制，不妨假装某个天才在解题过程中独立提出了这套体系🎉）

万事俱备，下面开始着手算啦！

$$S_{\text{扇形}ABC} = \dfrac{1}{2}\times4^2\times2\theta = 16\theta$$

$$S_{\text{扇形}EBC} = \dfrac{1}{2}\times2^2\times(\pi - 2\theta) = 2\pi - 4\theta$$

又有 $\theta=\arctan\dfrac{1}{2}=\arcsin\dfrac{1}{\sqrt{5}}=\arccos\dfrac{2}{\sqrt{5}}$，所以根据小学二年级学的正弦定理：

$$\begin{align*}
S_{\triangle ABC} &= \dfrac{1}{2}\times4^2\times\sin(2\theta)\\
&=16\sin\theta\cos\theta\\
&=16\sin(\arcsin\dfrac{1}{\sqrt{5}})\cos(\arccos\dfrac{2}{\sqrt{5}})\\
&=16\times\dfrac{1}{\sqrt{5}}\times\dfrac{2}{\sqrt{5}}\\
&=\dfrac{32}{5} \\
S_{\triangle EBC} &= \dfrac{1}{2}\times2^2\times\sin(\pi-2\theta)\\
&=4\sin\theta\cos\theta\\
&=4\times\dfrac{1}{\sqrt{5}}\times\dfrac{2}{\sqrt{5}}\\
&=\dfrac{8}{5}
\end{align*}$$

简单加加减减，我们就得到了阴影部分的面积啦🎉！

$$\begin{align*}
S &= 16\theta + 2\pi - 4\theta + \dfrac{32}{5} + \dfrac{8}{5}\\
&= \boxed{2\pi+12\arctan\dfrac{1}{2}-8}\\
&\approx 3.8469...
\end{align*}$$

> 手动狗头.

---

## 把暴力美学演绎得淋漓尽致的做法

咋做？肯定是要建系积分啊！

先建一波 $xOy$ 系：

![](/assets/ShadedArea-pic4.svg)

这里我们对这里的长度 $l$ 积分，下面当务之急就是列出 $l$ 的表达式.

先列一下两个圆的表达式：

$$\left\{\begin{align*}
&\odot A:x^2+(y-4)^2=16\\
&\odot E:(x-2)^2+y^2=4
\end{align*}\right.$$

由此得出两端圆弧的显式方程：

$$\left\{\begin{align*}
&\mathop{OPC}\limits^{\frown}: y = \sqrt{4 - (x - 2)^2}\\
&\mathop{OPB}\limits^{\frown}: y = 4 - \sqrt{16 - x^2}
\end{align*}\right.$$

先确定积分区间吧，显然积分下限是 $0$，上限就是这两段弧的交点.

两式联立，我们很容易得到交点是 $P(\dfrac{16}{5},\dfrac{8}{5})$，而且：

$$\boxed{l = \sqrt{4 - (x - 2)^2} + \sqrt{16 - x^2} - 4}$$

然后……积积复积积！

$$\begin{align*}
S &= \int_0^{16/5}(\sqrt{4 - (x - 2)^2} + \sqrt{16 - x^2} - 4)\mathrm{d}x\\
&= \int_0^{16/5}\sqrt{4 - (x - 2)^2}\cdot\mathrm{d}x + \int_0^{16/5}\sqrt{16 - x^2}\cdot\mathrm{d}x - \int_0^{16/5}4\cdot\mathrm{d}x
\end{align*}$$

让我们把笔放下，不妨思考思考前两个积分怎么算.

既然是暴力美学，使用几何意义算显然是很不合时宜的🙄.

我们自然想到三角换元积分：

$$\begin{align*}
&\int\sqrt{a^2-x^2}\cdot\mathrm{d}x \\
&= a\int\cos\theta\cdot\mathrm{d}(a\sin\theta) &(\text{设}x=a\sin\theta)\\
&= a^2\int\cos^2\theta\cdot\mathrm{d}x \\
&= \dfrac{a^2}{2}\int(1+\cos2\theta)\cdot\mathrm{d}x &(\text{余弦二倍角公式}) \\
&= \dfrac{a^2}{2}\cdot(\theta+\dfrac{1}{2}\sin2\theta)+C &(\text{正弦二倍角公式}) \\
&= \dfrac{a^2}{2}\cdot(\theta+\sin\theta\cos\theta)+C
\end{align*}$$

那么：

$$\begin{align*}
&\int_0^{16/5}\sqrt{4 - (x - 2)^2}\cdot\mathrm{d}x &(\text{设}x=2\sin\theta+2) \\
&= \dfrac{2^2}{2}\cdot[\theta+\sin\theta\cos\theta]\bigg|_{x=0}^{x=16/5} \\
&= 2\cdot[\theta+\sin\theta\cos\theta]\bigg|_{-\pi / 2}^{\arcsin(3/5)} \\
&= 2\arcsin\dfrac{3}{5} + 2\cdot\sin(\arcsin\dfrac{3}{5})\cdot\cos(\arccos\dfrac{4}{5}) + \pi &(\arcsin\dfrac{3}{5} = \arccos\dfrac{4}{5}) \\
&= 2\arcsin\dfrac{3}{5} + \dfrac{24}{25} + \pi
\end{align*}$$

同理：

$$\begin{align*}
&\int_0^{16/5}\sqrt{16 - x^2}\cdot\mathrm{d}x &(\text{设}x=4\sin\theta) \\
&= \dfrac{4^2}{2}\cdot[\theta+\sin\theta\cos\theta]\bigg|_{x=0}^{x=16/5} \\
&= 8\cdot[\theta+\sin\theta\cos\theta]\bigg|_0^{\arcsin(4/5)} \\
&= 8\arcsin\dfrac{4}{5} + 8\cdot\sin(\arcsin\dfrac{4}{5})\cdot\cos(\arccos\dfrac{3}{5}) &(\arcsin\dfrac{4}{5} = \arccos\dfrac{3}{5}) \\
&= 8\arcsin\dfrac{4}{5} + \dfrac{96}{25}
\end{align*}$$

继续，要结束了！

$$\begin{align*}
S &= \int_0^{16/5}(\sqrt{4 - (x - 2)^2} + \sqrt{16 - x^2} - 4)\mathrm{d}x \\
&= \int_0^{16/5}\sqrt{4 - (x - 2)^2}\cdot\mathrm{d}x + \int_0^{16/5}\sqrt{16 - x^2}\cdot\mathrm{d}x - \int_0^{16/5}4\cdot\mathrm{d}x \\
&= (2\arcsin\dfrac{3}{5} + \dfrac{24}{25} + \pi) + (8\arcsin\dfrac{4}{5} + \dfrac{96}{25}) + (4 \ times \dfrac{16}{5}) \\
&= 2\pi + 6\arcsin\dfrac{4}{5} - 8 \\
&= 2\pi + 12\arctan\dfrac{1}{2} - 8 \approx 3.8469...
\end{align*}$$

至于这里的最后一步，是用了 $\arcsin\dfrac{4}{5} = 2\arctan\dfrac{1}{2}$，我画个图就好解释了.

![](/assets/ShadedArea-pic5.svg)

在这幅图中，$\arcsin\dfrac{4}{5} = \theta = 2\alpha = 2\arctan\dfrac{1}{2}$.

完结散花🎉.