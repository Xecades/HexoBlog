---
layout: post
title: Q - 老鼠喝药水
date: 2019-12-28 19:54:20
tags:
 - 进制
categories:
 - 数学
---

<!-- placeholder -->

## 题目

你面前有 100 瓶药水，标号 1 ~ 100. 其中有且仅有一瓶毒药，其余都是无毒药水. 

这瓶毒药比较特殊，喝了它并不会立即死掉，而是会在第二天**立刻同时**显现药性（就是死掉），也就是说，第二天喝过毒药的老鼠都会死去，而第一天和正常老鼠没有区别. 

你有 7 只老鼠，编号 1 ~ 7，每只老鼠可以喝下无限量的药水，每瓶药水无限供应. 

假定你有无限的计算能力，只要信息足够，你可以在一瞬间计算出是哪一瓶药水有毒. 

问：如何仅通过这 7 只老鼠，在第二天到来后，根据它们的死活找出那一瓶毒药

<!-- more -->

## 提示

没有头绪时，再**依次**单击展开提示

<details>
<summary>HINT 1</summary>
每只老鼠有两种状态：生和死
</details>

<details>
<summary>HINT 2</summary>
每瓶药水有两种状态：有毒或没毒
</details>

<details>
<summary>HINT 3</summary>
$2^7 = 128 \approx 100$，且$128 > 100$
</details>

<details>
<summary>HINT 4</summary>
考虑二进制
</details>

<details>
<summary>HINT 5</summary>
死为1，生为0；有毒为1，没毒为0
</details>

<details>
<summary>HINT 6</summary>
类似状态压缩
</details>

<details>
<summary>HINT 7</summary>
$1 = 1_{(2)}, 2 = 10_{(2)}, 3 = 11_{(2)}, 4 = 100_{(2)} , \dots , 100 = 1100100‬_{(2)}$
</details>

<details>
<summary>HINT 8</summary>
$100 = 1100100‬_{(2)}$，恰好7位，可以对应每一只老鼠
</details>

<details>
<summary>HINT 9</summary>
一只老鼠对应一个数位
</details>

## 答案

<details>
<summary>ANSWER</summary>
把 1 ~ 100 的每一个数改写成二进制，让第 1 只老鼠喝二进制下第 1 位为 1 的药水，第 2 只老鼠喝第 7 位为 1 的药水，以此类推，第 7 只老鼠喝第 7 位为 1 的药水. 

到了第二天，枚举 i 从 7 到 1，统计第 i 只老鼠死了与否，若死去，把第 i 位标记为 1 ，反之为 0 . 这样得到一个 0-1 串. 

把这个 0-1 串转换为十进制，即为毒药的编号. 
</details>

<details>
<summary>EXAMPLE</summary>
实施 ANSWER 的做法，假设只有 1、3、7 号老鼠死掉，得到的 0-1 串就是：1000101. 对应十进制 69，即第 69 瓶药水为毒药. 
</details>

<details>
<summary>EXPLANATION</summary>
如上例，1、3、7 死去，说明二进制表示下 1、3、7 位为 1 的药水有嫌疑，而其他喝了药水的老鼠安然无恙，说明二进制下 2、4、5、6 位为 1 的药水没有嫌疑，这样就可以写出药水的二进制表达式. 
</details>

