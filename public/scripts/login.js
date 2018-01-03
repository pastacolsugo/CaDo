function login(){
    var xhttp = new XMLHttpRequest();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = "/"; // url for index
    var data = "username=" + username.toString() + "&password=" + password.toString();

    xhttp.open("POST", url, true); // POST method
    xhttp.send(data); // send data with post

    console.log(data);
}
