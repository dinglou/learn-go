# 接口

接口是一种协议，定义了对象应该具有的方法，只定义规范不实现，由具体的对象来实现，是对继承机制的一种补充。通俗的讲接口就是一个标准，通过接口，可以实现多态，使得不同类型的对象可以被统一地处理。

## 定义

接口由一组方法组成：

```go
type Usb interface {
	Start() // 声明但没有具体实现
	Stop()
}
```

### 接口参数

```go
type Copier interface {
	Copy(sourceFile string, destinationFile string) (bytesCopied int)
}
```

## 实现

接口实现是隐式的，不需要显式地声明，只需要实现接口中定义的所有方法即可。

```go
// 定义 USB 接口
type Usb interface {
	Start()
	Stop()
}

// 定义 USB 接口的实现类
type Phone struct {
}

// 实现 USB 接口的 Start 和 Stop 方法
func (p *Phone) Start() {
	fmt.Println("手机连接。。。")
}

func (p *Phone) Stop() {
	fmt.Println("手机断开。。。")
}

type Camera struct {
}

func (c *Camera) Start() {
	fmt.Println("相机连接。。。")
}

func (c *Camera) Stop() {
	fmt.Println("相机断开。。。")
}

type Computer struct {
}

func (c *Computer) Working(usb Usb) {
	usb.Start()
	usb.Stop()
}

func main() {
	computer := Computer{}
	phone := Phone{}
	camera := Camera{}

	computer.Working(&phone)
	computer.Working(&camera)
}
```

如果一个类型包含了接口中定义的所有方法，那么它就被认为是该接口的实现，无论它的具体类型是什么。这种方式使得 Go 语言中的接口更加灵活和动态，符合鸭子类型（duck typing）的思想，即“像鸭子走路，像鸭子叫，长得像鸭子，那么就是鸭子！”

通过鸭子类型，Go 语言中的接口实现了面向对象编程中的多态特性，允许不同类型的对象通过统一的接口进行操作，从而提高了代码的灵活性和可扩展性，同时也有助于降低代码的耦合度。

在上面的 Usb 接口案例中，Usb usb 既可以接收手机变量，又可以接收相机变量，就体现了 Usb 接口的**多态性**（参数多态）。

## 空接口

没有定义任何方法的接口就是空接口。空接口表示没有任何约束，所有类型都实现了空接口，因此空接口可以存储任意类型的数值。

```go
type Empty interface{}

func main() {
	var e Empty
	// var x interface{} // 匿名空接口
	e = "hello"
	fmt.Printf("%T %v\n", e, e) // string hello
	e = 100
	fmt.Printf("%T %v\n", e, e) // int 100
}
```

### 类型断言

空接口可以表示任何类型，但由于接口是一般类型，并不是具体类型。 如果要转成具体类型，就需要使用类型断言，将空接口转换为特定类型。

```go
func main() {
	f := 3.14
	var x interface{}
	x = f
	fmt.Printf("%T %v\n", x, x) // float64 3.14

	var y float64
	// 判断 x 是否为 float64 类型变量，是则转换为 float64 类型并赋值给 y 变量，否则报错
	y = x.(float64) // 类型断言 直接 y = x 会报错，因为 x 可能是任意类型，不能直接赋值给 y
	fmt.Printf("%T %v\n", y, y) // float64 3.14
}
```

### type switch

```go
func f(v interface{}) {
	switch v.(type) {
	case bool:
		fmt.Println(v, "\t布尔类型")
	case int:
		fmt.Println(v, "\t整数类型")
	case string:
		fmt.Println(v, "\t字符串类型")
	default:
		fmt.Println(v, "\t未知类型")
	}
}

func main() {
	f(true)
	f(100)
	f("hello")
	f(nil)
}
```

## 接口继承

接口继承直接写接口名就可以，但要实现继承接口的所有方法：

```go
type A interface {
  a()
}

type B interface {
  A
  b()
}

type Chinese struct {
}

func (c *Chinese) a() {
  fmt.Println("a")
}

func (c *Chinese) b() {
  fmt.Println("b")
}

func main() {
  c := Chinese{}
  var b B = c
  b.a() // a
}
```

## 接口 VS 继承

- 接口和继承解决的问题不同
  - 继承的价值主要在于：解决代码的复用性和可维护性
  - 接口的价值主要在于：设计好各种规范（方法），让其它自定义类型去实现这些方法
- 接口比继承更加灵活
  - 继承是满足 is-a 的关系，而接口只需满足 like - a 的关系
- 接口在一定程度上实现代码解耦
