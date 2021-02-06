---
layout: post
title: 约数个数/和定理
date: 2019-11-10 23:04:17
tags:
 - 数学
categories:
 - 数学
mathjax: true
---

求一个数的约数之和，以及约数个数

<!-- more -->

---
## $\sigma_k(n)$

表示$n$的约数的$k$次方之和

即，$\sigma_0(n)$表示约数个数，$\sigma_1(n)$表示约数和. 

---

记$n = p_1 ^{c_1}+p_2 ^{c_2}+\dots+p_m ^{c_m}$，其中$p_1<p_2<\dots<p_m,c_i\in\mathbb{N^*},p_i\in\mathbb{P}$

---
## 约数个数

$$\sigma_0(n) = (c_1+1)\cdot(c_2+1)\cdot\dots\cdot(c_m+1)=\prod_{i+1}^{m}(c_i+1)$$

---
## 约数和

$$\sigma_1(n) = (1+p_1+\dots+p_1^{c_1})\times\dots\times(1+p_m+\dots+p_m^{c_m})=\prod^m_{i=1}(\Sigma^{c_i}_{j=0}(p_i^j))$$