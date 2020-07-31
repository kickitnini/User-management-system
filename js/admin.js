var g_adminid;

//获取页面url链接中各个字段的值
function GetQueryString(name){
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
    var r=window.location.search.substr(1).match(reg);
    if(r!=null) return (r[2]);
    return null;
}

//初始化用户信息
function init_info_admin(){
    var no=0;
    document.getElementById("id-user-info").innerHTML=
        "<tr>" +
        "<th>序号</th>" +
        "<th>ID</th>" +
        "<th>用户ID</th>" +
        "<th>密码</th>" +
        "<th>用户名</th>" +
        "<th>等级</th>" +
        "<th>操作</th>" +
        "</tr>";

    for(var i=0;i<localStorage.length;i++){
        var data=JSON.parse(localStorage.getItem(localStorage.key(i)));
        var uid=data.id;
        no+=1;
        document.getElementById("id-user-info").innerHTML+=
            "<tr>" +
            "<td>"+no+"</td>" +
            "<td>"+data.id+"</td>" +
            "<td>"+data.userid+"</td>" +
            "<td>"+data.pwd+"</td>" +
            "<td>"+data.name+"</td>" +
            "<td>"+data.level+"</td>" +
            "<td>"+
                "<a href='new.html?adminid="+g_adminid+"'>添加</a>"+"&nbsp;"+
                "<a href='edit.html?adminid="+g_adminid+"&uid="+uid+"'>编辑</a>"+"&nbsp;"+
                "<a href='del.html?adminid="+g_adminid+"&uid="+uid+"'>删除</a>"+"&nbsp;"
            +"</td>" +
            "</tr>";
    }
}

$(document).ready(function(){
    g_adminid=GetQueryString("userid");
    document.getElementById("id-span-login").innerText+=g_adminid;
    init_info_admin();
});