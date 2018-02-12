function padding(n){
    return (n<10?'0':'')+n.toString();
}
function timeDelta(end){
    var now=new Date();
    var res=now.getTime()<end.getTime()?"-":"";
    var delta=new Date(end.getTime()-now.getTime());
    res+=delta.getUTCHours().toString()+':'+padding(delta.getMinutes())+':'+padding(delta.getSeconds());
    return res;
}
function getUrlPromise(url) {
    return new Promise(function(resolve,reject){
    var webrequest = new XMLHttpRequest();
    webrequest.open('GET', url, true);
    webrequest.onload=function(){
        resolve(webrequest.responseText);
    };
    webrequest.send(null);});
}
function scoreToClassName(score){
    var res="Score"
    res=(score<20? "low":(score==100?"full":"medium"))+res;
    return res;
}
var currentState={
    "selected": null,
    "taskStatus":{},
    "dismissedAlerts":[]
}
function select(id){
    if(currentState.selected!==null){
        document.getElementById(currentState.selected).classList.remove("openProblem");
    }
    currentState.selected=id;
    document.getElementById(currentState.selected).classList.add("openProblem");
}
function showComms(id) {
    select(id);
    console.log(id);
}
var contest = null;


//   ==========================================================

var notificationCenter = new Notyf();

notificationCenter.confirm("Benvenuto! Notifica di prova");

setTimeout(function(){notificationCenter.alert("Messaggio di errore");},1500)

getUrlPromise("/api/contest").then(function(response){
    contest=JSON.parse(response);
    document.getElementById("contest-heading").innerHTML=contest.name;
    document.getElementById("contest-title").innerHTML=contest.name;
    var endDate=new Date(contest.end_date);
    document.getElementById("timer").innerHTML=timeDelta(endDate);
    setInterval(function(){
        document.getElementById("timer").innerHTML=timeDelta(endDate);
    }, 1000);
    document.getElementsByClassName("content")[0].innerHTML = '<h2>Si parte!</h2><p>Per cominciare seleziona un problema dalla lista a sinitra</p>';
    var sidebar=document.getElementById("sidebar");
    for(var i=0;i<contest.tasks.length; i++){
        //Questa linea potrebbe essere molto inutile
        currentState.taskStatus[contest.tasks[i].name]=scoreToClassName(contest.tasks[i].score);
        //-------------
        var problemBox=document.createElement("div");
        problemBox.id=contest.tasks[i].name;
        problemBox.classList.add("problemBox");
        problemBox.classList.add(scoreToClassName(contest.tasks[i].score));
        var title=document.createElement("div");
        title.classList.add("problemTitle");
        title.innerHTML=contest.tasks[i].full_name;
        problemBox.appendChild(title);
        var score=document.createElement("div");
        score.classList.add("score");
        score.innerHTML=contest.tasks[i].score;
        problemBox.appendChild(score);
        var statement=document.createElement("a");
        statement.classList.add("link");
        statement.classList.add("statementLink");
        statement.innerHTML="Testo";
        statement.href="/api/task?task="+encodeURIComponent(contest.tasks[i].name);
        problemBox.appendChild(statement);
        var submissions=document.createElement("a");
        submissions.classList.add("link");
        submissions.classList.add("submissionLink");
        submissions.onclick=(function(){var a=contest.tasks[i].name; return function(){select(a);};})();
        submissions.innerHTML="Sottoposizioni";
        problemBox.appendChild(submissions);
        var comms=document.createElement("a");
        comms.classList.add("link");
        comms.classList.add("submissionLink");
        comms.onclick=(function(){var a=contest.tasks[i].name; return function(){showComms(a);};})();
        comms.innerHTML="Sottoposizioni";
        problemBox.appendChild(comms);
        var alert=document.createElement("div");
        alert.classList.add("alert-icon");
        alert.onclick=(function(){var a=contest.tasks[i].name; return function(){showComms(a);};})();
        problemBox.appendChild(alert);
        sidebar.appendChild(problemBox);
    }
    // This function has to be replaced with a WebSockets handler to update alerts in real time when communication is published

    getUrlPromise('/api/alerts').then(function(res){
        var alerts=JSON.parse(res);
        for(var i=0;i<alerts.length;i++){
            if(currentState.dismissedAlerts.indexOf(alerts[i].id)===-1){
                document.getElementById(alerts[i].task).classList.add("alert");
            }
        }
    });
    // Add function to communicate with WebSockets which handles updated after each evaluation

});