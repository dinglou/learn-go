# 映射

在编程语言中大都会存在一种映射（key-value）类型，在 Python 中叫字典类型，而在 Go 中则叫 map 类型。

map 的底层实现是 hash table，根据 key 查找 value 的时间复杂度是 O(1)。

## 声明

map 为关键字，string 表示 key 的数据类型为字符串，int 表示 value 的数据类型为整数。

```go
func main() {
	var m map[string]int  // map[key]value
	fmt.Println(m)        // map[]
	fmt.Println(m == nil) // true
	fmt.Printf("%#v", m)  // map[string]int(nil)
}
```

如果 map 没有被显式初始化，其值是 nil（空 map）。

## 初始化

方式一：

```go
func main() {
	info := map[string]string{"name": "张三", "age": "18"} // 声明并初始化
	fmt.Println(info) // map[age:18 name:张三]
}
```

方式二，可通过内置 make 函数来初始化 map：

```go
func main() {
	info := make(map[string]string) // 声明并初始化
    // info := map[string]string{} // 跟上面是等价的
	info["name"] = "张三"
	info["age"] = "23"
	fmt.Println(info) // map[age:23 name:张三]
}
```

如果可能的话，最好对 map 使用规模做出粗略估算，并使用 cap 参数对 map 进行初始化：`m := make(map[int]string, 10)`。

## 添加和删除

```go
func main() {
	info := make(map[string]string)
	info["name"] = "张三" // 往map中添加键值对
	info["name"] = "李四" // 会覆盖之前的值
	info["sex"] = "男"
	info["age"] = "23"
	delete(info, "age")          // 从map中删除键值对
	fmt.Println(info, len(info)) // map[name:李四 sex:男] 2
}
```

map 值也可以是一个函数：

```go
func main() {
  m := map[int]func(x int) int{}
  m[0] = func(x int) int { return x }
  m[1] = func(x int) int { return x * x }
  m[2] = func(x int) int { return x * x * x }
  fmt.Println(m[0](3), m[1](3), m[2](3)) // 3 9 27
}
```

## 元素查找

即根据 key 找 value，在访问的 key 不存在时，仍会返回零值。

```go
func main() {
	info := map[string]string{"name": "张三", "age": "18"}
	fmt.Println(info["name"])       // 张三
	fmt.Printf("%q\n", info["sex"]) // "" 返回零值
}
```

返回零值可能存在两种情况：

- key 对应元素不存在
- key 对应的元素存在，其值就是零值

```go
func main() {
	info := map[string]string{"name": "张三", "age": "18"}
	if value, ok := info["sex"]; ok {
		fmt.Println(value)
	} else {
		fmt.Println("键不存在！")
	}
}
```

## 遍历

```go
func main() {
	info := map[string]string{"name": "张三", "age": "18"}
	for k, v := range info {
		fmt.Println(k, v)
	}

	// 仅遍历key
	for k := range info {
		fmt.Println(k)
	}
}
```

## 排序

map 默认是无序的，Go 中也没有提供专门针对 map 的 key 进行排序的方法。map 排序，可先将 key 进行排序，然后根据 key 值遍历输出即可。

```go
func main() {
	info := map[int]string{1: "张三", 2: "18", 0: "男"}
	var keys []int

	for k, _ := range info {
		keys = append(keys, k)
	}

	sort.Ints(keys)
	for _, k := range keys {
		fmt.Println(k, info[k])
	}
}
```

## map 类型切片

切片中的元素为 map 类型时的操作：

```go
func main() {
	var mapSlice = make([]map[string]string, 3)
	// 对切片中的map元素进行初始化
	mapSlice[0] = make(map[string]string, 10)
	mapSlice[0]["name"] = "张三"
	mapSlice[0]["age"] = "18"
	mapSlice[0]["sex"] = "男"
	for i, v := range mapSlice {
		fmt.Printf("index: %d  value: %v\n", i, v)
	}
}
```

## 切片类型 map

map 中值为切片类型时的操作：

```go
func main() {
	var sliceMap = make(map[string][]string, 3)
	key := "中国"
	value, ok := sliceMap[key]
	if !ok {
		value = make([]string, 0, 2)
	}
	value = append(value, "北京", "上海")
	sliceMap[key] = value
	fmt.Println(sliceMap)
}
```
