---
title: "[Hash 笔记] Python 的多进程"
date: 2021-02-12 13:10:00
tags:
 - Python
 - 多进程
categories:
 - 计算机
author: "Hash"
thumbnail: /assets/multiprocessing-thumbnail.png
---

作者的笔记，介绍 Python 中的**多进程**.
 
 > 本文由 [@Hash](https://one.wh0th.ink/) 撰写，由 @Xecades 代为发布，并稍作更改.
 > 
 > 若有疑问，可在评论区讨论，@Hash 将会回复.

<!-- more -->

---

## bash

涉及的知识点，主要包括 fork，source，exec 命令（毕竟都是 C 的 wrap，得懂点 C 才好挖深）.

 - shell 中运行任何外部命令，都会 fork 一个进程，然后 exec，
 - `source` 一个 shell 脚本会在当前进程下执行，
 - `exec` 会将当前进程修改成新进程，退出时不会返回父进程，
 - `wait` 用于进程同步，可以等待某个 pid，或者等待全部子进程. 作用范围可以是全局或者函数.

进程树可以通过 pstree 直观地查看.

```bash
#!/usr/bin/env bash
for i in {1..10}
do
    echo "${i}" & # & 表示 fork 一个子进程，在后台运行（相当于运行某程序，然后 C-z）
done
wait
echo "END"
# 输出随机顺序的 1 - 10，然后 END
```

另外，如果使用 sh（而不是 bash），或者 libc 而不是 glibc（比如 alpine 的 musl），则会顺序输出 1 - 10. 还不知道为什么. 

---

## python fork

把上面的代码翻译下来（只能在 Unix 下运行）：

首先需要知道这几个封装的 API.（参数，返回值）

 - `os.fork()`
 - `os.getpid()`
 - `os.getppid()`
 - `os._exit()`（退出子进程）
 - `os.wait()`，`os.waitid()`（用于进程同步）

别的知识点包括进程状态，孤儿 / 僵尸进程，资源独立.

 - **孤儿进程**：主进程先结束，子进程的父进程变为 pid1（init），
 - **僵尸进程**：子进程先结束，但未正确退出，占用资源，
 - **资源独立**：fork 前的数据父子共享，fork 之后数据独立，进程间全局变量不共享.

```py
# 实际上这个是异步的，不过因为 python print 太快
# 或者创建子进程 / for 循环太慢，效果不明显
# 所以我用 random 和 sleep 示范
import os, random
from time import sleep

def main():
    for i in range(10):
        if os.fork():
            # 父进程
            # os.wait() 如果加上这行，那么就变成同步了
            pass
        else:
            # 子进程，pid 为 0
            sleep(t := random.random())
            print(t)
            os._exit(0)

if __name__ == "__main__":
    main()
    # 暂时还不知道 python 中 fork 出来的进程怎么同步
    # 实际上，子进程们在 END 打印出来之后全成孤儿了
    print("END")
```

这样的弊端：

 - Windows 没有 fork，无法运行
 - fork 的设计就很扯淡（我没认真学过，道听途说罢了）
 - 总有廖雪峰会拿 Windows 没有 fork 来推荐 Mac（

---

## python multiprocessing

博大精深，参见：

 - [多进程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1016959663602400/1017628290184064)
 - [Python 文档](https://docs.python.org/zh-cn/3.9/library/multiprocessing.html)

这里只记笔记，细节见外链.

---

### 基础

`Pool p => p.join()` 相当于 shell 里面的 `wait` ~~（Haskell 瞩目）~~

---

### 进程间通信

#### `multiprocessing.Queue`

`Queue` 类是一个近似 `queue.Queue` 的克隆. 

```py
from multiprocessing import Process, Queue

def f(q):
    q.put([42, None, 'hello'])

if __name__ == '__main__':
    q = Queue() # 全局变量
    p = Process(target = f, args = (q,))
    p.start()
    print(q.get())    # [42, None, 'hello']
    p.join()
```

<!-- placeholder -->

---

#### `multiprocessing.Pipe`

```py
from multiprocessing import Process, Pipe

def f(conn):
    conn.send([42, None, 'hello'])
    conn.close()

if __name__ == '__main__':
    parent_conn, child_conn = Pipe() # 返回的两个连接对象 Pipe() 表示管道的两端
    # 每个连接对象都有 send() 和 recv() 方法（相互之间的）
    p = Process(target = f, args = (child_conn,))
    p.start()
    print(parent_conn.recv())   # [42, None, 'hello']
    p.join()
```

请注意，如果两个进程（或线程）同时尝试读取或写入管道的**同一**端，则管道中的数据可能会损坏. 

当然，在不同进程中同时使用管道的不同端的情况下不存在损坏的风险. 

---

### 进程锁

关于线程锁和进程锁，推荐这篇文章：

{% linkcard "https://blog.csdn.net/S_o_l_o_n/article/details/92148720" "python线程锁和进程锁_S_o_l_o_n的博客-CSDN博客" %}

```py
from multiprocessing import Process, Lock

def f(l, i: int) -> None:
    with l:
        print('hello world'*8192, i)

if __name__ == '__main__':
    lock = Lock()

    for num in range(10):
        Process(target = f, args = (lock, num)).start()
```

此处多进程的锁不用于限制变量访问，而是同步 IO.
 
如果把锁去掉，输出会有奇效 w

---

### 共享状态

pass
