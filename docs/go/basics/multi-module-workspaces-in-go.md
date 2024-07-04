# 多模块工作区

在 GOPATH 年代，多 GOPATH 是一个头疼的问题。Module 的出现，多 GOPATH 问题因此消失。但多 Module 问题随之出现，Workspace 方案较好的解决了这个问题。

**先决条件：需要 go1.18 或更高版本**。

## 创建模块

首先，创建一个名为 workspace 的目录，作为多模块的家目录：`mkdir workspace && cd workspace`。

创建两个模块 hello 和 reverse：`mkdir hello reverse`。

切换到 reverse 目录：`cd reverse`，运行：`go mod init example.com/reverse`，创建 reverse.go，内容如下：

```go
package reverse

func String(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}
```

切换到 hello 目录：`cd .. && cd hello`，运行：`go mod init example.com/hello`，创建 hello.go，内容如下：

```go
package main

import (
	"fmt"

	"example.com/reverse"
)

func main() {
	fmt.Println(reverse.String("Hello"))
}
```

## 创建工作区

切换到 workspace 目录：`cd ..`，运行：`go work init hello reverse`，会自动创建一个 go.work 文件，如下所示：

```
go 1.22.1

use (
	./hello
	./reverse
)
```

go.work 文件具有与 go.mod 类似的语法（go.work 优先级高于 go.mod），因此也支持 replace。

在 workspace 目录中，运行 hello 程序：`go run example.com/hello`，输出：`olleH`。

切换到 hello 目录：`cd hello`，运行：`go run .`，输出：`olleH`。

> 注意：实际项目中，多个模块之间可能还依赖其他模块，建议在 go.work 所在目录执行`go work sync`。
