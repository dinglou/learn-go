# Go 环境变量

其实，Go 安装好后是开箱即用，无需手动做任何配置的。但为了更好地了解和学习 Go，还是要认识一些 Go 自带的常用配置项。

Go 配置项是以环境变量的形式存在的，可通过运行`go env`命令，来查看 Go 环境变量信息。

关于环境变量的详细说明，可使用命令`go help environment`来查看。

## Go 环境变量设置

- 第一种：使用`go env -w GOPATH=D:\Go`方式来设置
- 第二种：永久性修改环境变量，可在当前用户级别进行设置：`setx GOPATH D:\Go`
- 第三种：永久性修改环境变量，直接在系统级别进行设置

::: tip
系统环境变量优先级最高，如果设置了系统级环境变量 GOPATH，无法使用`go env -w GOPATH=D:\Go`方式进行修改。
:::

## GOROOT

Go 语言安装根目录，存放 Go 语言标准库，Linux 系统下可设置在 /usr/local/go（Go 官方推荐安装目录）。

## GOPATH

GOPATH 环境变量用于设置 Go 工作区（Workspace），默认在用户根目录下 go 文件夹，Windows 系统下可配置 GOPATH 的值为`D:\Go`。查看 GOPATH 环境变量：`go env GOPATH`。

写的任何代码最好都放在 Workspace 里面。Go 将搜索 GOPATH 目录内的任何软件包，或者 GOROOT 目录。

虽然 Go 模块简化了依赖关系管理，并允许在传统的 GOPATH 之外工作，但配置工作区还是至关重要的，显式定义 GOPATH 可以明确 Go 工作区的位置。

## GOPROXY

配置代理，可设置为七牛云代理：`go env -w GOPROXY=https://goproxy.cn,direct`
