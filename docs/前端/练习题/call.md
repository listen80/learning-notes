# call

## 分析

没有直接

## 实现

```js
Function.prototype._call = function(context = window, ...args) {
  if (this === Function.prototype) {
    return undefined; // 用于防止 Function.prototype._call() 直接调用
  }
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

function a(argument) {}
b = a.call;
// b({a:3}, 2,3,4)
```
