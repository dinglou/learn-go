# Go 测试

## 单元测试

规则：

- 所有测试文件以 `_test.go` 结尾
- 所有测试函数以 Test 开头
- 初始化逻辑放到 TestMain 函数中

文件 main.go：

```go
package main

func Hello() string {
	return "你好"
}
```

文件 main_test.go：

```go
package main

import "testing"

func TestHello(t *testing.T) {
	output := Hello()
	exepected := "你好"
	if output != exepected {
		t.Errorf("Expected %s, got %s", exepected, output)
	}
}
```

运行测试：`go test`，输出：PASS。

### 覆盖率

文件 main.go：

```go
package main

func Score(score int) bool {
	if score >= 60 {
		return true
	} else {
		return false
	}
}
```

文件 main_test.go：

```go
package main

import "testing"

func TestHello(t *testing.T) {
	output := Score(70)
	exepected := true
	if output != exepected {
		t.Errorf("Expected %t, got %t", exepected, output)
	}
}
```

运行测试：`go test --cover`，输出 coverage: 66.7% of statements，即覆盖率为 2 / 3 = 66.7%。

:::tip

- 一般覆盖率 50%~60%，较高覆盖率 80%+
- 测试分支相互独立、全面覆盖
- 测试单元粒度足够小，函数单一职责

:::

## 集成测试

集成测试是指多个单元测试组合在一起的测试，目的是验证多个模块之间的交互是否正确。

集成测试一般放在单独的目录中，以 `*_test.go` 结尾，并使用 `go test -v` 命令运行。
