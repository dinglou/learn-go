# 打包生成可执行文件

Go 拥有出色的跨平台支持，可以轻松地编译成 Windows、macOS 和 Linux 等平台的可执行文件。

## go build

之前的 [Hello World](/go/basics/first-go-program) 案例，是直接编译后运行的。若要为程序编译生成可执行文件，可使用命令：`go build`，会生成一个可执行文件 main.exe。使用`go build -x`可观察编译和链接过程。

在命令提示符窗口运行 main.exe，同样会输出：Hello World。

## go install

该命令将编译程序并将二进制可执行文件安装（复制）到位置 GOPATH/bin，文件名称将是模块名称。

如果不是 main 包，将不会得到一个可执行文件，而是得到一个包存档（.a）文件。

## 编译 VS 解释

计算机只能识别机器代码（二进制代码），所以需将高级 Go 代码转换为机器代码才能运行。

Go 编译器会将 Go 代码和相关依赖等，转换成机器代码，并将其打包成一个独立的二进制可执行文件。在 Windows 上，这将是一个 .exe 文件，在 Mac 或 Linux 上，可以是任何可执行文件。

这个可执行二进制文件，可以在没有 Go 编译环境的情况下运行。这对于应用程序的部署和应用程序之间的依赖管理方面，非常的方便。

前面说到，Go 是一种编译型语言。所谓编译型，就是在运行前需要先编译，生成机器代码。编译后的程序可以在不访问原始源代码和编译器的情况下运行。

解释型语言（如 Python、JavaScript），则是代码在运行时由一个称为“解释器”的单独程序解释。分发代码让用户运行可能是一件痛苦的事，因为他们需要安装解释器，并且需要访问原始源代码。

## 跨平台编译

Go 支持打包生成各个平台的可执行程序，依赖两个环境变量来识别当前操作系统：`GOOS`代表当前操作系统，`GOARCH`代表当前 CPU 架构。

修改这两个环境变量，就能够在单个操作系统上编译出多个目标操作系统的可执行文件，以 Windows 环境为例：

打包生成 Windows 可执行程序：

```sh
set GOOS=windows
set GOARCH=amd64
go build main.go
```

打包生成 Linux 可执行程序：

```bash
set GOOS=linux
set GOARCH=amd64
go build main.go
```

打包生成 macOS 可执行程序：

```bash
set GOOS=darwin
set GOARCH=amd64
go build main.go
```
