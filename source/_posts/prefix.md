---
layout: post
title: 前缀和
date: 2019-11-10 17:35:54
tags:
 - 算法
categories:
 - 算法
mathjax: true
---

一维前缀和预处理$O(n)$，二维$O(n^2)$，查询都是$O(1)$

<!-- more -->

---
## 一维前缀和

`pre[]`用于计算前缀和，`a[]`为原数组

```cpp
初始化: pre[i] = pre[i - 1] + a[i];
pre[r] - pre[l-1] 为 a[l..r]的和
pre[i] 表示 a[1..i] 的和
```
---
### 示例程序
```cpp
#include <iostream>
#include <cstring>
#include <cstdlib>
#include <cstdio>
using namespace std;
#define MAX 10000

int a[MAX], pre[MAX] = {0};
int n, l, r;

int main()
{
    cout << "How many numbers? ";
    cin >> n;
    cout << "Enter " << n << " numbers:" << endl;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        pre[i] = pre[i - 1] + a[i];
    }
    cout << "From ";    cin >> l;
    cout << "To ";      cin >> r;
    
    cout << "a[" << l << ".." << r << "]=";
    cout << pre[r] - pre[l - 1] << endl;
    return 0;
}
```
运行结果
```cpp
How many numbers? 10
Enter 10 numbers:
123 123 5 34 354 -12 54 -21 0 21
From 3
To 8
a[3..8]=414
```

<!-- placeholder -->

---
## 二位前缀和

应用容斥原理

`pre[][]`用于计算前缀和，`a[][]`为原数组

```cpp
初始化:
pre[i][j] = pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + a[i][j];
//容斥原理
```

记矩形左上角坐标为`[x1][y1]`，右下角坐标为`[x2][y2]`，则从此矩形的和求法如下

```cpp
pre[x2][y2] - pre[x1 - 1][y2] - pre[x2][y1 - 1] + pre[x1 - 1][y1 - 1];
```

其中，`pre[i][j]`表示从`a[1][1]`到`a[i][j]`的矩形和

---
### 示例程序

```cpp
#include <iostream>
#include <cstring>
#include <cstdlib>
#include <cstdio>
using namespace std;
#define MAX 10000

int a[MAX][MAX], pre[MAX][MAX] = {0};
int sizeA, sizeB;
int x1, x2, y1, y2;

int main()
{
    cout << "Size?(a*b) ";
    scanf("%d*%d", &sizeA, &sizeB);
    cout << "Enter the rectangle:" << endl;
    for (int i = 1; i <= sizeB; i++)
    {
        for (int j = 1; j <= sizeA; j++)
        {
            cin >> a[i][j];
            pre[i][j] = pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + a[i][j];
        }
    }

    cout << "Point 1(a,b):";
    scanf("%d,%d", &x1, &y1);
    cout << "Point 2(a,b):";
    scanf("%d,%d", &x2, &y2);

    printf("Range (%d,%d) to (%d,%d),sum=", x1, y1, x2, y2);
    cout << pre[x2][y2] - pre[x1 - 1][y2] - pre[x2][y1 - 1] + pre[x1 - 1][y1 - 1] << endl;
    return 0;
}
```

运行结果

```cpp
Size?(a*b) 5 * 6
Enter the rectangle:
1   5   8   23  5
-2  -54 34  0   3
1   1   1   1   0
0   0   23  43  4
32  32  44  98  -23
6   9   4   7   5
Point 1(a,b):2,3
Point 2(a,b):4,4
Range (2,3) to (4,4),sum=102
//从值为34的点到值为43的点
```