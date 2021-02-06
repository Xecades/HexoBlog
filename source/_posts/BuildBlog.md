---
title: 用hexo和GitHub搭建个人博客
date: 2019-02-22 09:19:33
tags:
 - 教程
 - hexo
categories:
 - 杂项
mathjax: true
---

为了方便搭建个人博客，我推荐如下软件:
1. $VScode$:可以当作方便的$markdown$编**辑**器，可实现实时预览，但启动速度较慢
2. $notepad++$:轻量级编**辑**器，对不同编程语言有不同颜色的区分，启动速度快
3. $chrome$:在设计过程中预览效果较快

<!-- more -->

---
## 搭建$GitHub$仓库
### 注册$GitHub$

{% linkcard "https://github.com/" "Github" %}

　　$GitHub$是一个面向开源及私有软件项目的托管平台，因为只支持git作为唯一的版本库格式进行托管，故名$GitHub$. 

　　注册$GitHub$仓库用于存储你的博客，其实还可以用其他仓库，我还是推荐用$GitHub$. 

　　注册过程很简单，我草草过一下(我创建名为$waterdrop100$的账号用于演示). 

![注册方法](/assets/BuildBlog-pic1.png)

　　注册后还需要验证，它会给你的邮箱发一个链接，打开链接完成验证. 
### 创建仓库
　　注册好后，单击左边提示栏的"$Create$ $a$ $repository$"，创建仓库. 

　　在"$Repository$ $name$"栏里按`用户名.github.io`的格式填入，比如我应该填`waterdrop100.github.io`. 

　　其他的不用填，直接点"$Create$ $repository$"，$GitHub$仓库创建完成（仓库生效可能需要一点时间）！

---
## 搭建环境
### 下载$node.js$和$git$

{% linkcard "https://nodejs.org/en/download/" "node.js下载" %}

{% linkcard "https://git-scm.com/downloads" "git下载" %}

　　$node.js$和$git$的安装很简单，网上资料很多，我就不多赘述了. 

　　最好验证一下安装是否成功. 打开$cmd$，输入`node -v`、`npm -v`和`git --version`，若输出正常则配置成功. 

![配置成功!](/assets/BuildBlog-pic2.png)

### 安装$hexo$
　　找一个你觉得 ~~安全~~ 好的地方新建文件夹用于存储本地博客，最好不要在系统盘($C$盘)建. 我在E盘建了一个$blog$文件夹，用$cmd$进入. 

![进入文件夹](/assets/BuildBlog-pic3.png)

　　再输入`npm install hexo -g`安装$hexo$. 

　　输入`hexo -v`，若输出版本信息，则安装成功. 输入`hexo init`初始化文件夹(慢慢等). 

![更进一步](/assets/BuildBlog-pic4.png)

　　输入`npm install`安装插件.

![安装插件](/assets/BuildBlog-pic5.png)

　　至此$hexo$安装完毕. 

### 体验$hexo$
　　如果你想看一下成果，那继续往下看. 
　　输入`hexo g`更新文件，再输入`hexo s`开启本地测试用服务器. 

![体验一下!](/assets/BuildBlog-pic6.png)

　　在浏览器中输入网址`http://localhost:4000`预览你的博客！页面默认如下($hexo$默认创建了名为`Hello World`的文章)

{% linkcard "http://localhost:4000" "预览你的博客" %}

![默认页面](/assets/BuildBlog-pic7.png)

---
## 连接$hexo$和$GitHub$
### 设置$git$用户名和邮箱
　　在博客目录(我的是$E:/blog$)右键，选择`Git Bash Here`，输入`git config --global user.name "你注册GitHub的用户名"`，设置$git$的用户名. 

　　输入`git config --global user.email "你注册GitHub的邮箱"`，设置$git$的邮箱. 

![设置用户名和邮箱](/assets/BuildBlog-pic8.png)

### 配置$ssh$
　　采用$ssh$加密传输，防止信息被窃. 

　　下面的教程适用于用户目录下没有$.ssh$文件夹的人，如果有且有2个文件($id$_$rsa$和$id$_$rsa.pub$)，则可以直接跳过此节. 

　　在$git$中输入`ssh-keygen -t rsa -C "你的邮箱"`，显示如下

![git的显示](/assets/BuildBlog-pic9.png)

　　输入`eval "$(ssh-agent -s)"`将密钥添加到$ssh-agent$. 

　　再输入`ssh-add ~/.ssh/id_rsa`. 

![效果](/assets/BuildBlog-pic10.png)

　　打开$GitHub$，单击头像，选择`settings`，再选择`SSH and GPG keys`

![打开settings](/assets/BuildBlog-pic11.png)
![选择SSH and GPG keys](/assets/BuildBlog-pic12.png)

　　选择`New SSH key`，新建$ssh key$，粘贴用户目录下$.ssh$文件夹中$id\_rsa.pub$文件的内容. 

![SSH key](/assets/BuildBlog-pic13.png)

　　在$git$中输入`ssh -T git@github.com`，输入`yes`，若显示大概如下，则标准$ssh$配置成功. 

![配置成功!](/assets/BuildBlog-pic14.png)

### 配置$
_$config.yml$
　　在博客文件夹中有一个文件叫`_config.yml`，它是博客核心配置，用编辑器打开，在文件末尾有如下内容. 

![_config.yml](/assets/BuildBlog-pic15.png)

　　将其修改为如下格式(注意，在每一个"$:$"后都必须有一个空格)

```yaml
deploy:
  type: git
  repository: git@github.com:你的GitHub用户名/你的GitHub用户名.github.io.git
  branch: master
```

　　其中`repository`一项是$GitHub$仓库页面的$ssh$地址. 

![repository](/assets/BuildBlog-pic16.png)

### 完成连接
　　现在$GitHub$和本地文件夹已经连接好了，下面讲解本地上传到$GitHub$的方法

　　打开$cmd$，安装扩展:`npm install hexo-deployer-git --save`. 

　　先`hexo clean`清一下缓存. 

　　输入`hexo d -g`生成$+$部署，这个命令很重要，以后每次对博客有更改都要上传部署. 

![生成部署](/assets/BuildBlog-pic17.png)

　　等个几分钟，你的网页就可以访问了，地址是`GitHub用户名.github.io`，比如我的是`waterdrop100.github.io`. 

---
## 发布文章
　　有了博客还不会发布文章怎么行呢，下面来讲如何发布文章. 文章一般在主页显示，就是你日常写博客的文章啦！

　　在cmd中输入`hexo new 文章名`就会在`source\_posts`目录下创建一个名为`文章名.md`的文件，推荐用$VScode$打开，用$markdown$继续编辑. 

![新建名为article的文章](/assets/BuildBlog-pic18.png)

　　打开文件后，可以在右上角选择![按钮](/assets/BuildBlog-pic19.png)继续预览编辑. 在文件开头有如下几行字:

```yaml
---
title: article　　　　　　　//文章名
date: 2019-02-21 07:32:26　//创建时间
tags:　　　　　　　　　　　　//标签
---
```

　　这些是此文章的配置，后面可以增添删改一些内容. 

---
## 配置文件
　　前面说过_$config.yml$是重要的配置文件，下面对其内容进行讲解(暂时不必更改). 
```yaml
# 字前面加"#"的是注释
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: Hexo # 网站主标题，可改
subtitle: # 网站副标题，可改
description: # 站点描述
keywords: # 在搜索引擎搜索到的关键词
author: John Doe # 博主名字，可改
language: # 语言
timezone: # 时区

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yoursite.com # 站点地址
root: / # 主页位置
permalink: :year/:month/:day/:title/ # 文章链接格式
permalink_defaults:

# Directory
# 以下内容默认即可
source_dir: source # 资源文件夹
public_dir: public # 要上传的文件夹在本地的存储
tag_dir: tags # 标签文件夹
archive_dir: archives # 归档文件夹
category_dir: categories # 分类文件夹
code_dir: downloads/code # 代码文件夹(?)
i18n_dir: :lang
skip_render: # 取消上传的目录

# Writing
# 写作
new_post_name: :title.md # 新文章默认的名称
default_layout: post # 新文章默认布局
titlecase: false # 标题按文章格式大写(写中文的博客就不用开了)
external_link: true # 在新页面打开第三方链接
filename_case: 0 # 文件名大写
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight: # 高亮
  enable: true #是否启用
  line_number: true # 是否显示行号
  auto_detect: false # 自动检测代码语言
  tab_replace: # 替换Tab
  
# 置顶设置
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: '' # 博客根目录
  per_page: 10 # 每页显示的文章数目
  order_by: -date # 置顶按日期从大到小排序
  
# Category & Tag
default_category: uncategorized # 默认分类名称
category_map:
tag_map:

# 日期/时间格式化
## Hexo用Moment.js插件来分析和显示日期
## 可以使用在以下网站定义的格式化类型
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD # 日期类型
time_format: HH:mm:ss # 时间类型

# 分页设置
## 把per_page设置成0来关闭分页
per_page: 10 # 每页显示文章数量
pagination_dir: page

# 扩展
## 插件下载地址: https://hexo.io/plugins/
## 主题下载地址: https://hexo.io/themes/
theme: landscape # 主题默认是landscape

# 部署
## 文档教程: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: git@github.com:waterdrop100/waterdrop100.github.io.git
  branch: master
```

---
## 小结

要弄好一个自己的博客，不是一蹴而就的，希望大家有耐心，当初寒假的时候，我也是一个什么都不懂的小白(~~现在也是~~)，按照网上的教程蹒跚学步似地用了很长时间做了一个属于自己的博客，高兴之余，摆在我面前的确是不计其数的bug. 我于是抱着一颗虔诚的心，勤能补拙，才有了现在的博客

---
参考：

{% linkcard "https://www.cnblogs.com/fengxiongZz/p/7707219.html" "资料一" %}

{% linkcard "https://www.jianshu.com/p/9f0e90cc32c2" "资料二" %}

{% linkcard "https://www.jianshu.com/p/21c94eb7bcd1" "资料三" %}
