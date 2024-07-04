# 错误处理

在默认情况下，当发生错误后（panic），程序就会退出（崩溃）。如果希望当发生错误后，可以捕获到错误，并进行处理，保证程序可以继续执行，那么就需要使用错误处理机制。还可以在捕获到错误后，给管理员一个提示（邮件、短信等方式）。

Go 中错误处理方式为：defer、panic 和 recover。这几个异常使用场景可以简单描述为：Go 中可以抛出一个 panic 异常，然后在 defer 中通过 recover 捕获这个异常，然后正常处理。

## panic

panic 是一种错误，会导致程序直接退出。panic 可以在任何地方引发：

- 出现不可修复性错误时使用
- panic 退出前会执行 defer 语句

```go
func main() {
	defer func() {
		fmt.Println("别怕，打了疫苗")
	}()
	// 主程序崩溃
	panic("不好，病毒来了")
}
```

## defer 和 recover

使用 defer 和 recover 来处理错误，recover 只有在 defer 调用的函数中才会生效。recover 能够捕获到 panic，通过 recover 可将程序恢复回来，继续往后执行，defer 需放在 panic 之前。

```go
func main() {
	// 恢复主程序线程
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
		fmt.Println("别怕，打了疫苗")
	}()
	// 主程序崩溃
	panic("不好，病毒来了")
}
```

进行错误处理后，程序不会轻易挂掉，如果加入预警代码，就可以让程序更加的健壮。

## 自定义错误

Go 使用 error 值来表示错误。错误值可以是任何实现了简单内置 error 接口的类型，内置错误接口：

```go
type error interface {
	Error() string
}
```

因为错误只是接口，所以可以构建自己的自定义类型来实现 error 接口：

```go
type argError struct {
	arg int
	msg string
}

// 实现错误接口
func (e *argError) Error() string {
	return fmt.Sprintf("%d %s", e.arg, e.msg)
}

func f(n int) (int, error) {
	if n < 0 {
		return -1, &argError{n, "参数错误"}
	}
	return n * n, nil
}

func main() {
	r, err := f(2)
	fmt.Println(r, err) // 4 <nil>
	r, err = f(-2)
	fmt.Println(r, err) // -1 -2 参数错误
}
```

## errors 包

```go
package main

import (
	"errors"
	"fmt"
)

func f(n int) (int, error) {
	if n < 0 {
		return -1, errors.New("参数错误")
	}
	return n * n, nil
}

func main() {
	r, err := f(2)
	fmt.Println(r, err) // 4 <nil>
	r, err = f(-2)
	fmt.Println(r, err) // -1 参数错误
}
```

## os.Exit

- 退出时不会执行 defer 语句
- 退出时不会输出当前调用栈信息
