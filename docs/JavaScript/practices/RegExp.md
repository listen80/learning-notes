# RegExp

## 原理

## 实现

```js
let text = document.getElementsByTagName("script")[0].innerText;
// let commment = //
const result = text.match(/\/\/[^\n]*|\/*[\s\S]*?\*\/|\w+|\d+|\s+|[\s\S]/g);
console.log(result);
```
