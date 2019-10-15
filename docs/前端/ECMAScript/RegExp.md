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

`\b` `^` `$`

### 限定符

? + `*` {m} {m,n} {m,}
`贪婪与非贪婪`

## 反向引用

## 环视(零宽度断言、预搜索)

```js
// 正向肯定环视 匹配index是3的位置，而不是位置为0的元素1
"123122".match(/1(?=22)/); // ["1", index: 3, input: "123122", groups: undefined]

// 否定环视
"123122".match(/1(?!22)/); // ["1", index: 0, input: "123122", groups: undefined]
"123122".match(/1(?!23)/); // ["3", index: 0, input: "123122", groups: undefined]
```

## i,g,m

### ignore case

无视大小写

### g

全部匹配，会将正则匹配到的所有的，非$1, $2
String.prototype.replace 不会产生匹配结果变化

### m

换行

## 问题

```js
// 多个重复定位符
/^^^^^hehe$$$$$$$$$$/.exec("hehe"); // ["hehe", index: 0, input: "hehe", groups: undefined]

// 反向匹配
/(\w\1\1\1\1)/.exec("what"); // ["w", "w", index: 0, input: "what", groups: undefined]
// 上面应该报错才合理
/(\w)/.exec("what"); // ["w", "w", index: 0, input: "what", groups: undefined]
```

## 范例

```js
var str = "(Is is the cost of of gasoline going up up";
var patt1 = /\b([a-z]+) \1\b/gi;
console.log(str.match(patt1)); // ["Is is", "of of", "up up"]
```

[参考链接](http://www.regexlab.com/zh/regref.htm)
