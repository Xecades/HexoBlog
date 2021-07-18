---
layout: post
title: 研究性学习 - 简单分形几何图形的性质及作法研究
date: 2020-01-17 13:43:45
tags:
 - 分形
categories:
 - 数学
---

课题标题：《简单分形几何图形的性质及作法研究》

{% cq %}分形(fractal)是一个**粗糙**或**零碎**的几何形状，
可以分成数个部分，且每一部分都(至少近似地)是整体缩小后的形状，
即具有**自相似**的性质.  {% endcq %}

<!-- more -->

{% note warning warning %}
请注意，以下内容不是论文原文
{% endnote %}

---

## 引入

{% cq %} 分形是空间上的混沌，混沌是时间上的分形 {% endcq %}

1861 年，德国数学家魏尔施特拉斯(Karl Theodor Wilhelm Weierstraβ)发现了一个函数:

$$f(x)=\sum^\infty_{n=0}a^n\cos(b^n\pi x)$$

<center>其中$0&lt;a&lt;1，b$为正奇数，且$ab&gt;1+\dfrac{3}{2}\pi$</center>

它的图像如下:

由于 Mathematica 求和无限级数出现提示无法收敛的情况，假定无限大为 1000，此处取`a = 0.8`，`b = 11`

![](/assets/fractal-pic1.png)

``` Mathematica Mathematica 代码
Plot[Sum[0.8 ^ i * Cos[11 ^ i * Pi * x], {i, 0, 1000}], {x, -100, 100}]
```

而且此函数**不可导**，这意味着它的**每一个点都是拐点**！这和当时人们认为万物可导的观点相悖，因此，**分形几何学**应运而生

---
## 弦图分形

想必大家都知道赵爽弦图，它的中央会有一个较小的正方形，如果我们在这个正方形中按照同样的比例绘制赵爽弦图，会怎么样呢？

{% note default %}
电脑性能缘故，此处迭代 50 次
{% endnote %}

![](/assets/fractal-pic6.gif)

![](/assets/fractal-pic2.png)

绘制工具：几何画板

---
## 科赫曲线

{% cq %}科赫曲线 (Koch snowflake) 是一种分形. 其形态似雪花，又称科赫雪花、雪花曲线. 
其豪斯多夫维度是 $\log_34$ 维 {% endcq %}

![](/assets/fractal-pic7.png)

### 生成方法

给定线段 AB，步骤如下

1. 将线段分成三等份(AC, CD, DB)
2. 以 CD 为底，向外(内外随意)画一个**等边三角形** DMC
3. 将线段 CD 移去
4. 分别对 AC，CM，MD，DB 重复 1 ~ 3 的步骤. 

![](/assets/fractal-pic3.gif)

### 面积公式

{% note warning warning %}
此处的面积指科赫曲线边缘围成的封闭图形的面积
{% endnote %}

首先，我们很容易得到边长为 a 的正三角形的面积公式：

$$S=\dfrac{\sqrt{3}}{4}a^2$$

每经过一次迭代，边数 N 变为原来的 4 倍，N 也是新增小正三角形的个数. 

新增的小正三角形边长变为原来的 $\dfrac{1}{3}$

可得，迭代 n 次科赫曲线的面积为：

$$S_n=\dfrac{\sqrt{3}}{4}a^2[1+\sum_{i=1}^{n-1}\dfrac{3}{4}\cdot(\dfrac{4}{9})^i]$$

我们求其极限：

$$\lim_{n\rightarrow+\infty}S_n=\dfrac{\sqrt{3}}{4}a^2[1+\sum_{i=1}^{n-1}\dfrac{3}{4}\cdot(\dfrac{4}{9})^i]$$

$$=\dfrac{\sqrt{3}}{4}a^2[1+\dfrac{3}{4}\cdot\dfrac{\dfrac{4}{9}(1-(\dfrac{4}{9})^{n-1})}{1-\dfrac{4}{9}}]$$

$$=\dfrac{\sqrt{3}}{4}a^2[1+\dfrac{3}{4}\cdot\dfrac{\dfrac{4}{9}(1-0)}{1-\dfrac{4}{9}}]$$

$$=\dfrac{\sqrt{3}}{4}a^2\cdot\dfrac{8}{5}$$

$$=\dfrac{2}{5}\sqrt{3}a^2$$

即科赫曲线面积为 $\dfrac{2}{5}\sqrt{3}a^2$

---
## 曼德勃罗集

{% cq %} 人类**有史以来**做出的最奇异,最瑰丽的几何图形 {% endcq %}

<center>$Z_{i + 1} = Z_{i}^2 + C(Z,C\in\mathbf{C}$, 自变量是 $C)$</center>

曼德勃罗集(Mandelbrot)就是所有使得该式无限迭代后的结果能保持有限数值(即收敛)的复数 C 的集合

对于集合中的每一个元素，将其画在复平面上，可得曼德勃罗集的图形

以下为各种平台曼德勃罗集的画法

### 几何画板

录制耗时：4.5h，压缩耗时：2h，加速耗时：30min

![](https://s2.ax1x.com/2020/01/18/1Sqcxe.gif)

最终结果如下

![](/assets/fractal-pic5.png)

{% note tip tip %}
**优点**: 较为直观，不需要太深的计算机知识
{% endnote %}

{% note caution caution %}
**缺点**: 太慢了(gif 已经加速 10 倍了)，若提速清晰度会降低，而且放大无法保证清晰度
{% endnote %}

### C++

制作耗时：10min，运行耗时：≈0

![](/assets/fractal-pic8.png)

{% linkcard "https://one.xecades.xyz/%F0%9F%92%BB%20Projects/Mandelbrot/Mandelbrot.cpp" "Mandelbrot C++ 源码" %}

{% note tip tip %}
**优点**: 速度极快，代码相对简单，后期上色处理容易
{% endnote %}

{% note caution caution %}
**缺点**: 清晰度不高，实现无限放大不易，有亿点丑（
{% endnote %}

### Python

{% note info info %}
程序来自网络
{% endnote %}

运行耗时：10min(1000 × 1000)， 30min(10000 × 10000)

内存消耗：未记录(1000 × 1000)，3.5G(10000 × 10000)

使用 python 库 matplotlib 绘制图像，支持放大

![](/assets/fractal-pic9.png)

![](/assets/fractal-pic10.png)

{% note tip tip %}
**优点**: 速度较快，清晰度较高，支持放大
{% endnote %}

{% note caution caution %}
**缺点**: 耗电脑 CPU，若清晰度高，耗时无法接受，不能无限放大
{% endnote %}

### Ultra Fractal

我用 Ultra Fractal 自带的曼德勃罗分形动画导出了视频

**运行耗时：8h**，压缩耗时：2h

压缩前视频大小：4G，压缩后视频大小：13MB

#### 图片 & Gif

![](/assets/fractal-pic11.png)

![](/assets/fractal-pic12.png)

![](/assets/fractal-pic13.png)

以下 gif 显示曼德勃罗集的各点对应的朱利亚集

![](https://img.vim-cn.com/74/005f241273f204411072a16eaf3c0610bd904b.gif)

#### 视频

{% dplayer "url=/assets/fractal-vid1.mp4" "loop=true" %}

{% fold 生成日志 %}
```
2020/1/19 12:52:07: Starting job Mandelbrot Zoom.
2020/1/19 12:52:07: Anti-aliasing on. Threshold: 0.10. Depth: 1. Subdivisions: 3x3.
2020/1/19 12:52:07: Motion blur on. Amount: 50.0%.
2020/1/19 12:52:07: Rendering in AVI format. Quality: 100%.
2020/1/19 12:52:07: Calculating MandelbrotZoom in C:\Users\Xecades\Documents\Ultra Fractal 6\Parameters\Animation Examples.upr.
2020/1/19 12:52:07: Calculating frame 1.
2020/1/19 12:52:12: Calculating frame 2.
2020/1/19 12:52:15: Calculating frame 3.
2020/1/19 12:52:19: Calculating frame 4.
2020/1/19 12:52:24: Calculating frame 5.
2020/1/19 12:52:27: Calculating frame 6.
2020/1/19 12:52:31: Calculating frame 7.
2020/1/19 12:52:35: Calculating frame 8.
2020/1/19 12:52:39: Calculating frame 9.
2020/1/19 12:52:44: Calculating frame 10.
2020/1/19 12:52:49: Calculating frame 11.
2020/1/19 12:52:54: Calculating frame 12.
2020/1/19 12:53:00: Calculating frame 13.
2020/1/19 12:53:06: Calculating frame 14.
2020/1/19 12:53:13: Calculating frame 15.
2020/1/19 12:53:20: Calculating frame 16.
2020/1/19 12:53:29: Calculating frame 17.
2020/1/19 12:53:37: Calculating frame 18.
2020/1/19 12:53:45: Calculating frame 19.
2020/1/19 12:53:53: Calculating frame 20.
2020/1/19 12:54:00: Calculating frame 21.
2020/1/19 12:54:07: Calculating frame 22.
2020/1/19 12:54:15: Calculating frame 23.
2020/1/19 12:54:22: Calculating frame 24.
2020/1/19 12:54:30: Calculating frame 25.
2020/1/19 12:54:38: Calculating frame 26.
2020/1/19 12:54:45: Calculating frame 27.
2020/1/19 12:54:52: Calculating frame 28.
2020/1/19 12:55:00: Calculating frame 29.
2020/1/19 12:55:08: Calculating frame 30.
2020/1/19 12:55:15: Calculating frame 31.
2020/1/19 12:55:23: Calculating frame 32.
2020/1/19 12:55:31: Calculating frame 33.
2020/1/19 12:55:39: Calculating frame 34.
2020/1/19 12:55:47: Calculating frame 35.
2020/1/19 12:55:55: Calculating frame 36.
2020/1/19 12:56:04: Calculating frame 37.
2020/1/19 12:56:12: Calculating frame 38.
2020/1/19 12:56:21: Calculating frame 39.
2020/1/19 12:56:30: Calculating frame 40.
2020/1/19 12:56:38: Calculating frame 41.
2020/1/19 12:56:48: Calculating frame 42.
2020/1/19 12:56:57: Calculating frame 43.
2020/1/19 12:57:06: Calculating frame 44.
2020/1/19 12:57:16: Calculating frame 45.
2020/1/19 12:57:25: Calculating frame 46.
2020/1/19 12:57:36: Calculating frame 47.
2020/1/19 12:57:46: Calculating frame 48.
2020/1/19 12:57:57: Calculating frame 49.
2020/1/19 12:58:07: Calculating frame 50.
2020/1/19 12:58:18: Calculating frame 51.
2020/1/19 12:58:28: Calculating frame 52.
2020/1/19 12:58:39: Calculating frame 53.
2020/1/19 12:58:51: Calculating frame 54.
2020/1/19 12:59:01: Calculating frame 55.
2020/1/19 12:59:12: Calculating frame 56.
2020/1/19 12:59:23: Calculating frame 57.
2020/1/19 12:59:34: Calculating frame 58.
2020/1/19 12:59:45: Calculating frame 59.
2020/1/19 12:59:57: Calculating frame 60.
2020/1/19 13:00:08: Calculating frame 61.
2020/1/19 13:00:19: Calculating frame 62.
2020/1/19 13:00:31: Calculating frame 63.
2020/1/19 13:00:43: Calculating frame 64.
2020/1/19 13:00:54: Calculating frame 65.
2020/1/19 13:01:07: Calculating frame 66.
2020/1/19 13:01:19: Calculating frame 67.
2020/1/19 13:01:31: Calculating frame 68.
2020/1/19 13:01:43: Calculating frame 69.
2020/1/19 13:01:55: Calculating frame 70.
2020/1/19 13:02:07: Calculating frame 71.
2020/1/19 13:02:19: Calculating frame 72.
2020/1/19 13:02:32: Calculating frame 73.
2020/1/19 13:02:44: Calculating frame 74.
2020/1/19 13:02:56: Calculating frame 75.
2020/1/19 13:03:09: Calculating frame 76.
2020/1/19 13:03:21: Calculating frame 77.
2020/1/19 13:03:33: Calculating frame 78.
2020/1/19 13:03:46: Calculating frame 79.
2020/1/19 13:03:59: Calculating frame 80.
2020/1/19 13:04:11: Calculating frame 81.
2020/1/19 13:04:24: Calculating frame 82.
2020/1/19 13:04:37: Calculating frame 83.
2020/1/19 13:04:49: Calculating frame 84.
2020/1/19 13:05:02: Calculating frame 85.
2020/1/19 13:05:15: Calculating frame 86.
2020/1/19 13:05:28: Calculating frame 87.
2020/1/19 13:05:40: Calculating frame 88.
2020/1/19 13:05:53: Calculating frame 89.
2020/1/19 13:06:06: Calculating frame 90.
2020/1/19 13:06:19: Calculating frame 91.
2020/1/19 13:06:31: Calculating frame 92.
2020/1/19 13:06:44: Calculating frame 93.
2020/1/19 13:06:57: Calculating frame 94.
2020/1/19 13:07:10: Calculating frame 95.
2020/1/19 13:07:22: Calculating frame 96.
2020/1/19 13:07:35: Calculating frame 97.
2020/1/19 13:07:48: Calculating frame 98.
2020/1/19 13:08:00: Calculating frame 99.
2020/1/19 13:08:13: Calculating frame 100.
2020/1/19 13:08:25: Calculating frame 101.
2020/1/19 13:08:38: Calculating frame 102.
2020/1/19 13:08:50: Calculating frame 103.
2020/1/19 13:09:02: Calculating frame 104.
2020/1/19 13:09:14: Calculating frame 105.
2020/1/19 13:09:26: Calculating frame 106.
2020/1/19 13:09:37: Calculating frame 107.
2020/1/19 13:09:49: Calculating frame 108.
2020/1/19 13:10:00: Calculating frame 109.
2020/1/19 13:10:12: Calculating frame 110.
2020/1/19 13:10:23: Calculating frame 111.
2020/1/19 13:10:34: Calculating frame 112.
2020/1/19 13:10:45: Calculating frame 113.
2020/1/19 13:10:55: Calculating frame 114.
2020/1/19 13:11:06: Calculating frame 115.
2020/1/19 13:11:17: Calculating frame 116.
2020/1/19 13:11:28: Calculating frame 117.
2020/1/19 13:11:38: Calculating frame 118.
2020/1/19 13:11:49: Calculating frame 119.
2020/1/19 13:11:59: Calculating frame 120.
2020/1/19 13:12:10: Calculating frame 121.
2020/1/19 13:12:21: Calculating frame 122.
2020/1/19 13:12:31: Calculating frame 123.
2020/1/19 13:12:42: Calculating frame 124.
2020/1/19 13:12:52: Calculating frame 125.
2020/1/19 13:13:03: Calculating frame 126.
2020/1/19 13:13:13: Calculating frame 127.
2020/1/19 13:13:23: Calculating frame 128.
2020/1/19 13:13:34: Calculating frame 129.
2020/1/19 13:13:44: Calculating frame 130.
2020/1/19 13:13:54: Calculating frame 131.
2020/1/19 13:14:05: Calculating frame 132.
2020/1/19 13:14:15: Calculating frame 133.
2020/1/19 13:14:25: Calculating frame 134.
2020/1/19 13:14:35: Calculating frame 135.
2020/1/19 13:14:45: Calculating frame 136.
2020/1/19 13:14:55: Calculating frame 137.
2020/1/19 13:15:06: Calculating frame 138.
2020/1/19 13:15:16: Calculating frame 139.
2020/1/19 13:15:26: Calculating frame 140.
2020/1/19 13:15:37: Calculating frame 141.
2020/1/19 13:15:48: Calculating frame 142.
2020/1/19 13:15:57: Calculating frame 143.
2020/1/19 13:16:07: Calculating frame 144.
2020/1/19 13:16:17: Calculating frame 145.
2020/1/19 13:16:27: Calculating frame 146.
2020/1/19 13:16:36: Calculating frame 147.
2020/1/19 13:16:46: Calculating frame 148.
2020/1/19 13:16:55: Calculating frame 149.
2020/1/19 13:17:05: Calculating frame 150.
2020/1/19 13:17:15: Calculating frame 151.
2020/1/19 13:17:24: Calculating frame 152.
2020/1/19 13:17:34: Calculating frame 153.
2020/1/19 13:17:43: Calculating frame 154.
2020/1/19 13:17:52: Calculating frame 155.
2020/1/19 13:18:02: Calculating frame 156.
2020/1/19 13:18:11: Calculating frame 157.
2020/1/19 13:18:19: Calculating frame 158.
2020/1/19 13:18:28: Calculating frame 159.
2020/1/19 13:18:36: Calculating frame 160.
2020/1/19 13:18:44: Calculating frame 161.
2020/1/19 13:18:52: Calculating frame 162.
2020/1/19 13:19:01: Calculating frame 163.
2020/1/19 13:19:09: Calculating frame 164.
2020/1/19 13:19:17: Calculating frame 165.
2020/1/19 13:19:26: Calculating frame 166.
2020/1/19 13:19:36: Calculating frame 167.
2020/1/19 13:19:46: Calculating frame 168.
2020/1/19 13:19:54: Calculating frame 169.
2020/1/19 13:20:02: Calculating frame 170.
2020/1/19 13:20:10: Calculating frame 171.
2020/1/19 13:20:18: Calculating frame 172.
2020/1/19 13:20:26: Calculating frame 173.
2020/1/19 13:20:34: Calculating frame 174.
2020/1/19 13:20:43: Calculating frame 175.
2020/1/19 13:20:51: Calculating frame 176.
2020/1/19 13:21:00: Calculating frame 177.
2020/1/19 13:21:08: Calculating frame 178.
2020/1/19 13:21:17: Calculating frame 179.
2020/1/19 13:21:28: Calculating frame 180.
2020/1/19 13:21:37: Calculating frame 181.
2020/1/19 13:21:48: Calculating frame 182.
2020/1/19 13:21:56: Calculating frame 183.
2020/1/19 13:22:05: Calculating frame 184.
2020/1/19 13:22:17: Calculating frame 185.
2020/1/19 13:22:25: Calculating frame 186.
2020/1/19 13:22:34: Calculating frame 187.
2020/1/19 13:22:49: Calculating frame 188.
2020/1/19 13:23:03: Calculating frame 189.
2020/1/19 13:23:15: Calculating frame 190.
2020/1/19 13:23:24: Calculating frame 191.
2020/1/19 13:23:34: Calculating frame 192.
2020/1/19 13:23:44: Calculating frame 193.
2020/1/19 13:23:58: Calculating frame 194.
2020/1/19 13:24:11: Calculating frame 195.
2020/1/19 13:24:25: Calculating frame 196.
2020/1/19 13:24:36: Calculating frame 197.
2020/1/19 13:24:49: Calculating frame 198.
2020/1/19 13:25:02: Calculating frame 199.
2020/1/19 13:25:12: Calculating frame 200.
2020/1/19 13:25:22: Calculating frame 201.
2020/1/19 13:25:31: Calculating frame 202.
2020/1/19 13:25:41: Calculating frame 203.
2020/1/19 13:25:52: Calculating frame 204.
2020/1/19 13:26:01: Calculating frame 205.
2020/1/19 13:26:10: Calculating frame 206.
2020/1/19 13:26:20: Calculating frame 207.
2020/1/19 13:26:29: Calculating frame 208.
2020/1/19 13:26:39: Calculating frame 209.
2020/1/19 13:26:48: Calculating frame 210.
2020/1/19 13:26:57: Calculating frame 211.
2020/1/19 13:27:07: Calculating frame 212.
2020/1/19 13:27:16: Calculating frame 213.
2020/1/19 13:27:26: Calculating frame 214.
2020/1/19 13:27:36: Calculating frame 215.
2020/1/19 13:27:46: Calculating frame 216.
2020/1/19 13:27:56: Calculating frame 217.
2020/1/19 13:28:07: Calculating frame 218.
2020/1/19 13:28:18: Calculating frame 219.
2020/1/19 13:28:30: Calculating frame 220.
2020/1/19 13:28:41: Calculating frame 221.
2020/1/19 13:28:53: Calculating frame 222.
2020/1/19 13:29:05: Calculating frame 223.
2020/1/19 13:29:17: Calculating frame 224.
2020/1/19 13:29:28: Calculating frame 225.
2020/1/19 13:29:40: Calculating frame 226.
2020/1/19 13:29:55: Calculating frame 227.
2020/1/19 13:30:08: Calculating frame 228.
2020/1/19 13:30:22: Calculating frame 229.
2020/1/19 13:30:36: Calculating frame 230.
2020/1/19 13:30:50: Calculating frame 231.
2020/1/19 13:31:05: Calculating frame 232.
2020/1/19 13:31:19: Calculating frame 233.
2020/1/19 13:31:33: Calculating frame 234.
2020/1/19 13:31:47: Calculating frame 235.
2020/1/19 13:32:02: Calculating frame 236.
2020/1/19 13:32:17: Calculating frame 237.
2020/1/19 13:32:34: Calculating frame 238.
2020/1/19 13:32:50: Calculating frame 239.
2020/1/19 13:33:06: Calculating frame 240.
2020/1/19 13:33:23: Calculating frame 241.
2020/1/19 13:33:41: Calculating frame 242.
2020/1/19 13:33:58: Calculating frame 243.
2020/1/19 13:34:16: Calculating frame 244.
2020/1/19 13:34:36: Calculating frame 245.
2020/1/19 13:34:55: Calculating frame 246.
2020/1/19 13:35:20: Calculating frame 247.
2020/1/19 13:35:48: Calculating frame 248.
2020/1/19 13:36:08: Calculating frame 249.
2020/1/19 13:36:30: Calculating frame 250.
2020/1/19 13:36:51: Calculating frame 251.
2020/1/19 13:37:16: Calculating frame 252.
2020/1/19 13:37:40: Calculating frame 253.
2020/1/19 13:38:04: Calculating frame 254.
2020/1/19 13:38:29: Calculating frame 255.
2020/1/19 13:38:54: Calculating frame 256.
2020/1/19 13:39:19: Calculating frame 257.
2020/1/19 13:39:45: Calculating frame 258.
2020/1/19 13:40:11: Calculating frame 259.
2020/1/19 13:40:39: Calculating frame 260.
2020/1/19 13:41:05: Calculating frame 261.
2020/1/19 13:41:35: Calculating frame 262.
2020/1/19 13:42:03: Calculating frame 263.
2020/1/19 13:42:34: Calculating frame 264.
2020/1/19 13:43:02: Calculating frame 265.
2020/1/19 13:43:29: Calculating frame 266.
2020/1/19 13:43:55: Calculating frame 267.
2020/1/19 13:44:21: Calculating frame 268.
2020/1/19 13:44:48: Calculating frame 269.
2020/1/19 13:45:14: Calculating frame 270.
2020/1/19 13:45:40: Calculating frame 271.
2020/1/19 13:46:07: Calculating frame 272.
2020/1/19 13:46:34: Calculating frame 273.
2020/1/19 13:47:00: Calculating frame 274.
2020/1/19 13:47:27: Calculating frame 275.
2020/1/19 13:47:55: Calculating frame 276.
2020/1/19 13:48:22: Calculating frame 277.
2020/1/19 13:48:50: Calculating frame 278.
2020/1/19 13:49:17: Calculating frame 279.
2020/1/19 13:49:45: Calculating frame 280.
2020/1/19 13:50:13: Calculating frame 281.
2020/1/19 13:50:41: Calculating frame 282.
2020/1/19 13:51:10: Calculating frame 283.
2020/1/19 13:51:38: Calculating frame 284.
2020/1/19 13:52:07: Calculating frame 285.
2020/1/19 13:52:36: Calculating frame 286.
2020/1/19 13:53:05: Calculating frame 287.
2020/1/19 13:53:34: Calculating frame 288.
2020/1/19 13:54:03: Calculating frame 289.
2020/1/19 13:54:33: Calculating frame 290.
2020/1/19 13:55:02: Calculating frame 291.
2020/1/19 13:55:33: Calculating frame 292.
2020/1/19 13:56:03: Calculating frame 293.
2020/1/19 13:56:34: Calculating frame 294.
2020/1/19 13:57:05: Calculating frame 295.
2020/1/19 13:57:36: Calculating frame 296.
2020/1/19 13:58:08: Calculating frame 297.
2020/1/19 13:58:40: Calculating frame 298.
2020/1/19 13:59:13: Calculating frame 299.
2020/1/19 13:59:45: Calculating frame 300.
2020/1/19 14:00:18: Calculating frame 301.
2020/1/19 14:00:51: Calculating frame 302.
2020/1/19 14:01:24: Calculating frame 303.
2020/1/19 14:01:58: Calculating frame 304.
2020/1/19 14:02:32: Calculating frame 305.
2020/1/19 14:03:06: Calculating frame 306.
2020/1/19 14:03:40: Calculating frame 307.
2020/1/19 14:04:14: Calculating frame 308.
2020/1/19 14:04:49: Calculating frame 309.
2020/1/19 14:05:24: Calculating frame 310.
2020/1/19 14:05:58: Calculating frame 311.
2020/1/19 14:06:33: Calculating frame 312.
2020/1/19 14:07:09: Calculating frame 313.
2020/1/19 14:07:45: Calculating frame 314.
2020/1/19 14:08:22: Calculating frame 315.
2020/1/19 14:08:58: Calculating frame 316.
2020/1/19 14:09:36: Calculating frame 317.
2020/1/19 14:10:12: Calculating frame 318.
2020/1/19 14:10:48: Calculating frame 319.
2020/1/19 14:11:24: Calculating frame 320.
2020/1/19 14:11:59: Calculating frame 321.
2020/1/19 14:12:35: Calculating frame 322.
2020/1/19 14:13:11: Calculating frame 323.
2020/1/19 14:13:47: Calculating frame 324.
2020/1/19 14:14:23: Calculating frame 325.
2020/1/19 14:15:02: Calculating frame 326.
2020/1/19 14:15:43: Calculating frame 327.
2020/1/19 14:16:24: Calculating frame 328.
2020/1/19 14:17:06: Calculating frame 329.
2020/1/19 14:17:47: Calculating frame 330.
2020/1/19 14:18:28: Calculating frame 331.
2020/1/19 14:19:10: Calculating frame 332.
2020/1/19 14:19:52: Calculating frame 333.
2020/1/19 14:20:33: Calculating frame 334.
2020/1/19 14:21:15: Calculating frame 335.
2020/1/19 14:21:58: Calculating frame 336.
2020/1/19 14:22:40: Calculating frame 337.
2020/1/19 14:23:23: Calculating frame 338.
2020/1/19 14:24:05: Calculating frame 339.
2020/1/19 14:24:48: Calculating frame 340.
2020/1/19 14:25:31: Calculating frame 341.
2020/1/19 14:26:13: Calculating frame 342.
2020/1/19 14:26:53: Calculating frame 343.
2020/1/19 14:27:38: Calculating frame 344.
2020/1/19 14:28:43: Calculating frame 345.
2020/1/19 14:29:34: Calculating frame 346.
2020/1/19 14:30:13: Calculating frame 347.
2020/1/19 14:30:52: Calculating frame 348.
2020/1/19 14:31:31: Calculating frame 349.
2020/1/19 14:32:11: Calculating frame 350.
2020/1/19 14:32:50: Calculating frame 351.
2020/1/19 14:33:30: Calculating frame 352.
2020/1/19 14:34:09: Calculating frame 353.
2020/1/19 14:34:48: Calculating frame 354.
2020/1/19 14:35:28: Calculating frame 355.
2020/1/19 14:36:08: Calculating frame 356.
2020/1/19 14:36:47: Calculating frame 357.
2020/1/19 14:37:27: Calculating frame 358.
2020/1/19 14:38:07: Calculating frame 359.
2020/1/19 14:38:47: Calculating frame 360.
2020/1/19 14:39:27: Calculating frame 361.
2020/1/19 14:40:06: Calculating frame 362.
2020/1/19 14:40:46: Calculating frame 363.
2020/1/19 14:41:26: Calculating frame 364.
2020/1/19 14:42:06: Calculating frame 365.
2020/1/19 14:42:46: Calculating frame 366.
2020/1/19 14:43:26: Calculating frame 367.
2020/1/19 14:44:06: Calculating frame 368.
2020/1/19 14:44:46: Calculating frame 369.
2020/1/19 14:45:27: Calculating frame 370.
2020/1/19 14:46:07: Calculating frame 371.
2020/1/19 14:46:47: Calculating frame 372.
2020/1/19 14:47:27: Calculating frame 373.
2020/1/19 14:48:08: Calculating frame 374.
2020/1/19 14:48:48: Calculating frame 375.
2020/1/19 14:49:29: Calculating frame 376.
2020/1/19 14:50:09: Calculating frame 377.
2020/1/19 14:50:50: Calculating frame 378.
2020/1/19 14:51:30: Calculating frame 379.
2020/1/19 14:52:11: Calculating frame 380.
2020/1/19 14:52:52: Calculating frame 381.
2020/1/19 14:53:33: Calculating frame 382.
2020/1/19 14:54:13: Calculating frame 383.
2020/1/19 14:54:54: Calculating frame 384.
2020/1/19 14:55:35: Calculating frame 385.
2020/1/19 14:56:15: Calculating frame 386.
2020/1/19 14:56:56: Calculating frame 387.
2020/1/19 14:57:37: Calculating frame 388.
2020/1/19 14:58:18: Calculating frame 389.
2020/1/19 14:58:59: Calculating frame 390.
2020/1/19 14:59:40: Calculating frame 391.
2020/1/19 15:00:20: Calculating frame 392.
2020/1/19 15:01:01: Calculating frame 393.
2020/1/19 15:01:42: Calculating frame 394.
2020/1/19 15:02:23: Calculating frame 395.
2020/1/19 15:03:04: Calculating frame 396.
2020/1/19 15:03:45: Calculating frame 397.
2020/1/19 15:04:26: Calculating frame 398.
2020/1/19 15:05:08: Calculating frame 399.
2020/1/19 15:05:49: Calculating frame 400.
2020/1/19 15:06:30: Calculating frame 401.
2020/1/19 15:07:11: Calculating frame 402.
2020/1/19 15:07:52: Calculating frame 403.
2020/1/19 15:08:33: Calculating frame 404.
2020/1/19 15:09:14: Calculating frame 405.
2020/1/19 15:09:56: Calculating frame 406.
2020/1/19 15:10:37: Calculating frame 407.
2020/1/19 15:11:18: Calculating frame 408.
2020/1/19 15:12:00: Calculating frame 409.
2020/1/19 15:12:41: Calculating frame 410.
2020/1/19 15:13:23: Calculating frame 411.
2020/1/19 15:14:04: Calculating frame 412.
2020/1/19 15:14:46: Calculating frame 413.
2020/1/19 15:15:28: Calculating frame 414.
2020/1/19 15:16:09: Calculating frame 415.
2020/1/19 15:16:51: Calculating frame 416.
2020/1/19 15:17:33: Calculating frame 417.
2020/1/19 15:18:15: Calculating frame 418.
2020/1/19 15:18:57: Calculating frame 419.
2020/1/19 15:19:39: Calculating frame 420.
2020/1/19 15:20:21: Calculating frame 421.
2020/1/19 15:21:03: Calculating frame 422.
2020/1/19 15:21:44: Calculating frame 423.
2020/1/19 15:22:27: Calculating frame 424.
2020/1/19 15:23:09: Calculating frame 425.
2020/1/19 15:23:51: Calculating frame 426.
2020/1/19 15:24:32: Calculating frame 427.
2020/1/19 15:25:14: Calculating frame 428.
2020/1/19 15:25:56: Calculating frame 429.
2020/1/19 15:26:38: Calculating frame 430.
2020/1/19 15:27:20: Calculating frame 431.
2020/1/19 15:28:01: Calculating frame 432.
2020/1/19 15:28:43: Calculating frame 433.
2020/1/19 15:29:25: Calculating frame 434.
2020/1/19 15:30:07: Calculating frame 435.
2020/1/19 15:30:49: Calculating frame 436.
2020/1/19 15:31:31: Calculating frame 437.
2020/1/19 15:32:13: Calculating frame 438.
2020/1/19 15:32:55: Calculating frame 439.
2020/1/19 15:33:37: Calculating frame 440.
2020/1/19 15:34:19: Calculating frame 441.
2020/1/19 15:35:01: Calculating frame 442.
2020/1/19 15:35:44: Calculating frame 443.
2020/1/19 15:36:26: Calculating frame 444.
2020/1/19 15:37:08: Calculating frame 445.
2020/1/19 15:37:51: Calculating frame 446.
2020/1/19 15:38:33: Calculating frame 447.
2020/1/19 15:39:16: Calculating frame 448.
2020/1/19 15:39:58: Calculating frame 449.
2020/1/19 15:40:41: Calculating frame 450.
2020/1/19 15:41:23: Calculating frame 451.
2020/1/19 15:42:06: Calculating frame 452.
2020/1/19 15:42:49: Calculating frame 453.
2020/1/19 15:43:31: Calculating frame 454.
2020/1/19 15:44:14: Calculating frame 455.
2020/1/19 15:44:57: Calculating frame 456.
2020/1/19 15:45:40: Calculating frame 457.
2020/1/19 15:46:22: Calculating frame 458.
2020/1/19 15:47:05: Calculating frame 459.
2020/1/19 15:47:48: Calculating frame 460.
2020/1/19 15:48:31: Calculating frame 461.
2020/1/19 15:49:13: Calculating frame 462.
2020/1/19 15:49:56: Calculating frame 463.
2020/1/19 15:50:39: Calculating frame 464.
2020/1/19 15:51:21: Calculating frame 465.
2020/1/19 15:52:04: Calculating frame 466.
2020/1/19 15:52:47: Calculating frame 467.
2020/1/19 15:53:29: Calculating frame 468.
2020/1/19 15:54:12: Calculating frame 469.
2020/1/19 15:54:55: Calculating frame 470.
2020/1/19 15:55:37: Calculating frame 471.
2020/1/19 15:56:20: Calculating frame 472.
2020/1/19 15:57:02: Calculating frame 473.
2020/1/19 15:57:45: Calculating frame 474.
2020/1/19 15:58:27: Calculating frame 475.
2020/1/19 15:59:10: Calculating frame 476.
2020/1/19 15:59:52: Calculating frame 477.
2020/1/19 16:00:34: Calculating frame 478.
2020/1/19 16:01:17: Calculating frame 479.
2020/1/19 16:01:59: Calculating frame 480.
2020/1/19 16:02:41: Calculating frame 481.
2020/1/19 16:03:24: Calculating frame 482.
2020/1/19 16:04:06: Calculating frame 483.
2020/1/19 16:04:48: Calculating frame 484.
2020/1/19 16:05:31: Calculating frame 485.
2020/1/19 16:06:13: Calculating frame 486.
2020/1/19 16:06:55: Calculating frame 487.
2020/1/19 16:07:37: Calculating frame 488.
2020/1/19 16:08:19: Calculating frame 489.
2020/1/19 16:09:01: Calculating frame 490.
2020/1/19 16:09:43: Calculating frame 491.
2020/1/19 16:10:25: Calculating frame 492.
2020/1/19 16:11:07: Calculating frame 493.
2020/1/19 16:11:49: Calculating frame 494.
2020/1/19 16:12:30: Calculating frame 495.
2020/1/19 16:13:11: Calculating frame 496.
2020/1/19 16:13:52: Calculating frame 497.
2020/1/19 16:14:33: Calculating frame 498.
2020/1/19 16:15:13: Calculating frame 499.
2020/1/19 16:15:53: Calculating frame 500.
2020/1/19 16:16:33: Calculating frame 501.
2020/1/19 16:17:13: Calculating frame 502.
2020/1/19 16:17:53: Calculating frame 503.
2020/1/19 16:18:33: Calculating frame 504.
2020/1/19 16:19:13: Calculating frame 505.
2020/1/19 16:19:52: Calculating frame 506.
2020/1/19 16:20:32: Calculating frame 507.
2020/1/19 16:21:12: Calculating frame 508.
2020/1/19 16:21:52: Calculating frame 509.
2020/1/19 16:22:32: Calculating frame 510.
2020/1/19 16:23:12: Calculating frame 511.
2020/1/19 16:23:52: Calculating frame 512.
2020/1/19 16:24:33: Calculating frame 513.
2020/1/19 16:25:14: Calculating frame 514.
2020/1/19 16:25:54: Calculating frame 515.
2020/1/19 16:26:35: Calculating frame 516.
2020/1/19 16:27:16: Calculating frame 517.
2020/1/19 16:27:58: Calculating frame 518.
2020/1/19 16:28:39: Calculating frame 519.
2020/1/19 16:29:21: Calculating frame 520.
2020/1/19 16:30:03: Calculating frame 521.
2020/1/19 16:30:45: Calculating frame 522.
2020/1/19 16:31:27: Calculating frame 523.
2020/1/19 16:32:09: Calculating frame 524.
2020/1/19 16:32:50: Calculating frame 525.
2020/1/19 16:33:32: Calculating frame 526.
2020/1/19 16:34:13: Calculating frame 527.
2020/1/19 16:34:54: Calculating frame 528.
2020/1/19 16:35:35: Calculating frame 529.
2020/1/19 16:36:16: Calculating frame 530.
2020/1/19 16:36:57: Calculating frame 531.
2020/1/19 16:37:38: Calculating frame 532.
2020/1/19 16:38:19: Calculating frame 533.
2020/1/19 16:39:00: Calculating frame 534.
2020/1/19 16:39:42: Calculating frame 535.
2020/1/19 16:40:23: Calculating frame 536.
2020/1/19 16:41:04: Calculating frame 537.
2020/1/19 16:41:46: Calculating frame 538.
2020/1/19 16:42:27: Calculating frame 539.
2020/1/19 16:43:09: Calculating frame 540.
2020/1/19 16:43:51: Calculating frame 541.
2020/1/19 16:44:34: Calculating frame 542.
2020/1/19 16:45:17: Calculating frame 543.
2020/1/19 16:45:59: Calculating frame 544.
2020/1/19 16:46:42: Calculating frame 545.
2020/1/19 16:47:26: Calculating frame 546.
2020/1/19 16:48:09: Calculating frame 547.
2020/1/19 16:48:53: Calculating frame 548.
2020/1/19 16:49:37: Calculating frame 549.
2020/1/19 16:50:22: Calculating frame 550.
2020/1/19 16:51:06: Calculating frame 551.
2020/1/19 16:51:50: Calculating frame 552.
2020/1/19 16:52:33: Calculating frame 553.
2020/1/19 16:53:17: Calculating frame 554.
2020/1/19 16:54:01: Calculating frame 555.
2020/1/19 16:54:44: Calculating frame 556.
2020/1/19 16:55:28: Calculating frame 557.
2020/1/19 16:56:12: Calculating frame 558.
2020/1/19 16:56:56: Calculating frame 559.
2020/1/19 16:57:40: Calculating frame 560.
2020/1/19 16:58:24: Calculating frame 561.
2020/1/19 16:59:09: Calculating frame 562.
2020/1/19 16:59:53: Calculating frame 563.
2020/1/19 17:00:38: Calculating frame 564.
2020/1/19 17:01:22: Calculating frame 565.
2020/1/19 17:02:06: Calculating frame 566.
2020/1/19 17:02:50: Calculating frame 567.
2020/1/19 17:03:34: Calculating frame 568.
2020/1/19 17:04:18: Calculating frame 569.
2020/1/19 17:05:02: Calculating frame 570.
2020/1/19 17:05:46: Calculating frame 571.
2020/1/19 17:06:30: Calculating frame 572.
2020/1/19 17:07:13: Calculating frame 573.
2020/1/19 17:07:57: Calculating frame 574.
2020/1/19 17:08:41: Calculating frame 575.
2020/1/19 17:09:25: Calculating frame 576.
2020/1/19 17:10:08: Calculating frame 577.
2020/1/19 17:10:52: Calculating frame 578.
2020/1/19 17:11:35: Calculating frame 579.
2020/1/19 17:12:19: Calculating frame 580.
2020/1/19 17:13:03: Calculating frame 581.
2020/1/19 17:13:46: Calculating frame 582.
2020/1/19 17:14:29: Calculating frame 583.
2020/1/19 17:15:13: Calculating frame 584.
2020/1/19 17:15:56: Calculating frame 585.
2020/1/19 17:16:39: Calculating frame 586.
2020/1/19 17:17:22: Calculating frame 587.
2020/1/19 17:18:05: Calculating frame 588.
2020/1/19 17:18:48: Calculating frame 589.
2020/1/19 17:19:32: Calculating frame 590.
2020/1/19 17:20:15: Calculating frame 591.
2020/1/19 17:20:58: Calculating frame 592.
2020/1/19 17:21:41: Calculating frame 593.
2020/1/19 17:22:24: Calculating frame 594.
2020/1/19 17:23:07: Calculating frame 595.
2020/1/19 17:23:50: Calculating frame 596.
2020/1/19 17:24:33: Calculating frame 597.
2020/1/19 17:25:16: Calculating frame 598.
2020/1/19 17:25:59: Calculating frame 599.
2020/1/19 17:26:42: Calculating frame 600.
2020/1/19 17:27:25: Calculating frame 601.
2020/1/19 17:28:08: Calculating frame 602.
2020/1/19 17:28:51: Calculating frame 603.
2020/1/19 17:29:34: Calculating frame 604.
2020/1/19 17:30:17: Calculating frame 605.
2020/1/19 17:30:59: Calculating frame 606.
2020/1/19 17:31:42: Calculating frame 607.
2020/1/19 17:32:25: Calculating frame 608.
2020/1/19 17:33:08: Calculating frame 609.
2020/1/19 17:33:50: Calculating frame 610.
2020/1/19 17:34:33: Calculating frame 611.
2020/1/19 17:35:16: Calculating frame 612.
2020/1/19 17:35:59: Calculating frame 613.
2020/1/19 17:36:42: Calculating frame 614.
2020/1/19 17:37:24: Calculating frame 615.
2020/1/19 17:38:07: Calculating frame 616.
2020/1/19 17:38:50: Calculating frame 617.
2020/1/19 17:39:33: Calculating frame 618.
2020/1/19 17:40:17: Calculating frame 619.
2020/1/19 17:41:00: Calculating frame 620.
2020/1/19 17:41:42: Calculating frame 621.
2020/1/19 17:42:26: Calculating frame 622.
2020/1/19 17:43:08: Calculating frame 623.
2020/1/19 17:43:51: Calculating frame 624.
2020/1/19 17:44:33: Calculating frame 625.
2020/1/19 17:45:15: Calculating frame 626.
2020/1/19 17:45:57: Calculating frame 627.
2020/1/19 17:46:40: Calculating frame 628.
2020/1/19 17:47:22: Calculating frame 629.
2020/1/19 17:48:05: Calculating frame 630.
2020/1/19 17:48:47: Calculating frame 631.
2020/1/19 17:49:29: Calculating frame 632.
2020/1/19 17:50:11: Calculating frame 633.
2020/1/19 17:50:53: Calculating frame 634.
2020/1/19 17:51:36: Calculating frame 635.
2020/1/19 17:52:18: Calculating frame 636.
2020/1/19 17:53:00: Calculating frame 637.
2020/1/19 17:53:42: Calculating frame 638.
2020/1/19 17:54:24: Calculating frame 639.
2020/1/19 17:55:06: Calculating frame 640.
2020/1/19 17:55:48: Calculating frame 641.
2020/1/19 17:56:30: Calculating frame 642.
2020/1/19 17:57:12: Calculating frame 643.
2020/1/19 17:57:54: Calculating frame 644.
2020/1/19 17:58:36: Calculating frame 645.
2020/1/19 17:59:18: Calculating frame 646.
2020/1/19 17:59:59: Calculating frame 647.
2020/1/19 18:00:41: Calculating frame 648.
2020/1/19 18:01:23: Calculating frame 649.
2020/1/19 18:02:05: Calculating frame 650.
2020/1/19 18:02:46: Calculating frame 651.
2020/1/19 18:03:28: Calculating frame 652.
2020/1/19 18:04:09: Calculating frame 653.
2020/1/19 18:04:51: Calculating frame 654.
2020/1/19 18:05:32: Calculating frame 655.
2020/1/19 18:06:14: Calculating frame 656.
2020/1/19 18:06:55: Calculating frame 657.
2020/1/19 18:07:36: Calculating frame 658.
2020/1/19 18:08:18: Calculating frame 659.
2020/1/19 18:08:59: Calculating frame 660.
2020/1/19 18:09:40: Calculating frame 661.
2020/1/19 18:10:22: Calculating frame 662.
2020/1/19 18:11:03: Calculating frame 663.
2020/1/19 18:11:44: Calculating frame 664.
2020/1/19 18:12:25: Calculating frame 665.
2020/1/19 18:13:06: Calculating frame 666.
2020/1/19 18:13:47: Calculating frame 667.
2020/1/19 18:14:28: Calculating frame 668.
2020/1/19 18:15:08: Calculating frame 669.
2020/1/19 18:15:49: Calculating frame 670.
2020/1/19 18:16:30: Calculating frame 671.
2020/1/19 18:17:10: Calculating frame 672.
2020/1/19 18:17:51: Calculating frame 673.
2020/1/19 18:18:31: Calculating frame 674.
2020/1/19 18:19:12: Calculating frame 675.
2020/1/19 18:19:52: Calculating frame 676.
2020/1/19 18:20:32: Calculating frame 677.
2020/1/19 18:21:12: Calculating frame 678.
2020/1/19 18:21:53: Calculating frame 679.
2020/1/19 18:22:33: Calculating frame 680.
2020/1/19 18:23:13: Calculating frame 681.
2020/1/19 18:23:53: Calculating frame 682.
2020/1/19 18:24:33: Calculating frame 683.
2020/1/19 18:25:12: Calculating frame 684.
2020/1/19 18:25:52: Calculating frame 685.
2020/1/19 18:26:32: Calculating frame 686.
2020/1/19 18:27:11: Calculating frame 687.
2020/1/19 18:27:51: Calculating frame 688.
2020/1/19 18:28:30: Calculating frame 689.
2020/1/19 18:29:10: Calculating frame 690.
2020/1/19 18:29:49: Calculating frame 691.
2020/1/19 18:30:29: Calculating frame 692.
2020/1/19 18:31:08: Calculating frame 693.
2020/1/19 18:31:48: Calculating frame 694.
2020/1/19 18:32:27: Calculating frame 695.
2020/1/19 18:33:06: Calculating frame 696.
2020/1/19 18:33:45: Calculating frame 697.
2020/1/19 18:34:25: Calculating frame 698.
2020/1/19 18:35:04: Calculating frame 699.
2020/1/19 18:35:43: Calculating frame 700.
2020/1/19 18:36:23: Calculating frame 701.
2020/1/19 18:37:02: Calculating frame 702.
2020/1/19 18:37:41: Calculating frame 703.
2020/1/19 18:38:20: Calculating frame 704.
2020/1/19 18:38:59: Calculating frame 705.
2020/1/19 18:39:38: Calculating frame 706.
2020/1/19 18:40:17: Calculating frame 707.
2020/1/19 18:40:56: Calculating frame 708.
2020/1/19 18:41:35: Calculating frame 709.
2020/1/19 18:42:14: Calculating frame 710.
2020/1/19 18:42:53: Calculating frame 711.
2020/1/19 18:43:31: Calculating frame 712.
2020/1/19 18:44:10: Calculating frame 713.
2020/1/19 18:44:49: Calculating frame 714.
2020/1/19 18:45:27: Calculating frame 715.
2020/1/19 18:46:06: Calculating frame 716.
2020/1/19 18:46:44: Calculating frame 717.
2020/1/19 18:47:23: Calculating frame 718.
2020/1/19 18:48:01: Calculating frame 719.
2020/1/19 18:48:40: Calculating frame 720.
2020/1/19 18:49:18: Calculating frame 721.
2020/1/19 18:49:57: Calculating frame 722.
2020/1/19 18:50:36: Calculating frame 723.
2020/1/19 18:51:14: Calculating frame 724.
2020/1/19 18:51:53: Calculating frame 725.
2020/1/19 18:52:31: Calculating frame 726.
2020/1/19 18:53:10: Calculating frame 727.
2020/1/19 18:53:48: Calculating frame 728.
2020/1/19 18:54:26: Calculating frame 729.
2020/1/19 18:55:05: Calculating frame 730.
2020/1/19 18:55:43: Calculating frame 731.
2020/1/19 18:56:21: Calculating frame 732.
2020/1/19 18:56:59: Calculating frame 733.
2020/1/19 18:57:37: Calculating frame 734.
2020/1/19 18:58:15: Calculating frame 735.
2020/1/19 18:58:53: Calculating frame 736.
2020/1/19 18:59:31: Calculating frame 737.
2020/1/19 19:00:09: Calculating frame 738.
2020/1/19 19:00:47: Calculating frame 739.
2020/1/19 19:01:24: Calculating frame 740.
2020/1/19 19:02:02: Calculating frame 741.
2020/1/19 19:02:40: Calculating frame 742.
2020/1/19 19:03:17: Calculating frame 743.
2020/1/19 19:03:55: Calculating frame 744.
2020/1/19 19:04:32: Calculating frame 745.
2020/1/19 19:05:10: Calculating frame 746.
2020/1/19 19:05:47: Calculating frame 747.
2020/1/19 19:06:25: Calculating frame 748.
2020/1/19 19:07:02: Calculating frame 749.
2020/1/19 19:07:39: Calculating frame 750.
2020/1/19 19:08:16: Calculating frame 751.
2020/1/19 19:08:53: Calculating frame 752.
2020/1/19 19:09:30: Calculating frame 753.
2020/1/19 19:10:07: Calculating frame 754.
2020/1/19 19:10:44: Calculating frame 755.
2020/1/19 19:11:21: Calculating frame 756.
2020/1/19 19:11:57: Calculating frame 757.
2020/1/19 19:12:34: Calculating frame 758.
2020/1/19 19:13:11: Calculating frame 759.
2020/1/19 19:13:47: Calculating frame 760.
2020/1/19 19:14:23: Calculating frame 761.
2020/1/19 19:15:00: Calculating frame 762.
2020/1/19 19:15:36: Calculating frame 763.
2020/1/19 19:16:12: Calculating frame 764.
2020/1/19 19:16:49: Calculating frame 765.
2020/1/19 19:17:25: Calculating frame 766.
2020/1/19 19:18:01: Calculating frame 767.
2020/1/19 19:18:37: Calculating frame 768.
2020/1/19 19:19:13: Calculating frame 769.
2020/1/19 19:19:49: Calculating frame 770.
2020/1/19 19:20:25: Calculating frame 771.
2020/1/19 19:21:01: Calculating frame 772.
2020/1/19 19:21:36: Calculating frame 773.
2020/1/19 19:22:12: Calculating frame 774.
2020/1/19 19:22:48: Calculating frame 775.
2020/1/19 19:23:23: Calculating frame 776.
2020/1/19 19:23:58: Calculating frame 777.
2020/1/19 19:24:34: Calculating frame 778.
2020/1/19 19:25:09: Calculating frame 779.
2020/1/19 19:25:44: Calculating frame 780.
2020/1/19 19:26:20: Calculating frame 781.
2020/1/19 19:26:55: Calculating frame 782.
2020/1/19 19:27:30: Calculating frame 783.
2020/1/19 19:28:05: Calculating frame 784.
2020/1/19 19:28:40: Calculating frame 785.
2020/1/19 19:29:14: Calculating frame 786.
2020/1/19 19:29:49: Calculating frame 787.
2020/1/19 19:30:24: Calculating frame 788.
2020/1/19 19:30:59: Calculating frame 789.
2020/1/19 19:31:33: Calculating frame 790.
2020/1/19 19:32:08: Calculating frame 791.
2020/1/19 19:32:42: Calculating frame 792.
2020/1/19 19:33:17: Calculating frame 793.
2020/1/19 19:33:51: Calculating frame 794.
2020/1/19 19:34:26: Calculating frame 795.
2020/1/19 19:35:00: Calculating frame 796.
2020/1/19 19:35:34: Calculating frame 797.
2020/1/19 19:36:08: Calculating frame 798.
2020/1/19 19:36:42: Calculating frame 799.
2020/1/19 19:37:16: Calculating frame 800.
2020/1/19 19:37:50: Calculating frame 801.
2020/1/19 19:38:24: Calculating frame 802.
2020/1/19 19:38:57: Calculating frame 803.
2020/1/19 19:39:31: Calculating frame 804.
2020/1/19 19:40:04: Calculating frame 805.
2020/1/19 19:40:38: Calculating frame 806.
2020/1/19 19:41:11: Calculating frame 807.
2020/1/19 19:41:44: Calculating frame 808.
2020/1/19 19:42:17: Calculating frame 809.
2020/1/19 19:42:50: Calculating frame 810.
2020/1/19 19:43:22: Calculating frame 811.
2020/1/19 19:43:55: Calculating frame 812.
2020/1/19 19:44:27: Calculating frame 813.
2020/1/19 19:44:59: Calculating frame 814.
2020/1/19 19:45:31: Calculating frame 815.
2020/1/19 19:46:03: Calculating frame 816.
2020/1/19 19:46:35: Calculating frame 817.
2020/1/19 19:47:07: Calculating frame 818.
2020/1/19 19:47:38: Calculating frame 819.
2020/1/19 19:48:10: Calculating frame 820.
2020/1/19 19:48:41: Calculating frame 821.
2020/1/19 19:49:12: Calculating frame 822.
2020/1/19 19:49:43: Calculating frame 823.
2020/1/19 19:50:14: Calculating frame 824.
2020/1/19 19:50:45: Calculating frame 825.
2020/1/19 19:51:16: Calculating frame 826.
2020/1/19 19:51:46: Calculating frame 827.
2020/1/19 19:52:17: Calculating frame 828.
2020/1/19 19:52:47: Calculating frame 829.
2020/1/19 19:53:17: Calculating frame 830.
2020/1/19 19:53:47: Calculating frame 831.
2020/1/19 19:54:17: Calculating frame 832.
2020/1/19 19:54:47: Calculating frame 833.
2020/1/19 19:55:17: Calculating frame 834.
2020/1/19 19:55:46: Calculating frame 835.
2020/1/19 19:56:16: Calculating frame 836.
2020/1/19 19:56:45: Calculating frame 837.
2020/1/19 19:57:14: Calculating frame 838.
2020/1/19 19:57:43: Calculating frame 839.
2020/1/19 19:58:12: Calculating frame 840.
2020/1/19 19:58:41: Calculating frame 841.
2020/1/19 19:59:09: Calculating frame 842.
2020/1/19 19:59:38: Calculating frame 843.
2020/1/19 20:00:06: Calculating frame 844.
2020/1/19 20:00:34: Calculating frame 845.
2020/1/19 20:01:03: Calculating frame 846.
2020/1/19 20:01:30: Calculating frame 847.
2020/1/19 20:01:58: Calculating frame 848.
2020/1/19 20:02:26: Calculating frame 849.
2020/1/19 20:02:54: Calculating frame 850.
2020/1/19 20:03:21: Calculating frame 851.
2020/1/19 20:03:48: Calculating frame 852.
2020/1/19 20:04:15: Calculating frame 853.
2020/1/19 20:04:42: Calculating frame 854.
2020/1/19 20:05:09: Calculating frame 855.
2020/1/19 20:05:36: Calculating frame 856.
2020/1/19 20:06:03: Calculating frame 857.
2020/1/19 20:06:29: Calculating frame 858.
2020/1/19 20:06:56: Calculating frame 859.
2020/1/19 20:07:22: Calculating frame 860.
2020/1/19 20:07:48: Calculating frame 861.
2020/1/19 20:08:14: Calculating frame 862.
2020/1/19 20:08:40: Calculating frame 863.
2020/1/19 20:09:06: Calculating frame 864.
2020/1/19 20:09:32: Calculating frame 865.
2020/1/19 20:09:57: Calculating frame 866.
2020/1/19 20:10:23: Calculating frame 867.
2020/1/19 20:10:48: Calculating frame 868.
2020/1/19 20:11:13: Calculating frame 869.
2020/1/19 20:11:39: Calculating frame 870.
2020/1/19 20:12:04: Calculating frame 871.
2020/1/19 20:12:29: Calculating frame 872.
2020/1/19 20:12:54: Calculating frame 873.
2020/1/19 20:13:18: Calculating frame 874.
2020/1/19 20:13:43: Calculating frame 875.
2020/1/19 20:14:08: Calculating frame 876.
2020/1/19 20:14:32: Calculating frame 877.
2020/1/19 20:14:57: Calculating frame 878.
2020/1/19 20:15:21: Calculating frame 879.
2020/1/19 20:15:46: Calculating frame 880.
2020/1/19 20:16:10: Calculating frame 881.
2020/1/19 20:16:35: Calculating frame 882.
2020/1/19 20:16:59: Calculating frame 883.
2020/1/19 20:17:23: Calculating frame 884.
2020/1/19 20:17:47: Calculating frame 885.
2020/1/19 20:18:11: Calculating frame 886.
2020/1/19 20:18:35: Calculating frame 887.
2020/1/19 20:18:59: Calculating frame 888.
2020/1/19 20:19:22: Calculating frame 889.
2020/1/19 20:19:46: Calculating frame 890.
2020/1/19 20:20:10: Calculating frame 891.
2020/1/19 20:20:33: Calculating frame 892.
2020/1/19 20:20:57: Calculating frame 893.
2020/1/19 20:21:20: Calculating frame 894.
2020/1/19 20:21:44: Calculating frame 895.
2020/1/19 20:22:07: Calculating frame 896.
2020/1/19 20:22:31: Calculating frame 897.
2020/1/19 20:22:54: Calculating frame 898.
2020/1/19 20:23:17: Calculating frame 899.
2020/1/19 20:23:40: Calculating frame 900.
2020/1/19 20:24:03: Calculating frame 901.
2020/1/19 20:24:26: Calculating frame 902.
2020/1/19 20:24:49: Calculating frame 903.
2020/1/19 20:25:12: Calculating frame 904.
2020/1/19 20:25:35: Calculating frame 905.
2020/1/19 20:25:58: Calculating frame 906.
2020/1/19 20:26:20: Calculating frame 907.
2020/1/19 20:26:43: Calculating frame 908.
2020/1/19 20:27:06: Calculating frame 909.
2020/1/19 20:27:29: Calculating frame 910.
2020/1/19 20:27:51: Calculating frame 911.
2020/1/19 20:28:14: Calculating frame 912.
2020/1/19 20:28:37: Calculating frame 913.
2020/1/19 20:29:00: Calculating frame 914.
2020/1/19 20:29:22: Calculating frame 915.
2020/1/19 20:29:45: Calculating frame 916.
2020/1/19 20:30:07: Calculating frame 917.
2020/1/19 20:30:30: Calculating frame 918.
2020/1/19 20:30:52: Calculating frame 919.
2020/1/19 20:31:15: Calculating frame 920.
2020/1/19 20:31:37: Calculating frame 921.
2020/1/19 20:32:00: Calculating frame 922.
2020/1/19 20:32:22: Calculating frame 923.
2020/1/19 20:32:45: Calculating frame 924.
2020/1/19 20:33:07: Calculating frame 925.
2020/1/19 20:33:30: Calculating frame 926.
2020/1/19 20:33:52: Calculating frame 927.
2020/1/19 20:34:14: Calculating frame 928.
2020/1/19 20:34:36: Calculating frame 929.
2020/1/19 20:34:59: Calculating frame 930.
2020/1/19 20:35:21: Calculating frame 931.
2020/1/19 20:35:43: Calculating frame 932.
2020/1/19 20:36:05: Calculating frame 933.
2020/1/19 20:36:27: Calculating frame 934.
2020/1/19 20:36:49: Calculating frame 935.
2020/1/19 20:37:11: Calculating frame 936.
2020/1/19 20:37:33: Calculating frame 937.
2020/1/19 20:37:55: Calculating frame 938.
2020/1/19 20:38:17: Calculating frame 939.
2020/1/19 20:38:39: Calculating frame 940.
2020/1/19 20:39:01: Calculating frame 941.
2020/1/19 20:39:23: Calculating frame 942.
2020/1/19 20:39:44: Calculating frame 943.
2020/1/19 20:40:06: Calculating frame 944.
2020/1/19 20:40:28: Calculating frame 945.
2020/1/19 20:40:50: Calculating frame 946.
2020/1/19 20:41:11: Calculating frame 947.
2020/1/19 20:41:33: Calculating frame 948.
2020/1/19 20:41:54: Calculating frame 949.
2020/1/19 20:42:16: Calculating frame 950.
2020/1/19 20:42:38: Calculating frame 951.
2020/1/19 20:42:59: Calculating frame 952.
2020/1/19 20:43:21: Calculating frame 953.
2020/1/19 20:43:43: Calculating frame 954.
2020/1/19 20:44:04: Calculating frame 955.
2020/1/19 20:44:25: Calculating frame 956.
2020/1/19 20:44:47: Calculating frame 957.
2020/1/19 20:45:08: Calculating frame 958.
2020/1/19 20:45:29: Calculating frame 959.
2020/1/19 20:45:51: Calculating frame 960.
2020/1/19 20:46:12: Calculating frame 961.
2020/1/19 20:46:33: Calculating frame 962.
2020/1/19 20:46:54: Calculating frame 963.
2020/1/19 20:47:15: Calculating frame 964.
2020/1/19 20:47:36: Calculating frame 965.
2020/1/19 20:47:57: Calculating frame 966.
2020/1/19 20:48:18: Calculating frame 967.
2020/1/19 20:48:39: Calculating frame 968.
2020/1/19 20:48:59: Calculating frame 969.
2020/1/19 20:49:20: Calculating frame 970.
2020/1/19 20:49:41: Calculating frame 971.
2020/1/19 20:50:02: Calculating frame 972.
2020/1/19 20:50:22: Calculating frame 973.
2020/1/19 20:50:43: Calculating frame 974.
2020/1/19 20:51:03: Calculating frame 975.
2020/1/19 20:51:23: Calculating frame 976.
2020/1/19 20:51:43: Calculating frame 977.
2020/1/19 20:52:04: Calculating frame 978.
2020/1/19 20:52:24: Calculating frame 979.
2020/1/19 20:52:44: Calculating frame 980.
2020/1/19 20:53:04: Calculating frame 981.
2020/1/19 20:53:24: Calculating frame 982.
2020/1/19 20:53:43: Calculating frame 983.
2020/1/19 20:54:03: Calculating frame 984.
2020/1/19 20:54:23: Calculating frame 985.
2020/1/19 20:54:43: Calculating frame 986.
2020/1/19 20:55:02: Calculating frame 987.
2020/1/19 20:55:22: Calculating frame 988.
2020/1/19 20:55:41: Calculating frame 989.
2020/1/19 20:56:00: Calculating frame 990.
2020/1/19 20:56:18: Calculating frame 991.
2020/1/19 20:56:37: Calculating frame 992.
2020/1/19 20:56:54: Calculating frame 993.
2020/1/19 20:57:12: Calculating frame 994.
2020/1/19 20:57:30: Calculating frame 995.
2020/1/19 20:57:47: Calculating frame 996.
2020/1/19 20:58:05: Calculating frame 997.
2020/1/19 20:58:23: Calculating frame 998.
2020/1/19 20:58:40: Calculating frame 999.
2020/1/19 20:58:58: Calculating frame 1000.
2020/1/19 20:59:15: Finished calculation. Time: 8:07:07.91.
2020/1/19 20:59:15: Saving to C:\Users\Xecades\Desktop\Mandelbrot Zoom.avi.
2020/1/19 20:59:54: Job finished.
```
{% endfold %}

---
## 朱利亚集

{% cq %} 朱利亚集合(Julia set)是一个在复平面上形成分形的点的集合. 
以法国数学家加斯顿·朱利亚(Gaston Julia)的名字命名.  {% endcq %}

其迭代规则为：

<center>$Z_{i + 1} = Z_{i}^2 + C(Z,C\in\mathbf{C}$, 自变量是$Z_0)$</center>

其余规则和曼德勃罗集无异

![](/assets/fractal-pic4.png)

---
## 引用 & 支持

Reference:
 - [中文 Wikipedia: 分形](https://zh.wikipedia.org/zh-hans/分形) by [Wikipedia](https://zh.wikipedia.org/)
 - [知乎专栏](https://zhuanlan.zhihu.com/p/24318397) by [cyantree](https://www.zhihu.com/people/tom-cyantree)

Proposer: <a href="javascript:alert('We&nbsp;call&nbsp;him&nbsp;大佬')">@WXR</a>