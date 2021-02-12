---
title: 转 - 图像隐写软件steghide入门
mathjax: true
date: 2020-03-03 10:00:16
tags:
 - 加密
 - 捣鼓
 - 算法
categories:
 - 算法
author: "Siyuan Lau"
origin: "https://siyuanlau.github.io/"
---

<!-- placeholder -->

{% cq %} steghide 是一种适用于 Windows 和 Linux 的隐写程序. 
今日讨论利用 steghide 加密与解密讯息.  {% endcq %}

<!-- more -->

## 何为隐写？

何为隐写？维基百科上是这么解释的:

> **隐写术** (Steganography) 是一门关于信息隐藏的**技巧与科学**，所谓信息隐藏指的是不让除预期的接收者之外的任何人知晓信息的传递事件或者信息的内容. 一般来说，隐写的信息看起来像一些其他的东西，例如一张购物清单，一篇文章，一篇图画或者其他“伪装” (cover) 的消息. 隐写的信息通常用一些传统的方法进行加密，然后用某种方法修改一个“伪装文本” (covertext)，使其包含被加密过的消息，形成所谓的“隐秘文本” (stegotext). 例如，文字的大小、间距、字体，或者掩饰文本的其他特性可以被修改来包含隐藏的信息. 只有接收者知道所使用的隐藏技术，才能够恢覆信息，然后对其进行解密. 

---

## 隐写有何好处？

### 与图种相比

图种是一种采用特殊方式将图片文件 (如jpg格式) 与 rar 文件结合起来的文件. 该文件一般保存为jpg格式，可以正常显示图片，当有人获取该图片后，可以修改文件的后缀名，将图片改为 rar 压缩文件，并得到其中的数据. 

隐写相比图种优势:

1. 安全性高. 图种增加了照片大小，比如，一张小照片竟有几兆，怎么可能？
2. 某些贴图的网站有可能会发现图片尾部有多余的数据，并且会把这个多余的数据丢弃掉. 

---

### 与内容覆盖法相比

隐写优势:

1. 内容覆盖法的图片在显示的时候，会有一块区域变成灰蒙蒙的，而隐写没有. 
2. 隐藏文件的大小，有一定的限制 (话说这个不是劣势吗……). 

---

## 加密

首先当然要先安装啦，对于 Ubuntu 系统，可用如下命令:

```
sudo apt install steghide
```

之后就能开始啦. 其他系统见[这里](https://sourceforge.net/projects/steghide/)

隐藏的文件是一张照片. 

假定隐藏后这张图片为 secret.jpg. 

那么，只需下载后执行:

```
steghide embed -ef lol.png -cf wallpaper.jpg -sf secret.jpg
```

隐藏信息公式:

```
steghide embed -ef 要隐藏的文件 -cf 隐藏到何文件 -sf 隐藏后的文件名
```

{% note warning warning %}
“隐藏到何文件”与“隐藏后的文件名”后缀名必须一致!
{% endnote %}

之后，设定加密的密码. 

---

## 解密

```
steghide extract -sf 你要解开的文档
```

输入密码，选择 y 即可. 

---

## 缺点

{% note info info %}
由于隐写的特性，无法隐藏过大的文件，否则会提示 too short. 
{% endnote %}

---

转载自:（目前该网址无法访问，不清楚什么原因）

{% linkcard "https://siyuanlau.github.io/2017/01/26/图像隐写软件steghide入门/" "Siyuan Lau 的文章" %}

经原作者 [Siyuan Lau](https://siyuanlau.github.io/) 授权，略有修改.
