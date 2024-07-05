---
next:
  text: 'Go 中级'
  link: '/go/intermediate/'
---

# 泛型

**先决条件：需要 go1.18 或更高版本**。

泛型是一种编程范式，虽然很受期待，但实际上推荐的使用场景也并没有那么广泛。

## 泛型函数

先来看一个简单的例子：

```go
func Add(a, b int) int {
	return a + b
}

func AddFloat64(a, b float64) float64 {
	return a + b
}

func AddString(a, b string) string {
	return a + b
}
```

上面三个函数都是对两个数进行加法运算，实现逻辑是相同的，只是参数和返回值类型不同。泛型就是为了解决这个问题，它允许我们定义一个函数，实现对指定类型的数据进行加法运算。

```go
// T 类型形参，可以是 int、float64、string 三种类型（类型约束）
func Add[T int | float64 | string](a, b T) T {
	return a + b
}

func main() {
	// 传入类型实参 int
	fmt.Println(Add[int](100, 200))     // 300
	fmt.Println(Add(1.5, 2.5))          // 4
	fmt.Println(Add("Hello", " World")) // Hello World
}
```

### 匿名泛型函数

Go 不支持匿名泛型函数，因为匿名函数不能自己定义类型形参。但是，匿名函数可以使用别处定义好的类型形参，如：

```go
func MyFunc[T int | float64](a, b T) {
	// 匿名函数可使用已经定义好的类型形参
	fn := func(x T, y T) {
		fmt.Println(x + y)
	}
	fn(a, b)
}

func main() {
	MyFunc(1, 2)     // 3
	MyFunc(1.5, 2.5) // 4
}
```
