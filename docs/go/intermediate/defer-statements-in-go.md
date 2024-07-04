# defer 语句

Go 语言中，defer 语句会将其后面跟随的语句进行延迟处理，即使遇到 panic，仍会执行 defer 语句。多个 defer 会形成栈，后定义的 defer 会先执行，即**后进先出**。

```go
func main() {
	defer fmt.Println("大哥")
	defer fmt.Println("二哥")
	defer fmt.Println("三哥")
	fmt.Println("小弟")
}
```

由于 defer 语句具有延迟调用的特性，所以能非常方便的处理资源释放问题，比如：文件关闭等。

## 延迟参数

延迟函数的参数在执行延迟语句时被执行，而不是在执行实际的函数调用时执行。

```go
func printA(a int) {
	fmt.Println("延迟函数调用之后 a =", a)
}
func main() {
	a := 5
	defer printA(a)
	a = 10
	fmt.Println("延迟函数调用之前 a =", a)
}
```

## 执行时机

在 Go 语言中，函数 return 语句并不是原子操作，而是被拆成了两步：

- 赋值操作：当遇到 return 语句时，会先执行所有的赋值操作，将返回值赋给对应的变量，rval = xxx
- 返回操作：然后，函数会执行返回操作，将结果返回给调用方，ret rval

defer 语句就是在这两条语句之间执行的，也就是 defer 语句是在 return 语句执行之后，函数即将退出之前执行的，这种设计方式是为了确保 defer 语句在 return 语句之后执行。

```go
rval = xxx
defer语句
ret rval
```

## 注意点

- 当外围函数中的语句正常执行完毕时，只有其中所有的延迟函数都执行完毕，外围函数才会真正的结束执行
- 当执行外围函数中的 return 语句时，只有其中所有的延迟函数都执行完毕后，外围函数才会真正返回
- 当外围函数中的代码引发运行恐慌时，只有其中所有的延迟函数都执行完毕后，该运行时恐慌才会真正被扩展至调用函数
