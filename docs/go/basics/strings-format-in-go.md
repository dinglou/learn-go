# 字符串格式化

Go 中的字符串格式化/插值，遵循 C 语言的 printf 传统，感觉不如 JavaScript 和 Python 优雅。

fmt.Printf 打印格式化字符串到标准输出，fmt.Sprintf 返回格式化字符串，一些格式化动词可用于 fmt.Printf 和 fmt.Sprintf。

## 通用占位符

| 占位符 | 说明                                     |
| ------ | ---------------------------------------- |
| %v     | 插入值的默认格式                         |
| %#v    | 插入值的 Go 语法表示，如字符串会带双引号 |
| %+v    | 类似%v，输出结构体时会添加字段名         |
| %T     | 值的类型                                 |
| %%     | 百分号                                   |

```go
func main() {
	s := "Go"
	fmt.Printf("%v %#v %v\n", s, s, s) // Go "Go" Go
	fmt.Printf("%T %%", s)             // string %
}
```

%v 默认格式为：

```
bool:                    %t
int, int8 etc.:          %d
uint, uint8 etc.:        %d, %#x if printed with %#v
float32, complex64, etc: %g
string:                  %s
chan:                    %p
pointer:                 %p
```

## 布尔

```go
func main() {
	t := true
	f := false
	fmt.Printf("%t %t", t, f) // true false
}
```

## 整数

| 占位符 | 说明                                |
| ------ | ----------------------------------- |
| %b     | 二进制                              |
| %o     | 八进制，%O 带 0o 前缀               |
| %d     | 十进制                              |
| %x     | 十六进制（a-f），%X 十六进制（A-F） |
| %c     | 不带单引号字符                      |
| %q     | 单引号围绕字符                      |
| %U     | Unicode 格式                        |

```go
func main() {
	n := 111
	fmt.Printf("%b %#b\n", n, n)       // 1101111 0b1101111
	fmt.Printf("%o %#o %O\n", n, n, n) // 157 0157 0o157
	fmt.Printf("%d %+d\n", n, n)       // 111 +111
	fmt.Printf("%x %X %#x\n", n, n, n) // 6f 6F 0x6f
	fmt.Printf("%c\n", n)              // o
	fmt.Printf("%q\n", n)              // 'o'
	fmt.Printf("%U\n", n)              // U+006F
}
```

## 浮点数

| 占位符 | 说明                                                                                                  |
| ------ | ----------------------------------------------------------------------------------------------------- |
| %f     | 有小数部分，但无指数部分，%F 等价于%f。按小数点后指定位数（默认 6 位）输出，如小数位不足，用零填充    |
| %e     | 科学计数法，%E 也是科学计数法，%b 是指数为 2 的科学计数法                                             |
| %g     | 根据具体情况自动选择%f 或%e 输出浮点数，并决定保留多少位，而%G 根据具体情况自动选择%F 或%E 输出浮点数 |
| %x     | 十六进制表示，%x 大写十六进制表示                                                                     |

```go
func main() {
	f := 3.1415926535
	fmt.Printf("%.2e %E\n", f, f) // 3.14e+00 3.141593E+00
	fmt.Printf("%b %x\n", f, f)   // 7074237751826244p-51 0x1.921fb54411744p+01
	fmt.Printf("%g %0.2G\n", f, f*10_0000_0000) // 3.1415926535 3.1E+09
}
```

## 字符串

| 占位符 | 说明                         |
| ------ | ---------------------------- |
| %s     | 字符串或切片的未解释字节     |
| %q     | 双引号围绕的字符串           |
| %x     | 小写十六进制，每字节两个字符 |

```go
func main() {
	s := "Go语言"
	fmt.Printf("%s %q\n", s[0:1], s)  // G "Go语言"
	fmt.Printf("%x %X\n", "Go", "Go") // 476f 476F
}
```

## 指针

%p，十六进制表示。

```go
func main() {
	p := "Go"
	fmt.Printf("%p", &p) // 0xc000028070
}
```

## 宽度和精度

%宽度.精度。

```go
func main() {
	f := 3.14159
	fmt.Printf("@%-5.2f@%5.2f@%05.2f\n", f, f, f) // @3.14 @ 3.14@03.14
}
```

- -是左对齐，默认右对齐
- 0 是使用 0 填充，而不是默认空格填充。对于数值类型会把填充的 0 放在正负号后面

## 其他 flag

| 占位符 | 说明                                                                                                                                                                        |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| +      | 总是为数值打印一个字符；对于%+q 会生成全部是 ASCII 字符输出（通过转义）                                                                                                     |
| 空格   | 正数前加空格而负数前加负号；对字符串采用% x 或% X 会给各打印的字节之间加空格                                                                                                |
| #      | 二进制数前加 0b，八进制数前加 0，十六进制数前加 0x 或 0X，指针去掉前面的 0x，%#q 输出带引号且会对特殊字符进行转义，%#U 会输出 Unicode 码点并显示该码点所对应的 Unicode 字符 |

```go
func main() {
	fmt.Printf("%q %+q\n", 100, "Go语言")  // 'd' "Go\u8bed\u8a00"
	fmt.Printf("@% d@% d@\n", 100, -100) // @ 100@-100@
	fmt.Printf("% x\n", "Go语言")          // 47 6f e8 af ad e8 a8 80
	fmt.Printf("%#U", 100)               // U+0064 'd'
}
```

如果对所有格式选项感兴趣，可以查看 fmt 包文档：https://pkg.go.dev/fmt#hdr-Printing