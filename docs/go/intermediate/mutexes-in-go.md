# 互斥锁

## 互斥锁

互斥锁允许锁定对数据的访问，确保同一时间只有一个 goroutine 可以访问某些数据。

```go
var wg sync.WaitGroup
var ch = make(chan int)

func printer(str string) {
	for _, c := range str {
		fmt.Printf("%c", c)
		time.Sleep(300 * time.Millisecond)
	}
	fmt.Println()
}

func p1() {
	defer wg.Done()
	printer("Hello")
	ch <- 1

}

func p2() {
	defer wg.Done()
	<-ch
	printer("World")
}

func main() {
	wg.Add(2)

	go p1()
	go p2()

	wg.Wait()
}
```

## 读写锁

```go
func read(out <-chan int, idx int) {
	for {
		n := <-out
		fmt.Println(idx, "读go程", "Read:", n)
		time.Sleep(time.Millisecond * 500)
	}
}

func write(in chan<- int, idx int) {
	for {
		n := rand.Intn(100)
		in <- n
		fmt.Println(idx, "写go程", "Write:", n)
		time.Sleep(time.Millisecond * 500)
	}
}

func main() {
	ch := make(chan int)

	for i := 0; i < 5; i++ {
		go read(ch, i+1)
	}

	for i := 0; i < 5; i++ {
		go write(ch, i+1)
	}

	time.Sleep(time.Second * 3)
}
```

## 死锁

死锁不是锁的一种，而是一种错误使用锁导致的现象。

### 单 go 程死锁

channel 应该在至少 2 个以上的 go 程中进行通信，否则死锁。

```go
func main() {
	ch := make(chan int)
	ch <- 1 // 写阻塞，后面代码没有执行机会
	n := <-ch
	fmt.Println(n)
}
```

### 访问顺序死锁

使用 channel 一端读（写），要保证另一端写（读）操作，同时有机会执行，否则死锁。

```go
func main() {
	ch := make(chan int)
	n := <-ch // 读阻塞，后面子go程没有执行机会
	fmt.Println(n)

	go func() {
		ch <- 1
	}()
}
```

### 交叉死锁

```go
func main() {
	ch1 := make(chan int)
	ch2 := make(chan int)

	go func() {
		for {
			select {
			case n := <-ch1:
				ch2 <- n
			}
		}
	}()

	for {
		select {
		case n := <-ch2:
			ch1 <- n
		}
	}
}
```
