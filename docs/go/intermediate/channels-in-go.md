# 通道

channel 是 Go 中的一个核心[数据类型](/go/basics/basic-data-types-in-go)，主要用来解决协程的同步问题以及协程之间数据共享的问题。channel 本质是一个队列数据结构，数据是先进先出的。

## 通道与管道

在 Go 中，channel 被翻译成“通道”，而不是“管道”。

在计算机科学领域中，“管道”通常指进程间的通信机制，可以将一个进程的输出作为另一个进程的输入进行处理。

而在 Go 中，channel 是一种在协程之间进行通信的机制，而不是进程间通信。与“管道”不同，channel 是一种非常轻量级、高效的通信机制，可以让协程之间在不同时间、不同线程或者不同机器上进行通信。

因此，channel 被翻译成“通道”，以突出它在协程之间进行通信的特点，而避免与“管道”这一进程间通信的概念混淆。

## 声明和初始化

如果一个通道没有被显式初始化，其值将是 nil。通道是有类型的，一个 int 通道只能存放 int 类型数据。

```go
func main() {
	var ch chan int                   // 声明
	ch = make(chan int, 3)            // 初始化，容量为 3
	fmt.Println(ch, len(ch), cap(ch)) // len 通道中剩余未读取数据个数，cap 通道容量
}
```

默认情况下，通道是双向的，即可读可写。若想让通道只写：`var ch chan<- int`，只读：`var ch <-chan int`。双向通道可以隐式转换为单向通道，反之不行。

```go
func producer(in chan<- int) {
	for i := 0; i < 10; i++ {
		in <- i
		println("生产", i)
	}
}

func consumer(out <-chan int) {
	for i := range out {
		println("消费", i)
	}
}

func main() {
	ch := make(chan int, 5)
	go producer(ch) // 双向管道可以赋值给同类型单向管道，反之不行
	go consumer(ch)
	time.Sleep(time.Second * 2)
}
```

## 读写

向 channel 中读写数据都需使用`<-`操作符，只是 channel 变量的位置不同。

```go
func main() {
	ch := make(chan int, 3)
	ch <- 1 // 往通道里写入数据
	ch <- 2
	fmt.Println(len(ch)) // 2

	close(ch) // 通道关闭后，不能再写入数据，但仍然可以读取

	a := <-ch // 从通道中读取数据
	b := <-ch
	c := <-ch
	fmt.Println(len(ch)) // 0
	fmt.Println(a, b, c) // 1 2 0
}
```

## 缓冲

### 无缓冲通道

使用无缓冲通道进行通信将导致发送和接收的 goroutine 同步化。因此，无缓冲通道也被称为同步通道。

```go
func recv(c chan int) {
  ret := <-c // 接收数据
  fmt.Println("recv:", ret)
}

func main() {
  ch := make(chan int)
  go recv(ch) // 启用goroutine从管道接收数据
  ch <- 100   // 向管道发送数据
  fmt.Println("main: send 100 to channel")
}
```

### 有缓冲通道

只要通道容量大于零，那么该通道就是有缓冲通道，通道容量表示通道中能存放元素的数量。

## 遍历通道

```go
func main() {
	var ch chan int
	ch = make(chan int, 100)
	for i := 0; i < 100; i++ {
		ch <- i
	}

	// 遍历前要关闭通道，禁止再写入元素，否则会出现死锁（for range会一直等待）
	close(ch)
	for v := range ch {
		println(v)
	}
}
```

## 通道同步

多协程访问时，是不需要加锁的，因为通道本身就是线程安全的。

```go
func action(done chan bool) {
	fmt.Println("开始执行...")
	time.Sleep(time.Second)
	fmt.Println("执行完毕...")
	done <- true
}

func main() {
	done := make(chan bool)
	go action(done)
	<-done // 等待通道消息
	fmt.Println("主程序结束...")
}
```

## 广播机制

所有 channel 接收者都会在 channel 关闭时，立刻从阻塞等待中返回且`v, ok <- ch`，ok 值为 false。这个广播机制常被利用，进行向多个订阅者同时发送信号。

## select

Go 提供了一个关键字 select，通过 select 可以监听 channel 上的数据流动。

select 的用法与 switch 非常类似，由 select 开始一个新的选择块，每个选择条件由 case 语句来描述。与 switch 语句相比， select 有比较多的限制，其中最大的一条限制就是每个 case 语句里必须是一个 IO 操作。

```go
func main() {
	ch := make(chan int)
	quit := make(chan bool)

	go func() {
		for i := 0; i < 5; i++ {
			ch <- i
			fmt.Println("写入:", i)
			time.Sleep(time.Second)
		}
		quit <- true
		close(ch)
	}()

	for {
		select {
		case v := <-ch:
			fmt.Println("读到:", v)
		case <-quit:
			return
		}
		fmt.Println("--------------")
	}
}
```

注意事项：

- 监听的 case 中，没有满足监听条件，阻塞
- 监听的 case 中，有多个满足监听条件，任选一个执行
- 可以使用 default 来处理所有 case 都不满足监听条件的状况。通常不用，会产生忙轮询
- select 自身不带有循环机制，需借助外层 for 来循环监听
- break 只能跳出 select，类似 switch 中的用法

### 超时处理

```go
func main() {
	ch := make(chan int)
	quit := make(chan bool)

	go func() {
		for {
			select {
			case v := <-ch:
				fmt.Println("读到:", v)
			case <-time.After(time.Second * 3):
				fmt.Println("超时退出...")
				quit <- true
			}
		}
	}()

	for i := 0; i < 2; i++ {
		fmt.Println("写入:", i)
		ch <- i
		time.Sleep(time.Second)
	}

	<-quit
}
```
