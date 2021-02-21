---
title: 数论 - OwO 的讲课笔记
date: 2019-07-30 19:56:38
tags:
 - 数论
 - 笔记
categories:
 - 数学
password: 102938
mathjax: true
---

在成都七中听 OwO 讲数论的笔记 (写上博客是为了方便查阅)

<!-- more -->

{% note warning warning %}
因为各种原因本文不再加密
{% endnote %}

---
# 厄拉多塞筛法

## 筛法的实现

### 朴素的实现

从小到大枚举$x$，将$x$的倍数标记为合数(很朴素对吧)

时间复杂度(调和级数):

$$\sum_{x=2}^{n}\left\lfloor\frac{n}{x}\right\rfloor \leq n \sum_{x=1}^{n} \frac{1}{x}=\Theta(n \ln n)$$

### 不朴素的实现

还是从小到大枚举$x$，若$x$是质数，则将$x$的倍数标记为合数

时间复杂度(梅滕斯第二定理):

$$
\sum_{p \in \mathbb{P}}^{n}\left\lfloor\frac{n}{p}\right\rfloor \leq n \sum_{p \in \mathbb{P}}^{n} \frac{1}{p}=\Theta(n \ln \ln n)
$$

### 优化实现

从小到大枚举$x$，再从小到大枚举素数$p$，将$px$标记为合数，直到$p\mid x$

因此，每个合数只会被其最小质因子筛去，则时间复杂度为:

$$\Theta(n)$$

---
## 难道只能筛素数?

筛法还可以用来预处理其他东西. 

 - **求每个数的最小素因子**:线性筛时记录每个数被那个质数筛去
 - **求每个数的最大素因子**:线性筛时记录$f[x]$表示$x$的最小素因子，$f[p]:=p$，$f[px]:=f[x]$
 - **求积性函数的值**
 - $\dots\dots$

---
## 例题

### $\mathtt{SPOJ\space PRIME1:\space Prime\space Generator}$

>求出值域在$[L,R]$中的所有素数
>
>$1\leq L\leq R\leq 10^{14},\space R-L+1\leq 10^6$

一个合数$n$的最小素因子$p$必然有$p\leq\sqrt n$. 

先线性筛求出$\sqrt R$中的所有质数，

再枚举每一个质数$p$，将$[L,R]$中$p$的倍数标记为合数. 

时间复杂度：

$$\Theta(\sqrt R+(R-L+1)\ln\ln R)$$

---
# 与$\gcd$有关的算法

## 最大公约数

对于两个正整数$a,b$，存在最大的正整数$d$满足$d\mid a$且$d\mid b$，则称$d$是$a,b$的最大公约数，记作:

$$\operatorname{gcd}(a,b)=d$$

---
## 贝祖定理

关于$x,y$的方程$ax+by=c$有解当且仅当$\operatorname{gcd}(a,b)\mid c$

---
## 欧几里得算法

由贝祖定理可以推出

$$\operatorname{gcd}(a,b)=\operatorname{gcd}(b,a-b)$$

由推论反复执行减法可得

$$\operatorname{gcd}(a,b)=\operatorname{gcd}(b,a\bmod b)$$

反复迭代，直到$a=0$或$b=0$

不妨设$a\geq b$，可以证明迭代次数上限为$\Theta(\log_\varnothing a)$，其中$\varnothing=(\sqrt5+1)/2$

---
## 扩展欧几里得算法

### 求$ax=by=\operatorname{gcd}(a,b)$的一组解

求$ax=by=\operatorname{gcd}(a,b)$的一组解，可以用扩展欧几里得算法. 

设$(x',y')$是$bx'+(a\bmod b)y'=\operatorname{gcd}(a,b)$的一组解. 

注意到

$$a\bmod b=a-b\lfloor a/b\rfloor$$

对上式变形得到

<center><a href="https://www.codecogs.com/eqnedit.php?latex=\left\{\begin{array}&space;{l}&space;{x=y'}&space;\\&space;{y=x'-\lfloor&space;a&space;/&space;b\rfloor&space;y'}\end{array}\right." target="_blank"><img src="https://latex.codecogs.com/gif.latex?\left\{\begin{array}&space;{l}&space;{x=y'}&space;\\&space;{y=x'-\lfloor&space;a&space;/&space;b\rfloor&space;y'}\end{array}\right." title="\left\{\begin{array} {l} {x=y'} \\ {y=x'-\lfloor a / b\rfloor y'}\end{array}\right." /></a></center>

时间复杂度同欧几里得算法，也是$\Theta(\log_\varnothing a)$

令$d:=\operatorname{gcd}(a,b)$

如果要求$ax+by=c$的解，有贝祖定理$d\mid c$，将扩展欧几里得算法得到的解乘$c/d$即可

### 求通解

上面求出来的只是$ax+by=c$的一组通解$(x_0,y_0)$

要想求通解，可以设$x=x_0+s$，$y=y_0-t$，代入原方程得

$$as=bt$$

即

$$s=\frac{b}{a}t=\frac{b/d}{a/d}t$$

也就是说通解为

<center><a href="https://www.codecogs.com/eqnedit.php?latex=\left\{\begin{array}&space;{l}&space;{x=x_{0}&plus;\frac{b}&space;{d}&space;k}&space;\\&space;{y=y_{0}-\frac{a}&space;{d}&space;k}\end{array}(k&space;\in&space;\mathbb{Z})\right." target="_blank"><img src="https://latex.codecogs.com/gif.latex?\left\{\begin{array}&space;{l}&space;{x=x_{0}&plus;\frac{b}&space;{d}&space;k}&space;\\&space;{y=y_{0}-\frac{a}&space;{d}&space;k}\end{array}(k&space;\in&space;\mathbb{Z})\right." title="\left\{\begin{array} {l} {x=x_{0}+\frac{b} {d} k} \\ {y=y_{0}-\frac{a} {d} k}\end{array}(k \in \mathbb{Z})\right." /></a></center>

---
# 同余

若$a,b$ ~~膜~~ 模$m$的余数相同，则称$a$和$b$模$m$同于，记为

$$a\equiv b(\bmod m)$$

$a\equiv b(\bmod m)$的充要条件是$m\mid a-b$. 

若$a\equiv b(\bmod m)$，则

 - $a\pm c\equiv b\pm c(\bmod m)$
 - $ac\equiv bc(\bmod m)$
 - 若$c\mid a$，$c\mid b$，则$a/c\equiv b/c(\bmod m/gcd(m,c))$

---
## 同余方程

形如$a\equiv b(\bmod m)$的方程称为同余方程. 

根据同余的定义，同余方程等价于$ax+mt=b(t\in\mathbb Z)$，可以用扩展欧几里得算法求解. 

同余方程有解的条件是$\gcd(a,m)\mid b$. 

---
## 例题

### $\mathtt{NOI2002:\space Savage}$

>有$N$个野人，第$i$个野人剩余寿命为$A_i$. 有若干个山洞，山洞排成环形. 初始时第$i$个野人住在山洞$C_i$，每一年第$i$个野人会顺时针走$P_i$个山洞然后住下来. 求最少需要有多少个山洞才能使任意两个野人都不会在有生之年住在同一个洞穴
>
>$N\leq15$，答案不会超过$10^6$. 

范围很小，枚举答案$M$然后判断. 

枚举哪两个野人$i,j$碰面，求出碰面的最小时间，

与$\min\{A_i,A_j\}$比较一下

$$C_i+P_ix\equiv c_j+P_jx(\bmod M)$$

---
## 逆元

给定正整数$a$，若$\exists x$满足$ax\equiv 1(\bmod m)$，则称$x$是$a$在模$m$下的逆元，记为$a^{-1}$. 

由同余方程可知，逆元存在的条件是$\operatorname{gcd}(a,m)=1$. 

用反证法可以证明，逆元若存在则唯一. 

可以在$\Theta(n)$内求出$1$到$n$的所有数模素数$p$的逆元，要求$n<p$. 

首先$1^{-1}=1$. 

对于一个数$x(x>1)$，设$p=ax+b$，

即$a=\lfloor p/x\rfloor$，$b=p\bmod x$. 

有

$$ax+b\equiv0(\bmod p)$$

两边同时乘以$b^{-1}x^{-1}$，得

$$ab^{-1}+x^{-1}\equiv0(\bmod p)$$

即

$$x^{-1}\equiv -ab^{-1}\equiv -\lfloor p/x\rfloor(p\bmod x)^{-1}(\bmod p)$$

因为$p\bmod x<x$，所以其逆元已经算过了，可以按$x$从小到大的顺序递推. 

---
## 同余方程组

<center><a href="https://www.codecogs.com/eqnedit.php?latex=\left\{\begin{matrix}x\equiv&space;a_1(\bmod&space;m_1)&space;\\&space;x\equiv&space;a_2(\bmod&space;m_2)\end{matrix}\right." target="_blank"><img src="https://latex.codecogs.com/gif.latex?\left\{\begin{matrix}x\equiv&space;a_1(\bmod&space;m_1)&space;\\&space;x\equiv&space;a_2(\bmod&space;m_2)\end{matrix}\right." title="\left\{\begin{matrix}x\equiv a_1(\bmod m_1) \\ x\equiv a_2(\bmod m_2)\end{matrix}\right." /></a></center>

设

$$x=k_1m_1+a_1=k_2m_2+a_2$$

用扩展欧几里得算法可以求出一组$(k_1,k_2)$，即可求出$x$. 

可以证明解在模$\operatorname{lcm}(m_1,m_2)$意义下唯一存在（可以用后文的中国剩余定理推出）. 

有多少个方程呢？注意到上面的过程实际上是将两个方程合并为了一个模$\operatorname{lcm}(m_1,m_2)$的方程. 多个方程依次合并即可. 

---
## 中国剩余定理

设$m_1,m_2,\dots,m_n$两两互质，则同余方程组

<center><a href="https://www.codecogs.com/eqnedit.php?latex=\left\{\begin{matrix}x\equiv&space;a_1(\bmod&space;m_1)&space;\\&space;x\equiv&space;a_2(\bmod&space;m_2)&space;\\&space;\vdots&space;\\&space;a\equiv&space;a_n(\bmod&space;m_n)\end{matrix}\right." target="_blank"><img src="https://latex.codecogs.com/gif.latex?\left\{\begin{matrix}x\equiv&space;a_1(\bmod&space;m_1)&space;\\&space;x\equiv&space;a_2(\bmod&space;m_2)&space;\\&space;\vdots&space;\\&space;a\equiv&space;a_n(\bmod&space;m_n)\end{matrix}\right." title="\left\{\begin{matrix}x\equiv a_1(\bmod m_1) \\ x\equiv a_2(\bmod m_2) \\ \vdots \\ a\equiv a_n(\bmod m_n)\end{matrix}\right." /></a></center>

在模$M=\prod m_i$下有唯一解

$$x\equiv\sum a_i t_i M_i(\bmod M)$$

其中$M_i=M/m_i$，$t_i$为$M_i$在模$m_i$下的逆元. 

---
# 约数

将$n$质因数分解

$$n=\prod p_i^{r_i}$$

约数个数

$$\sigma_0(n)=\prod(1+r_i)$$

约数和

$$\sigma_1(n)=\prod\sum^{r_i}_{k=0}p_i^k$$

约数函数

$$\sigma_t(n)=\sum_{d\mid n}d^t=\prod\sum^{r_i}_{k=0}p_i^{kt}$$

不大于$\sqrt n$的约数不超过$\lfloor\sqrt n\rfloor$个，大于$\sqrt n$的约数$d$唯一对应一个小于$\sqrt n$的约数$n/d$，也不超过$\lfloor\sqrt n\rfloor$个，所以约数个数的上界是$\Theta(\sqrt n)$. 

随机数据下，约数个数的期望是$\Theta(\ln n)$. 

---
## 例题

### $\mathtt{AHOI2007: 密码箱}$

>给定正整数$n$，求$[0,n-1]$中，所有满足$x^2\equiv1(\bmod n)$的$x$. 
>
>$2\leq n\leq2\times10^9$. 

变形可得$(x-1)(x+1)\equiv0(\bmod n)$，即$(x-1)(x+1)=kn$. 

可以将$n$分解为$n=n_1n_2$，要么$x-1\mid n_1$且$x+1\mid n_2$，要么$x+1\mid n_1$且$x-1\mid n_2$. 

不妨设$n_1\leq n_2$，那么$n_1\leq\sqrt n$，$n_2\geq\sqrt n$. 

$\Theta(\sqrt n)$枚举$n_1$，得到$n_2=\frac{n}{n_1}$，再枚举$n_2$的倍数判断即可. 

注意到枚举$n_2$的次数是$n_1$，所以时间复杂度为不超过$\sqrt n$的约束和，看起来上界是$\Theta(n)$，但因为约数很少，所以复杂度远不到上界，可以通过. 

---
# 莫比乌斯函数

<center><a href="https://www.codecogs.com/eqnedit.php?latex=$$\mu(n)=\left\{\begin{array}{ll}{0}&space;&&space;{\exists&space;p,&space;p^{2}\mid&space;n}&space;\\&space;{(-1)^{r}}&space;&&space;{n=p_{1}&space;p_{2}&space;\cdots&space;p_{r}}\end{array}\right.$$" target="_blank"><img src="https://latex.codecogs.com/gif.latex?$$\mu(n)=\left\{\begin{array}{ll}{0}&space;&&space;{\exists&space;p,&space;p^{2}\mid&space;n}&space;\\&space;{(-1)^{r}}&space;&&space;{n=p_{1}&space;p_{2}&space;\cdots&space;p_{r}}\end{array}\right.$$" title="$$\mu(n)=\left\{\begin{array}{ll}{0} & {\exists p, p^{2}\mid n} \\ {(-1)^{r}} & {n=p_{1} p_{2} \cdots p_{r}}\end{array}\right.$$" /></a></center>

这个函数常用于约数相关的容斥，相当于全部，减去一个质数的，加上有两个质数的，……

下面用一个题目来具体说明. 

---
## 例题

### $\mathtt{完全平方数}$

>求1到n中有多少个数无平方因子. 
>
>$1\leq n\leq 10^{14}$

考虑容斥原理，用总的减去一个质数的平方的倍数，加上两个质数乘积的平方的倍数，减去三个质数乘积的平方的倍数……

$$n-\sum_{p \in \mathbb{P}}\left\lfloor\frac{n}{p^{2}}\right\rfloor+\sum_{p_{1}, p_{2} \in \mathbb{P}}\left\lfloor\frac{n}{p_{1}^{2} p_{2}^{2}}\right\rfloor-\sum_{p_{1}, p_{2}, p_{3} \in \mathbb{P}}\left\lfloor\frac{n}{p_{1}^{2} p_{2}^{2} p_{3}^{2}} \right\rfloor+\cdots$$

即

$$\sum_{x \geq 1} \mu(x)\left\lfloor\frac{n}{x^{2}}\right\rfloor$$

$x$的范围是$\sqrt n$，所以时间复杂度是$\Theta(\sqrt n)$. 

可以用线性筛$\Theta(n)$求出$1$到所有数的莫比乌斯函数值. 

由表达式可以发现，若$\operatorname{gcd}(p, q)=1$（互质），则$\mu(p q)=\mu(p) \mu(q)$，这一性质被称为积性. 

对于质数$p$，$\mu(p)=-1$. 

对于$px$，如果$p \nmid x$，$\mu(p x)=\mu(p) \mu(x)=-\mu(x)$. 

对于$px$，如果$p \mid x$，那么$p^2$是一个平方因子，$\mu(px)=0$. 

---
# 欧拉函数

欧拉函数$\varphi(n)$表示不超过$n$与$n$互质的数的个数. 

这个也可以用莫比乌斯函数容斥，枚举公约数$d$，得

$$\varphi(n)=\sum_{d | n} \mu(d) \frac{n}{d}$$

将n质因数分解

$$n=\prod p_{i}^{r_{i}}$$

代入莫比乌斯函数的定义式，得

$$\varphi(n)=n \prod\left(1-\frac{1}{p_{i}}\right)=\prod p_{i}^{r_{i}-1}\left(p_{i}-1\right)$$

可以用线性筛$\Theta(n)$求出$1$到所有数的欧拉函数值. 

由表达式可以发现，欧拉函数也有积性. 

对于质数$p$，$\varphi(p)=p-1$. 

对于$px$，如果$p \nmid x$，$\varphi(p x)=\varphi(p) \varphi(x)=(p-1) \varphi(x)$. 

对于$px$，如果$p \mid x$，$\varphi(p x)=p \varphi(x)$. 

---
## 费马小定理

对于素数$p$和任意正整数$a \in[1, p)$，有

$$a^{p-1} \equiv 1 \quad(\bmod p)$$

费马小定理其实是欧拉定理的特殊情况. 

---
## 欧拉定理

给定正整数$a,m$，若$\operatorname{gcd}(a, m)=1$，则

$$a^{\varphi(m)} \equiv 1 \quad(\bmod m)$$

---
## 扩展欧拉定理

给定正整数$a,m$，$r \geq \varphi(m)$，则

$$a^{r} \equiv a^{r \bmod \varphi(m)+\varphi(m)} \quad(\bmod m)$$

常用欧拉定理来求逆元. 

根据欧拉定理，逆元

$$a^{-1} \equiv a^{\varphi(m)-1} \quad(\bmod m)$$

特别地，但$m$为素数$p$时，

$$a^{-1} \equiv a^{p-2} \quad(\bmod p)$$

用快速幂实现，复杂度为$\Theta(\lg m)$. 

---

后略。