---
title: 题解P1321[单词覆盖还原]
date: 2019-05-12 08:37:30
tags:
 - 题解
 - 字符串
categories:
 - 题解
mathjax: true
---

<!-- placeholder -->

{% linkcard "https://www.luogu.com.cn/problemnew/show/P1321" "题目来源P1321" %}

一共只会出现以下字符：

`b o y g i r l .`

把`boy`和`girl`两串中**可能出现的**重叠形式全部替换成某个字符，例如我用`a..`替换`boy`的组合，用`z...`替换`girl`的组合

得出`boy`和`girl`可能的拆分如下：

```
boy bo oy b o y
girl gir irl gi ir rl g i r l
```

输出时单个字母`b o y g i r l`可在和`a z`一同判断

<!-- more -->

```cpp
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <string>
using namespace std;

char str[260];

void init();
void replace_boy(char*, int);
void replace_girl(char*, int);

int main()
{
    cin >> str;
    init();
    int boy = 0, girl = 0;
    for (int i = 0, len = strlen(str); i < len; i++)
    {
        if (str[i] == 'a' || str[i] == 'b' || str[i] == 'o' || str[i] == 'y')
            boy++;
        else if (str[i] == 'z' || str[i] == 'g' || str[i] == 'i' || str[i] == 'r' || str[i] == 'l')
            girl++;
    }
    cout << boy << endl << girl;
    cin.get(); cin.get();
    return 0;
}
void init()
{
    //替换
    replace_boy("boy", 3);
    replace_boy("bo", 2);
    replace_boy("oy", 2);

    replace_girl("girl", 4);
    replace_girl("gir", 3);
    replace_girl("irl", 3);
    replace_girl("gi", 2);
    replace_girl("ir", 2);
    replace_girl("rl", 2);

}
void replace_boy(char* sub, int len)
{
    char *boy = strstr(str, sub);
    //在字符串str1中找str2，返回其首次出现的地址
    while (boy != NULL)
    {
        *boy = 'a';
        for (int i = 1; i < len; i++)
            *(boy + i) = '.';
        boy = strstr(str, sub);//找下一个
    }
}
void replace_girl(char* sub, int len)
{
    char *girl = strstr(str, sub);
    while (girl != NULL)
    {
        *girl = 'z';
        for (int i = 1; i < len; i++)
            *(girl + i) = '.';
        girl = strstr(str, sub);
    }
}
```