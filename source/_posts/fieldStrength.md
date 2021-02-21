---
title: 圆面场强公式的积分推算
mathjax: true
date: 2020-09-12 09:00:49
tags:
 - 场强
categories:
 - 数学
---

如图，真空中均匀带电且单位面积带电量为 $\sigma$ 的圆面垂直穿过直线 l，其半径为 R，圆面与直线恰为圆心. 直线 l 上距离圆心 x 距离处有一点 P. 试求 P 点处的场强大小. 

![](/assets/fieldStrength-pic1.svg)

<!-- more -->

---

对组成圆面的每一个圆积分，设小圆半径为 r，设 $r = x\tan\theta$.

圆上每个点与 P 点的距离为 $\sqrt{x^2+r^2}$，则每个点在 P 点处的场强为：

$$\frac{k\sigma}{x^2+r^2}$$

方向斜向右下，根据对称性，圆上的场强矢量和在直线 l 上. 

正交分解可得，每个点在水平方向上对场强的贡献为：

$$\frac{k\sigma}{x^2+r^2}\cdot\cos\theta=\frac{k\sigma}{x^2+r^2}\cdot\frac{x}{\sqrt{x^2+r^2}}$$

那么，圆整体对 P 点的场强为：

$$E_r=\frac{k\sigma}{x^2+r^2}\cdot\frac{x}{\sqrt{x^2+r^2}}\cdot2\pi r$$

对其积分：

$$E=\int_0^RE_r\mathrm dr=\int_0^R\frac{k\sigma}{x^2+r^2}\cdot\frac{x}{\sqrt{x^2+r^2}}\cdot2\pi r\mathrm dr$$

整理可得：

$$E=k\sigma\cdot2\pi x\cdot\int_0^Rr\cdot(x^2+r^2)^{-\frac{3}{2}}\mathrm dr$$

易得：

$$[-(x^2+r^2)^{-\frac{1}{2}}]'=r\cdot(x^2+r^2)^{-\frac{3}{2}}$$

根据牛顿 - 莱布尼茨公式得：

$$E=k\sigma\cdot2\pi x\cdot[-(x^2+R^2)^{-\frac{1}{2}}+(x^2+0^2)^{-\frac{1}{2}}]=k\sigma\cdot2\pi\cdot(1-\frac{x}{\sqrt{x^2+R^2}})$$

done.