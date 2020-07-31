var g_userid,g_pwd,g_reserved;
var v_validata_userid=false;
var v_validata_pwd=false;

//遍历localStorage键值
function foreach_userid(thisid){
    var v_userid=document.getElementById(thisid).value;
    for(var i=0;i<localStorage.length;i++){
        var data=JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(v_userid==data.userid){
            g_userid=v_userid;
            v_validata_userid=true;
            break;
        }
    }
    return v_validata_userid;
}

//验证用户id
function on_userid_blur(thisid){
    var v_userid=document.getElementById(thisid).value;
    if(v_userid==""){
        document.getElementById('id-span-userid').style.color="red";
        document.getElementById('id-span-userid').innerText="请输入用户ID";
    }
    else{
        if(foreach_userid(thisid)){
            document.getElementById('id-span-userid').style.color="green";
            document.getElementById('id-span-userid').innerText="用户ID正确";
        }
        else{
            document.getElementById('id-span-userid').style.color="red";
            document.getElementById('id-span-userid').innerText="用户ID错误";
        }
    }
}

//遍历localStorage键值
function foreach_pwd(pwd,userid){
    var v_userid=document.getElementById(userid).value;
    var md5_password=$.md5(pwd);
    for(var i=0;i<localStorage.length;i++){
        var data=JSON.parse(localStorage.getItem(localStorage.key(i)));
        if((v_userid==data.userid)&&(md5_password==data.pwdmd5)){
            g_userid=data.userid;
            g_pwd=data.pwdmd5;
            g_reserved=data.reserved;
            v_validata_pwd=true;
            break;
        }
    }
    return v_validata_pwd;
}

//验证用户密码
function on_pwd_blur(thisid){
    var v_password=document.getElementById(thisid).value;
    console.log(v_password);
    if(v_password==""){
        document.getElementById('id-span-pwd').style.color="red";
        document.getElementById('id-span-pwd').innerText="请输入密码";
    }
    else{
        if(foreach_pwd(v_password,"userid")){
            document.getElementById('id-span-pwd').style.color="green";
            document.getElementById('id-span-pwd').innerText="密码正确";
            document.getElementById("id-submit").removeAttribute("disabled");
        }
        else{
            document.getElementById('id-span-pwd').style.color="red";
            document.getElementById('id-span-pwd').innerText="密码错误";
            document.getElementById("id-submit").setAttribute("disabled","disabled");
        }
    }

}

//页面跳转
function on_login_submit(){
    if(g_reserved=="1"){
        document.location.href="admin.html?userid="+g_userid+"&password="+g_pwd;
    }
    else if(g_reserved=="2"){
        document.location.href="manager.html?userid="+g_userid+"&password="+g_pwd;
    }else if(g_reserved=="3"){
        document.location.href="guest.html?userid="+g_userid+"&password="+g_pwd;
    }
    else{
        document.location.href="about.html";
    }
    return false;   //false阻止表单提交
}


