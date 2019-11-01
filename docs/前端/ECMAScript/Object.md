# Object

## Object.assign

```js
let o = {};
Object.assign(o, { a: 1 }, { b: 2 }, { c: 3 }, []);
// o {a: 1, b: 2, c: 3}
```

> 浅复制，仅对象自己的，可被枚举的

## Object.create(proto[, propertiesObject])

```js
Object.create(null);

let _ = null;
Object.create(null, {
  a: {
    value: 2,
    writable: false,
    configurable: false
  },
  b: {
    set: function(value) {
      _ = value + "|set";
    },
    get: function() {
      return _;
    }
  }
});
```

## Object.defineProperties(obj, propertiesObject)

```js
Object.defineProperties(
  {},
  {
    a: {
      value: 2,
      writable: false,
      configurable: false
    },
    b: {
      set: function(value) {
        _ = value + "|set";
      },
      get: function() {
        return _;
      }
    }
  }
);
```
