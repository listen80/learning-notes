# 阿里笔试

## 题 1

给 Array 对象增加一个原型方法，用于删除数组条目中重复的条目(可能有多个)，返回值是一个包含被删除的重复条目的新数组

比如 给定数组 ['1', '2', '1', '3', '2'] ，执行方法后，数组项变为 ['1', '2', '3'] ，返回 ['1', '2']

```js
Array.prototype.unique = function() {
  let arr = this;
  let map = Object.create(null);
  let less = [];
  for (let x in arr) {
    map[arr[x]] = map[arr[x]] ? map[arr[x]]++ : (map[arr[x]] = 0);
    if (map[arr[x]]) {
      less.push(arr[x]);
    }
  }

  return less;
};

let less = ["1", "2", "1", "3", "2"].unique();
console.log(less);
```

## 题 2

写个转换函数，把一个 JSON 对象的 key 从横杠形式（Pascal）转换到小驼峰形式（Camel）。即 {"a_b": 1} ——> {"aB": 1}

```js
const re = /_([a-z])/;
// plain object
function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

function deep(obj) {
  for (let x in obj) {
    if (obj.hasOwnProperty(x)) {
      isObject(obj[x]) && deep(obj[x]);
      let _x = x.replace(re, function(matched, $1) {
        return $1.toUpperCase();
      });
      obj[_x] = obj[x];
      delete obj[x];
    }
  }
}

let a = {
  a_b: 1,
  c_d: {
    e_f: 3
  }
};
deep(a);
console.log(2, a);
```

## 题 3

写一个函数实现数字格式化输出，比如输入 999999999，输出为 999,999,999

```js
function format(n) {
  let arr = (n + "").split("").reverse();
  let i = 1;
  while (arr[i] !== undefined) {
    if (i % 3 === 0) {
      arr.splice(i, 0, ",");
      i++;
    }
    i++;
  }

  return arr.reverse().join("");
}

console.log(format(98532123551));
```

## 题 4

编写一个函数 parseQueryString，它的用途是把 URL 参数解析为一个对象

```js
function parseQueryString(url) {
  const re = /(http(?:s)?):\/\/((?:\w+\.){2}\w+)(:\d+])?(\/[^?]*)(\?([^#])?)(#.+)?/;

  const result = url.match(re);

  if (result) {
    const protocol = result[1];
    const hostname = result[2];
    const port = result[3] || 80;
    const query = result[4];
    const hash = result[5];
    let queryMap = {};
    query
      .split("&")
      .split("=")
      .forEach((left, right) => {
        queryMap[left] = right || "";
      });
    return { protocol, hostname, port, query, hash, queryMap };
  } else {
    throw Error();
  }
}
```

## 题 5

编写一个函数 flatten ，传入仅包含数字的多维数组，返回拍平后的结果。如：传入 [1, [2, 3, [4, [4,1,1]]]] 返回 [1, 2, 3, 4]

```js
let newArr = [];

function flatten(item) {
  if (Array.isArray(item)) {
    for (var i = 0, len = item.length; i < len; i++) {
      flatten(item[i]);
    }
  } else {
    newArr.push(item);
  }
}
flatten([1, [2, 3, [4, [4, 1, 1]]]]);

console.log(newArr);
```

## 题 6

写一个类 EventEmitter，实现简单的发布订阅功能

```js
class EventEmitter {
  constructor() {
    this.emap = Object.create(null);
  }
  on(e, callback) {
    this.emap[e] = this.emap[e] || [];
    this.emap[e].push(callback);
  }
  emit(e, ...data) {
    if (this.emap[e]) {
      this.emap[e].forEach(callback => callback.apply(this, data));
    }
  }
}

const e = new EventEmitter();

e.on("update", function(data) {
  console.log(data);
});

e.emit("update", "message");
```

## 题 7

使用 ES6 的 Promise 对象优化下面代码

## 题 8

实现两个超大数相乘（超大数指超过语言支持的数字的最大表示范围

```js
// 个数 + 个数
function add(s1, s2, _up = 0) {
  let result = +s1 + +s2 + _up;
  let up = 0;
  if (result > 9) {
    up = 1;
    result = result - 10;
  }
  return { up, result };
}
let c = add("7", 2);
console.log(c);

// 12334123 + 1312312 * 10 ^ n  多位数想加
function add_mul(s1, s2) {
  let result = [];
  let up = 0;
  s1 = s1.split("").reverse();
  s2 = s2.split("").reverse();
  for (
    let i = 0, len1 = s1.length, len2 = s2.length;
    i < len1 || i < len2;
    i++
  ) {
    let temp = add(s1[i] || 0, s2[i] || 0, up);
    up = temp.up;
    result.push(temp.result);
  }
  if (up) {
    if (result[result.length - 1] === 9) {
      result.push(1);
    } else {
      result[result.length - 1]++;
    }
  }

  return result.reverse("").join("");
}

// 13213213 * 2 (多位数乘以个位数)
function multy(s1, s2) {
  // let _s1 = s1.split('').reverse();
  // let up = 0,
  //   result = 0;
  // for (let i = 0; i < _s1.length; i++) {
  //   let n = _s1[i];
  //   if (up === 1) {
  //     n++;
  //   }
  //   // { result, up } = add(n, s2);
  //   _si[i] = result;
  // }
  // return _s1.reverse() + ''
}

// 13213213 * 13213213 (多位数乘以多位数)
function multy(s1, s2) {
  // 按上面 多位数 乘以 单位数 + 编移量加起来就行了
}
```
