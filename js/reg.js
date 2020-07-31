var g_userid;
var b_userid = false;
var g_pwd;
var b_pwd = false;
var g_username;
var b_username = false;

function on_userid_blur(thisid) {
    var v_userid = document.getElementById(thisid).value;
    if(v_userid != "") {
        g_userid = v_userid;
        b_userid = true;
        document.getElementById("id-span-userid").innerText = "";
    } else {
        document.getElementById("id-span-userid").style.color = "red";
        document.getElementById("id-span-userid").innerText = "请输入用户ID";
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
        document.getElementById("id-span-repwd").innerText = "密码正确";
        g_pwd = v_repwd;
        b_pwd = true;
    } else {
        document.getElementById(idpwd).value = "";
        document.getElementById(thisid).value = "";
        document.getElementById("id-span-pwd").style.color="red";
        document.getElementById("id-span-repwd").style.color="red";
        document.getElementById("id-span-pwd").innerText = "请输入密码";
        document.getElementById("id-span-repwd").innerText = "两次密码不一致";
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
        document.getElementById("id-span-username").style.color="red";
        document.getElementById("id-span-username").innerText = "请输入用户名";
    }
    validate_all_info();
}

function validate_all_info() {
    var b_valid = false;
    if(b_userid && b_pwd && b_username) {
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

function foreach_id() {
    var v_id = 3000;
    for(var i=0; i<localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(data.reserved == "3") {
            if(v_id < parseInt(data.id)) {
                v_id = parseInt(data.id);
            }
        }
    }
    v_id += 1;
    return v_id.toString();
}

function on_reg_submit() {
    var u_guest = {};
    u_guest.id = foreach_id();
    u_guest.userid = g_userid;
    u_guest.pwd = g_pwd;
    u_guest.pwdmd5 = $.md5(g_pwd);
    u_guest.name = g_username;
    u_guest.level = 'guest';
    u_guest.reserved = "3";
    localStorage.setItem(u_guest.id, JSON.stringify(u_guest));
}