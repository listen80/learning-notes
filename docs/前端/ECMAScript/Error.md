# Error

## 常见 js 错误

### Error(base)

```js
throw new Error("msg", "fileName", "lineNumber");
```

### EvalError

```js
try {
  throw new EvalError("Hello");
} catch (e) {
  console.log(e instanceof EvalError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "EvalError"
  console.log(e.stack); // "@Scratchpad/2:2:9\n"
}
```

### RangeError

```js
throw RangeError();

function next() {
  next();
}

try {
  next();
} catch (e) {
  e instanceof RangeError; // true
}
```

### ReferenceError

```js
try {
  undefined_var;
} catch (e) {
  e instanceof ReferenceError; // true
}
```

### SyntaxError

```js
try {
  eval(",");
} catch (e) {
  e instanceof SyntaxError; // true
}
```

### TypeError

```js
try {
  var a = 1;
  a();
} catch (e) {
  e instanceof TypeError; // true
}
```

### URIErro

```js
try {
  decodeURI("%1");
} catch (e) {
  e instanceof URIErro; // true
}
```
