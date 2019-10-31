# Function

## 自身

```js
Object.getOwnPropertyNames(Function);
["length", "name", "constructor"];
```

### constructor

```js
Function.constructor === Function; // true
Function.__proto__ === Function.prototype; // true
```

## 原型

```js
Object.getOwnPropertyNames(Function.prototype);
[
  "length",
  "name",
  "arguments",
  "caller",
  "constructor",
  "apply",
  "bind",
  "call",
  "toString"
];
```

### arguments

```js
```

### caller

```js
```

### bind

```js
```

### call

```js
```

### toString

```js
```
