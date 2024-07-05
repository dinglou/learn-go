# 结构体

基本数据类型可以表示事物的基本属性，但是想表达一个事物的全部或部分属性时，这时候再用单一的基本数据类型就无法满足需求了。这时，就需要自定义数据类型，来封装多个基本数据类型，这种数据类型叫结构体（值类型）。

## 声明

结构体通过 type 和 struct 关键字来声明：

```go
type user struct {
	id         int    // 字段首字母小写，类似private，其它包不能使用
	name, addr string // 字段类型相同时可以简写到一行
}
```

### 匿名字段

结构体允许其成员字段在声明时没有字段名而只有类型，这种没有名字的字段称为匿名字段。

```go
type Person struct {
	string // 其实是string string
	int    // 其实是int int
}
```

匿名字段默认采用类型名作为字段名，结构体中字段名称必须唯一，因此一个结构体中同种类型的匿名字段只能有一个。

### 匿名结构体

可以在声明结构体类型后立即创建匿名结构体实例。这在只需要一个结构体实例，而不需要为其定义一个具体的类型时非常有用。

```go
func main() {
	p := struct {
		string
		int
	}{"张三", 18}
	fmt.Println(p) // {张三 18}
}
```

## 实例化

```go
type user struct {
	id         int
	name, addr string
}

func main() {
	var u user // 像声明内置类型一样使用var关键字声明结构体类型
	// 访问结构体成员使用点号 . 操作符
	u.id = 1000
	u.name = "Tom"
	fmt.Println(u) // {1000 Tom }
	// 键值对赋值
	u = user{id: 1000, addr: "北京"}
	fmt.Println(u) // {1000 北京}
	// 多值赋值，顺序必须与字段顺序一致
	u = user{1000, "Tom", "上海"}
	fmt.Println(u) // {1000 Tom 上海}
}
```

实例化之 new(结构体)：

```go
func main() {
	u2 := new(user) // 返回指针，等同于 &user{}
	fmt.Println(u2) // &{0  }
}
```

实例化之&结构体：

```go
func main() {
	u3 := &user{}
	fmt.Println(u3) // &{0  }
}
```

🤔 看下面代码，并分析原因：

```go
func main() {
	u := struct {
		name string
	}{"Tom"}

	u2 := &u
	// 不能这样写，会报错，原因是 . 的优先级比 * 高
	// 所以 *u2.name 实际上是 *(u2.name)，正确的写法是 (*u2).name
	fmt.Println(*u2.name)
}
```

结构体指针访问字段的标准方式应该是`(*结构体指针).字段名` ，但 Go 做了简化，支持`结构体指针.字段名`。编译器底层对`结构体指针.字段名`做了转化`(*结构体指针).字段名`，这是 Go 的语法糖，也更加符合程序员的使用习惯。

## 结构体方法

在某些情况下，结构体除了有一些字段外，还有一些行为，这时就要用方法才能完成。

Go 语言支持在结构体上定义方法。结构体方法是一种作用于特定类型变量的函数，这种特定类型变量叫做接收者（Receiver）。

结构体方法允许对结构体实例进行操作，类似于面向对象编程语言中的方法。其实，接收者的类型可以是任何类型，不仅仅是结构体，任何类型都可以拥有方法。

```go
// 定义矩形结构体
type Rectangle struct {
	width, height int
}

// 为结构体定义计算矩形面积的方法，接收者为值类型，方法被调用时，实例成员会进行复制
func (r Rectangle) Area() int {
	return r.width * r.height
}

// 为结构体定义计算矩形周长的方法，接收者为指针类型，通常使用这种方式，避免内存拷贝
func (r *Rectangle) Perimeter() int {
	return 2 * (r.width + r.height)
}

func (r *Rectangle) String() string {
	return fmt.Sprintf("矩形：宽 = %d  高 = %d", r.width, r.height)
}

func main() {
	// 创建一个 Rectangle 结构体实例
	rect := Rectangle{width: 10, height: 5}

	// 调用结构体方法计算面积
	fmt.Println("矩形面积:", rect.Area())

	// 调用结构体方法计算周长
	fmt.Println("矩形周长:", rect.Perimeter())

	// 如果类型实现了 String() 方法，则 fmt.Println 默认会调用该方法进行输出
	fmt.Println(&rect)
}
```

### 方法 VS 函数

方法与函数的区别：

- 函数不属于任何类型，方法属于特定类型。函数是全局定义，调用时不会有特别的限制；而方法附着在对象上，必须通过对象才能实现方法的调用
- 对于函数，接收者为值类型时，不能将指针类型的数据直接传递，反之亦然
- 对于方法，接收者为值类型时，可以直接用指针类型的变量调用方法，反过来也可以

```go
type user struct {
	name string
}

func (u user) greet() {
	u.name = "Bob"
	fmt.Println("Hello", u.name)
}

func p(u user) {
	fmt.Println(u.name)
}

func main() {
	u := user{name: "Alice"}
	p(u) // Alice
	// p(&u) // 编译出错，不能将指针传递给值类型

	u.greet()           // Hello Bob
	fmt.Println(u.name) // Alice
	(&u).greet()        // 从形式上是传入地址，但本质上还是值传递
	fmt.Println(u.name) // 所以还是 Alice
}
```

**方法总结**：

- 不管调用形式如何，真正决定是值拷贝还是地址拷贝，关键看这个方法和哪个类型绑定。如果是和值类型，比如`u user`则是值拷贝；如果和指针类型，比如`u *user`则是地址拷贝
- 方法调用和传参机制与函数基本一样，不一样的地方是方法调用时会将调用方法的变量，当做实参也传递给方法

## 面向对象

Go 不是纯粹的面向对象语言，和传统的面向对象编程有所区别，所以说 Go 语言支持面向对象编程（Object Oriented Programming，OOP）特性是比较准确的。

Go 语言中没有“类”的概念，其结构体和其他语言中的类相似，Go 基于结构体来实现 OOP 特性。和其他面向对象语言中的类相比，Go 中的结构体具有更高的扩展性和灵活性。

### 封装

封装实现步骤：

- 将结构体、字段首字母小写
- 给结构体所在包提供一个工厂函数，首字母大写，类似构造函数
- 提供一个 Set 方法，用于设置属性值
- 提供一个 Get 方法，用于获取属性值

在 model 包：

```go
type user struct {
	Name string
	age  int
}

// 工厂函数，相当于构造函数
func New(name string) *user {
	return &user{
		Name: name,
	}
}

func (u *user) SetAge(age int) {
	if age > 0 && age < 150 {
		u.age = age
	} else {
		fmt.Println("年龄不合法")
	}
}

func (u *user) GetAge() int {
	return u.age
}
```

在 main 包：

```go
func main() {
	u := model.New("Alice")
	u.SetAge(25)
	fmt.Println(u.Name, u.GetAge()) // Alice 25
}
```

### 继承

当两个结构体的字段和方法几乎一样时，代码就出现了冗余，不仅不利于维护，也不利于功能的扩展。这时，可以通过继承的方式来解决。继承可以解决代码复用，让代码更加简洁，提高代码的可读性和可维护性，且让编程更加靠近人类思维。

当多个结构体存在相同的字段和方法时，可以考虑将这些相同的字段和方法提取到一个独立的结构体中，其它的结构体不需要重新定义这些字段和方法，只需嵌套一个匿名结构体即可。

在 Go 中，如果一个结构体嵌套了另一个匿名结构体，那么这个结构体可以直接访问匿名结构体的字段和方法，从而实现了继承特性。

```go
type People struct {
  name string
}

func (p *People) eat() {
  fmt.Printf("%s is eating...\n", p.name)
}

type Student struct {
  People // 通过嵌套匿名结构体实现继承，匿名字段 People，其实是People People
  sid    int
  course []string
}

func (s *Student) learn() {
  fmt.Printf("%s is learning...\n", s.name)
}

func main() {
  s := Student{
    People{name: "Alice"},
    1001,
    []string{"math", "english"},
  }
	fmt.Println(s.name) // Alice
  s.eat()
  s.learn()
}
```

在上面代码片段中，Student 结构体有一个匿名字段 People 结构体。People 结构体中的字段 name，被称为提升字段，因为它可以被访问，就像直接在 People 结构体本身中声明一样。

**深入讨论**：

- 结构体可以使用嵌套匿名结构体所有的字段和方法，不论首字母大小写都可以使用
- 匿名结构体字段访问可以简化，例如可以直接通过 `s.name` 访问 People 结构体的 name 字段，而不需要 `s.People.name`
- 当访问结构体成员时会采用**就近访问原则**，即先在当前结构体中查找，找不到再去内层结构体中查找。当结构体和匿名结构体有相同的字段或者方法时，如希望访问匿名结构体的字段和方法，可通过匿名结构体名来区分
- 当结构体嵌入多个匿名结构体时（多重继承），如匿名结构体有相同的字段和方法（同时结构体本身没有同名的字段和方法），在访问时，就必须明确指定名匿名结构体名字，否则编译报错
- 如果结构体嵌套有名结构体，这种模式就是**组合**，那么在访问组合结构体的字段或方法时，就必须带上组合结构体名字

### 多态

在 Go 语言中，多态是通过[接口](/go/basics/interfaces-in-go)来实现的。
