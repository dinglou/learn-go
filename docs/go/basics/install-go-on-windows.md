# 在 Windows 上安装 Go

## Go 官网

- Go 官方网站：https://golang.org/
- Go 中国官网：https://golang.google.cn/
- Go 开发者门户网站：https://go.dev/
- Go 博客：https://golang.google.cn/blog/ 内容涉及 Go 语言当下状态、未来计划、会议方面的报告，还有 Go 相关的大量话题深度解读

## 安装 Go

### Go 版本选择策略

一般情况下，建议采用最新稳定版本（Go 团队建议）。因为 Go 团队发布的稳定版本平均质量一直很高，少有影响使用的重大 bug。

如果比较谨慎的话，可以选择两个发布周期之前的稳定版本。例如，Go 团队发布 go1.22 版本，选择使用 go1.20 版本。如果不是那么“激进”的话，可以选择次新版，即最新版本之前的那个版本。

### 下载安装

最新版 Go 下载：[go1.22.4.windows-amd64.zip](https://golang.google.cn/dl/go1.22.4.windows-amd64.zip)，下载后解压到`D:\dev`文件夹下。

将`D:\dev\go\bin`目录配置到环境变量 Path 当中：右击「此电脑」->「属性」->「高级系统设置」->「环境变量」-> 选中「系统变量」中的 Path ->「编辑」->「新建」，添加 Go 安装路径中 bin 文件夹所在路径。

### 验证安装

打开新的命令提示符窗口，然后运行`go version`命令，如果能显示安装的 Go 版本详细信息，说明安装成功。

### 安装多个 Go 版本

安装多个 Go 版本其实也很简单，只需将不同版本的 Go 安装在不同文件夹下，然后将它们的 Go 二进制文件所在路径添加到环境变量 Path 中就可以了。

## Go Playground

如果你不想在本地安装 Go，只想体验一下 Go，可以使用 [Go Playground](https://golang.google.cn/play/)。

Go Playground 是一款 Web 服务，可以在浏览器中运行 Go 应用程序。如果你想要快速轻松地运行代码示例，可以选择使用此服务。但是，在生成复杂代码组织的应用程序时，还是建议在本地安装 Go。
