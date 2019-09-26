
# 排序

## 快速排序

```js
funtction quick_sort(arr) {
  let flag = arr[0];
  let left = 1;
  let right = arr[arr.length - 1];

  while(left < right) {
    if(arr[left] > flag) {
      // 左边 找一个比flag大的数
      arr[flag] = arr[left];

      while(left < right) {
        if(arr[right] > flag) {
          // 交换
        } else {
          right--;
        }
      }
      left ++;

    } else {
      left ++;
    }
  }
}

quick_sort([2,4,1,3,0,-5,100,20,7,6]);
```

## 选择排序

```js
function selectionSort(arr) {

}
```
