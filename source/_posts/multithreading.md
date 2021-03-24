---
title: "[Hash 笔记] Python 的多线程"
date: 2021-02-12 13:00:00
tags:
 - Python
 - 多线程
categories:
 - 计算机
author: "Hash"
thumbnail: /assets/multiprocessing-thumbnail.png
---

作者的笔记，介绍 Python 中的**多线程**.
 
 > 本文由 [@Hash](https://one.wh0th.ink/) 撰写，由 @Xecades 代为发布，并稍作更改.
 > 
 > 若有疑问，可在评论区讨论，@Hash 将会回复.

<!-- more -->

---

```py
import time, threading

# 新线程执行的代码
def loop() -> None:
    print(f"thread {threading.current_thread().name} is running...")
    n = 0
    while n < 5:
        n += 1
        print(f"thread {threading.current_thread().name} >>> {n}")
        time.sleep(1)
    print(f"thread {threading.current_thread().name} ended.")

if __name__ == "__main__":
    print(f'thread {threading.current_thread().name} is running...')
    t = threading.Thread(target = loop, name = "LoopThread")
    t.start()
    t.join()
    print(f'thread {threading.current_thread().name} ended.')
```

就是廖雪峰的代码换了个味道，就作字面意思解.

在前面先吐个槽，pylance 一直会为没有类型标注的函数标注问题，for 循环中未使用的 i 还要标注，改成下划线（是根据 Haskell 的经验来的）才好.

 - `threading.current_thread()` 返回当前线程对象，
 - `threading.Thread()` 创建新线程.

----

## 线程锁

多线程和多进程最大的不同在于，多进程中，同一个变量，各自有一份拷贝存在于每个进程中，互不影响.

而多线程中，所有变量都由所有线程共享，所以，任何一个变量都可以被任何一个线程修改.

因此，线程之间共享数据最大的危险在于多个线程同时改一个变量，把内容给改乱了.

也许这就是进程锁比线程锁重要的原因.

```py
# 无锁
import threading

# 假定这是你的银行存款：
balance = 0

def change_it(n: int):
    # 先存后取，结果应该为 0：
    global balance
    balance += n # 即使改成 inplace add 也没用
    balance -= n

def run_thread(n: int):
    for _ in range(2000000):
        change_it(n)

t1 = threading.Thread(target = run_thread, args = (5,))
t2 = threading.Thread(target = run_thread, args = (8,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)
```

当多个线程同时执行 `lock.acquire()` 时，只有一个线程能成功地获取锁，然后继续执行代码，其他线程就继续等待直到获得锁为止.

获得锁的线程用完后一定要释放锁，否则那些苦苦等待锁的线程将永远等待下去，成为死线程. 所以我们用 `try...finally` 来确保锁一定会被释放.

锁的好处就是确保了某段关键代码只能由一个线程从头到尾完整地执行.

坏处当然也很多，首先是阻止了多线程并发执行，包含锁的某段代码实际上只能以单线程模式执行，效率就大大地下降了.

其次，由于可以存在多个锁，不同的线程持有不同的锁，并试图获取对方持有的锁时，可能会造成死锁，导致多个线程全部挂起，既不能执行，也无法结束，只能靠操作系统强制终止.

---

最后，根据 Python 文档，

> 这个模块提供的带有 `acquire()` 和 `release()` 方法的对象，可以被用作 `with` 语句的上下文管理器. 当进入语句块时 `acquire()` 方法会被调用，退出语句块时 `release()` 会被调用. 因此，以下片段:

```py
with some_lock:
    # statements
```

相当于

```py
some_lock.acquire()
try:
    # statements
finally:
    some_lock.release()
```

正确计算 `balance` 的加锁代码如下：

```py
import threading
# 假定这是你的银行存款：
balance = 0
lock = threading.Lock()
def change_it(n: int):
    # 先存后取，结果应该为 0：
    global balance
    balance += n # 即使改成 inplace add 也没用
    balance -= n
def run_thread(n: int):
    for _ in range(2000000):
        with lock:
            change_it(n)

'''
def run_thread(n: int):
    with lock:
        for _ in range(2000000):
            change_it(n)
根据廖雪峰的评论，这两者结果都是 0，但语义上有区别.
> 你的代码是在循环 100000 次结束前别人都拿不到锁，如果循环 100000 次要 10 秒，那其他拿锁线程就必须等 10 秒.
'''

t1 = threading.Thread(target = run_thread, args = (5,))
t2 = threading.Thread(target = run_thread, args = (8,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)
```

<!-- placeholder -->

---

## GIL（Global Interpreter Lock）

简单地说，GIL 是 CPython 的历史遗留问题，阻止多线程 python 程序利用多核. 

> Python解释器由于设计时有GIL全局锁，导致了多线程无法利用多核. 多线程的并发在Python中就是一个美丽的梦.

---

以上.
