#LDialog Plugin

###LDialog Plugin 介绍

此插件基于jquery开发，能够适用于一般的弹出对话框，弹出框，确认框，输入框等。
支持IE8+，并且css动画采用animate.css动画函数库，能够应用一般的过渡动画。

###How to use

1.  首先引入jquery,版本任意：


```
	<script src="../js/jquery.min.js"></script>

```

2.   引入ldialog.js或者ldialog.min.js

```
	<script src="../js/ldialog.js"></script>

```

当在监听事件中需要弹出对话框或蒙版时，开始实例化一个蒙版，并初始化（可同时创建任意数量的蒙版）

```
    var dialog = new LDialog("test2", {footer: false}, {btn: {sure: "btn-info"}});
    dialog.init();
```

### LDialog参数说明

 new LDialog（arg1, arg2, arg3）可以传入（选填）三个参数：

#### arg1 (字符串)

| 参数名        | 数据类型           | 默认值  |   描述  |
|:---------------|:---------------|:-------|:---------:|
| arg1     | String | null | 重写蒙版显示内容|


#### arg2 (对象)

| 参数名        | 数据类型           | 默认值  |   描述  | 备注 |
|:---------------|:---------------|:-------|:---------:|:----:|
| sureTitle     | String | “确定” | 重写蒙版底部确定按钮显示文字||
| cancelTitle | String | "取消" | 重写蒙版底部取消按钮显示文字||
| title | String | null | 定义蒙版标题 | 若arg3参数也定义此参数，以arg2参数定义为准|
| footer | boolean | true | 定义蒙版底部按钮组框架是否显示 ||
| icon | boolean | true | 定义蒙版内容块图标是否显示 ||
| iconClass | String | null | 定义显示图标对应的class|  若arg3参数也定义此参数，以arg2参数定义为准|
| minHeight | String | "50px" | 定义蒙版最低高度| |
| width | String | "550px" | 定义蒙版宽度 | |
| onSure(data) | function | null | 点击确定按钮的回调函数,可选data参数，获得所有蒙版input输入框的中的值，以数组形式展现| |
| onCancel |function | null | 点击取消按钮的回调函数| |
| onClose | function | null | 点击关闭按钮的回调函数 | |

#### arg3(对象、字符串)

已经预定义了几组类型的蒙版显示效果，分别是：

** info、 success 、error 、 confirm 、 input 、 custom**

具体形式如下：

```
var popType = {
    info: {
        title: "信息",
        btn: {
            sure: "btn-info",
            cancel: "btn-default"
        },
        iconClass: "l-success"
    },
    success: {
        title: "成功",
        btn: {
            sure: "btn-success",
            cancel: "btn-default"
        },
        iconClass: "l-success"
    },
    error: {
        title: "错误",
        btn: {
            sure: "btn-error",
            cancel: "btn-default"
        },
        iconClass: "l-close"
    },
    confirm: {
        title: "提示",
        btn: {
            sure: "btn-warning",
            cancel: "btn-default"
        },
        iconClass: "l-question"
    },
    input: {
        title: "输入",
        btn: {
            sure: "btn-primary",
            cancel: "btn-default"
        }
    },
    custom: {
        title: "弹窗",
        btn: {}
    }
};
```


按钮组预定了6组：

**btn-default 、 btn-primary 、 btn-error 、 btn-success 、 btn-info、 btn-warning**

可以自定义按钮class，形式如下：

```
.btn-自定义 {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}
.btn-自定义:hover {
    color: #fff;
    background-color: #479C82;
    border-color: #469079;
}
```

若是只需要确定或取消按钮，可以只定义一个按钮即可：

```
btn: {
	sure: "btn-default"
}
```

###版本

Version 1.0.0

### Live Demo 

插件demo：[传送门](http://luojinghui.github.io/LDialog/html/index.html)

字体图标： [传送门](http://luojinghui.github.io/LDialog/font-list/demo.html)