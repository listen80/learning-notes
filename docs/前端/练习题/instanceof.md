# instanceof

## 原理

## 实现

```js
function _instanceof(obj, func) {
  let prototype = func.prototype;

  if (typeof func !== "function") {
    throw new TypeError("Right-hand side of 'instanceof' is not callable");
  }

  if (!prototype) {
    return false;
  }

  if (
    ["string", "number", "undefined", "boolean"].includes(typeof obj) ||
    obj === null
  ) {
    return false;
  }

  while (obj.__proto__) {
    if (prototype === obj.__proto__) {
      return true;
    } else {
      obj = obj.__proto__;
    }
  }
  return false;
}

console.log("new String" instanceof String, _instanceof("new String", String));
```
