# 第一个 Go 程序

前面我们已经设置好了 Go 环境，现在是时候编写第一个 Go 程序了。

## 打开 Go 项目

在`D:\Go`目录下创建一个文件夹`hello`，然后启动 VS Code，「文件」➡️「打开文件夹」，打开`D:\Go\hello`目录。

## 将代码添加到 go 文件

在 hello 文件夹下，创建一个名为 main.go 的文件。

在 main.go 文件中，添加以下代码：

```go
package main

import "fmt"

func main() {
  fmt.Println("Hello World")
}
```

写完后，保存该文件。

### 安装 Go 扩展工具

如果 main.go 是在 [VS Code](/go/basics/install-vs-code-and-go-extension.html) 中打开的第一个 go 文件，系统可能会提示为 Go 扩展安装其他工具。出现提示时，请选择“安装所有”，然后等待安装完成即可。

如果安装失败，也可以选择手动安装。按快捷键：`Ctrl + Shift + p`或`F1`，输入：go，选择：Go: Install/Update Tools，勾选安装所有插件。

## 运行 Go 程序

在 VS Code 中，选择「终端」➡️「新建终端」，打开一个终端。

在终端中，执行以下命令来运行 Go 程序：

```sh
go run main.go
```

不出意料的话，应该会看到输出：Hello World。

go run 命令会将文件编译到临时位置并从该位置运行文件。如果想知道 go run 编译文件的位置，可使用参数 --work：`go run --work main.go`。

> 注意：由于我们安装了 Code Runner 扩展，就可以在 VS Code 中快速运行代码，只需点击右上角的三角按钮，就可以运行 Go 代码了。

## 代码解释

你可能想知道上面的代码片段是什么意思，下面就一起来看下。

### main 包

我们从 main.go 文件中的第一个语句开始，`package main`是包声明语句。

[包](/go/basics/packages-and-modules-in-go.html)是 Go 组织代码的方式，是源文件的集合，一个包由一个或多个 .go 源文件组成。每个源文件必须先声明所属包，以一个 package 声明开始，表明文件属于哪个包。

main 包是一个特殊的包，因为它是可执行程序的入口包，且一个 Go 程序只能有一个 main 包。如果一个程序没有 main 包，那么编译时会出错，无法生成可执行文件。

### import 导包

main.go 文件中的下一行，`import "fmt"`语句用于导入程序中所依赖的其他包。其中，import 是导包关键字，fmt 是一个相对路径，使用双引号包围。相对路径的起点是 Go 语言安装目录 GOROOT 下的 src 文件夹。

### main 函数

`func main()`定义了 main 函数，func 关键字用于声明[函数](/go/basics/functions-in-go.html)，main 是函数名。

main 函数是 Go 程序的入口函数，在程序运行时，它是第一个被执行的函数。main 函数只能声明在 main 包中，并且一个 main 包中有且仅有一个 main 函数。

花括号{}被用来标记函数体，在 main 函数体中，调用了 fmt 包中的 Println 函数，用于将字符串“Hello World”后跟一换行符打印到终端。

这个就是传说中的“Hello World”案例，也是我们学习一门新编程语言的第一步。该程序向终端打印消息“Hello World”，作为 Go 编程的基础步骤，这个案例也体现了 Go 语言的一些核心理念。
