---
title: Quine Relay — 代码的艺术
date: 2021-03-28 16:28:12
tags:
 - Quine
 - Ouroboros
categories:
 - 计算机
---

Quine 指一类输出结果为程序自身源码的程序，即所谓『自产生程序』。但不能直接读取源码文件、读取用户输入，且不能为空.

这里的 [Quine Relay](https://github.com/mame/quine-relay) 是日本人 Yusuke Endoh 的作品，作者给的介绍是：

> This is a Ruby program that generates Rust program that generates Scala program that generates ...(through 128 languages in total)... REXX program that generates the original Ruby code again.

也就是说，这是个 Ruby 程序，编译输出是一个 Rust 程序，编译运行这个 Rust 程序输出是一个 Scala 程序，以此类推，一共编译 128 种语言的程序后，最终由 REXX 语言的程序编译运行出**原** Ruby 程序.

![](/assets/QuineRelay-pic1.png)

<!-- more -->

---

这就是代码的艺术，下面我将尝试使用阿里云 Ubuntu 服务器编译运行这个程序（希望人没事🙏）.

服务器配置如下：

```
OS: Ubuntu 20.04 focal
Kernel: x86_64 Linux 5.4.0-65-generic
CPU: Intel Xeon Platinum 8269CY @ 2.5GHz
GPU: Cirrus Logic GD 5446
```

---

## 安装所需编译器

执行命令（为了能在 Ubuntu 20.04 运行，我进行了一些调整）：

```sh
$ sudo apt-get install afnix algol68g aplus-fsf aspectj asymptote \
  ats2-lang bash bc bf bsdgames bsh clisp clojure cmake coffeescript \
  dafny dc dhall elixir emacs-nox erlang f2c fish flex fp-compiler \
  fsharp g++ gambas3-script gap gawk gcc gdb gdc \
  generator-scripting-language genius gforth gfortran ghc ghostscript \
  gnat gnu-smalltalk gnucobol gnuplot gobjc golang gpt groovy guile-2.0 \
  gzip haxe icont iconx intercal iverilog jasmin-sable jq julia ksh \
  libpolyml-dev lisaac livescript llvm lua5.3 m4 make maxima minizinc \
  mono-devel mono-mcs mono-vbnc nasm neko nickle nim node-typescript \
  nodejs ocaml octave openjdk-11-jdk pari-gp parser3-cgi perl php-cli \
  pike8.0 polyml python3 r-base rakudo ratfor rc regina-rexx ruby \
  ruby-mustache rustc scala scilab-cli sed slsh spin squirrel3 \
  surgescript swi-prolog tcl tcsh valac vim xsltproc yabasic yorick zoem \
  zsh
```

和

```sh
$ sudo apt-get install cmake libpng-dev libgd-dev groff bison curl
```

<!-- placeholder -->

![](/assets/QuineRelay-pic2.png)

![](/assets/QuineRelay-pic3.png)

安装将占用 7452MB 的空间.

开始安装了，希望阿里云没事：

![](/assets/QuineRelay-pic4.png)

---

![](/assets/QuineRelay-pic5.png)

安装完成~，共耗时约 20min，平均下载速度约 2MB/s.

（这里出现了一些错误，是 lisaac 和 fp-compiler 没安装成功，还有些设置出现了问题，再试一下就好了）

系统负载几乎一直是满负荷：

![](/assets/QuineRelay-pic6.png)

---

## 开始编译！

首先下载 Quine Relay 的代码 `QR.rb`：

```sh
$ git clone https://github.com/mame/quine-relay.git
$ cd quine-relay
$ make -C vendor
```

(图中使用 fastgit 镜像加速下载)

![](/assets/QuineRelay-pic7.png)

整个源码文件共 16KB，而且十分有意思：

![](/assets/QuineRelay-pic8.png)

---

完整的编译运行命令如下：

```sh
$ ulimit -s unlimited
$ ruby QR.rb > QR.rs
$ rustc QR.rs && ./QR > QR.scala
$ scalac QR.scala && scala QR > QR.scm
$ guile QR.scm > QR.sci
$ scilab-cli -nb -f QR.sci > QR.sed
$ sed -E -f QR.sed QR.sed > QR.spl
$ ./vendor/local/bin/spl2c < QR.spl > QR.spl.c && gcc -z muldefs -o QR -I ./vendor/local/include -L ./vendor/local/lib QR.spl.c -lspl -lm &&
  ./QR > QR.sl
$ slsh QR.sl > QR.st
$ gst QR.st > QR.nut
$ squirrel QR.nut > QR.sml
$ polyc -o QR QR.sml && ./QR > QR.sq
$ ruby vendor/subleq.rb QR.sq > QR.ss
$ surgescript QR.ss > QR.tcl
$ tclsh QR.tcl > QR.tcsh
$ tcsh QR.tcsh > QR.t
$ ruby vendor/thue.rb QR.t > QR.ts
$ tsc --outFile QR.ts.js QR.ts && nodejs QR.ts.js > QR.unl
$ ruby vendor/unlambda.rb QR.unl > QR.vala
$ valac QR.vala && ./QR > QR.mid
$ mono vendor/local/bin/Vlt.exe /s QR.mid && mono QR.exe > QR.v
$ iverilog -o QR QR.v && ./QR -vcd-none > QR.vim
$ vim -EsS QR.vim > QR.vb
$ vbnc QR.vb && mono ./QR.exe > QR.ws
$ ruby vendor/whitespace.rb QR.ws > QR.xslt
$ xsltproc QR.xslt > QR.yab
$ yabasic QR.yab > QR.yorick
$ yorick -batch QR.yorick > QR.azm
$ zoem -i QR.azm > QR.zsh
$ zsh QR.zsh > QR.+
$ a+ QR.+ > qr.adb
$ gnatmake qr.adb && ./qr > QR.als
$ LANG=C LD_LIBRARY_PATH=/usr/lib/afnix axi QR.als > QR.aheui
$ ruby vendor/aheui.rb QR.aheui > QR.a68
$ a68g QR.a68 > QR.ante
$ ruby vendor/ante.rb QR.ante > QR.aj
$ ajc QR.aj && java QR > QR.asy
$ asy QR.asy > QR.dats
$ patscc -o QR QR.dats && ./QR > QR.awk
$ awk -f QR.awk > QR.bash
$ bash QR.bash > QR.bc
$ BC_LINE_LENGTH=4000000 bc -q QR.bc > QR.bsh
$ bsh QR.bsh > QR.bef
$ cfunge QR.bef > QR.Blc
$ ruby vendor/blc.rb < QR.Blc > QR.bf
$ bf -c500000 QR.bf > QR.c
$ gcc -o QR QR.c && ./QR > QR.cpp
$ g++ -o QR QR.cpp && ./QR > QR.cs
$ mcs QR.cs && mono QR.exe > QR.chef
$ PERL5LIB=vendor/local/lib/perl5 compilechef QR.chef QR.chef.pl &&
  perl QR.chef.pl > QR.clj
$ clojure QR.clj > QR.cmake
$ cmake -P QR.cmake > QR.cob
$ cobc -O2 -x QR.cob && ./QR > QR.coffee
$ coffee --nodejs --stack_size=100000 QR.coffee > QR.lisp
$ clisp QR.lisp > QR.d
$ gdc -o QR QR.d && ./QR > QR.dfy
$ dafny QR.dfy && mono QR.exe > QR.dc
$ dc QR.dc > QR.dhall || true
$ dhall text --file QR.dhall > QR.exs
$ elixir QR.exs > QR.el
$ emacs -Q --script QR.el > QR.erl
$ escript QR.erl > QR.fsx
$ fsharpc QR.fsx -o QR.exe && mono QR.exe > QR.false
$ ruby vendor/false.rb QR.false > QR.fl
$ flex -o QR.fl.c QR.fl && gcc -o QR QR.fl.c && ./QR > QR.fish
$ fish QR.fish > QR.fs
$ gforth QR.fs > QR.f
$ gfortran -o QR QR.f && ./QR > QR.f90
$ gfortran -o QR QR.f90 && ./QR > QR.gbs
$ gbs3 QR.gbs > QR.g
$ gap -q QR.g > QR.gdb
$ gdb -q -x QR.gdb > QR.gel
$ genius QR.gel > QR.gsl
$ gsl -q QR.gsl > QR.plt
$ gnuplot QR.plt > QR.go
$ go run QR.go > QR.gs
$ ruby vendor/golfscript.rb QR.gs > QR.gpt
$ mv QR.c QR.c.bak && gpt -t QR.c QR.gpt && gcc -o QR QR.c && ./QR > QR.grass &&
  mv QR.c.bak QR.c
$ ruby vendor/grass.rb QR.grass > QR.groovy
$ groovy QR.groovy > QR.gz
$ gzip -cd QR.gz > QR.hs
$ ghc QR.hs && ./QR > QR.hx
$ haxe -main QR -neko QR.n && neko QR.n > QR.icn
$ icont -s QR.icn && ./QR > QR.i
$ ick -bfOc QR.i && gcc -static QR.c -I /usr/include/ick-* -o QR -lick &&
  ./QR > QR.j
$ jasmin QR.j && java QR > QR.java
$ javac QR.java && java QR > QR.js
$ nodejs QR.js > QR.jq
$ jq -r -n -f QR.jq > QR.jsfuck
$ nodejs --stack_size=100000 QR.jsfuck > QR.jl
$ julia QR.jl > QR.ksh
$ ksh QR.ksh > QR.lazy
$ lazyk QR.lazy > qr.li
$ lisaac qr.li && ./qr > QR.ls
$ lsc QR.ls > QR.ll
$ llvm-as QR.ll && lli QR.bc > QR.lol
$ lci QR.lol > QR.lua
$ lua5.3 QR.lua > QR.m4
$ m4 QR.m4 > QR.mk
$ make -f QR.mk > QR.mac
$ maxima -q --init-mac=QR.mac > QR.mzn
$ minizinc --solver Gecode --soln-sep '' QR.mzn > QR.il
$ ilasm QR.il && mono QR.exe > QR.mustache
$ mustache QR.mustache QR.mustache > QR.asm
$ nasm -felf QR.asm && ld -m elf_i386 -o QR QR.o && ./QR > QR.neko
$ nekoc QR.neko && neko QR.n > QR.5c
$ nickle QR.5c > QR.nim
$ nim c QR.nim && ./QR > QR.m
$ gcc -o QR QR.m && ./QR > QR.ml
$ ocaml QR.ml > QR.octave
$ mv QR.m QR.m.bak && octave -qf QR.octave > QR.ook && mv QR.m.bak QR.m
$ ruby vendor/ook-to-bf.rb QR.ook QR.ook.bf && bf -c500000 QR.ook.bf > QR.gp
$ gp -f -q QR.gp > QR.p
$ parser3 QR.p > QR.pas
$ fpc QR.pas && ./QR > QR.pl
$ perl QR.pl > QR.pl6
$ perl6 QR.pl6 > QR.php
$ php QR.php > QR.png
$ npiet QR.png > QR.pike
$ pike QR.pike > QR.ps
$ gs -dNODISPLAY -q QR.ps > QR.ppt
$ ppt -d < QR.ppt > QR.prolog
$ swipl -q -t qr -f QR.prolog > QR.pr
$ spin -T QR.pr > QR.py
$ python3 QR.py > QR.R
$ R --slave -f QR.R > QR.ratfor
$ ratfor -o QR.ratfor.f QR.ratfor && gfortran -o QR QR.ratfor.f &&
  ./QR > QR.rc
$ rc QR.rc > QR.rexx
$ rexx ./QR.rexx > QR2.rb
```

这里我直接使用 `make` 命令：

![](/assets/QuineRelay-pic9.png)