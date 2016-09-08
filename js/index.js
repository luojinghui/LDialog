/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/7/27
 * Time: 下午5:51
 */
$(function() {
    $('.aaaa').on('click', function() {
        $.ajax({
            type: "GET",
            url: "se.html",
            data: "html",
            success: function(msg){
                console.log(msg);
                var dia = new LDialog(msg, {});
                dia.init();
            }
        });
    });

    var isMove = false;
    var boxX, boxY;
    var cloneL, cloneT;

    $('.l-dialog-title').mousedown(function(e) {
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

        $('body').append('<div id="l-dialog-clone-box"  class="l-dialog-clone-box" style="width:' + cW + 'px; height:' + cH + 'px; left:' + setOffX + 'px; top: '+ setOffY + 'px;"></div>');

    }).mouseover(function() {
        $(this).css('cursor', 'default');
    });

    $(document).mousemove(function(e) {
        if(isMove) {
//                var e = e || window.event;
            var oX = e.clientX - boxX;
            var oY = e.clientY - boxY;

            oX < 0 && (oX = 0);
            oY < 0 && (oY = 0);

            oX > ($(window).width() - $(".l-dialog-box").outerWidth()) && (oX = $(window).width() - $(".l-dialog-box").outerWidth());
            oY > ($(window).height() - $(".l-dialog-box").outerHeight()) && (oY = $(window).height() - $(".l-dialog-box").outerHeight());

            $(".l-dialog-clone-box").css({"left":oX + "px", "top": oY + "px"});

            cloneL = oX;
            cloneT = oY;

        }
    }).mouseup(function() {
        $(this).css('cursor', 'default');

        $(".l-dialog-clone-box").remove();
        $('.l-dialog-box').animate({"left":cloneL + "px", "top": cloneT + "px"}, 400);

        isMove = false;
    });


    $('.l-dialog-c').click(function() {
        $('.l-dialog').remove();
    });

    $('.right-grad-edit').on('click', function() {
        if($('.select-alter-p-i').hasClass('on')) {
            $('.select-alter-p-i').removeClass('on');

        } else {
            $('.select-alter-p-i').addClass('on');
            $(document).not($('.select-alter-p-i')).one('click', function() {
                $('.select-alter-p-i').removeClass('on');
            });
        }
        event.stopPropagation();
    });


//        三个参数： appHtml, config, type
//        appHtml: 必填，字符串数据格式，用来显示弹窗的内容
//        config: 选填，对象数据格式，用来配置基本信息
//        type: 选填，对象或字符串，用来配置title和按钮组

    var tipid;
    $('.c-1').hover(function() {
        tipid = LDialog.tips("悬浮在按钮上", ".c-1" ,{posi: 3,bg: "red"})
    }, function(){
        LDialog.closeAllTips();
    }).on('click', function() {
        (new LDialog('点击了按钮,出现了默认的弹出框~')).init();
    });

    $('.c-2').on('click', function() {
        con = {
            onSure: function(v) {
                var dia = new LDialog("content", {enterAni: "zoomIn"}, "success");
                dia.init();
            },
            enterAni: "zoomIn",
            moveType: 2
        };

        var dialog2 = new LDialog("test", con, "error");
        dialog2.init();
    });

    $('.c-3').on('click', function() {
        con = {
            iconColor: "rgb(157, 26, 165)",
            iconSize: "30px",
            enterAni: "slideInDown",
            radius: "0px",
            header: true,
            footer: false,
            verCenter: true
        };

        var dialog3 = new LDialog("test-content", con, "success");
        dialog3.init();
    });

    $('.c-4').on('click', function() {
        var value = '<img src="../img/sea.jpg" style="width: 100%"/>';
        var con = {
            footer: false,
            icon: false,
            header: true,
            globalClose: true,
            radius: "0px",
            enterAni: "bounceInDown"
        };
        var dialog4 = new LDialog(value, con, {btn: {sure: "btn-warning"}, iconData:"💛"});
        dialog4.init();
    });

    $('.c-5').on('click', function() {
        var value = "蒙版将于三秒后关闭！";
        var con = {footer: false, timeOut: 3000, subtitle: "三秒后关闭蒙版", title: "失败了"};
        var dialog5 = new LDialog(value, con, "error");
        dialog5.init();
    });

    $('.c-6').on('click', function() {
        var value = "重写蒙版大小透明度";
        var con = {footer: false, width: "400px", minHeight: "150px", opacity: 0.2, verCenter: true};
        var dialog6 = new LDialog(value, con);
        dialog6.init();
    });

    $('.c-7').on('click', function() {
        con = {
            iconColor: "green",
            iconSize: "30px",
            width: "250",
            iconData: "",
            radius: "0px",
            opacity: 0.1,
            footer: false,
            header: false,
            globalClose: true,
            enterAni: "slideInDown",
            outline: true,
            verCenter: true
//                timeOut: 8000
        };

        var dialog3 = new LDialog("数据添加成功", con, "success");
        dialog3.init();
    });

    $('.c-8').on('click', function() {
        $.ajax({
            type: "GET",
            url: "./se.html",
            data: "html",
            success: function(msg){
                con = {
                    globalClose: true,
                    width: "400px",
                    radius: 0,
//                        iconData: "",
                    iconSize: "40px",
                    iconColor: "green",
                    footer: true,
                    onSure: function(v) {
                        LDialog.closeAllTips();
                        LDialog.tip("你输入了：" + v[0] + " " + v[1] + " " + v[2] + " " + v[3] + " " + v[4], {timeOut: 4000});
                    },
                    input: [
                        {
                            leftInfo: "姓名",
                            placeH: "name",
                            maxlength: "",
                            notNull: true
                        },
                        {
                            leftInfo: "密码",
                            type: "password",
                            placeH: "password",
                            notNull: true
                        },
                        {
                            leftInfo: "备注",
                            type: "textarea",
                            placeH: "input",
                            notNull: true
                        },
                        {
                            verCenter: true,
                            placeH: "input",
                            notNull: true
                        },
                        {
                            verCenter: true,
                            type: "textarea",
                            placeH: "input",
                            notNull: true
                        }
                    ],
                    sureTitle: "控制台打印结果",
                    onIsNull: function(posi, i) {
                        var id;

                        if(i === 0) {
                            if(posi.val() === "") {
                                posi.focus();
                                id = LDialog.tips("请输入正确的值,",posi, {posi: 1, bg: "green", timeOut: 2000});
                                return false;
                            }
                        }
                        if(i === 1) {
                            if(posi.val().length < 1) {
                                posi.focus();
                                id = LDialog.tips("长度不能小于等于1,",posi, {posi: 2, bg: "gray", color: "#fff", timeOut: 2000});
                                return false;
                            }
                        }
                        if(i === 2) {
                            if(posi.val() === "") {
                                posi.focus();
                                id = LDialog.tips("请输入正确的值,",posi, {posi: 3, bg: "#fba44d", color: "#fff", timeOut: 2000});
                                return false;
                            }
                        }
                        if(i === 3) {
                            if(posi.val() === "") {
                                posi.focus();
                                id = LDialog.tips("不能为空，请重新输入",posi, {posi: 4, bg: "#258ed7", color: "#fff", timeOut: 2000});
                                return false;
                            }
                        }
                        return true;
                    }
                };

                var value = "简单点说话的方式简单点,递进的情绪请省略,你又不是个演员,别设计那些情节,没意见我只想看看你怎么圆,该配合你演出的我演视而不见,在逼一个最爱你的人即兴表演,什么时候我们开始收起了底线,顺应时代的改变看那些拙劣的表演";
                var dia = new LDialog("<b>请仔细填写申请表：</b>", con, "input");
                dia.init();
            }
        });
    });

    $('.btn-primary').click(function() {
        LDialog.tips("不能为空，请重新输入",".btn-primary", {posi: 2, bg: "#258ed7", color: "#fff"});
    });

    $('.c-9').on('click', function() {
        var con = {
            onSure: function(v) {
                var dia2 = new LDialog("你输入了：" + v[0], {width: "360"} , "success");
                dia2.init();
            },
            input: [{
                verCenter: true,
                value: "",
                placeH: "input",
                notNull: true
            }],
            width: "360"
        };

        var dia = new LDialog("", con , "input");
        dia.init();
    });

    $('.c-10').on('click', function() {
        var dia = new LDialog("经典拖拽", {footer: false, verCenter: true});
        dia.init();
    });

    $('.c-11').on('click', function() {
        var dia = new LDialog("黑框拖拽并且可以拖拽出可视区域", {footer: false, verCenter: true, moveType: 2,moveOut: true});
        dia.init();
    });

    $('.c-12').on('click', function() {
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
                var dia = new LDialog("你输入了：" + v[0], {header: false, footer: false, outline: true, radius: 0, width: "300px", verCenter: true, globalClose: true});
                dia.init();
            }
        });
    });

    $('.c-13').on('click', function() {
        var value = "确定要删除吗？";

        LDialog.confirm(value, {iconData: ""}, function() {
            LDialog.msg("删除成功！", {iconData: "", iconColor: "green", iconSize: "30px"});
        });
    });

    $('.c-14').on('click', function() {
        LDialog.tip("tip默认没有打开全局关闭设置！", {iconData: "", iconColor: "rgb(75,239,112)", timeOut: 2000}, function() {
            console.log(123123);
            LDialog.tip("打开了全局关闭设置，点击即可关闭！", {iconData: "", iconColor: "rgb(217, 83, 79)", timeOut: 2000, globalClose: true});
        });

    });

    $('.c-15').on('click', function() {
        LDialog.alert("123123123123123");
    });

    var tid;
    $('.l-btn-bim').hover(function() {
        tid = LDialog.tips("你点击了bim按钮", ".l-btn-bim", {posi: 3, bg: "#ff0808", color: "#fff",  maxWidth: "300px", timeOut: -1});
    }, function() {
        LDialog.removeTips(tid);
    });

    $('.l-btn-warning').on('click', function() {
        LDialog.tips("警告按钮被点击了。。。", ".l-btn-warning", {posi: 1, timeOut: -1});
        LDialog.tips("警告按钮被点击了。。。", ".l-btn-warning", {posi: 2, timeOut: -1});
        LDialog.tips("警告按钮被点击了。。。", ".l-btn-warning", {posi: 3, timeOut: -1});
        LDialog.tips("警告按钮被点击了。。。", ".l-btn-warning", {posi: 4, timeOut: -1});
    });

    $('.l-btn-default').on('click', function() {
        LDialog.closeAllTips();
    })
});