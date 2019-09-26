# 查找

## 二分查找

```js
funtction quick_find(arr, n, start, end) {
  let index = Math.floor((start + end) / 2);
  if(arr[index] > n) {
    return quick_find(arr, n, index, end);
  } else if(arr[index] < 0) {
    return quick_find(arr, n, start, index);
  } else if(arr[index] === 0) {
    return index;
  }
}
function find(arr, n) {
  return quick_find(arr, n, 0, arr.length - 1);
}

find([1, 2, 4, 7, 100, 2133, 33331]);
```

## 选择排序

```js
function selectionSort(arr) {
  if (arr) {
  }
}
```
