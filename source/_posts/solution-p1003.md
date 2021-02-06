---
title: 题解P1003[铺地毯]
date: 2019-04-05 16:42:51
tags:
 - 题解
 - 模拟
categories:
 - 题解
mathjax: true
---

<!-- placeholder -->

{% linkcard "https://www.luogu.com.cn/problemnew/show/P1003" "题目来源P1003" %}

判断要求的点在哪些地毯范围内即可

<!-- more -->

```cpp
#include <iostream>
#include <cstring>
#include <cstdio>
#include <vector>
using namespace std;

vector<int> a, b, lenx, leny;
int n, x, y, set = 0;

void cover(int);

int main()
{
    cin >> n;
    int tmp;
    for (int i = 0; i < n; i++)
    {
        cin >> tmp;   a.push_back(tmp);
        cin >> tmp;   b.push_back(tmp);
        cin >> tmp;   lenx.push_back(tmp);
        cin >> tmp;   leny.push_back(tmp);
    }
    cin >> x >> y;
    for (int i = 0; i < n; i++)
        cover(i);

    if (set == 0) cout << -1;
    else          cout << set;

    return 0;
}
void cover(int k)
{
    int i = x - a[k], j = y - b[k];
    if (i >= 0 && i <= lenx[k] && j >= 0 && j <= leny[k])
        set = k + 1;
}
```