# autocomplete

---

基于Zepto的移动端轻量级Autocomplete组件

---

## 使用说明

初始化 autocomplete

```javascript
var ac = new AutoComplete({
    trigger: '#test',
    dataSource: ['abc', 'abd', 'cbd']
});
```

## API

### 属性 

#### trigger *selector*

输入框

#### parentNode *selector*

列表容器插入的父节点

#### template *string*

默认容器模板

```html
<ul data-role="autocomplete" class="ui-autocomplete"></ul>
```

#### itemTemplate *string*

默认项模板

```html
<li data-role="item" class="ui-autocomplete-item">{{value}}</li>
```

#### dataSource *array | function(value, done)*

数据源

1. Array

    直接提供数组
    
    ```
    ['abc', 'abb', 'acb']
    ```
    
2. Function

    提供自定义函数，函数提供2个参数，`value`是当前输入框原始值，`done`是必须在函数内调用的回调方法，需要传递`数组类型`数据源，也可以直接返回数据源。
    
    ```
    dataSource: function (value) {
      if (value) {
        var v = value.split('@');
        return dataMaker(v[0], v[1]);
      }
      return [];
    }
    
    var dataSource = ['126.com', '163.com', 'qq.com'];

    function dataMaker(prefix, suffix) {
        var data = [];
        $.each(dataSource, function (i, value) {
            if (suffix) {
                if (value.indexOf(suffix) === 0) {
                    data.push([prefix, value].join('@'));
                    return false;
                }
            } else {
                data.push([prefix, value].join('@'));
            }
        });
        return data;
    }
    ```