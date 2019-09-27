# Array

## 数组的扩展

### 最大长度

```js
Array(2 ** 32); // Uncaught RangeError
```

## 属性

### Array.from

```js
Array.from("hello world");
// ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]

let s = new Set(["foo", window]);
Array.from(s);
// ["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);
// [[1, 2], [2, 4], [4, 8]]

function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [1, 2, 3]

Array.from([1, 2, 3], x => x ** x);
```

### of

```js
Array.of(2, 3, 4, [2, 3, 2, [{}, 4]]);
```

### map

```js
var result = [1, 2, 3, 4].map(function(item, index) {
  return item * 2;
});

// result [2, 4, 6, 8]
```

### forEach

```js
[1, 2, 3, 4].forEach(function(item, index) {
  console.log(item);
});
```

### indexOf

```js
var index = [1, 2, 3, 4].indexOf(2); // 1
var indexNaN = [NaN].indexOf(NaN); // -1 bug includes方法修正此问题
```

### lastIndexOf

```js
var index = [1, 2, 3, 4].indexOf(2); // 1
var indexNaN = [NaN].indexOf(NaN); // -1 bug includes方法修正此问题
```

### every

```js
[1, 2, 3, 4].every(function(item) {
  return item < 3;
});
```

### some

```js
[1, 2, 3, 4].some(function(item) {
  return item === 4;
});
```

### filter

```js
[1, 2, 3, 4].filter(function(item) {
  return item > 3;
});
```

### flat

```js
[1, 2, 3, 4].some(function(item) {
  return item === 4;
});
```

### flagMap

```js
[1, 2, 3, 4].some(function(item) {
  return item === 4;
});
```

### 最大安全数

```js
Number.MAX_SAFE_INTEGER === parseInt("1".repeat(53), 2);
```
