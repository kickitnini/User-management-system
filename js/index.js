$(document).ready(function () {
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
            no+=1;
            document.getElementById("id-user-info").innerHTML+=
                "<tr>" +
                "<td>"+no+"</td>" +
                "<td>"+data.id+"</td>" +
                "<td>"+data.userid+"</td>" +
                "<td>"+data.pwd+"</td>" +
                "<td>"+data.name+"</td>" +
                "<td>"+data.level+"</td>" +
                "<td>"+""+"</td>" +
                "</tr>";
        }
    }
);