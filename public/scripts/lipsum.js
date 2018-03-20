function getUrlPromise(url) {
    return new Promise(function(resolve,reject){
    var webrequest = new XMLHttpRequest();
    webrequest.open('GET', url, true);
    webrequest.onload=function(){
        resolve(webrequest.responseText);
    };
    webrequest.send(null);});
}
getUrlPromise('/lipsum.txt').then(function(r){
    var e=document.getElementsByClassName("lipsum");
    for(var i=0;i<e.length;i++){
        e[i].innerHTML=r;
    }
});