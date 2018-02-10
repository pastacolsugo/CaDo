function login(){
    var xhttp = new XMLHttpRequest();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = "/"; // url for index
    var data = "username=" + username.toString() + "&password=" + password.toString();

    xhttp.open("POST", url, true); // POST method
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data); // send data with post

    console.log(data);
}

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
