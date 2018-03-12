/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Url: https://github.com/luojinghui/LDialog
 * Date: 16/5/12
 * Time: 下午6:00
 * Version: 1.0.5
 */

(function ($) {

  var allType;

  function LDialog(appHtml, config, type) {
    this.appHtml = appHtml || "";
    this.config = config || {};
    this.type = type || "custom";
    this.createId;
  }

  let Lp = LDialog.prototype;

  Lp.init = function () {
    var popType = this.popType();
    var def = this.dConfig();
    var initType = this.type instanceof Object ? this.type : popType[this.type] || {};//格式化输入的参数:弹窗类型
    var initConfig = $.extend(true, def, initType, this.config);

    this.createHtml(initConfig);
    allType = initConfig;
  };

  Lp.dConfig = function () {
    return {
      bg: "",
      fontColor: "",
      btn: {},
      cancelTitle: "取消",
      enterAni: "fadeIn", //进入动画
      footer: true, //按钮组
      globalClose: false, //全局关闭
      header: true,  //是否显示头部
      icon: true, //图标
      iconColor: "",   //字体图标颜色
      iconData: "", //图标源
      iconSize: "50px",   //字体大小
      minHeight: "50px", //最小高度
      move: true,   //用来表示是否可以拖拽
      moveType: 1,  //1代表经典拖拽，2代表黑框拖拽
      moveOut: false, //是否能够拖拽出显示区域
      onSure: $.noop,//点击确定的按钮回调
      onSureBefore: $.noop,  //确定之前的回调
      onCancel: $.noop,//点击取消的按钮回调
      onClose: $.noop,//弹窗关闭的回调,返回触发事件
      onGClose: $.noop, //全局关闭的回调事件
      onIsNull: function () {
        return true
      }, //input为空时的回调函数
      onTimeOut: $.noop, //倒计时之后的回调函数
      opacity: 0.3,   //蒙版透明度
      outline: false, //outline效果
      radius: "2px",   //表示蒙版圆角
      subtitle: "",   //副标题
      sureTitle: "确定",
      shadow: "",
      timeOut: -1,  //倒计时关闭
      title: "", //标题
      verCenter: true, //是否垂直居中
      width: "450px"
    }
  };

  Lp.popType = function () {
    return {
      info: {
        title: "信息",
        btn: {
          sure: "l-btn-info",
          cancel: "l-btn-default"
        },
        iconData: "ld-info"
      },
      success: {
        title: "成功",
        btn: {
          sure: "l-btn-success",
          cancel: "l-btn-default"
        },
        iconData: "ld-roundcheck",
        iconColor: "#56BD9D"
      },
      error: {
        title: "错误",
        btn: {
          sure: "l-btn-error",
          cancel: "l-btn-default"
        },
        iconData: "ld-roundclose",
        iconColor: "#c9302c"
      },
      confirm: {
        title: "提示",
        btn: {
          sure: "l-btn-warning",
          cancel: "l-btn-default"
        },
        iconData: "ld-question",
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
        title: "系统标题",
        btn: {
          sure: "l-btn-primary",
          cancel: "l-btn-default"
        }
      }
    };
  };

  LDialog.prompt = function (value, receive_config, fun) {
    var config;

    if (receive_config === undefined || $.isFunction(receive_config)) config = {};
    else config = receive_config;

    if ($.isFunction(receive_config)) config.onSure = receive_config;
    else if ($.isFunction(fun)) config.onSure = fun;
    else config.onSure = $.noop;

    config = $.extend(true, {
      input: [{
        verCenter: true,
        value: "",
        placeH: "input",
        notNull: true,
        type: "text",
        iconData: ""
      }],
      width: "350px"
    }, config);

    var dialog = new LDialog(value, config, "input");
    dialog.init();
  };

  LDialog.alert = function (value, receive_config, fun) {
    var config;

    if (receive_config === undefined || $.isFunction(receive_config)) config = {};
    else config = receive_config;

    if ($.isFunction(receive_config)) config.onSure = receive_config;
    else if ($.isFunction(fun)) config.onSure = fun;
    else config.onSure = $.noop;

    config = $.extend(true, {
      width: "350px",
      btn: {cancel: ""}
    }, config);

    var dialog = new LDialog(value, config, "input");
    dialog.init();
  };

  LDialog.confirm = function (value, receive_config, fun) {
    var config;

    if (receive_config === undefined || $.isFunction(receive_config)) config = {};
    else config = receive_config;

    if ($.isFunction(receive_config)) config.onSure = receive_config;
    else if ($.isFunction(fun)) config.onSure = fun;
    else config.onSure = $.noop;

    config = $.extend(true, {
      width: "350px"
    }, config);

    var dialog = new LDialog(value, config, "custom");
    dialog.init();
  };

  LDialog.msg = function (value, receive_config, fun) {
    var config;

    if (receive_config === undefined || $.isFunction(receive_config)) config = {};
    else config = receive_config;

    if ($.isFunction(receive_config)) config.onTimeOut = receive_config;
    else if ($.isFunction(fun)) config.onTimeOut = fun;
    else config.onTimeOut = $.noop;

    config = $.extend(true, {
      width: "300px",
      verCenter: true,
      radius: 0,
      outline: true,
      header: false,
      footer: false,
      timeOut: 2500
    }, config);

    var dialog = new LDialog(value, config);
    dialog.init();
  };

  LDialog.tip = function (value, receive_config, fun) {
    var config;

    if (receive_config === undefined || $.isFunction(receive_config)) config = {};
    else config = receive_config;

    if ($.isFunction(receive_config)) config.onTimeOut = receive_config;
    else if ($.isFunction(fun)) config.onTimeOut = fun;
    else config.onTimeOut = $.noop;

    config = $.extend(true, {
      iconSize: "30px",
      width: "auto",
      enterAni: "slideInDown",
      radius: "0px",
      opacity: 0.1,
      footer: false,
      header: false,
      enterAni: "slideInDown",
      opacity: 0,
      shadow: "none",
      bg: "rgba(0,0,0,0.6)",
      fontColor: "#fff",
      //iconColor: 'rgb(75, 239, 112)',
      radius: 2,
      timeOut: 2500
    }, config);

    var dialog = new LDialog(value, config);
    dialog.init();
  };

  Lp.createHtml = function (config) {
    //创建icon和content元素
    var $txt = (config.iconData === "") ? $("<div>").addClass('l-tip-info-fonts').html(this.appHtml).css({
      display: "block",
      color: config.fontColor
    }) : $("<div>").addClass('l-tip-info-fonts').html(this.appHtml).css({color: config.fontColor});
    var $icon = (config.iconData !== "" && config.icon) ? $("<i>").addClass('l-tip-info-img ld-icon ' + config.iconData).css({
      'color': config.iconColor,
      'font-size': config.iconSize
    }) : "";
    //创建叉叉关闭和标题元素
    var $close = $('<span class="l-dialog-c">').html('×');
    var $title = $('<div class="l-dialog-title">').html(config.title);
    var $subtitle = config.subtitle !== "" ? $('<div class="l-dialog-subtitle">').html(config.subtitle) : "";
    //创建确定和取消按钮元素
    var $sure = config.btn.sure ? $('<div>').addClass("l-btn").addClass(config.btn.sure).text(config.sureTitle).css({backgroundColor: config.btn.sure}) : "";
    var $cancel = config.btn.cancel ? $('<div>').addClass("l-btn").addClass(config.btn.cancel).text(config.cancelTitle) : "";
    //创建footer元素，判断是否显示footer
    var $footer = config.footer ? $('<div class="l-dialog-footer">') : $('<div class="l-dialog-footer" style="display: none!important"></div>');
    //创建内容盒子元素
    var $contentBox = $('<div class="l-dialog-content tc">');
    var $contentBoxIn = $('<div class="l-tip-info"></div>');
    var $headerBox = config.header ? $('<div class="l-dialog-title-box" data-move="' + config.move + '">') : $('<div>').css('display', 'none');
    var $dialogBox = config.outline ? $('<div>').addClass("l-dialog-box animated " + config.enterAni + ' outline').css({
      'width': config.width,
      'min-height': config.minHeight,
      'border-radius': config.radius
    }) : $('<div>').addClass("l-dialog-box animated " + config.enterAni).css({
      'width': config.width,
      'min-height': config.minHeight,
      'border-radius': config.radius,
      background: config.bg,
      color: config.fontColor,
      'box-shadow': config.shadow
    });
    //var $dialogBox = $('<div>').addClass("l-dialog-box animated " + config.enterAni).css({'width': config.width, 'min-height': config.minHeight, 'border-radius': config.radius,background: config.bg, color: config.fontColor, 'box-shadow': config.shadow});
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

  Lp.createBom = function (accObj, config) {
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

    LDialog.appInput(config, this.createId);
    LDialog.isVerCenter(config, this.createId);

    $('body').blur();
  };

  LDialog.d_input = function () {
    return {
      verCenter: false,  //是否输入框居中显示
      value: "", //填写值
      placeH: "", //默认显示内容
      maxlength: "", //输入最多长度
      type: "text", //设置输入类型
      notNull: false, //设置是否为空
      leftInfo: ""
    }
  };

  LDialog.appInput = function (config, id) {
    var inputArray = config.input;
    var $inputBox = $('<div class="l-form-box">');
    var $textarea = $('<textarea>');
    var $input = $('<input />');

    if (inputArray !== undefined) {
      inputArray.forEach(function (v, i) {
        var that = LDialog.d_input();

        config.input[i] = $.extend(true, that, config.input[i]);

        switch (config.input[i].type) {
          case "textarea":
            $textarea.text(config.input[i].value);
            $inputBox = LDialog.createInputDom(config.input[i], $inputBox, $textarea);
            break;
          default:
            $inputBox = LDialog.createInputDom(config.input[i], $inputBox, $input);
            break;
        }
        $textarea = $('<textarea>');
        $input = $('<input />');
        $('.l-tip-info-fonts').append($inputBox);
      });
    }
  };

  LDialog.createInputDom = function (inputAI, $inputBox, $inputType) {
    var $inputLine = $('<div class="form-line">');
    var $leftSpan = $('<span class="left-form-info">');

    $inputType.attr({
      value: inputAI.value,
      placeholder: inputAI.placeH,
      maxlength: inputAI.maxlength,
      "data-notnull": inputAI.notNull
    });
    inputAI.type !== "textarea" ? $inputType.attr({type: inputAI.type}) : $inputType;
    $inputType.width !== null ? $inputType.css("width", inputAI.width) : $inputType;
    $inputType.height !== null ? $inputType.css("height", inputAI.height) : $inputType;
    if (inputAI.verCenter) {
      $inputType.addClass('l-center-input');
      $inputLine.append($inputType);
    } else {
      $leftSpan.html(inputAI.leftInfo);
      $inputLine.append($leftSpan).append($inputType);
    }
    $inputBox.append($inputLine);
    return $inputBox;
  };

  LDialog.isVerCenter = function (config, createId) {
    var winHeight = $(window).height();
    var diaHeight = $("#" + createId).find('.l-dialog-box').height();
    var verTop = Math.ceil((winHeight - diaHeight) / 2) - 10;
    var winWidth = $(window).width();
    var diaWidth = $("#" + createId).find('.l-dialog-box').width();
    var verLeft = Math.ceil((winWidth - diaWidth) / 2);

    if (config.verCenter) {
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

  LDialog.calCoordinate = function (createId) {
    $(window).resize(function () {
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
  Lp.createId = function () {
    var id = "pop-" + new Date().getTime() + parseInt(Math.random() * 100000); //弹窗索引

    if ($("#" + id).length > 0) {
      return this.creatPopId();
    } else {
      return id;
    }
  };

  Lp.addListener = function (accObj, config) {
    var dia_id = {id: this.createId};

    accObj.close.on('click', dia_id, this.close);

    (accObj.cancel !== "" || !typeof accObj.cancel) ? accObj.cancel.on('click', dia_id, this.cancel) : "";

    (accObj.sure !== "" || !typeof accObj.sure) ? accObj.sure.on('click', dia_id, this.sure) : "";

    $(window).on('keydown', dia_id, this.enter);

    if (config.timeOut !== -1 && config.timeOut > 0) this.timeOutClose(config, dia_id.id);

    if (config.globalClose) this.globalClose(config, dia_id.id);

    if (config.move) LDialog.moveLDialog(config, dia_id.id);

  };

  LDialog.moveLDialog = function (config, dia_id) {
    var isMove = false;
    var boxX, boxY;
    var cloneL, cloneT;

    $('#' + dia_id).find('.l-dialog-title').mousedown(function (e) {
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

      if (config.moveType === 1) {
        $('body').append('<div id="l-dialog-clone-box"  class="l-dialog-clone-box" style="width:' + cW + 'px; height:' + cH + 'px; left:' + setOffX + 'px; top: ' + setOffY + 'px;visibility: hidden"></div>');
      } else {
        $('body').append('<div id="l-dialog-clone-box"  class="l-dialog-clone-box" style="width:' + cW + 'px; height:' + cH + 'px; left:' + setOffX + 'px; top: ' + setOffY + 'px;"></div>');
      }
    }).mouseover(function () {
      $(this).css('cursor', 'default');
    });

    $(document).mousemove(function (e) {
      if (isMove) {
        var e = e || window.event;
        var oX = e.clientX - boxX;
        var oY = e.clientY - boxY;

        //是否可以拖拽出显示区域
        if (!config.moveOut) {
          oX < 0 && (oX = 0);
          oY < 0 && (oY = 0);
          oX > ($(window).width() - $(".l-dialog-clone-box").outerWidth()) && (oX = $(window).width() - $(".l-dialog-clone-box").outerWidth());
          oY > ($(window).height() - $(".l-dialog-clone-box").outerHeight()) && (oY = $(window).height() - $(".l-dialog-clone-box").outerHeight());
        }

        //是否是经典拖拽
        if (config.moveType === 1) {
          $(".l-dialog-box").css({"left": oX + "px", "top": oY + "px"});
        } else {
          $(".l-dialog-clone-box").css({"left": oX + "px", "top": oY + "px"});
        }

        cloneL = oX;
        cloneT = oY;
      }
    }).mouseup(function () {
      $(this).css('cursor', 'default');

      $(".l-dialog-clone-box").remove();
      $('#' + dia_id).find('.l-dialog-box').css({"left": cloneL + "px", "top": cloneT + "px"});

      isMove = false;
    });
  };

  Lp.globalClose = function (config, dia_id) {
    $('#' + dia_id).click(function () {
      $(this).removeClass('fadeIn').addClass('fadeOut');
      $(this).find('.l-dialog-box').removeClass(allType.enterAni).addClass('fadeOut');

      setTimeout(function () {
        $('#' + dia_id).remove();
        config.onGClose();
      }, 200)
    });

    $('#' + dia_id).find('.l-dialog-box').on('click', function (event) {
      event.stopPropagation();
    });
  };

  Lp.timeOutClose = function (config, dia_id) {
    setTimeout(function () {
      LDialog.addOrRemoveClass(dia_id);

      setTimeout(function () {
        $('#' + dia_id).remove();
        config.onTimeOut();
      }, 200)

    }, config.timeOut);
  };

//叉叉按钮关闭弹窗
  Lp.close = function (event) {
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function () {
      $('#' + dia_id).remove();
      allType.onClose();
    }, 200);
  };

//取消按钮关闭弹窗
  Lp.cancel = function (event) {
    var dia_id = event.data.id;

    LDialog.addOrRemoveClass(dia_id);

    setTimeout(function () {
      $('#' + dia_id).remove();
      allType.onCancel();
    }, 200)
  };

//确定按钮关闭弹窗
  Lp.sure = function (event) {
    if (LDialog.judge_null()) {
      var input = LDialog.getAllValue();
      var dia_id = event.data.id;

      allType.onSureBefore(input);
      LDialog.addOrRemoveClass(dia_id);

      setTimeout(function () {
        $('#' + dia_id).remove();
        allType.onSure(input);
      }, 200)
    }
  };

//回车键确认事件
  Lp.enter = function (event) {
    var dia_id = event.data.id;

    if (event.keyCode === 13) {
      if ($("#" + dia_id).length === 1) {
        LDialog.keySure(dia_id);
      }
    }
  };

  LDialog.keySure = function (dia_id) {
    var input = LDialog.getAllValue();

    allType.onSureBefore();
    LDialog.addOrRemoveClass(dia_id);
    setTimeout(function () {
      $('#' + dia_id).remove();
      allType.onSure(input);
    }, 200)
  };

  LDialog.addOrRemoveClass = function (dia_id) {
    $('#' + dia_id).removeClass('fadeIn').addClass('fadeOut');
    $('#' + dia_id).find('.l-dialog-box').removeClass(allType.enterAni).addClass('fadeOut');
  };

  LDialog.getAllValue = function () {
    var allForm = $('.form-line');
    var getAllValue = [];

    [].forEach.call(allForm, function (v, i) {
      if ($(allForm[i]).find('input').length === 1) {
        getAllValue.push($(allForm[i]).find('input').val());
      } else {
        getAllValue.push($(allForm[i]).find('textarea').val());
      }
    });

    return getAllValue;
  };

  LDialog.judge_null = function () {
    if (!allType.input) return true;

    var allInput = $('.form-line input[type=text], .form-line textarea, .form-line input[type=password], .form-line input[type=tel], .form-line input[type=dete], form-line input[type=number]');
    var flag = true;

    allInput.each(function (i, v) {
      if (allInput.eq(i).data('notnull')) {
        flag = allType.onIsNull(allInput.eq(i), i);
        return flag;
      }
    });

    return flag;
  };

  LDialog.tips = function (value, selector, con) {
    var initConfig = $.extend(true, LDialog.tipsDC(), con);
    var tipsId = LDialog.creaTipsId();
    var $app = $('<div class="l-tips animated fadeIn">').attr('id', tipsId).html(value).css({
      'max-width': initConfig.maxWidth + "px",
      'background-color': initConfig.bg,
      'color': initConfig.color
    });
    var $appArrow = $('<i class="l-arrow">');
    var offsetX = $(selector).offset().left;
    var offsetY = $(selector).offset().top;

    switch (initConfig.posi) {
      case 1:
        $appArrow.addClass("l-arrow-up");
        $appArrow.css({'border-top-color': initConfig.bg});
        $('body').append($app.append($appArrow));

        var x = $(selector).offset().left + ($(selector).outerWidth() / 2) - ($('#' + tipsId).outerWidth() / 2);
        var y = $(selector).offset().top - $('#' + tipsId).outerHeight() - 6;
        $('#' + tipsId).css({top: y, left: x});

        break;
      case 2:
        $appArrow.addClass("l-arrow-right");
        $appArrow.css({'border-right-color': initConfig.bg});
        $('body').append($app.append($appArrow));

        var x = offsetX + $(selector).outerWidth() + 6;
        var y = offsetY + (($(selector).outerHeight() - $('#' + tipsId).outerHeight()) / 2);
        $('#' + tipsId).css({top: y, left: x});

        break;
      case 3:
        $appArrow.addClass("l-arrow-down");
        $appArrow.css({'border-bottom-color': initConfig.bg});
        $('body').append($app.append($appArrow));

        var x = (offsetX + ($(selector).outerWidth() / 2) - ($('#' + tipsId).outerWidth() / 2));
        var y = offsetY + $(selector).outerHeight() + 6;
        $('#' + tipsId).css({top: y, left: x});
        break;
      case 4:
        $appArrow.addClass("l-arrow-left");
        $appArrow.css({'border-left-color': initConfig.bg});
        $('body').append($app.append($appArrow));

        var x = offsetX - $('#' + tipsId).outerWidth() - 6;
        var y = offsetY + (($(selector).outerHeight() - $('#' + tipsId).outerHeight()) / 2);
        $('#' + tipsId).css({top: y, left: x});
        break;
      default :
        $appArrow.addClass("l-arrow-right");
        $('body').append($app);

        var x = offsetX + $(selector).outerWidth() + 6;
        var y = offsetY + (($(selector).outerHeight() - $('#' + tipsId).outerHeight()) / 2);
        $('#' + tipsId).css({top: y, left: x});
        break;
    }

    initConfig.timeOut === -1 ? initConfig : LDialog.timeOutTips(initConfig, tipsId);

    return tipsId;
  };

  LDialog.tipsDC = function () {
    return {
      posi: 2,
      bg: "#000",
      color: "#fff",
      maxWidth: "150",
      timeOut: 2000,
      tipsClose: $.noop
    }
  };

  LDialog.creaTipsId = function () {
    var id = "tips-" + new Date().getTime() + parseInt(Math.random() * 100000); //弹窗索引

    if ($("#" + id).length > 0) {
      return this.creatPopId();
    } else {
      return id;
    }
  };

  LDialog.removeTips = function (index) {
    $('#' + index).addClass('fadeOut');

    setTimeout(function () {
      $('#' + index).remove();
    }, 200)
  };

  LDialog.timeOutTips = function (config, index) {
    setTimeout(function () {
      $('#' + index).addClass('fadeOut');

      setTimeout(function () {
        $('#' + index).remove();
        config.tipsClose();
      }, 200)

    }, config.timeOut);
  };

  LDialog.closeAllTips = function () {
    $('.l-tips').remove();
  };

  window.LDialog = LDialog;

})(jQuery);