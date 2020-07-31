var g_userid,g_pwd,g_username,g_level,g_reserved;
var b_userid=false;
var b_pwd=false;
var b_username=false;
var b_level=false;

$(document).ready(function(){
    var uid=GetQueryString("adminid");
    document.getElementById('id-span-login').innerText+=uid;
});

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

function on_userid_blur(thisid){
    var v_userid=document.getElementById(thisid).value;
    if(v_userid!=""){
        g_userid=v_userid;
        b_userid=true;
        document.getElementById('id-span-userid').innerText='';
    }else{
        document.getElementById('id-span-userid').style.color='red';
        document.getElementById('id-span-userid').innerText='请输入用户ID';
    }
    validate_all_info();
}

function on_pwd_blur(thisid){
    var v_pwd=document.getElementById(thisid).value;
    if(v_pwd==""){
        document.getElementById('id-span-pwd').style.color='red';
        document.getElementById('id-span-pwd').innerText='请输入密码';
    }
    else{
        document.getElementById('id-span-pwd').innerText='';
    }
    validate_all_info();
}

function on_repwd_blur(thisid,idpwd){
    var v_pwd=document.getElementById(idpwd).value;
    var v_repwd=document.getElementById(thisid).value;
    if(v_pwd==v_repwd){
        document.getElementById('id-span-pwd').innerText='';
        document.getElementById('id-span-pwd').innerText='';
        document.getElementById('id-span-repwd').style.color='green';
        document.getElementById('id-span-repwd').innerText='密码正确';
        g_pwd=v_repwd;
        b_pwd=true;
    }
    else{
        document.getElementById(idpwd).value="";
        document.getElementById(thisid).value="";
        document.getElementById('id-span-pwd').style.color='red';
        document.getElementById('id-span-repwd').style.color='red';
        document.getElementById('id-span-pwd').innerText='请输入密码';
        document.getElementById('id-span-pwd').innerText='两次密码不一致';
    }
    validate_all_info();
}

function on_username_blur(thisid){
    var v_username=document.getElementById(thisid).value;
    if(v_username!=""){
        g_username=v_username;
        b_username=true;
        document.getElementById('id-span-username').innerText='';
    }
    else{
        document.getElementById('id-span-username').style.color='red';
        document.getElementById('id-span-username').innerText='请输入用户名';
    }
    validate_all_info();
}

function on_level_change(thisid){
    var id=document.getElementById(thisid);
    var v_value=id.options[id.options.selectedIndex].value;
    switch (v_value) {
        case "1":
            g_level="admin";
            g_reserved=v_value;
            b_level=true;
            document.getElementById("id-span-level").innerText="";
            break;
        case "2":
            g_level="manager";
            g_reserved=v_value;
            b_level=true;
            document.getElementById("id-span-level").innerText="";
            break;
        case "3":
            g_level="guest";
            g_reserved=v_value;
            b_level=true;
            document.getElementById("id-span-level").innerText="";
            break;
        default:
            g_level="";
            g_reserved=v_value;
            b_level=false;
            document.getElementById("id-span-level").innerText="请选择用户等级";
            break;
    }
    validate_all_info();
}

function validate_all_info() {
    var b_valid=false;
    if(b_userid&&b_pwd&&b_username&&b_level){
        b_valid=true;
        document.getElementById("id-span-submit").style.color="green";
        document.getElementById("id-span-submit").innerText="信息正确";
        document.getElementById("id-submit").removeAttribute("disabled");
    }
    else{
        document.getElementById("id-span-submit").style.color="red";
        document.getElementById("id-span-submit").innerText="请检查信息";
        document.getElementById("id-submit").setAttribute("disabled","disabled");
    }
    return b_valid;
}

function get_id(vid, vreserved) {
    for(var i=0; i<localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(data.reserved == vreserved) {
            if(vid < parseInt(data.id)) {
                vid = parseInt(data.id);
            }
        }
    }
    vid += 1;
    return vid.toString();
}

function foreach_id() {
    var v_id;
    var v_admin_id = 1000;
    var v_manager_id = 2000;
    var v_guest_id = 3000;
    if(g_reserved == "1") {
        v_id = get_id(v_admin_id, g_reserved);
    } else if(g_reserved == "2") {
        v_id = get_id(v_manager_id, g_reserved);
    } else if(g_reserved == "3") {
        v_id = get_id(v_guest_id, g_reserved);
    } else {
        console.log("id is invalid.");
    }
    return v_id;
}

function on_new_submit(){
    var u_new_user={};
    u_new_user.id=foreach_id();
    u_new_user.userid=g_userid;
    u_new_user.pwd=g_pwd;
    u_new_user.pwdmd5=$.md5(g_pwd);
    u_new_user.name=g_username;
    u_new_user.level=g_level;
    u_new_user.reserved=g_reserved;
    localStorage.setItem(u_new_user.id,JSON.stringify(u_new_user));
    window.history.back(-1);
    return false;
}

