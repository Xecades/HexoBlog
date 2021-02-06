---
layout: post
title: 手动开平方
date: 2019-11-10 22:50:52
tags:
 - 数学
categories:
 - 数学
mathjax: true
---

$\sqrt n$可以用如下方法计算.

<!-- more -->

---
## 例子

假设要求$\sqrt{13}$的粗略值.

我们可以很简单地知道 $3<\sqrt{13}<4$.

所以我们设：

$$\sqrt{13}=3+x\tag{1}$$

这里 $x\in[0,1]$.

把 $(1)$ 式左右平方，得：

$$13=9+6x+x^2$$

因为 $x\in[0,1]$，$x^2$ 较小，可以忽略，因此有

$$13\approx9+6x$$

把 $x$ 解出来，得到 $x=\frac{2}{3}$.

我们再次假设：

$$\sqrt{13}=3+\frac{2}{3}+x=\frac{11}{3}+x\tag{2}$$

左右平方，忽略 $x^2$，得到：

$$13=\frac{121}{9}+\frac{22}{3}x$$

解之得：

$$x=-\frac{2}{33}$$

至此我们估算出的 $\sqrt{13}$ 约等于 $3+\frac{2}{3}-\frac{2}{33}\approx3.60607\approx3.60555\approx\sqrt{13}$.

如果一直这样计算，估算的 $\sqrt{13}$ 的精度会越来越高.

---
## 代码

可以用计算机实现这段操作.

```cpp
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <string>
#include <algorithm>
#include <map>
using namespace std;

int wd, t;
double apx = 0;
map<double, bool> mem;

int main()
{
	cin >> wd;
	if (wd < 0)
	{
		printf("Num shouldn\'t be negative.");
		return 0;
	}
	for (apx = 1; apx * apx <= wd; apx++);
	apx--;
	// wd = apx * apx + 2 * apx * x
	getchar();
	while (true)
	{
		apx += (wd - apx * apx) / (2 * apx);
		if (mem[apx])
		{
			printf("This is my best...\n");
			break;
		}
		printf("sqrt(%d) = %.14lf", wd, apx);
		getchar();
		mem[apx] = true;
	}
	return 0;
}
```