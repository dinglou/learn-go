# 反射

反射（reflection），是指计算机程序在运行时（runtime）可以访问、检测和修改它本身状态或行为的一种能力。

## reflect 包

Go 中的 reflect 包用于反射操作，最常见的是 TypeOf 和 ValueOf 这 2 个方法，通过这 2 个方法，可以非常轻松的获取和修改对象的类型和属性。

### 深度比较

使用到反射 reflect.DeepEqual()：

```go
func main() {
	m1 := map[string]string{"one": "a", "two": "b"}
	m2 := map[string]string{"two": "b", "one": "a"}
	fmt.Println("m1 == m2:", reflect.DeepEqual(m1, m2)) // true

	s1 := []int{1, 2, 3}
	s2 := []int{1, 3, 2}
	fmt.Println("s1 == s2:", reflect.DeepEqual(s1, s2)) // false
}
```
