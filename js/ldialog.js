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
            iconData: ""
        },
        error: {
            title: "错误",
            btn: {
                sure: "btn-error",
                cancel: "btn-default"
            },
            iconData: ""
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
        sureTitle: "确定",
        cancelTitle: "取消",
        title: "", //标题
        footer: true, //按钮组
        icon: true, //图标
        iconSize: "",
        iconColor: "",
        iconData: "",
        subtitle: "",
        minHeight: "50px", //最小高度
        width: "550px",
        opacity: 0.5,
        timeOut: -1,
        radius: "5px",
        enterAni: "fadeInDown",
        onSure: $.noop,//点击确定的按钮回调
        onCancel: $.noop,//点击取消的按钮回调
        onClose: $.noop//弹窗关闭的回调,返回触发事件
    }, initType, this.config);

    this.createHtml(initConfig);
    console.log(initConfig);
    allType = initConfig;
};

LDialog.prototype.createHtml = function(config) {
    //创建icon和content元素
    var $txt = config.icon ? $("<span>").addClass('l-tip-info-fonts').html(this.appHtml) : $("<span>").addClass('l-tip-info-fonts').html(this.appHtml).css("margin-left", 0);
    var $icon = (config.iconData !== ""  && config.icon) ? $("<i>").addClass('l-tip-info-img').attr('data-icon', config.iconData).css({'color': config.iconColor, 'font-size': config.iconSize}) : "";
    //创建叉叉关闭和标题元素
    var $close = $('<span class="l-dialog-c">').html('×');
    var $title = $('<h4 class="l-dialog-t">').html(config.title);
    var $subtitle = config.subtitle !== "" ? $('<div class="l-dialog-subtitle">').html(config.subtitle) : "";
    //创建确定和取消按钮元素
    var $sure = config.btn.sure ? $('<div>').addClass("btn").addClass(config.btn.sure).text(config.sureTitle) : $('<div>');
    var $cancel = config.btn.cancel ? $('<div>').addClass("btn").addClass(config.btn.cancel).text(config.cancelTitle) : $('<div>');
    //创建footer元素，判断是否显示footer
    var $footer = config.footer ? $('<div class="l-dialog-footer">') : $('<div class="l-dialog-footer" style="display: none!important"></div>');
    //创建内容盒子元素
    var $contentBox = $('<div class="l-dialog-content tc"></div>');
    var $contentBoxIn = $('<span class="l-tip-info"></span>');
    var $headerBox = $('<div class="l-dialog-title"></div>');
    var $dialogBox = config.radius !== "5px" ? $('<div>').addClass("l-dialog-box animated " + config.enterAni).css({'width': config.width, 'min-height': config.minHeight, 'border-radius': config.radius}) : $('<div>').addClass("l-dialog-box animated " + config.enterAni).css({'width': config.width, 'min-height': config.minHeight});
    var $dialog = config.opacity === 0.5 ? $('<div>').addClass("l-dialog animated fadeIn") : $('<div>').addClass("l-dialog animated fadeIn").css({"background-color": "rgba(0,0,0," + config.opacity + ")"});

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
    this.createBom(sendObj);
    this.addListener(sendObj, config);
};

LDialog.prototype.createBom = function(accObj) {
    this.createId = this.createId();

    accObj.dialog.attr('id', this.createId).append(
        accObj.dialogBox.append(
            accObj.headerBox.append(
                accObj.title
            ).append(
                accObj.close
            ).append(
                accObj.subtitle
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
    $('body').blur();
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
};

LDialog.prototype.timeOutClose = function(config, dia_id) {
    setTimeout(function() {
        LDialog.addOrRemoveClass(dia_id);

        setTimeout(function() {
            $('#' + dia_id).remove();
        }, 300)

    }, config.timeOut);
};

//叉叉按钮关闭弹窗
LDialog.prototype.close = function(event) {
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onClose();
    }, 300);
};

//取消按钮关闭弹窗
LDialog.prototype.cancel = function(event) {
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onCancel();
    }, 300)
};

//确定按钮关闭弹窗
LDialog.prototype.sure = function(event) {
    var input = "test value";
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onSure(input);
    }, 300)
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
    var input = "test value";

    LDialog.addOrRemoveClass(dia_id);
    setTimeout(function() {
        $('#' + dia_id).remove();
        allType.onSure(input);
    }, 300)
};

LDialog.addOrRemoveClass = function(dia_id) {
    $('#' + dia_id).removeClass('fadeIn').addClass('fadeOut');
    $('#' + dia_id).find('.l-dialog-box').removeClass('fadeInDown').addClass('fadeOut');
};