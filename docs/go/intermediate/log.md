# 日志

## 在文件中写入日志

方法一：

```go
func main() {
	f, err := os.OpenFile("logfile", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer f.Close()

	log.SetOutput(f)
	log.Println("This is a log entry")
}
```

方法二：
追加到日志文件，可以使用 shell 重定向。Go 中的默认 logger 会写入 stderr。
`./app 2>> logfile`。

方法三，创建一个名为 logger.go 的包：

```go
package logger

import (
	"flag"
	"go/build"
	"log"
	"os"
)

var (
	Log *log.Logger
)

func init() {
	var logpath = build.Default.GOPATH + "info.log"

	flag.Parse()
	var file, err1 = os.Create(logpath)

	if err1 != nil {
		panic(err1)
	}
	Log = log.New(file, "", log.LstdFlags|log.Lshortfile)
	Log.Println("LogFile : " + logpath)
}
```

在 main.go 中导入 logger 包：

```go
const (
	VERSION = "0.13"
)

func main() {
	logger.Log.Printf("Server v%s pid=%d started with processes: %d", VERSION, os.Getpid(), runtime.GOMAXPROCS(runtime.NumCPU()))
}
```
