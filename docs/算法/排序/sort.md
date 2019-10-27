# 排序

> [原文链接](https://www.cnblogs.com/cnxkey/articles/9175489.html)

> ![复杂度](images/complex.png)

1. n: 数据规模
1. k: 桶的个数
1. In-place/Out-place:占用常数内存，不占用额外内存 / 占用额外内存
1. 稳定性:排序后 2 个相等值的先后顺序不变

## 冒泡排序

![冒泡排序](images/bubbleSort.gif)

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
```

> 优化: 立一个 flag，第二层循环没有交换，则无需排序，退出第一、二层循环即可

## 选择排序

![选择排序](images/selectionSort.gif)

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
```

## 插入排序

![插入排序](images/insertionSort.gif)

```js
function insertionSort(arr) {
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    var insertIndex = i - 1;
    var currentValue = arr[i];

    while (insertIndex >= 0 && arr[insertIndex] > currentValue) {
      arr[insertIndex + 1] = arr[insertIndex]; // 将值后移一位
      insertIndex--; // 向左继续比较
    }
    // 此时insertIndex为-1或者已经找到比currnetValue小的值了
    // insertIndex + 1才是应该插入值的位置
    arr[insertIndex + 1] = currentValue;
  }
}

function insertionSortFor(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var compareValue = arr[i];
    for (var j = i - 1; j >= 0; j--) {
      // 从i - 1开始
      if (arr[j] > compareValue) {
        // 向右推一位
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = compareValue;
  }
}
```

## 希尔排序

```js
function shellSort(arr) {}
```

## 归并排序

![归并排序](images/mergeSort.gif)

```js
function mergeSort() {}
```

## 快速排序

![快速排序](images/quickSort.gif)

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
```

```js
var len; //因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

function buildMaxHeap(arr) {
  //建立大顶堆
  len = arr.length;
  for (var i = Math.floor(len / 2); i >= 0; i--) {
    heapify(arr, i);
  }
}

function heapify(arr, i) {
  //堆调整
  var left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;

  if (left < len && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < len && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest);
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapSort(arr) {
  buildMaxHeap(arr);

  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    len--;
    heapify(arr, 0);
  }
  return arr;
}
```
