---
title: 关于 Base64 编码的娱乐性代码 (笑)
mathjax: true
date: 2020-03-04 22:20:25
tags:
 - 捣鼓
categories:
 - 捣鼓
---

众所周知，我最喜欢的编码是 Base64，~~因为它最简单~~

今天突发奇想，心想这世上有那么多英文单词，有没有进行 Base64 编码后仍然是英文单词的呢？

所以我写了个小程序来查找

使用算法：

 - Base64 加密算法
 - Trie 树
 - 瞎搞

<!-- more -->

## Base64 的工作原理

此处不是本文重点，故讲得很简略. 

图片和部分文本来自[维基百科](https://zh.wikipedia.org/wiki/Base64)

Base64 的原理很简单，就是把每个字符的 ASCII 码拆分为二进制 (8 位)，然后拼在一起，错位地计算每一段的值 (6位)

然后根据这个值，作为索引查找索引表中对应的字符，最后用 `=` 补充空位. 

---

### 索引表

![](/assets/base64-pic1.png)

还是不懂？看个例子吧 (对 `Man` 进行编码)

![](/assets/base64-pic2.png)

---

### 等号的处理

如果要编码的字节数不能被 3 整除，最后会多出 1 个或 2 个字节，那么可以使用下面的方法进行处理：

先使用 0 字节值在末尾补足，使其能够被 3 整除，然后再进行 Base64 的编码. 

在编码后的 Base64 文本后加上一个或两个 `=` 号，代表补足的字节数. 

也就是说，当最后剩余两个八位 (待补足) 字节 (2 个 byte) 时，最后一个 6 位的 Base64 字节块有四位是 0 值，最后附加上两个等号；

如果最后剩余一个八位 (待补足) 字节 (1 个 byte) 时，最后一个 6 位的 Base64 字节块有两位是 0 值，最后附加一个等号. 

![](/assets/base64-pic3.png)

---

## 代码

```cpp
#include <iostream>
#include <string>
#include <cstring>
#include <windows.h>
using namespace std;

const int B_SIZE = 2000000;

struct trie // Trie 树
{
	int nex[B_SIZE][26], cnt;
	bool exist[B_SIZE];

	void insert(string s)
	{
		int p = 0;
		int l = s.length();
		for (int i = 0; i < l; i++)
		{
			int c = s[i] - 'a';
			if (!nex[p][c])
				nex[p][c] = ++cnt;
			p = nex[p][c];
		}
		exist[p] = 1;
	}
	bool find(string s)
	{
		int p = 0;
		int l = s.length();
		for (int i = 0; i < l; i++)
		{
			int c = s[i] - 'a';
			if (!nex[p][c])
				return 0;
			p = nex[p][c];
		}
		return exist[p];
	}
} tree;

string purify(string); // 删除除英文字母外的字符，并且转小写，不然一个合格的都没有
string encode(string); // Base64 编码

string words[B_SIZE];
char title[500];
int cnt = 0, found = 0;

int main()
{
	freopen("Database.txt", "r", stdin);  // 单词数据库
	freopen("Selected.txt", "w", stdout); // 结果输出文件
	while (cin >> words[cnt])
	{
		tree.insert(words[cnt]);
		cnt++;
	}
	cout << "Total: " << cnt << endl;
	for (int i = 0; i < cnt; i++)
	{
		string encoded = encode(words[i]); // 编码
		string pure = purify(encoded);

		sprintf(title, "%d %s -> %s", i, words[i].c_str(), encoded.c_str());
		SetConsoleTitle(title); // 设置窗口标题，速度快且便于判断是否出现异常

		if (tree.find(pure))
		{
			int len1 = words[i].length();
			int len2 = encoded.length();
			cout << words[i];
			for (int j = 1; j <= 10 - len1; j++) putchar(' '); // 格式化长短
			cout << encoded;
			for (int j = 1; j <= 15 - len2; j++) putchar(' '); // 为了好看
			cout << "(" << pure << ")" << endl;
			found++;
		}
	}
	cout << "Done..." << endl << found << " Words Found!";
	return 0;
}

string purify(string str)
{
	string ans = "";
	for (int i = 0, len = str.length(); i < len; i++)
	{
		str[i] = tolower(str[i]);
		if ('a' <= str[i] && str[i] <= 'z')
			ans += str[i];
	}
	return ans;
}

string encode(string str) // 此段 Base64 加密代码来自网络，稍有修改
{
	int len = str.length();
	int i;

	for (i = 0; i < len; i++)
		if (str[i] < 0 || str[i] > 127)
			throw "can not encode Non-ASCII characters";

	string enkey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	string ans(len * 4 / 3 + 4, '\0');

	int nLoop = (len % 3 == 0) ? len : len - 3;
	int n = 0;

	for (i = 0; i < nLoop; i += 3 )
	{
		ans[n] = enkey[str[i] >> 2];
		ans[n + 1] = enkey[((str[i] & 3) << 4) | ((str[i + 1] & 0xF0) >> 4)];
		ans[n + 2] = enkey[((str[i + 1] & 0x0f) << 2) | ((str[i + 2] & 0xc0 ) >> 6)];
		ans[n + 3] = enkey[str[i + 2] & 0x3F];
		n += 4;
	}

	switch (len % 3)
	{
	case 0:
		ans[n] = '\0';
		break;
	case 1:
		ans[n] = enkey[str[i] >> 2];
		ans[n + 1] = enkey[((str[i] & 3) << 4) | ((0 & 0xf0) >> 4)];
		ans[n + 2] = '=';
		ans[n + 3] = '=';
		ans[n + 4] = '\0';
		break;
	case 2:
		ans[n] = enkey[str[i] >> 2];
		ans[n + 1] = enkey[((str[i] & 3) << 4) | ((str[i + 1] & 0xf0) >> 4)];
		ans[n + 2] = enkey[(( str[i + 1] & 0xf) << 2 ) | ((0 & 0xc0) >> 6)];
		ans[n + 3] = '=';
		ans[n + 4] = '\0';
		break;
	}
	return ans;
}
```

{% linkcard "https://file.xecades.xyz/Other/Database.txt" "单词数据库" %}

{% note info info %}
这是 Windows 下的代码，如果想在 Linux 下运行，把 windows.h 和标题修改删了即可
{% endnote %}

至于为什么要设置过滤……呃……如果不过滤，不会查找到任何结果……

输出如下：

```txt Selected.txt
Total: 370103
bm        Ym0=           (ym)
bn        Ym4=           (ym)
bo        Ym8=           (ym)
boy       Ym95           (ym)
bot       Ym90           (ym)
bow       Ym93           (ym)
box       Ym94           (ym)
ca        Y2E=           (ye)
cb        Y2I=           (yi)
cc        Y2M=           (ym)
ccw       Y2N3           (yn)
ck        Y2s=           (ys)
ckw       Y2t3           (yt)
cm        Y20=           (y)
cml       Y21s           (ys)
co        Y28=           (y)
cob       Y29i           (yi)
cog       Y29n           (yn)
cohob     Y29ob2I=       (yobi)
coy       Y295           (y)
coying    Y295aW5n       (yawn)
col       Y29s           (ys)
com       Y29t           (yt)
consy     Y29uc3k=       (yuck)
cot       Y290           (y)
coting    Y290aW5n       (yawn)
covin     Y292aW4=       (yaw)
covine    Y292aW5l       (yawl)
coving    Y292aW5n       (yawn)
cow       Y293           (y)
cowing    Y293aW5n       (yawn)
cowk      Y293aw==       (yaw)
cox       Y294           (y)
coxing    Y294aW5n       (yawn)
coz       Y296           (y)
cozing    Y296aW5n       (yawn)
cp        Y3A=           (ya)
cq        Y3E=           (ye)
cr        Y3I=           (yi)
cs        Y3M=           (ym)
cst       Y3N0           (yn)
csw       Y3N3           (yn)
cwt       Y3d0           (yd)
d         ZA==           (za)
dz        ZHo=           (zho)
gm        Z20=           (z)
gn        Z24=           (z)
gnu       Z251           (z)
go        Z28=           (z)
gog       Z29n           (zn)
goy       Z295           (z)
gol       Z29s           (zs)
gond      Z29uZA==       (zuza)
got       Z290           (z)
gou       Z291           (z)
gov       Z292           (z)
gox       Z294           (z)
gp        Z3A=           (za)
h         aA==           (aa)
ha        aGE=           (age)
hf        aGY=           (agy)
hir       aGly           (agly)
hm        aG0=           (ag)
hny       aG55           (ag)
ho        aG8=           (ag)
hoy       aG95           (ag)
holks     aG9sa3M=       (agsam)
hom       aG9t           (agt)
hor       aG9y           (agy)
hot       aG90           (ag)
how       aG93           (ag)
howkit    aG93a2l0       (agal)
howl      aG93bA==       (agba)
hox       aG94           (ag)
hp        aHA=           (aha)
hr        aHI=           (ahi)
hu        aHU=           (ahu)
i         aQ==           (aq)
y         eQ==           (eq)
ia        aWE=           (awe)
ya        eWE=           (ewe)
ian       aWFu           (awfu)
ic        aWM=           (awm)
icy       aWN5           (awn)
ii        aWk=           (awk)
im        aW0=           (aw)
ym        eW0=           (ew)
imu       aW11           (aw)
in        aW4=           (aw)
yn        eW4=           (ew)
ind       aW5k           (awk)
inf       aW5m           (awm)
ing       aW5n           (awn)
int       aW50           (aw)
inv       aW52           (aw)
io        aW8=           (aw)
yo        eW8=           (ew)
iof       aW9m           (awm)
yoy       eW95           (ew)
yot       eW90           (ew)
iou       aW91           (aw)
you       eW91           (ew)
yow       eW93           (ew)
yox       eW94           (ew)
iq        aXE=           (axe)
j         ag==           (ag)
ja        amE=           (ame)
jib       amli           (amli)
jnt       am50           (am)
jo        am8=           (am)
job       am9i           (ami)
joy       am95           (am)
jon       am9u           (amu)
jot       am90           (am)
joul      am91bA==       (amba)
jow       am93           (am)
jowl      am93bA==       (amba)
jr        anI=           (ani)
k         aw==           (aw)
ka        a2E=           (ae)
kay       a2F5           (af)
kam       a2Ft           (aft)
kat       a2F0           (af)
kaw       a2F3           (af)
kazoo     a2F6b28=       (afb)
kb        a2I=           (ai)
kc        a2M=           (am)
keg       a2Vn           (avn)
key       a2V5           (av)
ket       a2V0           (av)
kex       a2V4           (av)
kg        a2c=           (ac)
kgf       a2dm           (adm)
kgr       a2dy           (ady)
khu       a2h1           (ah)
ki        a2k=           (ak)
ky        a3k=           (ak)
kid       a2lk           (alk)
kyd       a3lk           (alk)
kie       a2ll           (all)
kye       a3ll           (all)
kil       a2ls           (als)
kyl       a3ls           (als)
kim       a2lt           (alt)
kip       a2lw           (alw)
kit       a2l0           (al)
kyu       a3l1           (al)
kl        a2w=           (aw)
km        a20=           (a)
kmel      a21lbA==       (alba)
kn        a24=           (a)
knysna    a255c25h       (ach)
knock     a25vY2s=       (avys)
knut      a251dA==       (ada)
ko        a28=           (a)
koa       a29h           (ah)
kob       a29i           (ai)
koel      a29lbA==       (alba)
koi       a29p           (ap)
kol       a29s           (as)
kolkoz    a29sa296       (asa)
kop       a29w           (aw)
kor       a29y           (ay)
kos       a29z           (az)
kotow     a290b3c=       (abc)
kou       a291           (a)
kousin    a291c2lu       (aclu)
kph       a3Bo           (abo)
kr        a3I=           (ai)
kt        a3Q=           (aq)
kv        a3Y=           (ay)
kw        a3c=           (ac)
l         bA==           (ba)
lm        bG0=           (bg)
ln        bG4=           (bg)
lo        bG8=           (bg)
loy       bG95           (bg)
lot       bG90           (bg)
lou       bG91           (bg)
low       bG93           (bg)
lox       bG94           (bg)
n         bg==           (bg)
nm        bm0=           (bm)
no        bm8=           (bm)
noy       bm95           (bm)
not       bm90           (bm)
nou       bm91           (bm)
nov       bm92           (bm)
now       bm93           (bm)
nox       bm94           (bm)
oat       b2F0           (bf)
ob        b2I=           (bi)
oc        b2M=           (bm)
oct       b2N0           (bn)
ode       b2Rl           (brl)
odz       b2R6           (br)
oe        b2U=           (bu)
of        b2Y=           (by)
oft       b2Z0           (bz)
oh        b2g=           (bg)
oy        b3k=           (bk)
oil       b2ls           (bls)
ok        b2s=           (bs)
oke       b2tl           (btl)
om        b20=           (b)
oms       b21z           (bz)
on        b24=           (b)
one       b25l           (bl)
oni       b25p           (bp)
ony       b255           (b)
onyx      b255eA==       (bea)
ono       b25v           (bv)
ons       b25z           (bz)
ont       b250           (b)
oof       b29m           (bm)
ooh       b29o           (bo)
oont      b29udA==       (buda)
oos       b29z           (bz)
oot       b290           (b)
oozing    b296aW5n       (bawn)
op        b3A=           (ba)
ope       b3Bl           (bbl)
opt       b3B0           (bb)
or        b3I=           (bi)
os        b3M=           (bm)
out       b3V0           (bv)
owe       b3dl           (bdl)
owl       b3ds           (bds)
owt       b3d0           (bd)
ox        b3g=           (bg)
oz        b3o=           (bo)
p         cA==           (ca)
pc        cGM=           (cgm)
pk        cGs=           (cgs)
pm        cG0=           (cg)
pmt       cG10           (cg)
po        cG8=           (cg)
poy       cG95           (cg)
pol       cG9s           (cgs)
pot       cG90           (cg)
pow       cG93           (cg)
pox       cG94           (cg)
poz       cG96           (cg)
pp        cHA=           (cha)
pq        cHE=           (che)
pr        cHI=           (chi)
ps        cHM=           (chm)
pst       cHN0           (chn)
psw       cHN3           (chn)
q         cQ==           (cq)
r         cg==           (cg)
rit       cml0           (cml)
riv       cml2           (cml)
rix       cml4           (cml)
rm        cm0=           (cm)
rn        cm4=           (cm)
ro        cm8=           (cm)
roe       cm9l           (cml)
roy       cm95           (cm)
rot       cm90           (cm)
row       cm93           (cm)
rox       cm94           (cm)
sa        c2E=           (ce)
saa       c2Fh           (cfh)
sab       c2Fi           (cfi)
say       c2F5           (cf)
sal       c2Fs           (cfs)
sat       c2F0           (cf)
sau       c2F1           (cf)
sav       c2F2           (cf)
saw       c2F3           (cf)
sax       c2F4           (cf)
sc        c2M=           (cm)
sd        c2Q=           (cq)
se        c2U=           (cu)
sey       c2V5           (cv)
set       c2V0           (cv)
sew       c2V3           (cv)
sex       c2V4           (cv)
sf        c2Y=           (cy)
sg        c2c=           (cc)
sh        c2g=           (cg)
shh       c2ho           (cho)
shy       c2h5           (ch)
shying    c2h5aW5n       (chawn)
sht       c2h0           (ch)
shu       c2h1           (ch)
shuba     c2h1YmE=       (chyme)
si        c2k=           (ck)
sib       c2li           (cli)
sid       c2lk           (clk)
syd       c3lk           (clk)
sinon     c2lub24=       (club)
sir       c2ly           (cly)
syr       c3ly           (cly)
sit       c2l0           (cl)
sitio     c2l0aW8=       (claw)
sitz      c2l0eg==       (cleg)
six       c2l4           (cl)
sizz      c2l6eg==       (cleg)
sk        c2s=           (cs)
sky       c2t5           (ct)
sm        c20=           (c)
sma       c21h           (ch)
smaik     c21haWs=       (chaws)
sml       c21s           (cs)
sn        c24=           (c)
sny       c255           (c)
so        c28=           (c)
soak      c29haw==       (chaw)
soaks     c29ha3M=       (cham)
sod       c29k           (ck)
soe       c29l           (cl)
soh       c29o           (co)
soy       c295           (c)
soys      c295cw==       (ccw)
sok       c29r           (cr)
sol       c29s           (cs)
son       c29u           (cu)
sonsy     c29uc3k=       (cuck)
sot       c290           (c)
sotho     c290aG8=       (cag)
sotik     c290aWs=       (caws)
sots      c290cw==       (ccw)
sou       c291           (c)
souk      c291aw==       (caw)
sous      c291cw==       (ccw)
sov       c292           (c)
sow       c293           (c)
sows      c293cw==       (ccw)
sox       c294           (c)
sozin     c296aW4=       (caw)
sozine    c296aW5l       (cawl)
sp        c3A=           (ca)
spy       c3B5           (cb)
spt       c3B0           (cb)
sq        c3E=           (ce)
ss        c3M=           (cm)
st        c3Q=           (cq)
sty       c3R5           (cr)
styx      c3R5eA==       (crea)
str       c3Ry           (cry)
stu       c3R1           (cr)
su        c3U=           (cu)
suu       c3V1           (cv)
suz       c3V6           (cv)
sv        c3Y=           (cy)
sw        c3c=           (cc)
swy       c3d5           (cd)
t         dA==           (da)
tm        dG0=           (dg)
tn        dG4=           (dg)
tnt       dG50           (dg)
to        dG8=           (dg)
toy       dG95           (dg)
tot       dG90           (dg)
tou       dG91           (dg)
tov       dG92           (dg)
tow       dG93           (dg)
tox       dG94           (dg)
tp        dHA=           (dha)
tu        dHU=           (dhu)
umm       dW1t           (dwt)
v         dg==           (dg)
vo        dm8=           (dm)
vow       dm93           (dm)
vox       dm94           (dm)
wa        d2E=           (de)
wb        d2I=           (di)
wc        d2M=           (dm)
we        d2U=           (du)
wf        d2Y=           (dy)
wg        d2c=           (dc)
wh        d2g=           (dg)
wi        d2k=           (dk)
wy        d3k=           (dk)
wit       d2l0           (dl)
wiz       d2l6           (dl)
wk        d2s=           (ds)
wm        d20=           (d)
wmk       d21r           (dr)
wo        d28=           (d)
woak      d29haw==       (dhaw)
wob       d29i           (di)
wod       d29k           (dk)
woe       d29l           (dl)
wog       d29n           (dn)
woy       d295           (d)
wok       d29r           (dr)
won       d29u           (du)
worky     d29ya3k=       (dyak)
wos       d29z           (dz)
wot       d290           (d)
wow       d293           (d)
wowing    d293aW5n       (dawn)
wr        d3I=           (di)
wry       d3J5           (dj)
ws        d3M=           (dm)
wu        d3U=           (du)
x         eA==           (ea)
z         eg==           (eg)
za        emE=           (eme)
zat       emF0           (emf)
zax       emF4           (emf)
zn        em4=           (em)
zo        em8=           (em)
Done...
406 Words Found!
```

左列为原单词，中间的为加密后的字符串，右边的为从改字符串中抽出来的单词

这里包含很多 ~~你认不到的~~ 单词或单词缩写，所以看起来不像个单词

我找了些比较像单词的单词：

```
coying    Y295aW5n       (yawn)
consy     Y29uc3k=       (yuck)
coting    Y290aW5n       (yawn)
cowing    Y293aW5n       (yawn)
ha        aGE=           (age)
hp        aHA=           (aha)
iq        aXE=           (axe)
kim       a2lt           (alt)
shying    c2h5aW5n       (chawn)
soak      c29haw==       (chaw)
str       c3Ry           (cry)
wowing    d293aW5n       (dawn)
```

~~学到了好多新单词呢~~

---

## 但是！

别搞忘了上面只处理了小写单词，下面看看大写是怎样的

代码就不给了，小写的处理稍微修改下就可以了

```txt Selected.txt
Total: 370103
AA        QUE=           (QUE)
AB        QUI=           (QUI)
AM        QU0=           (QU)
AN        QU4=           (QU)
AND       QU5E           (QUE)
ANN       QU5O           (QUO)
AO        QU8=           (QU)
CA        Q0E=           (QE)
CC        Q0M=           (QM)
CDR       Q0RS           (QRS)
CE        Q0U=           (QU)
CF        Q0Y=           (QY)
CK        Q0s=           (QS)
CM        Q00=           (Q)
CMD       Q01E           (QE)
CML       Q01M           (QM)
CO        Q08=           (Q)
COD       Q09E           (QE)
COG       Q09H           (QH)
COL       Q09M           (QM)
COM       Q09N           (QN)
COO       Q09P           (QP)
COR       Q09S           (QS)
COS       Q09T           (QT)
COT       Q09U           (QU)
COX       Q09Y           (QY)
CQ        Q1E=           (QE)
CS        Q1M=           (QM)
CTR       Q1RS           (QRS)
CU        Q1U=           (QU)
CV        Q1Y=           (QY)
D         RA==           (RA)
DA        REE=           (REE)
DAK       REFL           (REFL)
DANGS     REFOR1M=       (REFORM)
DAR       REFS           (REFS)
DAS       REFT           (REFT)
DB        REI=           (REI)
DC        REM=           (REM)
DD        REQ=           (REQ)
DER       REVS           (REVS)
DG        REc=           (REC)
DINKA     RElOS0E=       (RELOSE)
DIX       RElY           (RELY)
DK        REs=           (RES)
DL        REw=           (REW)
DM        RE0=           (RE)
DN        RE4=           (RE)
DO        RE8=           (RE)
DOA       RE9B           (REB)
DOB       RE9C           (REC)
DOBL      RE9CTA==       (RECTA)
DOC       RE9D           (RED)
DOD       RE9E           (REE)
DOE       RE9F           (REF)
DOG       RE9H           (REH)
DOH       RE9I           (REI)
DOL       RE9M           (REM)
DOM       RE9N           (REN)
DOO       RE9P           (REP)
DOP       RE9Q           (REQ)
DOR       RE9S           (RES)
DORSA     RE9SU0E=       (RESUE)
DOS       RE9T           (RET)
DOW       RE9X           (REX)
DOZ       RE9a           (REA)
EA        RUE=           (RUE)
EC        RUM=           (RUM)
EH        RUg=           (RUG)
EMF       RU1G           (RUG)
EMM       RU1N           (RUN)
EMS       RU1T           (RUT)
ENC       RU5D           (RUD)
END       RU5E           (RUE)
ENL       RU5M           (RUM)
ENS       RU5T           (RUT)
EOF       RU9G           (RUG)
EOM       RU9N           (RUN)
EOS       RU9T           (RUT)
F         Rg==           (RG)
FV        RlY=           (RLY)
GA        R0E=           (RE)
GAY       R0FZ           (RFZ)
GAR       R0FS           (RFS)
GID       R0lE           (RLE)
GM        R00=           (R)
GN        R04=           (R)
GNS       R05T           (RT)
GO        R08=           (R)
GOB       R09C           (RC)
GOD       R09E           (RE)
GOG       R09H           (RH)
GOL       R09M           (RM)
GON       R09O           (RO)
GOR       R09S           (RS)
GOS       R09T           (RT)
GOTH      R09USA==       (RUSA)
GP        R1A=           (RA)
GS        R1M=           (RM)
H         SA==           (SA)
HA        SEE=           (SEE)
HB        SEI=           (SEI)
HD        SEQ=           (SEQ)
HED       SEVE           (SEVE)
HF        SEY=           (SEY)
HG        SEc=           (SEC)
HIC       SElD           (SELD)
HID       SElE           (SELE)
HIE       SElF           (SELF)
HIR       SElS           (SELS)
HIS       SElT           (SELT)
HL        SEw=           (SEW)
HM        SE0=           (SE)
HO        SE8=           (SE)
HOB       SE9C           (SEC)
HOC       SE9D           (SED)
HOD       SE9E           (SEE)
HOL       SE9M           (SEM)
HOM       SE9N           (SEN)
HOND      SE9ORA==       (SEORA)
HOO       SE9P           (SEP)
HOOL      SE9PTA==       (SEPTA)
HOP       SE9Q           (SEQ)
HOUSS     SE9VU1M=       (SEVUM)
HOW       SE9X           (SEX)
HOX       SE9Y           (SEY)
HS        SFM=           (SFM)
I         SQ==           (SQ)
IA        SUE=           (SUE)
IB        SUI=           (SUI)
IC        SUM=           (SUM)
ID        SUQ=           (SUQ)
IDE       SURF           (SURF)
IE        SUU=           (SUU)
II        SUk=           (SUK)
IJO       SUpP           (SUPP)
IK        SUs=           (SUS)
IM        SU0=           (SU)
YM        WU0=           (WU)
IMA       SU1B           (SUB)
IMP       SU1Q           (SUQ)
IN        SU4=           (SU)
YN        WU4=           (WU)
INC       SU5D           (SUD)
IND       SU5E           (SUE)
INDOOR    SU5ET09S       (SUETS)
INO       SU5P           (SUP)
INT       SU5U           (SUU)
IO        SU8=           (SU)
YO        WU8=           (WU)
YOM       WU9N           (WUN)
YOR       WU9S           (WUS)
IW        SVc=           (SVC)
J         Sg==           (SG)
JO        Sk8=           (SK)
K         Sw==           (SW)
KA        S0E=           (SE)
KAY       S0FZ           (SFZ)
KAL       S0FM           (SFM)
KB        S0I=           (SI)
KC        S0M=           (SM)
KEB       S0VC           (SVC)
KG        S0c=           (SC)
KGR       S0dS           (SDS)
KI        S0k=           (SK)
KY        S1k=           (SK)
KINOO     S0lOT08=       (SLOT)
KL        S0w=           (SW)
KM        S00=           (S)
KN        S04=           (S)
KO        S08=           (S)
KOA       S09B           (SB)
KOB       S09C           (SC)
KODA      S09EQQ==       (SEQQ)
KOHL      S09ITA==       (SITA)
KOL       S09M           (SM)
KON       S09O           (SO)
KONDO     S09ORE8=       (SORE)
KOP       S09Q           (SQ)
KOR       S09S           (SS)
KOS       S09T           (ST)
KOU       S09V           (SV)
KR        S1I=           (SI)
KT        S1Q=           (SQ)
KW        S1c=           (SC)
L         TA==           (TA)
LA        TEE=           (TEE)
LC        TEM=           (TEM)
LG        TEc=           (TEC)
LH        TEg=           (TEG)
LID       TElE           (TELE)
LIS       TElT           (TELT)
LIZ       TEla           (TELA)
LL        TEw=           (TEW)
LM        TE0=           (TE)
LN        TE4=           (TE)
LO        TE8=           (TE)
LOB       TE9C           (TEC)
LOC       TE9D           (TED)
LOD       TE9E           (TEE)
LOE       TE9F           (TEF)
LOF       TE9G           (TEG)
LOY       TE9Z           (TEZ)
LOQ       TE9R           (TER)
LOW       TE9X           (TEX)
MA        TUE=           (TUE)
MAE       TUFF           (TUFF)
MAS       TUFT           (TUFT)
MB        TUI=           (TUI)
MC        TUM=           (TUM)
MCF       TUNG           (TUNG)
MF        TUY=           (TUY)
MH        TUg=           (TUG)
MID       TUlE           (TULE)
MIT       TUlU           (TULU)
MKT       TUtU           (TUTU)
MM        TU0=           (TU)
MMF       TU1G           (TUG)
MN        TU4=           (TU)
MNA       TU5B           (TUB)
MO        TU8=           (TU)
MOA       TU9B           (TUB)
MOD       TU9E           (TUE)
MOL       TU9M           (TUM)
MOM       TU9N           (TUN)
MOO       TU9P           (TUP)
MOS       TU9T           (TUT)
MOSSO     TU9TU08=       (TUTU)
MOW       TU9X           (TUX)
N         Tg==           (TG)
NM        Tk0=           (TK)
NO        Tk8=           (TK)
NOS       Tk9T           (TKT)
OB        T0I=           (TI)
OC        T0M=           (TM)
ODE       T0RF           (TRF)
ODS       T0RT           (TRT)
ODZ       T0Ra           (TRA)
OE        T0U=           (TU)
OG        T0c=           (TC)
OH        T0g=           (TG)
OY        T1k=           (TK)
OK        T0s=           (TS)
OM        T00=           (T)
ON        T04=           (T)
ONA       T05B           (TB)
ONO       T05P           (TP)
ONT       T05U           (TU)
OOF       T09G           (TG)
OOH       T09I           (TI)
OOT       T09U           (TU)
OOZOA     T09aT0E=       (TATE)
OP        T1A=           (TA)
OR        T1I=           (TI)
OS        T1M=           (TM)
OTO       T1RP           (TRP)
OW        T1c=           (TC)
OX        T1g=           (TG)
OZ        T1o=           (TO)
QP        UVA=           (UVA)
QTD       UVRE           (UVRE)
R         Ug==           (UG)
RA        UkE=           (UKE)
RND       Uk5E           (UKE)
ROD       Uk9E           (UKE)
SAN       U0FO           (UFO)
SAR       U0FS           (UFS)
SB        U0I=           (UI)
SC        U0M=           (UM)
SCF       U0NG           (UNG)
SCH       U0NI           (UNI)
SCR       U0NS           (UNS)
SG        U0c=           (UC)
SH        U0g=           (UG)
SHR       U0hS           (UHS)
SID       U0lE           (ULE)
SYD       U1lE           (ULE)
SIS       U0lT           (ULT)
SIT       U0lU           (ULU)
SK        U0s=           (US)
SM        U00=           (U)
SML       U01M           (UM)
SMOKO     U01PS08=       (UPS)
SN        U04=           (U)
SNURP     U05VUlA=       (UVULA)
SO        U08=           (U)
SOB       U09C           (UC)
SOC       U09D           (UD)
SOCKO     U09DS08=       (UDS)
SOG       U09H           (UH)
SOH       U09I           (UI)
SOL       U09M           (UM)
SOS       U09T           (UT)
SOW       U09X           (UX)
SR        U1I=           (UI)
SS        U1M=           (UM)
STA       U1RB           (URB)
STD       U1RE           (URE)
STM       U1RN           (URN)
STR       U1RS           (URS)
SUZ       U1Va           (UVA)
SW        U1c=           (UC)
T         VA==           (VA)
TA        VEE=           (VEE)
TB        VEI=           (VEI)
TDR       VERS           (VERS)
TH        VEg=           (VEG)
TIC       VElD           (VELD)
TIN       VElO           (VELO)
TMH       VE1I           (VEI)
TOD       VE9E           (VEE)
TOS       VE9T           (VET)
TOW       VE9X           (VEX)
UC        VUM=           (VUM)
UH        VUg=           (VUG)
UM        VU0=           (VU)
UN        VU4=           (VU)
UNL       VU5M           (VUM)
V         Vg==           (VG)
WB        V0I=           (VI)
WE        V0U=           (VU)
WG        V0c=           (VC)
WH        V0g=           (VG)
WK        V0s=           (VS)
WM        V00=           (V)
WMK       V01L           (VL)
WO        V08=           (V)
WOA       V09B           (VB)
WOB       V09C           (VC)
WOK       V09L           (VL)
WON       V09O           (VO)
WOO       V09P           (VP)
WOS       V09T           (VT)
WOT       V09U           (VU)
WR        V1I=           (VI)
WU        V1U=           (VU)
X         WA==           (WA)
XC        WEM=           (WEM)
XED       WEVE           (WEVE)
XIS       WElT           (WELT)
Z         Wg==           (WG)
ZN        Wk4=           (WK)
ZO        Wk8=           (WK)
Done...
343 Words Found!
```

一些比较好的匹配：

```
DANGS     REFOR1M=       (REFORM)
DOC       RE9D           (RED)
DOS       RE9T           (RET)
HA        SEE=           (SEE)
HID       SElE           (SELE)
HIE       SElF           (SELF)
HIS       SElT           (SELT)
HOW       SE9X           (SEX)
RA        UkE=           (UKE)
RND       Uk5E           (UKE)
ROD       Uk9E           (UKE)
SAN       U0FO           (UFO)
```

(第一行好像有点偏政治，~~Dangs: 该死的，Reform: 改革~~)

(第三行好像都是计算机术语，DOS: 众所周知，Ret: 汇编术语)