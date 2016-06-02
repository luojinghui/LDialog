#LDialog Plugin

###LDialog Plugin 介绍

此插件基于jquery开发，能够适用于所有的弹出对话，弹出，确认，tip，msg提示框等。支持主流浏览器。

###How to use
*   在头部引入```ldialog.css```或者压缩过的```ldialog.min.css```文件,**同时将fonts字体图标文件放置在css同级目录中。** 
	
```
	<link rel="stylesheet" href="../css/ldialog.css"/>
```

*  引入jquery以及ldialog.js文件：

```
	<script src="../js/jquery.min.js"></script>
	<script src="../js/ldialog.js"></script>
```

当在监听事件中需要弹出对话框或蒙版时，实例化一个蒙版，并初始化,例如：

```
    var dialog = new LDialog("test2", {footer: false}, {btn: {sure: "btn-info"}});
    dialog.init();
```

### LDialog参数说明

 new LDialog（arg1, arg2, arg3）可以传入（选填）三个参数：

#### arg1 (字符串)

| 参数名        | 数据类型           | 默认值  |   描述  | 备注 | 
|:---------------|:---------------|:-------|:---------:|:------:|
| arg1     | String | null | 重写蒙版显示内容| 可以是纯文本，也可以是html代码|


#### arg2 (对象)

| 参数名        | 数据类型           | 默认值  |   描述  | 备注 |
|:---------------|:---------------|:-------|:---------:|:----|
| bg | String | "" | 定义蒙版背景颜色，默认为白色背景 ||
| btn | Obj | { } | 定义按钮组 | 可定义两个按钮，对应的参数是：sure和cancel |
| | | sure | 定义确定按钮样式，值既可以引用已写好的class，也可以为按钮的颜色值；若只需要其中某一个按钮，只定义一个即可  | 例如：sure: "l-btn-default" 或者 sure: "red" |
| | | cancel | 定义取消按钮样式，用法和sure相同  | 例如：cancel: "l-btn-default" 或者 cancel: "#eeeeee" |
| cancelTitle | String | "取消" | 重写蒙版底部取消按钮显示文字||
| sureTitle     | String | “确定” | 重写蒙版底部确定按钮显示文字||
| enterAni | String | "fadeIn" | 定义蒙版进入动画 | 可自定义引入animate.css动画库的动画class，插件预加载了常用的几种动画 |
| fontColor | String | "" | 定义蒙版字体颜色 ||
| footer | boolean | true | 定义蒙版底部按钮组框架是否显示 ||
| globalClose | boolean | false | 定义蒙版是否全局关闭 | 点击蒙版以外区域关闭蒙版|
| header | boolean | true | 定义蒙版标题模块是否显示 ||
| icon | boolean | true | 定义蒙版内容块图标是否显示 ||
| iconColor | String | null | 定义内容块左边图标大小 | |
| iconData | String | null | 定义图标源|  若arg3参数也定义此参数，以arg2参数定义为准|
| iconSize | String | null | 定义内容块左边图标大小 | |
| minHeight | String | "50px" | 定义蒙版最低高度| |
| move | boolean | true | 定义蒙版是否支持拖拽 | |
| moveType | Number | 1 | 定义蒙版拖拽方式，可选1或者2 | 1代表经典方式，2代表黑框方式|
| moveOut | boolean | false | 定义蒙版是否可以拖拽出显示区域 | 默认不可以|
| onCancel |function | null | 点击取消按钮的回调函数||
| onClose | function | null | 点击关闭按钮的回调函数 ||
| onGClose | function | null | 点击全局关闭回调函数 ||
| onIsNull(posi,i) | function | true | input输入框回调函数,参数posi为当前input的选择器，i代表此input的序号，函数默认返回true||
| onSure(data) | function | null | 点击确定按钮的回调函数,可选data参数，获得所有蒙版input输入框的中的值，以数组形式展现| |
| onSureBefore | function | null | 点击确定按钮前执行的回调函数 | 和onSure相比，此函数执行时动画效果还未执行|
| onTimeOut | function | null | 倒计时完毕后的回调函数 | |
| opacity | Number | 0.5 | 定义蒙版透明度 | |
| outline | boolean | false | 定义是否显示outline效果 | 类似facebook蒙版效果,常用于操作成功的提示信息 |
| radius | Strig | "2px" | 定义蒙版的圆角 | |
| shadow | String | "" | 定义蒙版阴影||
| subtitle | String | null | 定义副标题内容 ||
| timeOut | Number | -1 | 定义蒙版显示多长时间后消失 | 默认使用-1代表不消失 |
| title | String | "初始化标题" | 定义蒙版标题 | 若arg3参数也定义此参数，以arg2参数定义为准|
| verCenter | boolean | true | 定义蒙版是否居中显示 | 默认居中，当不居中时，默认距顶部40px |
| width | String | "450px" | 定义蒙版宽度 | |
| input | Array | [ ] | 定义输入框组 | 可配置多个输入框组，参数如下： |
| | | verCenter | 默认：false | 输入框组居中显示，设置为真时，leftInfo参数不可用 |
| | | value | 默认：""  | 输入框组设定value值 |
| | | placeH | 默认：""  | 默认input显示内容 |
| | | maxlength | 默认：""  | 输入最多长度字符数 |
| | | type | 默认："text"  | 设置输入类型，例如：text，textarea，date， email... |
| | | notNull | 默认：false  | 设置是否为空 |
| | | leftInfo | 默认：""  | 设置input左边文字 |

说明：

*   内容左边引用的是字体图标，属性是iconData，插件默认引用了52个常用的字体图标，下面有预览入口，用法如图：

	进入查看图片：[传送门](http://luojinghui.github.io/LDialog/img/123.jpg)

#### arg3(对象、字符串)

已经预定义了几组类型的蒙版显示效果，分别是：

**info、 success 、error 、 confirm 、 input 、 bim、 custom**

**当使用时，直接赋值给arg3参数相应的字符串即可。**

具体形式如下：

```
    var popType = {
        info: {
            title: "信息",
            btn: {
                sure: "l-btn-info",
                cancel: "l-btn-default"
            },
            iconData: ""
        },
        success: {
            title: "成功",
            btn: {
                sure: "l-btn-success",
                cancel: "l-btn-default"
            },
            iconData: "",
            iconColor: "#56BD9D"
        },
        error: {
            title: "错误",
            btn: {
                sure: "l-btn-error",
                cancel: "l-btn-default"
            },
            iconData: "",
            iconColor: "#c9302c"
        },
        confirm: {
            title: "提示",
            btn: {
                sure: "l-btn-warning",
                cancel: "l-btn-default"
            },
            iconData: "",
            iconColor: "#F0AD4E"
        },
        input: {
            title: "输入",
            btn: {
                sure: "l-btn-primary",
                cancel: "l-btn-default"
            }
        },
        bim: {
            title: "提示",
            btn: {
                sure: "l-btn-bim",
                cancel: "l-btn-default"
            }
        },
        custom: {
            title: "初始化标题",
            btn: {
                sure: "l-btn-primary",
                cancel: "l-btn-default"
            }
        }
    };    
```

按钮组预定了6组：

**l-btn-default 、 l-btn-primary 、 l-btn-error 、 l-btn-success 、 l-btn-info、 l-btn-warning**

样式可在底部demo页面中查看

### 方法介绍（最常使用）

*   **LDialog.prompt(value, con, fun)**

弹出类似系统的prompt对话框，默认含有一个input输入框。

value：必填，显示的文字，可以为空。

con： 选填，配置样式，可使用插件**arg2**的参数

fun： 选填，确认按钮的回调函数，用来获得数据，处理数据

example：

```
            var con = {
                input: [{
                    type: "textarea"
                }],
                width: "400px",
                onIsNull: function(position, i) {
                    if(position.val() === "") {
                        position.focus();
                        LDialog.tips("请输入正确的值,",position, {posi: 2});
                        return false;
                    }
                    return true;
                }
            };
            LDialog.prompt("", con, function(v) {
                if(v[0] !== "") {
                    LDialog.closeAllTips();
                    console.log(v);
                }
            });
```

*    **LDialog.alert(value, con, fun)**

example:

```
		LDialog.alert("123123123123123");
		
		LDialog.alert("123123123123123", function() {
			console.log("点击确定按钮了！");
		});
```

和p
rompt方法使用相同，但是alert只有确定按钮，没有input输入框。

*    **LDialog.confirm(value, con, fun)**

example: 

```
        LDialog.confirm(value, {iconData: ""}, function() {
            LDialog.msg("删除成功！", {iconData: "", iconColor: "green", iconSize: "30px"});
        });
```

和prompt方法使用相同，但是confirm没有input输入框。

*    **LDialog.msg(value, con, fun)**

value：必填，显示的文字，可以为空。

con： 选填，配置样式，可使用插件**arg2**的参数

fun： 选填，倒计时过后的回调函数，用来阻断函数执行。

example: 

```
	LDialog.msg("删除成功！", {iconData: ""}, function() {
		console.log(123);	
	});
````

*    **LDialog.tip(value, con, fun)**

和msg方法使用相同，但样式不同。



### Live Demo 

插件demo：[传送门](http://luojinghui.github.io/LDialog/html/index.html)

字体图标： [传送门](http://luojinghui.github.io/LDialog/font-demo/demo.html)

###版本

*   Version 1.0.0 ：完成蒙版基础功能。
*   Version 1.0.1 ：增加蒙版居中、全局关闭、自定义进入动画、outline功能。
*   Version 1.0.2 ：增加对sea.js的支持。
*   Version 1.0.3 ：增加蒙版实时居中，增加蒙版多种拖拽方式的功能。
*   Version 1.0.4 ：增加了tip，confirm，msg，prompt，的插件方法，能够快速创建蒙版，并执行回调。
*   Version 1.0.5 ：修改了一些bug，增加tips指示框方法，能够快速定位到想要出现的位置。

