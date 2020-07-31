var g_id;

$(document).ready(function() {
    var uid = GetQueryString("adminid");
    document.getElementById("id-span-login").innerText += uid;
    var id = GetQueryString("uid");
    g_id = id;
    document.getElementById("id-id").value = id;
    for(var i=0; i<localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(id == data.id) {
            document.getElementById("id-userid").value = data.userid;
            document.getElementById("id-password").value = data.pwd;
            document.getElementById("id-repassword").value = data.pwd;
            document.getElementById("id-username").value = data.name;
            document.getElementById("id-level").options[parseInt(data.reserved)].selected = true;
            break;
        }
    }
});

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}

function on_del_submit() {
    localStorage.removeItem(g_id);
    window.history.back(-1);
    return false;
}