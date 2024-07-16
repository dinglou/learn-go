# for 语句

循环可看作是一种“轮询机制”，它通过不断地重复执行一段代码块来实现“轮询”操作，直到某个条件不再满足为止。Go 中循环语句只支持 for 关键字，而不支持 while 和 do while。

## 经典 for 循环

```go
func main() {
  sum := 0
  for i := 1; i <= 10; i++ {
    sum += i
  }
  fmt.Println(sum) // 55
}
```

for 关键字后面的三个组成部分，`i := 1; i <= 10; i++`分别对应循环前置语句、条件判断表达式、循环后置语句，这三个部分都是可选的。

省略循环后置语句，将对循环变量的更新操作放在循环体中：

```go
for i := 1; i <= 10; {
  i++
}
```

也可以省略循环前置语句：

```go
i := 1
for ; i <= 10; i++ {
}
```

当然，循环前置与后置语句也可以都省略掉，仅保留条件判断表达式，这时分号是可以省略的：

```go
i := 1
for i <= 10 {
  i++
}
```

## 无限循环

如果条件判断表达式也省略掉了，就变成了无限循环，即死循环。

```go
func main() {
  i := 1
  for {
    fmt.Println(i)
    i++
  }
}
```

::: tip
如果程序陷入死循环，可使用快捷键`Ctrl + c`来退出程序。
:::

## continue

结束本次循环，开始下一次循环，continue 后面的代码就不会执行了，仅限在 for 循环内使用。

```go
func main() {
  for i := 0; i < 10; i++ {
    if i%2 == 0 {
      continue
    }

    fmt.Println(i)
  }
}
```

## break

跳出当前循环，会终止循环而执行整个循环语句后面的代码。break 常跟 if 一起使用，即满足某个条件时便跳出循环，继续执行循环语句后面的代码。

```go
func main() {
  i := 1
  for {
    fmt.Println(i)
    i++
    if i > 10 {
      break
    }
  }
}
```

## labels

标签语句（Labeled Statement）用于给某个语句添加一个标记，从而使得该语句可以被其他语句引用。

break 只能跳出当前循环，在多层循环中，可以用 label 标出想 break 的循环，continue 同理。

```go
func main() {
outer:
	for i := 0; i < 3; i++ {
		for j := 1; j < 4; j++ {
			fmt.Printf("i = %d , j = %d\n", i, j)
			if i == j {
				break outer
			}
		}

	}
}
```

也可以使用 goto 语句直接跳出所有循环。

```go
func main() {
	for i := 0; i < 3; i++ {
		for j := 1; j < 4; j++ {
			fmt.Printf("i = %d , j = %d\n", i, j)
			if i == j {
				goto end
			}
		}
	}

end:
	fmt.Println("done")
}
```

## for range 键值循环

```go
func main() {
  s := "张三"
  len := len(s)
  fmt.Println(len) // 6 个字节

  for i := 0; i < len; i++ {
    fmt.Printf("%X ", s[i]) // E5 BC A0 E4 B8 89
  }
}
```

遍历字符串：

```go
func main() {
	s := "for循环"
	for i, v := range s {
		fmt.Printf("%d %[2]c %[2]x\n", i, v) // [2] 代表第二个参数
		// 环 73af 代表字符Unicode编码
	}
}
```
