import { defineConfig } from 'vitepress'
const base = '/learn-go/'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  lang: 'zh-Hans',
  head: [['link', { rel: 'icon', href: `${base}favicon.png` }]],
  title: 'Go 语言开发学习路线',
  description: 'Go 语言开发学习路线',
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
  },
  themeConfig: {
    logo: '/favicon.png',

    nav: [
      { text: '首页', link: '/' },
      { text: '基础', link: '/go/basics/why-learn-go' },
      { text: '中级', link: '/go/intermediate/custom-types-in-go' },
      // {
      //   text: '高级',
      //   items: [
      //     {
      //       text: 'Go 基础',
      //       link: '/go/basics/why-learn-go',
      //     },
      //     {
      //       text: 'Go 中级',
      //       link: '/go/intermediate/error-handling-in-go',
      //     },
      //   ],
      // },
      { text: '团队', link: '/go/team/' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/dinglou/learn-go' }],

    sidebar: {
      '/go/basics/': [
        {
          text: '初次见面',
          items: [
            { text: '为什么要学习 Go 语言', link: '/go/basics/why-learn-go' },
            { text: '在 Windows 上安装 Go', link: '/go/basics/install-go-on-windows' },
            { text: 'Go 环境变量设置', link: '/go/basics/environment-variables-in-go' },
            { text: '安装 VS Code 和 Go 扩展', link: '/go/basics/install-vs-code-and-go-extension' },
            { text: '第一个 Go 程序', link: '/go/basics/first-go-program' },
            { text: '打包生成可执行文件', link: '/go/basics/build-and-install-go-programs' },
          ],
        },
        {
          text: '基础语法',
          items: [
            { text: '基本数据类型', link: '/go/basics/basic-data-types-in-go' },
            { text: '变量', link: '/go/basics/variables-in-go' },
            { text: '常量', link: '/go/basics/constants-in-go' },
            { text: '运算符', link: '/go/basics/operators-in-go' },
            { text: '条件语句', link: '/go/basics/conditional-statements-in-go' },
            { text: 'for 语句', link: '/go/basics/for-statements-in-go' },
            { text: '函数', link: '/go/basics/functions-in-go' },
            { text: '变量作用域', link: '/go/basics/variable-scope-in-go' },
            { text: '包和模块', link: '/go/basics/packages-and-modules-in-go' },
            { text: '多模块工作区', link: '/go/basics/multi-module-workspaces-in-go' },
          ],
        },
        {
          text: '重要数据类型',
          items: [
            { text: '数组', link: '/go/basics/arrays-in-go' },
            { text: '切片', link: '/go/basics/slices-in-go' },
            { text: '字符串', link: '/go/basics/strings-in-go' },
            { text: '字符串格式化', link: '/go/basics/strings-format-in-go' },
            { text: '映射', link: '/go/basics/maps-in-go' },
            { text: '指针', link: '/go/basics/pointers-in-go' },
            { text: '结构体', link: '/go/basics/structs-in-go' },
            { text: '接口', link: '/go/basics/interfaces-in-go' },
            { text: '泛型', link: '/go/basics/generics-in-go' },
          ],
        },
      ],

      '/go/intermediate/': [
        {
          text: 'Go 中级',
          items: [
            { text: '自定义类型', link: '/go/intermediate/custom-types-in-go' },
            { text: '序列化与反序列化', link: '/go/intermediate/serialization-and-deserialization-in-go' },
            { text: 'defer 语句', link: '/go/intermediate/defer-statements-in-go' },
            { text: '错误处理', link: '/go/intermediate/error-handling-in-go' },
            { text: '并发', link: '/go/intermediate/concurrency-in-go' },
            { text: '互斥锁', link: '/go/intermediate/mutexes-in-go' },
            { text: '通道', link: '/go/intermediate/channels-in-go' },
          ],
        },
        // {
        //   text: 'IO 操作',
        //   items: [{ text: 'defer 语句', link: '/go/intermediate/defer-statements-in-go' }],
        // },
        // {
        //   text: '反射机制',
        //   items: [{ text: '互斥锁', link: '/go/intermediate/mutexes-in-go' }],
        // },
        {
          text: 'Go 标准库',
          items: [{ text: 'time 包', link: '/go/intermediate/time-package-in-go' }],
        },
      ],
    },

    outline: {
      level: [2, 4],
      label: '目录',
    },

    lastUpdated: {
      text: '最后更新于:',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    footer: {
      // message: '本站基于VitePress构建',
      copyright: '版权所有 © 2024',
    },
  },
})
