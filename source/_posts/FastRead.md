---
layout: post
title: 快速读入
date: 2019-11-10 22:31:08
tags:
 - 优化
categories:
 - 杂项
mathjax: true
---

就是我常用的快读模板和解析

<!-- more -->

---

```cpp
int Read()
{
    #define cg ch = getchar()
    int x = 0, f = 1;
    char cg;
    while (ch < '0' || ch > '9')
    {
        if (ch == '-')
            f = -1; //保证输入为正数时，这句话可以省略
        cg;
    }
    while (ch >= '0' && ch <= '9')
    {
        x = (x << 1) + (x << 3) + (ch ^ 48); //相当于x = x * 10 + ch - '0'
        cg;
    }
    return x * f; //正负号
}
```

---
## 解析

这一句

```cpp
x = (x << 1) + (x << 3) + (ch ^ 48);
```

`x << 1`相当于$x\times2$，`x << 3`相当于$x\times2^3=x\times8$，两个加起来就是$2x+8x=10x$，`ch ^ 48`相当于`ch - '0'`. 

---
## 速度比较

假如有一个 ~~丧心病狂~~ 的输入数据，它生成的方法如下：

```cpp
#include<iostream>
using namespace std;
int main()
{
    freopen("input.txt", "w+", stdout);
    for (int i = 1; i <= 1000000; i++)    cout << "12345 ";
    for (int i = 1; i <= 1000000; i++)    cout << "12345 ";
    for (int i = 1; i <= 1000000; i++)    cout << "12345 ";
    return 0;
}
```

那么，如下程序用于验证`cin`、`scanf()`和`Read()`快慢

```cpp
#include<ctime>
#include<iostream>
using namespace std;

clock_t s, e;
int a;

inline int Read()
{
    int x = 0, f = 1;
    char ch = getchar();
    while (ch < '0' || ch > '9')
    {
        if (ch == '-')
            f = -1;
        ch = getchar();
    }
    while (ch >= '0' && ch <= '9')
    {
        x = (x << 1) + (x << 3) + (ch ^ 48);
        ch = getchar();
    }
    return x * f;
}

int main()
{
    //从input.txt中读入数据
    freopen("input.txt", "r+", stdin);

    //cin part
    cout << "cin takes ";
    s = clock();
    for (int i = 1; i <= 1000000; i++)    cin >> a;
    e = clock();
    cout << (double)(e - s) << endl;

    //scanf() part
    cout << "scanf() takes ";
    s = clock();
    for (int i = 1; i <= 1000000; i++)    scanf("%d", &a);
    e = clock();
    cout << (double)(e - s) << endl;

    //Read() part
    cout << "Read() takes ";
    s = clock();
    for (int i = 1; i <= 1000000; i++)    a = Read();
    e = clock();
    cout << (double)(e - s) << endl;

    return 0;
}
```

在我的电脑上运行输出如下：

```cpp
cin takes 1984
scanf() takes 2507
Read() takes 191
```