# RegExp

## 正则

### 普通字符

### 元字符

|a|b|
|\w|\s|
|\d|

\uXXXX
\xXX

### 定位符

\b ^ $

### 限定付

## 反向引用

## 环视(零宽度断言、预搜索)

```js
// 正向肯定环视 匹配index是3的位置，而不是位置为0的元素1
"123122".match(/1(?=22)/); // ["1", index: 3, input: "123122", groups: undefined]

// 否定环视
"123122".match(/1(?!22)/); // ["1", index: 0, input: "123122", groups: undefined]
"123122".match(/1(?!23)/); // ["3", index: 0, input: "123122", groups: undefined]
```

## 问题

```js
// 多个重复定位符
/^^^^^hehe$$$$$$$$$$/.exec("hehe"); // ["hehe", index: 0, input: "hehe", groups: undefined]

// 反向匹配
/(\w\1\1\1\1)/.exec("what"); // ["w", "w", index: 0, input: "what", groups: undefined]
```

[参考链接](http://www.regexlab.com/zh/regref.htm)
