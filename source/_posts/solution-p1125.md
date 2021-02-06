---
title: 题解P1125[笨小猴]
date: 2019-02-13 15:06:39
tags:
 - 题解
 - 库函数
categories:
 - 题解
mathjax: true
---

<!-- placeholder -->

{% linkcard "https://www.luogu.com.cn/problemnew/show/P1125" "题目来源P1125" %}

头文件$algorithm$中有函数`count()`

查询[MSDN](https://docs.microsoft.com/zh-cn/cpp/standard-library/algorithm-functions?view=vs-2017#count)得:它的效果是取得一个范围中**指定元素的多少**，使用方法和`sort()`类似

枚举每一个字符，判一下质数，再求`count`值即可

<!-- more -->

```cpp
#include<iostream>
#include<algorithm>
#include<string>
#include<cmath>
using namespace std;

string word;
int maxn = -1, minn = 101;

void GetMaxMin(string);
bool prime(int);

int main()
{
    cin >> word;
    GetMaxMin(word);
    if (prime(maxn - minn))
        cout << "Lucky Word" << endl << maxn - minn;
    else
        cout << "No Answer" << endl << 0;
    return 0;
}
void GetMaxMin(string s)
{
    for (char c = 'a'; c <= 'z'; c++)
    {
        int t = count(&s[0], &s[s.length()], c);
        maxn = max(t, maxn);
        if (t != 0)
            minn = min(t, minn);
    }
}
bool prime(int x)
{
    if (x < 2)
        return false;
    for (int i = 2; i * i <= x; i++)
        if (x % i == 0)
            return false;
    return true;
}
```
