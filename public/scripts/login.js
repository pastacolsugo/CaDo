function chkFormDta(){
    if(document.getElementById("username").value==""||document.getElementById("password").value==""){
        document.getElementById("login").disabled=true;
        document.getElementById("login").classList.remove("validBtn");
    }
    else{
        document.getElementById("login").disabled=false;
        document.getElementById("login").classList.add("validBtn");
    }
}

function getFragment(){
    var tmp=location.hash;
    return tmp.replace('#','');
}

var notificationCenter = new Notyf();

if(getFragment()!==''){
    notificationCenter.alert(decodeURIComponent(getFragment()));
}

