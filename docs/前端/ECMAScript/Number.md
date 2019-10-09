# Number

## IEEE 754

IEEE 二进制浮点数算术标准（IEEE 754）是 20 世纪 80 年代以来最广泛使用的浮点数运算标准，为许多 CPU 与浮点运算器所采用
JS 里是 64 位表示 符号位(1) + 指数位(1 + 10) + 存储位(52)

## 属性和方法

```js
Object.getOwnPropertyNames(Number);

[
  "length",
  "name",
  "prototype",
  "isFinite",
  "isInteger",
  "isNaN",
  "isSafeInteger",
  "parseFloat",
  "parseInt",
  "MAX_VALUE",
  "MIN_VALUE",
  "NaN",
  "NEGATIVE_INFINITY",
  "POSITIVE_INFINITY",
  "MAX_SAFE_INTEGER",
  "MIN_SAFE_INTEGER",
  "EPSILON"
];
```

### MAX_VALUE, MIN_VALUE

```js
```

### EPSILON

ε
_极小的绝对值_

```js
Number.EPSILON - 2 ** -52 === 0; // true
```

### 安全数

```js
Number.MAX_SAFE_INTEGER === parseInt("1".repeat(53), 2);
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
Number.MAX_SAFE_INTEGER + Number.MIN_SAFE_INTERGER === 0; // true
```

## 方法

### isFinite

```js
Number.isFinite = function(n) {
  return n !== Infinity && n !== -Infinity;
};
```

### isInteger

```js
Number.isInteger = function(n) {
  return typeof n === "number" && ~String(n).indexOf("");
};
```

### isNaN

```js
Number.isNaN = function(n) {
  return typeof n === "number" && n !== n;

  // return typeof n === "number" && isNaN(n)
};
```

### isSafeInteger

```js
Number.isSafeInteger = function(n) {
  return n < Number.MAX_SAFE_INTEGER && n > Number.MIN_SAFE_INTEGER;
};
```

### parseFloat

```js
Number.parseFloat === parseFloat; // true 和以前表现一样
```

### parseInt

```js
Number.parseInt === parseInt; // true 和以前表现一样
```
