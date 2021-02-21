---
title: 运算符优先级
date: 2019-07-12 06:43:08
tags:
 - C++
categories:
 - 计算机
mathjax: true
---

运算符优先级描述在计算表达式时执行运算的先后顺序. 先执行较高优先级的运算，然后执行较低优先级的运算. 例如，先执行乘和除，再执行加减运算. 

<!-- more -->

---
## 运算符优先级表

从上到下，从左到右，优先级依次减弱. 

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-top-width:1px;border-bottom-width:1px;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-top-width:1px;border-bottom-width:1px;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-b6b5{font-family:Verdana, Geneva, sans-serif !important;;border-color:inherit;text-align:left}
.tg .tg-30cg{font-weight:bold;font-family:"Arial Black", Gadget, sans-serif !important;;border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-kiyi{font-weight:bold;border-color:inherit;text-align:left}
.tg .tg-3idj{font-weight:bold;font-family:"Arial Black", Gadget, sans-serif !important;;border-color:inherit;text-align:left}
.tg .tg-93b8{font-family:"Lucida Console", Monaco, monospace !important;;border-color:inherit;text-align:left}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
.tg .tg-ha72{font-weight:bold;font-family:Verdana, Geneva, sans-serif !important;;border-color:inherit;text-align:left}
.tg .tg-xldj{border-color:inherit;text-align:left}
.tg .tg-5nj1{font-family:"Lucida Console", Monaco, monospace !important;;border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-r0kq{font-family:Verdana, Geneva, sans-serif !important;;border-color:inherit;text-align:left;vertical-align:top}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-kiyi">优先级</th>
    <th class="tg-kiyi">运算符</th>
    <th class="tg-ha72">说明</th>
    <th class="tg-kiyi">结合性</th>
  </tr>
  <tr>
    <td class="tg-3idj">1</td>
    <td class="tg-93b8">::</td>
    <td class="tg-b6b5">范围解析</td>
    <td class="tg-0pky" rowspan="6">自左向右</td>
  </tr>
  <tr>
    <td class="tg-3idj" rowspan="5">2</td>
    <td class="tg-93b8">++  --</td>
    <td class="tg-b6b5">后缀自增/后缀自减</td>
  </tr>
  <tr>
    <td class="tg-5nj1">()</td>
    <td class="tg-r0kq">括号</td>
  </tr>
  <tr>
    <td class="tg-5nj1">[]</td>
    <td class="tg-r0kq">数组下标</td>
  </tr>
  <tr>
    <td class="tg-5nj1">.</td>
    <td class="tg-r0kq">成员选择（对象）</td>
  </tr>
  <tr>
    <td class="tg-5nj1">−&gt;</td>
    <td class="tg-r0kq">成员选择（指针）</td>
  </tr>
  <tr>
    <td class="tg-30cg" rowspan="9">3</td>
    <td class="tg-5nj1">++  --</td>
    <td class="tg-r0kq">前缀自增/前缀自减</td>
    <td class="tg-0pky" rowspan="9">自右向左</td>
  </tr>
  <tr>
    <td class="tg-5nj1">+  −</td>
    <td class="tg-r0kq">加/减</td>
  </tr>
  <tr>
    <td class="tg-5nj1">!  ~</td>
    <td class="tg-r0kq">逻辑非/按位取反</td>
  </tr>
  <tr>
    <td class="tg-5nj1">(type)</td>
    <td class="tg-r0kq">强制类型转换</td>
  </tr>
  <tr>
    <td class="tg-5nj1">*</td>
    <td class="tg-r0kq">取指针指向的值</td>
  </tr>
  <tr>
    <td class="tg-5nj1">&amp;</td>
    <td class="tg-r0kq">某某的地址</td>
  </tr>
  <tr>
    <td class="tg-5nj1">sizeof</td>
    <td class="tg-r0kq">某某的大小</td>
  </tr>
  <tr>
    <td class="tg-5nj1">new,new[]</td>
    <td class="tg-r0kq">动态内存分配/动态数组内存分配</td>
  </tr>
  <tr>
    <td class="tg-5nj1">delete,delete[]</td>
    <td class="tg-r0kq">动态内存释放/动态数组内存释放</td>
  </tr>
  <tr>
    <td class="tg-30cg">4</td>
    <td class="tg-5nj1">.*  -&gt;*</td>
    <td class="tg-r0kq">成员对象选择/成员指针选择</td>
    <td class="tg-0pky" rowspan="12">自左向右</td>
  </tr>
  <tr>
    <td class="tg-30cg">5</td>
    <td class="tg-5nj1">*  /   %</td>
    <td class="tg-r0kq">乘法/除法/取余</td>
  </tr>
  <tr>
    <td class="tg-30cg">6</td>
    <td class="tg-5nj1">+  −</td>
    <td class="tg-r0kq">加号/减号</td>
  </tr>
  <tr>
    <td class="tg-30cg">7</td>
    <td class="tg-5nj1">&lt;&lt;  &gt;&gt;</td>
    <td class="tg-r0kq">位左移/位右移</td>
  </tr>
  <tr>
    <td class="tg-30cg" rowspan="2">8</td>
    <td class="tg-5nj1">&lt;  &lt;=</td>
    <td class="tg-r0kq">小于/小于等于</td>
  </tr>
  <tr>
    <td class="tg-5nj1">&gt;  &gt;=</td>
    <td class="tg-r0kq">大于/大于等于</td>
  </tr>
  <tr>
    <td class="tg-30cg">9</td>
    <td class="tg-5nj1">==  !=</td>
    <td class="tg-r0kq">等于/不等于</td>
  </tr>
  <tr>
    <td class="tg-30cg">10</td>
    <td class="tg-5nj1">&amp;</td>
    <td class="tg-r0kq">按位与</td>
  </tr>
  <tr>
    <td class="tg-30cg">11</td>
    <td class="tg-5nj1">^</td>
    <td class="tg-r0kq">按位异或</td>
  </tr>
  <tr>
    <td class="tg-30cg">12</td>
    <td class="tg-5nj1">|</td>
    <td class="tg-r0kq">按位或</td>
  </tr>
  <tr>
    <td class="tg-30cg">13</td>
    <td class="tg-5nj1">&amp;&amp;</td>
    <td class="tg-r0kq">与运算</td>
  </tr>
  <tr>
    <td class="tg-30cg">14</td>
    <td class="tg-5nj1">||</td>
    <td class="tg-r0kq">或运算</td>
  </tr>
  <tr>
    <td class="tg-30cg">15</td>
    <td class="tg-5nj1">?:</td>
    <td class="tg-r0kq">三目运算符</td>
    <td class="tg-c3ow" rowspan="7">自右向左</td>
  </tr>
  <tr>
    <td class="tg-30cg" rowspan="5">16</td>
    <td class="tg-5nj1">=</td>
    <td class="tg-r0kq">赋值</td>
  </tr>
  <tr>
    <td class="tg-5nj1">+=  −=</td>
    <td class="tg-r0kq">相加后赋值/相减后赋值</td>
  </tr>
  <tr>
    <td class="tg-5nj1">*=  /=   %=</td>
    <td class="tg-r0kq">相乘后赋值/相除后赋值/取余后赋值</td>
  </tr>
  <tr>
    <td class="tg-5nj1">&lt;&lt;=  &gt;&gt;=</td>
    <td class="tg-r0kq">位左移赋值/位右移赋值</td>
  </tr>
  <tr>
    <td class="tg-5nj1">&amp;=  ^=  |=</td>
    <td class="tg-r0kq">位与运算后赋值/位异或运算后赋值/位或运算后赋值</td>
  </tr>
  <tr>
    <td class="tg-30cg">17</td>
    <td class="tg-5nj1">throw</td>
    <td class="tg-r0kq">抛出异常</td>
  </tr>
  <tr>
    <td class="tg-30cg">18</td>
    <td class="tg-5nj1">,</td>
    <td class="tg-r0kq">逗号</td>
    <td class="tg-0pky">自左向右</td>
  </tr>
</table>

---

QAQ...打这个表格真心累啊