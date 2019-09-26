# typeof

## 原理

## 实现

```js
function _typeof(obj) {
  let type = Object.prototype.toString.call(obj);
  return type.substring(8, type.length - 1).toLowerCase();
}

console.log(_typeof([]), _typeof({}), _typeof(undefined));
```
