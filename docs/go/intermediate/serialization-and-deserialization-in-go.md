# 序列化与反序列化

序列化（serialization）是指将数据结构转换成可取用格式，例如存成文件，存于缓冲，或经由网络中发送。而反序列化（deserialization）是指将可取用格式的数据转换成数据结构。

JSON 序列化是指，将有 key-value 结构的数据类型（如结构体、map、切片）序列化成 JSON 字符串的操作。JSON 反序列化是指，将 JSON 字符串反序列化成相应数据类型的操作。

Go 中的序列化和反序列化可通过"encoding/json"包中的 json.Marshal() 和 json.Unmarshal() 方法来实现。

## 结构体

```go
type Stu struct {
	Name string
	Age  int
	sex  string // 私有属性不能被json包访问
}

func main() {
	stu := Stu{Name: "张三", Age: 18, sex: "男"}

	// 序列化
	jsonStu, _ := json.Marshal(&stu)
	fmt.Println(string(jsonStu)) // {"Name":"张三","Age":18}

	// 反序列化
	var student Stu
	err := json.Unmarshal(jsonStu, &student)
	if err != nil {
		return
	}
	fmt.Println(student) // {张三 18}
}
```

### 结构体标签

JSON 数据字段名，使用小写是一种常见约定，但是，结构体中小写是私有属性不能被访问。这时，就可以使用结构体标签，为字段提供序列化和反序列化的元数据。

在 Go 语言中，结构体标签（Struct tags）是结构体字段后方的一串字符串，用反引号（`）包裹起来：

```go
type Stu struct {
	Name string `json:"name" xml:"NAME"` // 结构体标签
	Age  int    `json:"-"`               // -表示不参与序列化
}
```

## map

```go
func main() {
	m := make(map[string]interface{})
	m["Name"] = "张三"
	m["Age"] = 18
	m["sex"] = "男"

	jsonMap, _ := json.Marshal(&m)
	fmt.Println(string(jsonMap)) // {"Age":18,"Name":"张三","sex":"男"}
}
```

## 切片

```go
func main() {
	var s []map[string]interface{}
	m1 := map[string]interface{}{"Name": "张三", "Age": 18, "sex": "男"}
	m2 := map[string]interface{}{"Name": "李四", "Age": 19, "sex": "女"}
	m3 := map[string]interface{}{"Name": "王五", "Age": 20, "sex": "男"}

	s = append(s, m1, m2, m3)

	jsonMap, _ := json.Marshal(&s)
	fmt.Println(string(jsonMap))
}
```
