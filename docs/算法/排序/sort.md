# 排序

![复杂度](images/complex.png)

> n:数据规模
> k:“桶”的个数
> In-place:占用常数内存，不占用额外内存
> Out-place:占用额外内存
> 稳定性:排序后 2 个相等值的先后顺序不变

## 冒泡排序

![冒泡排序](images/bubble.gif)

```js
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
      }
    }
  }
}

var arr = Array.from({ length: 100 })
  .map((item, index) => index)
  .sort(() => Math.random() - 0.5);
console.log(arr + "");
bubbleSort(arr);
console.log(arr + "");
```

> 优化: 立一个 flag，第二层循环没有交换，则无需排序，退出第一、二层循环即可

## 选择排序

![选择排序](images/selection.gif)

```js
function selectionSort(arr) {
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      var t = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = t;
    }
  }
}
var arr = Array.from({ length: 100 })
  .map((item, index) => index)
  .sort(() => Math.random() - 0.5);
console.log(arr + "");
selectionSort(arr);
console.log(arr + "");
```

## 快速排序

```js
function quickSort(arr) {
  let flag = arr[0];
  let left = 1;
  let right = arr[arr.length - 1];

  function sort(start, end) {
    var flagNumber = Math.floor((start + end) / 2);
    while (start < end) {}
  }
}

var arr = Array.from({ length: 100 })
  .map((item, index) => index)
  .sort(() => Math.random() - 0.5);
console.log(arr + "");
quickSort(arr);
console.log(arr + "");
```
