# time 包

## 获取当前时间

```go
func main() {
	now := time.Now() //获取当前时间
	year := now.Year()
	month := now.Month()
	day := now.Day()
	hour := now.Hour()
	minute := now.Minute()
	second := now.Second()
	// 2024-06-26 13:44:02
	fmt.Printf("%d-%02d-%02d %02d:%02d:%02d\n", year, month, day, hour, minute, second)

	timestamp := now.Unix() //获取当前时间戳
	// timestamp = now.UnixNano() // 纳秒级时间戳
	fmt.Println(timestamp) // 1719380642
}
```

## 格式化输出

```go
func main() {
	now := time.Now()
	// 格式化模板为Go出生时间 2006年1月2号 15点04分 Mon Jan
	// 24小时制
	fmt.Println(now.Format("2006-01-02 15:04:05"))
	// 12小时制
	fmt.Println(now.Format("2006-01-02 03:04:05"))
	fmt.Println(now.Format("2006/01/02 15:04"))
	fmt.Println(now.Format("15:04 2006/01/02"))
	fmt.Println(now.Format("2006/01/02"))

	timestamp := now.Unix()
	ts := time.Unix(timestamp, 0) // 时间戳转时间格式
	fmt.Println(ts.Format("2006-01-02 15:04:05"))
}
```

## 日期字符串转时间戳

```go
func main() {
	t := "2024-04-22 15:04:05"
	timeTemplate := "2006-01-02 15:04:05"
	ts, _ := time.ParseInLocation(timeTemplate, t, time.Local)
	fmt.Println(ts.Unix())
}
```

## 时间操作函数

```go
func main() {
	start := time.Now()
	time.Sleep(2 * time.Second)
	elapsed := time.Since(start)
	fmt.Printf("Elapsed time: %.2f seconds\n", elapsed.Seconds())
}
```

## 定时器 Timer

Timer：创建定时器，指定定时时长。定时到达后系统会自动向定时器的成员 C 写入系统当前时间，读取 Timer.C 得到定时后的系统时间。

```go
// 3种定时方法
func main() {
	// 1 time.Sleep()
	time.Sleep(1 * time.Second)

	// 2 time.NewTimer()
	fmt.Println(time.Now())
	myTimer := time.NewTimer(1 * time.Second)
	// myTimer.Reset(3 * time.Second) // 重置定时器
	// myTimer.Stop()                 // 停止定时器
	nowTimer := <-myTimer.C
	fmt.Println(nowTimer)

	// 3 time.After()
	nowTimer2 := <-time.After(3 * time.Second)
	fmt.Println(nowTimer2)
}
```

## 计时器 Ticker

Ticker 是一个周期触发定时的计时器，它会按照一个时间间隔往 channel 发送系统当前时间，而 channel 接收者可以以固定的时间间隔从 channel 中读取时间。
