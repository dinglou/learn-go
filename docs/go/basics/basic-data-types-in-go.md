# 基本数据类型

Go 有一些内置的基本类型。

## 布尔型

占用一个字节，使用关键字 bool 来声明，取值 true 或 false。

## 数值型

### 有符号整型

int8、int16、int32、int64，其大小分别为 8、16、32、64 位的有符号整数。int（默认） 的大小在 32 位系统中为 int32，在 64 位系统中为 int64。

### 无符号整型

uint8、uint16、uint32、uint64，其大小分别为 8、16、32、64 位的无符号整数。uint 的大小在 32 位系统中为 uint32，在 64 位系统中为 uint64。

### 浮点型

float32、float64（默认），其大小分别为 32 位和 64 位的浮点数。

### 复数型

complex64、complex128（默认），其大小分别为 64 位和 128 位的复数。

### 其他类型

- uintptr：无符号整型，用于存放指针
- byte：字节型，uint8 别名，目的是用于二进制数据
- rune：符文型，int32 别名，表示一个 Unicode 码点

## 字符串型

string，由 UTF-8 编码的 Unicode 文本序列，即字符的集合。

官方文档：https://golang.google.cn/ref/spec#Types
