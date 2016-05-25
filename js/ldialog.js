/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/5/12
 * Time: 下午6:00
 */
var allType;

function LDialog(appHtml ,config, type) {
    this.appHtml = appHtml || "";
    this.config = config || {};
    this.type = type || {};
    this.createId;
}

LDialog.prototype.init = function() {
    var popType = {
        info: {
            title: "信息",
            btn: {
                sure: "btn-info",
                cancel: "btn-default"
            },
            iconData: ""
        },
        success: {
            title: "成功",
            btn: {
                sure: "btn-success",
                cancel: "btn-default"
            },
            iconData: "",
            iconColor: "#56BD9D"
        },
        error: {
            title: "错误",
            btn: {
                sure: "btn-error",
                cancel: "btn-default"
            },
            iconData: "",
            iconColor: "#c9302c"
        },
        confirm: {
            title: "提示",
            btn: {
                sure: "btn-warning",
                cancel: "btn-default"
            },
            iconData: ""
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

    var initType = this.type instanceof Object ? this.type : popType[this.type] || {};//格式化输入的参数:弹窗类型

    var initConfig = $.extend(true, {
        btn: {},
        cancelTitle: "取消",
        enterAni: "fadeIn", //进入动画
        footer: true, //按钮组
        globalClose: false, //全局关闭
        header: true,  //是否显示头部
        icon: true, //图标
        iconColor: "",   //字体图标颜色
        iconData: "", //图标源
        iconSize: "",   //字体大小
        minHeight: "50px", //最小高度
        move: true,   //用来表示是否可以拖拽
        moveType: 1,  //1代表经典拖拽，2代表黑框拖拽
        moveOut: false, //是否能够拖拽出显示区域
        onSure: $.noop,//点击确定的按钮回调
        onSureBefore: $.noop,  //确定之前的回调
        onCancel: $.noop,//点击取消的按钮回调
        onClose: $.noop,//弹窗关闭的回调,返回触发事件
        opacity: 0.3,   //蒙版透明度
        outline: false, //outline效果
        radius: "5px",   //表示蒙版圆角
        subtitle: "",   //副标题
        sureTitle: "确定",
        timeOut: -1,  //倒计时关闭
        title: "", //标题
        verCenter: false, //是否垂直居中
        width: "550px"
    }, initType, this.config);

    this.createHtml(initConfig);
    allType = initConfig;
};

LDialog.prompt = function(config, type) {
    var dialog = new LDialog("", config, type);
    dialog.init();
};

LDialog.prototype.createHtml = function(config) {
    //创建icon和content元素
    var $txt = (config.iconData === "") ? $("<div>").addClass('l-tip-info-fonts').html(this.appHtml).css({
        display: "block"
    }) : $("<div>").addClass('l-tip-info-fonts').html(this.appHtml);
    var $icon = (config.iconData !== ""  && config.icon) ? $("<i>").addClass('l-tip-info-img').attr('data-icon', config.iconData).css({'color': config.iconColor, 'font-size': config.iconSize}) : "";
    //创建叉叉关闭和标题元素
    var $close = $('<span class="l-dialog-c">').html('×');
    var $title = $('<div class="l-dialog-title">').html(config.title);
    var $subtitle = config.subtitle !== "" ? $('<div class="l-dialog-subtitle">').html(config.subtitle) : "";
    //创建确定和取消按钮元素
    var $sure = config.btn.sure ? $('<div>').addClass("btn").addClass(config.btn.sure).text(config.sureTitle) : $('<div>');
    var $cancel = config.btn.cancel ? $('<div>').addClass("btn").addClass(config.btn.cancel).text(config.cancelTitle) : $('<div>');
    //创建footer元素，判断是否显示footer
    var $footer = config.footer ? $('<div class="l-dialog-footer">') : $('<div class="l-dialog-footer" style="display: none!important"></div>');
    //创建内容盒子元素
    var $contentBox = $('<div class="l-dialog-content tc"></div>');
    var $contentBoxIn = $('<div class="l-tip-info"></div>');
    var $headerBox = config.header ? $('<div class="l-dialog-title-box" data-move="'+ config.move +'"></div>') : $('<div>').css('display', 'none');
    var $dialogBox = config.outline ? $('<div>').addClass("l-dialog-box animated " + config.enterAni + ' outline').css({'width': config.width, 'min-height': config.minHeight, 'border-radius': config.radius}) : $('<div>').addClass("l-dialog-box animated " + config.enterAni).css({'width': config.width, 'min-height': config.minHeight, 'border-radius': config.radius});
    var $dialog = config.opacity === 0.3 ? $('<div>').addClass("l-dialog animated fadeIn") : $('<div>').addClass("l-dialog animated fadeIn").css({"background-color": "rgba(0,0,0," + config.opacity + ")"});

    var sendObj = {
        txt: $txt,
        icon: $icon,
        close: $close,
        title: $title,
        subtitle: $subtitle,
        sure: $sure,
        cancel: $cancel,
        footer: $footer,
        contentBox: $contentBox,
        contentBoxIn: $contentBoxIn,
        headerBox: $headerBox,
        dialogBox: $dialogBox,
        dialog: $dialog
    };
    this.createBom(sendObj, config);
    this.addListener(sendObj, config);
};

LDialog.prototype.createBom = function(accObj, config) {
    this.createId = this.createId();

    accObj.dialog.attr('id', this.createId).append(
        accObj.dialogBox.append(
            accObj.headerBox.append(
                accObj.title.append(
                    accObj.subtitle
                )
            ).append(
                accObj.close
            )
        ).append(
            accObj.contentBox.append(
                accObj.contentBoxIn.append(
                    accObj.icon
                ).append(
                    accObj.txt
                )
            )
        ).append(
            accObj.footer.append(
                accObj.cancel
            ).append(
                accObj.sure
            )
        )
    );

    $('body').append(accObj.dialog);

    LDialog.isVerCenter(config, this.createId);

    LDialog.appInput(config, this.createId);

    $('body').blur();
};

LDialog.appInput = function(config, id) {
    var inputArray = config.input;
    var $inputBox = $('<div class="l-form-box">');
    var $textarea = $('<textarea>');
    var $input = $('<input />');
    
    if(inputArray !== undefined) {
        inputArray.forEach(function(v, i) {
            var inputAI = inputArray[i];
            
            switch(inputAI.type) {
                case "text":
                    $inputBox = LDialog.createInputDom(inputAI, $inputBox, $input);
                    break;
                case "textarea":
                    $inputBox = LDialog.createInputDom(inputAI, $inputBox, $textarea);
                    break;
                default:
                    $inputBox = LDialog.createInputDom(inputAI, $inputBox, $input);
                    break;
            }
            $textarea = $('<textarea>');
            $input = $('<input />');
            $('.l-tip-info-fonts').append($inputBox);
        });
    }
};

LDialog.createInputDom = function(inputAI, $inputBox, $inputType) {
    var $inputLine = $('<div class="form-line">');
    var $leftSpan = $('<span class="left-form-info">');
    var inputType = inputAI.type === null ? inputAI.type : "text";

    $inputType.attr({
        value: inputAI.value,
        placeholder: inputAI.placeH,
        maxlength: inputAI.maxlength
    });
    inputAI.type !== "textarea" ? $inputType.attr({type: inputType}) : $inputType;
    $inputType.width !== null ? $inputType.css("width", inputAI.width) : $inputType;
    $inputType.height !== null ? $inputType.css("height", inputAI.height) : $inputType;
    if(inputAI.verCenter) {
        $inputType.addClass('l-center-input');
        $inputLine.append($inputType);
    } else {
        $leftSpan.html(inputAI.leftInfo);
        $inputLine.append($leftSpan).append($inputType);
    }
    $inputBox.append($inputLine);
    return $inputBox;
};

LDialog.isVerCenter = function(config, createId) {
    var winHeight = $(window).height();
    var diaHeight = $("#" + createId).find('.l-dialog-box').height();
    var verTop = Math.ceil((winHeight - diaHeight) / 2) - 10;
    var winWidth = $(window).width();
    var diaWidth = $("#" + createId).find('.l-dialog-box').width();
    var verLeft = Math.ceil((winWidth - diaWidth) / 2);

    if(config.verCenter) {
        $("#" + createId).find('.l-dialog-box').css({
            top: verTop,
            left: verLeft
        });
        LDialog.calCoordinate(createId);
    } else {
        $("#" + createId).find('.l-dialog-box').css({
            top: '40px',
            left: verLeft
        });
    }
};

LDialog.calCoordinate = function(createId) {
    $(window).resize(function(){
        var winHeight = $(window).height();
        var diaHeight = $("#" + createId).find('.l-dialog-box').height();
        var verTop = Math.ceil((winHeight - diaHeight) / 2) - 10;
        var winWidth = $(window).width();
        var diaWidth = $("#" + createId).find('.l-dialog-box').width();
        var verLeft = Math.ceil((winWidth - diaWidth) / 2);

        $("#" + createId).find('.l-dialog-box').css({
            top: verTop,
            left: verLeft
        });
    });
};

//重生popId,防止id重复
LDialog.prototype.createId = function() {
    var id =  "pop-" + new Date().getTime() + parseInt(Math.random()*100000); //弹窗索引

    if($("#" + id).length > 0) {
        return this.creatPopId();
    } else {
        return id;
    }
};

LDialog.prototype.addListener = function(accObj, config) {
    var dia_id = {id : this.createId};

    accObj.close.on('click', dia_id, this.close);

    accObj.cancel.on('click', dia_id, this.cancel);

    accObj.sure.on('click', dia_id , this.sure);

    $(window).on('keydown', dia_id, this.enter);

    if(config.timeOut !== -1 && config.timeOut > 0) this.timeOutClose(config, dia_id.id);

    if(config.globalClose) this.globalClose(config, dia_id.id);

    if(config.move) LDialog.moveLDialog(config, dia_id.id);

};

LDialog.moveLDialog = function(config, dia_id) {
    var isMove = false;
    var boxX, boxY;
    var cloneL, cloneT;

    $('#' + dia_id).find('.l-dialog-title').mousedown(function(e) {
        isMove = true;
        $(this).css('cursor', 'move');

        e.preventDefault();
        boxX = e.offsetX;
        boxY = e.offsetY;

        var cW = $(this).parent().parent().outerWidth() - 5;
        var cH = $(this).parent().parent().outerHeight() - 5;
        var offX = e.pageX;
        var offY = e.pageY;
        var setOffX = offX - boxX - 1;
        var setOffY = offY - boxY - 1;

        if(config.moveType === 1) {
            $('body').append('<div id="l-dialog-clone-box"  class="l-dialog-clone-box" style="width:' + cW + 'px; height:' + cH + 'px; left:' + setOffX + 'px; top: '+ setOffY + 'px;visibility: hidden"></div>');
        } else {
            $('body').append('<div id="l-dialog-clone-box"  class="l-dialog-clone-box" style="width:' + cW + 'px; height:' + cH + 'px; left:' + setOffX + 'px; top: '+ setOffY + 'px;"></div>');
        }
    }).mouseover(function() {
        $(this).css('cursor', 'default');
    });

    $(document).mousemove(function(e) {
        if(isMove) {
            var e = e || window.event;
            var oX = e.clientX - boxX;
            var oY = e.clientY - boxY;

            //是否可以拖拽出显示区域
            if(!config.moveOut) {
                oX < 0 && (oX = 0);
                oY < 0 && (oY = 0);
                oX > ($(window).width() - $(".l-dialog-clone-box").outerWidth()) && (oX = $(window).width() - $(".l-dialog-clone-box").outerWidth());
                oY > ($(window).height() - $(".l-dialog-clone-box").outerHeight()) && (oY = $(window).height() - $(".l-dialog-clone-box").outerHeight());
            }

            //是否是经典拖拽
            if(config.moveType === 1) {
                $(".l-dialog-box").css({"left":oX + "px", "top": oY + "px"});
            } else {
                $(".l-dialog-clone-box").css({"left":oX + "px", "top": oY + "px"});
            }

            cloneL = oX;
            cloneT = oY;
        }
    }).mouseup(function() {
        $(this).css('cursor', 'default');

        $(".l-dialog-clone-box").remove();
        $('#' + dia_id).find('.l-dialog-box').css({"left":cloneL + "px", "top": cloneT + "px"});

        isMove = false;
    });
};

LDialog.prototype.globalClose = function(config, dia_id) {
    $('#' + dia_id).click(function() {
        $(this).removeClass('fadeIn').addClass('fadeOut');
        $(this).find('.l-dialog-box').removeClass(allType.enterAni).addClass('fadeOut');

        setTimeout(function() {
            $('#' + dia_id).remove();
        }, 200)
    });

    $('#' + dia_id).find('.l-dialog-box').on('click' ,function(event) {
        event.stopPropagation();
    });
};

LDialog.prototype.timeOutClose = function(config, dia_id) {
    setTimeout(function() {
        LDialog.addOrRemoveClass(dia_id);

        setTimeout(function() {
            $('#' + dia_id).remove();
        }, 200)

    }, config.timeOut);
};

//叉叉按钮关闭弹窗
LDialog.prototype.close = function(event) {
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onClose();
    }, 200);
};

//取消按钮关闭弹窗
LDialog.prototype.cancel = function(event) {
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onCancel();
    }, 200)
};

//确定按钮关闭弹窗
LDialog.prototype.sure = function(event) {
    var input = LDialog.getAllValue();
    var dia_id = event.data.id;

    allType.onSureBefore();
    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onSure(input);
    }, 200)
};

//回车键确认事件
LDialog.prototype.enter = function(event) {
    var dia_id = event.data.id;

    if(event.keyCode === 13) {
        if($("#" + dia_id).length === 1){
            LDialog.keySure(dia_id);
        }
    }
};

LDialog.keySure = function(dia_id) {
    var input = LDialog.getAllValue();

    allType.onSureBefore();
    LDialog.addOrRemoveClass(dia_id);
    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onSure(input);
    }, 200)
};

LDialog.addOrRemoveClass = function(dia_id) {
    $('#' + dia_id).removeClass('fadeIn').addClass('fadeOut');
    $('#' + dia_id).find('.l-dialog-box').removeClass(allType.enterAni).addClass('fadeOut');
};

LDialog.getAllValue = function() {
    var allForm = $('.form-line');
    var getAllValue = [];

    [].forEach.call(allForm, function(v, i) {
        if($(allForm[i]).find('input').size() === 1) {
            getAllValue.push($(allForm[i]).find('input').val());
        } else {
            getAllValue.push($(allForm[i]).find('textarea').val());
        }
    });
    
    return getAllValue;
};