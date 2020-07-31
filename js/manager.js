
$(document).ready(function() {
    var uid = GetQueryString("userid");
    document.getElementById("id-span-login").innerText += uid;

    init_info_manager();
});

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

function init_info_manager() {
    var no = 0;
    document.getElementById("id-user-info").innerHTML =
        "<tr>" +
        "<th>" + "序号" + "</th>" +
        "<th>" + "ID" + "</th>" +
        "<th>" + "用户ID" + "</th>" +
        "<th>" + "密码" + "</th>" +
        "<th>" + "用户名" + "</th>" +
        "<th>" + "等级" + "</th>" +
        "</tr>";
    for(var i=0; i<localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var v_reserved = data.reserved;
        if((v_reserved == "2") || (v_reserved == "3")) {
            no += 1;
            document.getElementById("id-user-info").innerHTML +=
                "<tr>" +
                "<td>" + no + "</td>" +
                "<td>" + data.id + "</td>" +
                "<td>" + data.userid + "</td>" +
                "<td>" + data.pwd + "</td>" +
                "<td>" + data.name + "</td>" +
                "<td>" + data.level + "</td>" +
                "</tr>";
        }
    }
}