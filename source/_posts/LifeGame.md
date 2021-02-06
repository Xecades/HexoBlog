---
layout: post
title: 康威生命游戏 | 元胞自动机
date: 2020-01-17 20:42:46
tags:
 - 捣鼓
categories:
 - 捣鼓
thumbnail: /assets/LifeGame-thumbnail.png
---

<!-- placeholder -->
{% cq %} 元胞自动机(cellular automata,CA)是一种时间、空间、状态都离散，
空间相互作用和时间因果关系为局部的网格动力学模型，
具有模拟复杂系统时空演化过程的能力.  {% endcq %}

康威生命游戏，属于元胞自动机，为零玩家游戏(说白了就是别想玩它，没有玩家)

![图片来自Wikipedia](/assets/LifeGame-pic1.gif)

<!-- more -->

---
## 迭代规则

每个细胞有两种状态 - 存活或死亡，每个细胞与以自身为中心的周围八格细胞产生互动（如图，黑色为存活，白色为死亡）

 - 当前细胞为存活状态时，当周围的存活细胞低于2个时（不包含2个），该细胞变成死亡状态. （模拟生命数量稀少）
 - 当前细胞为存活状态时，当周围有2个或3个存活细胞时，该细胞保持原样. 
 - 当前细胞为存活状态时，当周围有超过3个存活细胞时，该细胞变成死亡状态. （模拟生命数量过多）
 - 当前细胞为死亡状态时，当周围有3个存活细胞时，该细胞变成存活状态. （模拟繁殖）

---
## C++实现

### 介绍

所以我写了一个

我没有弄得想上面的gif那样好看，而是按照给定密度随机生成初始网格，如果你愿意，可以在程序中修改初始网格的样式. 

如果感兴趣可以自己试着改一下我的程序. 

下面说明一下程序的操作方法：

 - {% kbd Enter %}: 迭代一次
 - {% kbd W %}: 向上移动，直至边界
 - {% kbd S %}: 向下移动，直至边界
 - {% kbd A %}: 向左移动，直至边界
 - {% kbd D %}: 向右移动，直至边界
 - {% kbd F %}: 自动迭代开/关
 - {% kbd E %}: 退出生命游戏

![](/assets/LifeGame-pic2.png)

![](/assets/LifeGame-pic3.png)

### 代码

{% note warning warning %}
请在Linux环境下编译运行
{% endnote %}

{% linkcard "https://file.xecades.xyz/Linux/LIFE/LIFE.html" "LIFE" %}

或者在线模拟器:

{% linkcard "https://lab.xecades.xyz/GameOfLife/" "生命游戏模拟器" %}

{% linkcard "https://lab.xecades.xyz/CA/" "自己写的模拟器 (buggy)" %}

---
简单弄着玩的，如有疏漏，请在下方评论