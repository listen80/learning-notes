# sqrt

## 原理

## 实现

```js
function sqrt(x, n = 2) {
  let high = x;
  let low = 0;
  let mid = low + (high - low) / n;
  while (high - low > Number.EPSILON) {
    if (mid * mid > x) {
      high = mid;
    } else {
      low = mid;
    }
    mid = low + (high - low) / n;
  }
  mid = low + (high - low) / n;
  return mid;
}

console.log(sqrt(3));

console.log(Math.sqrt(3));
```
