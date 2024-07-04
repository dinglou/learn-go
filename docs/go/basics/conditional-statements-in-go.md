# 条件语句

条件语句，是指根据条件（布尔表达式的值）执行相应的代码块，来实现更丰富的逻辑以及更强大的功能，如 if 语句、switch 语句、[select 语句](/go/intermediate/channels-in-go.html#select)。

## if 语句

### 单分支

最简单的 if 语句是单分支结构，它根据一个布尔表达式的值来决定程序的执行路径。如果为真，程序将执行 if 语句后面的代码块；如果为假，程序将跳过 if 语句并执行下一条语句。

```go
func main() {
  hasHouse := true
  if hasHouse {
    fmt.Println("你有房，嫁给你")
  }
}
```

### 二分支

二分支结构顾名思义，二条分支二选一执行，也比较好理解。

```go
func main() {
  hasHouse := false
  if hasHouse {
    fmt.Println("你有房，嫁给你")
  } else {
    fmt.Println("你没房，不能嫁")
  }
}
```

### 多分支

用于根据不同的条件执行不同的代码块。

```go
func main() {
  hasHouse := true
  hasCar := true

  if hasHouse {
    fmt.Println("你有房，嫁给你")
  } else if hasCar {
    fmt.Println("你有车，嫁给你")
  } else {
    fmt.Println("你没房没车，绝对不能嫁")
  }
}
```

::: details 注意
else if 没有数量限制，但在实际编程中，并不建议有过多的分支。
:::

### 初始语句

在 Go 语言中，if 语句可以包含一个简短语句（Short Statement），该语句可以用于在 if 语句中声明和初始化一个变量，其作用域仅限于 if 语句块内部有效。

```go
func main() {
  if a := 1 < 2; a {
    fmt.Println(a)
  }
}
```

### 快乐路径

在日常编码中要减少多分支结构，甚至是二分支结构的使用，这将有助于编写出优雅、简洁、易读易维护且不易错的代码。

Go 社区把这种 if 语句的使用方式称为 if 语句的“快乐路径（Happy Path）”原则，它的特点是这样的：

- 仅使用单分支结构，避免 else
- 在单分支中快速返回
- 正常逻辑在代码布局上始终“靠左”，这样读者可以从上到下一眼看到该函数正常逻辑的全貌
- 函数执行到最后一行代表一种成功状态

```go
func main() {
	num := 10
	if num%2 == 0 {
		fmt.Println(num, "is even")
		return
	}
	fmt.Println(num, "is odd")
}
```

## switch 语句

### 基本语法

除了 if 语句，Go 语言还提供了一种更适合多路分支执行的分支控制结构，也就是 switch 语句。在一些执行分支较多的场景下，使用 switch 语句可以让代码更简洁，可读性更好。

```go
func main() {
  day := 3

  switch day {
  case 1, 2, 3, 4, 5:
    fmt.Println("工作日")
  case 6, 7:
    fmt.Println("休息日")
  default:
    fmt.Println("全年无休")
  }
}
```

由 switch 关键字开始，后面跟着一个表达式。接下来，后面的大括号内是一个个分支，每个分支以 case 关键字开始，每个 case 后面是一个表达式或是一个逗号分隔的表达式列表。还有一个以 default 关键字开始的特殊分支，被称为默认分支，该分支只会在所有 case 都没有匹配上的情况下才会被执行。

另外，switch 后面可以不加表达式。这种形式的 switch 被称为"switch 省略表达式"或"switch 省略条件"，可以用来简化一些代码逻辑。

```go
func main() {
	num := 2

	switch {
	case num < 0:
		fmt.Println(num, "是负数")
	case num == 0:
		fmt.Println(num, "是零")
	default:
		fmt.Println(num, "是正数")
	}
}
```

程序会顺序执行 case 语句，直到找到满足条件的分支，最终输出"2 是正数"。

### fallthrough

每个 case 匹配成功，对应的分支代码执行完后，不会自动向下执行其他 case，而是跳出整个 switch。如果需要执行下一个 case，可以显式使用关键字 fallthrough 来实现。

加了 fallthrough 后，会直接运行下一个 case 或 default 语句，不论条件是否满足都会执行。

如果某个 case 语句已经是最后一个，并且后面也没有 default 分支，那么这个 case 中就不能再使用 fallthrough，否则编译器会报错。

```go
func main() {
	day := 3

	switch day {
	case 1, 2, 3, 4, 5:
		fmt.Println("工作日")
		fallthrough
	case 6, 7:
		fmt.Println("休息日")
		fallthrough
	default:
		fmt.Println("全年无休")
		// fallthrough // 最后一个不能有fallthrough
	}
}
```

## 分支语句区别

- switch 比 if else 更简洁
- 如果是范围取值，使用 if else 更为快捷；如果是确定取值，则使用 switch 是更优方案
- switch 执行效率可能更高。switch 语句只需要计算一次表达式的值，并根据值来跳转到相应的分支，而 if else 语句在每个条件中都需要计算表达式的值
