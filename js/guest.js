
var g_id;
var g_userid;
var g_pwd;
var b_pwd = true;
var g_username;
var b_username = true;
var g_level, g_reserved;

//页面初始化
$(document).ready(function() {
    var uid = GetQueryString("userid");
    document.getElementById("id-span-login").innerText += uid;
    for(var i=0; i<localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(uid == data.userid) {
            g_id = data.id;
            document.getElementById("id-id").value = data.id;
            g_userid = data.userid;
            document.getElementById("id-userid").value = data.userid;
            g_pwd = data.pwd;
            document.getElementById("id-password").value = data.pwd;
            document.getElementById("id-repassword").value = data.pwd;
            g_username = data.name;
            document.getElementById("id-username").value = data.name;
            g_level = data.level;
            g_reserved = data.reserved;
            document.getElementById("id-level").value = data.level;
            break;
        }
    }
});

//获取页面url链接中各个字段的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

//检查用户密码
function on_pwd_blur(thisid) {
    var v_pwd = document.getElementById(thisid).value;
    if(v_pwd == "") {
        document.getElementById("id-span-pwd").style.color = "red";
        document.getElementById("id-span-pwd").innerText = "请输入密码";
    }
    else{
        document.getElementById("id-span-pwd").innerText = "";
    }
    validate_all_info();
}

function on_repwd_blur(thisid, idpwd) {
    var v_pwd = document.getElementById(idpwd).value;
    var v_repwd = document.getElementById(thisid).value;
    if(v_pwd == v_repwd) {
        document.getElementById("id-span-repwd").style.color = "green";
        document.getElementById("id-span-repwd").innerText = "两次密码一致";
        g_pwd = v_repwd;
        b_pwd = true;
    } else {
        document.getElementById(idpwd).value = "";
        document.getElementById(thisid).value = "";
        document.getElementById("id-span-pwd").style.color = "red";
        document.getElementById("id-span-repwd").style.color = "red";
        document.getElementById("id-span-pwd").innerText = "请输入密码";
        document.getElementById("id-span-repwd").innerText = "两次密码不一致";
        b_pwd = false;
    }
    validate_all_info();
}

//检查用户名
function on_username_blur(thisid) {
    var v_username = document.getElementById(thisid).value;
    if(v_username != "") {
        g_username = v_username ;
        b_username = true;
        document.getElementById("id-span-username").innerText = "";
    } else {
        document.getElementById("id-span-username").style.color="red";
        document.getElementById("id-span-username").innerText = "请输入用户名";
        b_username = false;
    }
    validate_all_info();
}

//验证所有信息
function validate_all_info() {
    var b_valid = false;
    if(b_pwd && b_username) {
        b_valid = true;
        document.getElementById("id-span-submit").style.color = "green";
        document.getElementById("id-span-submit").innerText = "信息正确";
        document.getElementById("id-submit").removeAttribute("disabled");
    } else {
        document.getElementById("id-span-submit").style.color = "red";
        document.getElementById("id-span-submit").innerText = "信息有误";
        document.getElementById("id-submit").setAttribute("disabled", "disabled");
    }
    return b_valid;
}

//提交信息
function on_guest_submit() {
    var u_guest_edit = {};
    u_guest_edit.id = g_id;
    u_guest_edit.userid = g_userid;
    u_guest_edit.pwd = g_pwd;
    u_guest_edit.pwdmd5 = $.md5(g_pwd);
    u_guest_edit.name = g_username;
    u_guest_edit.level = g_level;
    u_guest_edit.reserved = g_reserved;
    localStorage.setItem(u_guest_edit.id, JSON.stringify(u_guest_edit));
    document.getElementById("id-span-submit").innerText = "信息已保存";
    document.location.href = "guest.html?userid=" + g_userid;
}