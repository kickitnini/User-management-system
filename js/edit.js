var g_id;
var g_userid;
var b_userid = true;
var g_pwd;
var b_pwd = true;
var g_username;
var b_username = true;
var g_level, g_reserved;
var b_level = true;

$(document).ready(function() {
    var uid = GetQueryString("adminid");
    document.getElementById("id-span-login").innerText += uid;
    var id = GetQueryString("uid");
    g_id = id;
    document.getElementById("id-id").value = id;
    for(var i=0; i<localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(id == data.id) {
            g_userid = data.userid;
            document.getElementById("id-userid").value = g_userid;
            g_pwd = data.pwd;
            document.getElementById("id-password").value = g_pwd;
            document.getElementById("id-repassword").value = g_pwd;
            g_username = data.name;
            document.getElementById("id-username").value = g_username;
            g_level = data.level;
            g_reserved = data.reserved;
            document.getElementById("id-level").options[parseInt(g_reserved)].selected = true;
            break;
        }
    }
});

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

function on_userid_blur(thisid) {
    var v_userid = document.getElementById(thisid).value;
    if(v_userid != "") {
        document.getElementById("id-span-userid").innerText = "";
        g_userid = v_userid;
        b_userid = true;
    } else {
		document.getElementById("id-span-userid").style.color="red";
        document.getElementById("id-span-userid").innerText = "请输入用户ID";
        b_userid = false;
    }
    validate_all_info();
}

function on_pwd_blur(thisid) {
    var v_pwd = document.getElementById(thisid).value;
    if(v_pwd == "") {
		document.getElementById("id-span-pwd").style.color="red";
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
		document.getElementById("id-span-repwd").style.color="green";
        document.getElementById("id-span-repwd").innerText = "请再次输入密码";
        g_pwd = v_repwd;
        b_pwd = true;
        document.getElementById("id-span-pwd").innerText = "";
        document.getElementById("id-span-repwd").innerText = "";
    } else {
        document.getElementById(idpwd).value = "";
        document.getElementById(thisid).value = "";
		document.getElementById("id-span-pwd").style.color="red";
		document.getElementById("id-span-repwd").style.color="red";
        document.getElementById("id-span-pwd").innerText = "请输入密码";
        document.getElementById("id-span-repwd").innerText = "两次密码不一致";
        b_pwd = false;
    }
    validate_all_info();
}

function on_username_blur(thisid) {
    var v_username = document.getElementById(thisid).value;
    if(v_username != "") {
        g_username = v_username ;
        b_username = true;
        document.getElementById("id-span-username").innerText = "";
    } else {
		document.getElementById("id-span-username").style.color = "red";
        document.getElementById("id-span-username").innerText = "请输入用户名";
        b_username = false;
    }
    validate_all_info();
}

function on_level_change(thisid) {
    var id = document.getElementById(thisid);
    var v_value = id.options[id.options.selectedIndex].value;
    console.log("level is changed to " + v_value);
    switch(v_value) {
        case "1":
            document.getElementById("id-span-level").innerText = "";
            g_level = "admin";
            g_reserved = v_value;
            b_level = true;
            break;
        case "2":
            document.getElementById("id-span-level").innerText = "";
            g_level = "manager";
            g_reserved = v_value;
            b_level = true;
            break;
        case "3":
            document.getElementById("id-span-level").innerText = "";
            g_level = "guest";
            g_reserved = v_value;
            b_level = true;
            break;
        default :
            g_level = "";
            g_reserved = v_value;
            b_level = false;
			document.getElementById("id-span-level").style.color="red";
            document.getElementById("id-span-level").innerText = "请选择用户等级";
            break;
    }
    validate_all_info();
}

function validate_all_info() {
    var b_valid = false;
    if(b_userid && b_pwd && b_username && b_level) {
        b_valid = true;
		document.getElementById("id-span-submit").style.color="green";
        document.getElementById("id-span-submit").innerText = "信息正确";
        document.getElementById("id-submit").removeAttribute("disabled");
    } else {
		document.getElementById("id-span-submit").style.color="red";
        document.getElementById("id-span-submit").innerText = "请检查信息";
        document.getElementById("id-submit").setAttribute("disabled", "disabled");
    }
    return b_valid;
}

function on_edit_submit() {
    var u_edit_user = {};
    u_edit_user.id = g_id;
    u_edit_user.userid = g_userid;
    u_edit_user.pwd = g_pwd;
    u_edit_user.pwdmd5 = $.md5(g_pwd);
    u_edit_user.name = g_username;
    u_edit_user.level = g_level;
    u_edit_user.reserved = g_reserved;
    localStorage.setItem(u_edit_user.id, JSON.stringify(u_edit_user));
    window.history.back(-1);
    return false;

}