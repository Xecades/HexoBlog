---
title: 位运算的应用
date: 2019-06-27 08:25:32
tags:
 - 位运算
 - 二进制
categories:
 - 算法
mathjax: true
---

<!-- placeholder -->

{% linkcard "https://blog.xecades.xyz/articles/BitwiseOperation" "位运算的操作" %}

本文介绍位运算的简单应用及性质
<!-- more -->

---
## 优先级

同其他运算符号一样，位运算也是有优先级的：

|优先级|运算符|
|:----:|:----:
|1|~|
|2|<<、>>|
|3|&|
|4|^|
|5|\||
|6|&=、^=、\|=、<<=、>>=|

---
## 常用变换

列举如下：

|操作|举例|运算|
|:----:|:----:|:----:|
|去掉最后一位|$101101\rightarrow 10110$|$x$ >> $1$|
|在最后加一个0　|$101101\rightarrow 1011010$|$x$ << $1$|
|在最后加一个1　|$101101\rightarrow 1011011$|$x$ << $1+1$|
|把最后一位变成1　|$101100\rightarrow 101101$|$x \mid 1$|
|把最后一位变成0　|$101101\rightarrow 101100$|$x \mid 1-1$|
|最后一位取反|$101101\rightarrow 101100$|$x$ ^ $1$|
|把右数第k位变成1|$101001\rightarrow 101101,k=3$|$x \mid (1$<<$(k-1))$|
|把右数第k位变成0|$101101\rightarrow 101001,k=3$|$x$ & ~ $(1$ << $(k-1))$|
|右数第k位取反　|$101001\rightarrow 101101,k=3$|$x$ ^ $(1$ << $(k-1))$|
|取末k位　|$1101101\rightarrow 1101,k=4$|$x$ & $15^※$|
|取右数第k位　|$1101101\rightarrow 1,k=4$|$x$ >> $(k-1)$ & $1$|
|把末k位变成1　|$101001\rightarrow 101111,k=4$|$x \mid (1$ << $k-1)$|
|末k位取反|$101001\rightarrow 100110,k=4$|$x$ ^ $(1$ << $k-1)$|
|把右边连续的1变成0|$100101111\rightarrow 100100000$|$x$ & $(x+1)$|
|把右起第一个0变成1|$100101111\rightarrow 100111111$|$x \mid (x+1)$|
|把右边连续的0变成1|$11011000\rightarrow 11011111$|$x \mid (x-1)$|
|取右边连续的1|$100101111\rightarrow 1111$|($x$ ^ $(x+1))$ >> $1$|
|去掉右起第一个1的左边($lowbit$)|$100101000\rightarrow 1000$|$x$ & ~ $(x$ ^ $(x-1))$或$x$ & $(-x)$|

※其中取末$4$位用$x$ & $15$是因为$15$二进制表示为$1111$.因此，取末尾$8$位用二进制为$11111111$的数，转为十进制为$255$，建议用$(1$ << $8$) $-$ $1$表示

---
## 常用应用

### 交换数字

```cpp
a = a ^ b;
b = a ^ b;
a = a ^ b;
//或a ^= b ^= a ^= b;
```

### 计算32位整数的二进制中1的个数的奇偶性

当输入数据的二进制表示里有偶数个数字1时程序输出0，有奇数个时输出1（注意：**对于32位整数**）

```cpp
#include <iostream>
using namespace std;
int main()
{
    int x;
    cin >> x;
    x ^= (x >> 1);
    x ^= (x >> 2);
    x ^= (x >> 4);
    x ^= (x >> 8);
    x ^= (x >> 16);
    cout << (x & 1);
    return 0;
}
```

### 获得int最大值(Max_Int)

```cpp
int Max_Int()
{
    return (1 << 31) - 1;
    //或return ~(1 << 31);
    //或return (1 << -1) - 1;
}
```

### 获取int最小值(Min_Int)

```cpp
int Min_Int()
{
    return 1 << 31;
    //或return 1 << -1;
}
```

### 取绝对值

```cpp
int abs(int x)
{
    return (x ^ (x >> 31)) - (x >> 31);
}
```

### 取较大值

```cpp
int max(int x, int y)
{
    return x ^ ((x ^ y) & -(x < y));
}
```

### 取较小值

```cpp
int min(int x, int y)
{
    return y ^ ((x ^ y & -(x < y)));
}
```

### 从低到高,取n的第m位

```cpp
int getBit(int n, int m)
{
	return (n >> (m - 1)) & 1;
}
```

### 从低到高,将n的第m位置1

```cpp
int setBitToOne(int n, int m)
{
	return n | (1 << (m - 1));
}
```

### 从低到高,将n的第m位置0

```cpp
int setBitToZero(int n, int m)
{
	return n & ~(1 << (m - 1));
}
```

### 计算n + 1

```cpp
-~n
```

### 计算n - 1

```cpp
~-n
```

### 计算-n

```cpp
~n + 1
```
