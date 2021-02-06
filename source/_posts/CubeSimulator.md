---
title: 用于学术研究的魔方模拟器
mathjax: true
date: 2020-12-13 11:34:13
tags:
 - 魔方
 - 学术
categories:
 - 魔方
---

近日和同学探讨有关魔方还原的问题（该问题的探讨将写在下一篇博文），为了方便探讨，我编写了一个魔方模拟器，故作此文说明其使用方法.

链接：

{% linkcard "https://lab.xecades.xyz/Cube/" "Cube Simulator" %}

<!-- more -->

---

{% note warning warning %}
**注**：目前支持电脑访问
{% endnote %}

---

## 基础操作

![](/assets/CubeSimulator-pic1.png)

能力所限，目前只能显示魔方展开图.

在网页显示的魔方展开图中，蓝色表示正面.

我们使用 “`F, L, R, U, D, B, f, l, r, u, d, b`” 来表示对魔方的操作，大写表示该面顺时针旋转，小写表示逆时针旋转，其中字母：

 - `F` （Front） 对应正面 （蓝色）;
 - `B` （Back） 对应背面 （绿色）;
 - `L` （Left） 对应左面 （橙色）;
 - `R` （Right） 对应右面 （红色）;
 - `U` （Up） 对应上面 （黄色）;
 - `D` （Down） 对应下面 （白色）.

可以直接在网页中直接按对应按键进行旋转操作.

---

## 控制台操作

按键盘 {% kbd F12 %} 键或 {% kbd Ctrl %} + {% kbd Shift %} + {% kbd I %} 组合键打开控制台（有时需要切换到上面的 `Console` 选项卡）

![](/assets/CubeSimulator-pic2.png)

我提供以下函数用于控制台操作：

### launch(str)

执行 `str` 对应的指令，其中 `str` 为要执行的指令 (需要引号).例如: `launch("RU")` 表示执行操作 `RU` 一次.

![](/assets/CubeSimulator-pic3.png)

### loopTest(str, bound)

循环执行 `str` 指令 `bound` 次，并输出魔方复原所需的次数 (用于研究)，其中 `str` 为执行的命令，`bound` 为执行的次数.例如: `loopTest("RU", 200)` 表示执行操作 `RU` 共 200 次.

![](/assets/CubeSimulator-pic4.png)

### reset()

重置魔方，将魔方恢复到复原的状态.

### countChanges()

显示魔方各块的变化情况，输出结果可以直接用于绘制有向图，[图论绘图工具 csacademy](https://csacademy.com/app/graph_editor/)

![](/assets/CubeSimulator-pic5.png)

这些输出结果可以输入到 csacademy 中：

![](/assets/CubeSimulator-pic6.png)

由于点数过多，建议将边的长度限制为 70 ~ 80.

该功能配合函数 `toggleNumberDisplay()` 使用最佳.

### toggleNumberDisplay()

切换显示 / 不显示方块编号.

![](/assets/CubeSimulator-pic7.png)

### switchColor(mark)

选择魔方的配色，其中 `mark` 为配色编号，目前可供选择的编号为 1 ~ 3，默认为 1.

![](/assets/CubeSimulator-pic8.png)

---

若需要更多功能或出现漏洞，请在评论区评论.