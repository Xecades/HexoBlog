---
title: 题解P3386[二分图匹配]
date: 2019-08-09 08:42:51
tags:
 - 二分图
 - C++
categories:
 - 算法
mathjax: true
---

<!-- placeholder -->

{% linkcard "https://www.luogu.com.cn/problemnew/show/P3386" "题目来源P3386" %}

<!-- more -->

---
## 解答

### 二分图(通俗解释)：

一个图，它可以分成两部分，使得每个部分内部没有边相连，而这两部分相互有边相连，此图称为二分图

![](/assets/solution-p3386-pic1.png)

这就是一个标准的二分图，两个用黄色框框起来的部分中的点相互没有连线. 

---
### 引子

想一下坐板凳的问题：

>有$n$个人，$m$个板凳，每个人只能坐给定的某些板凳，那么，怎么让最多的人坐在板凳上呢？

显然的是，一个板凳上只能有$1$个人. 

那么，不妨把人看成一个集合（点集），板凳看成另一个集合，这两个集合内部是显然不会相连的（比如人不能坐在人上，板凳不能坐在板凳上）. 

因此很容易就会想到用二分图来做. 

对应关系：某个人坐某个座位 

以下是没有优化的伪代码

```cpp
bool sit(a)://让a号人来抢位置

//把后面看完看这个判断
//赶走的人编号为0
//要抢位置的人找到位置
IF a==0
    return true
for i=1 to n//枚举每个板凳
{
    IF d[a][i]==true//如果a号人可以坐在i号板凳
    {

        //a号人先赶走i号板凳上的人
        //此处如果i号板凳本来就没人
        //赶走的人的编号就是默认的0
        //现在可以回去看前面的IF a==0了
        //待原来的人找不到板凳再还回去

        t=seat[i]       //把原来的人存着备份，以便归还
        seat[i]=a       //我抢~
        IF sit(t)==true //如果喊走的人找到了位置
            return true;
        seat[i]=t;      //喊走的人没找到位置，只好还回去了
    }
}
return false//a没板凳坐了（泪目）
```

<!-- placeholder -->

---
### 时间复杂度优化

每次调用`sit()`函数的时候，$a$都会从头到尾判断哪个座位能坐，哪个又不能坐，有重复

想到用一个$bool$二维数组`used`来存储$a$是否找过这个点，$true$为找过，$false$为没找过. 

---
### 空间复杂度优化

注意到每次都会尝试给不一样的$a$安座位，而每次都只针对$a$这一个人来操作，所以数组可以由二维降到一维，每次在`main`中调用`sit()`的时候清空即可. 

因此我们得出以下优化的代码：

```cpp
bool sit(a):

IF a==0
    return true
for i=1 to n
{
    IF d[a][i]==1 and used[i]==false
    //a号人可以坐在i号座位，并且当前座位没尝试过
    {
        t=seat[i]
        seat[i]=a
        used[i]=true//标记尝试过这个座位了
        IF sit(t)==true
            return true;
        seat[i]=t;
    }
}
return false
```

调用入口：

```cpp
for i=1 to n
{
    清空used
    IF sit(i)
        ans++;
}
```

这样$ans$就是我们要的最大匹配数，如果要求匹配方法，每次记录`used`就好了. 

---
### 代码

```cpp
#include <iostream>
#include <cstring>
#include <cstdlib>
#include <cstdio>
using namespace std;

int n, m, edgenum, ans = 0;
bool dis[1010][1010] = {false}; //d数组，邻接矩阵
bool vis[1010] = {true};        //used数组
int seat[1010] = {0};           //标记座位上坐了哪个人

bool sit(int);

int main()
{
    cin >> n >> m >> edgenum;
    for (int i = 1; i <= edgenum; i++)
    {
        int u, v;
        cin >> u >> v;
        if (u > n || v > m) //毒瘤数据直接爆破
            continue;
        dis[u][v] = true;
    }
    for (int i = 1; i <= n; i++)
    {
        memset(vis, true, sizeof(vis));
        if (sit(i))
            ans++;
    }
    cout << ans;
    return 0;
}
bool sit(int a)
{
    if (a == 0)
        return true;
    for (int i = 1; i <= n; i++)
    {
        if (dis[i][a] && vis[i])
        {
            int t = seat[i];
            seat[i] = a;
            vis[i] = false;
            if (sit(t))
                return true;
            seat[i] = t;
        }
    }
    return false;
}
```