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
    "taskFullName":{},
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
    //Function to show all communications and hide alert icons (if any).
    document.getElementsByClassName("commsBtn")[0].classList.remove("active");
    var haveAlert = document.getElementsByClassName("alert");
    for (var i = 0; i < haveAlert.length; i++){
        haveAlert[i].classList.remove("alert");
    }
}

function showSubmissions(id) {
    select(id);
    getUrlPromise('/api/submissions?task=' + encodeURIComponent(id)).then(function(apijson){
        var data = JSON.parse(apijson);
        var container = document.getElementsByClassName('content')[0];
        container.innerHTML = '';
        var title = document.createElement('h2');
        title.innerHTML = currentState.taskFullName[id] + ' - sottoposizioni';
        container.appendChild(title);
        if(data.length == 0) {
            var message = document.createElement('p');
            message.innerHTML="Non hai ancora sottoposto alcuna soluzione";
            container.appendChild(message);
        }
        else {
            var dow=["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
            var statusMapping = {"compiling":"In compilazione", "evaluating":"In valutazione"}
            var list = document.createElement('table');
            list.className = "submissionsList";
            var head = document.createElement('tr');
            var h1 = document.createElement('th');
            var h2 = document.createElement('th');
            var h3 = document.createElement('th');
            h1.innerHTML='Orario';
            h2.innerHTML='Stato';
            head.appendChild(h1);
            head.appendChild(h2);
            head.appendChild(h3);
            list.appendChild(head);
            for(var i = data.length -1; i>=0; i--){
                var submission = document.createElement('tr');
                var cellDate = document.createElement('td');
                var cellScore = document.createElement('td');
                var cellDL = document.createElement('td');
                var submissionDate = new Date(data[i].date);
                cellDL.className='nopadding';
                cellScore.className='nopadding';
                var scoreWrapper=document.createElement('div');
                scoreWrapper.className = 'submissionScore';
                cellDate.innerHTML=padding(submissionDate.getHours(), 2).toString()+':'+padding(submissionDate.getMinutes(), 2).toString();
                scoreWrapper.innerHTML = data[i].status == 'evaluated' ? data[i].score : statusMapping[data[i].status];
                scoreWrapper.classList.add("submissionScore");
                scoreWrapper.classList.add(data[i].status == 'evaluated' ? scoreToClassName(data[i].score):'evaluating');
                cellScore.appendChild(scoreWrapper);
                var dlBtn = document.createElement('a');
                dlBtn.innerHTML = 'file_download';
                //dlBtn.innerHTML = '&#xE2C4;';
                dlBtn.className = 'button material-icons';
                dlBtn.href = '/api/submissionDownload?id='+encodeURIComponent(data[i].id);
                cellDL.appendChild(dlBtn);
                submission.appendChild(cellDate);
                submission.appendChild(cellScore);
                submission.appendChild(cellDL);
                list.appendChild(submission);
            }
            container.appendChild(list);

        }
    });
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
    var sidebar = document.getElementById("sidebar");
    var comms=document.createElement("div");
    comms.classList.add("commsBtn");
    comms.onclick=showComms;
    comms.innerHTML="Comunicazioni";
    sidebar.appendChild(comms);
    for(var i=0;i<contest.tasks.length; i++){
        currentState.taskFullName[contest.tasks[i].name] = contest.tasks[i].full_name;
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
        statement.href="/api/statement?task="+encodeURIComponent(contest.tasks[i].name);
        problemBox.appendChild(statement);
        var submissions=document.createElement("a");
        submissions.classList.add("link");
        submissions.classList.add("submissionLink");
        submissions.onclick=(function(){var a=contest.tasks[i].name; return function(){showSubmissions(a);};})();
        submissions.innerHTML="Sottoposizioni";
        problemBox.appendChild(submissions);
        var alert=document.createElement("div");
        alert.classList.add("alert-icon");
        alert.onclick=(function(){var a=contest.tasks[i].name; return function(){showComms(a);};})();
        problemBox.appendChild(alert);
        sidebar.appendChild(problemBox);
    }
    // This function has to be replaced with a WebSockets handler to update alerts in real time when communication is published

    getUrlPromise('/api/alerts').then(function(res){
        var alerts = JSON.parse(res);
        if (alerts.length > 0) {
            document.getElementsByClassName("commsBtn")[0].classList.add("active");
            notificationCenter.confirm("Hai " + alerts.length.toString() + " nuov"+(alerts.length==1?'a':'e')+" comunicazion"+(alerts.length==1?'e':'i')+" da leggere");
        }
        for(var i=0;i<alerts.length;i++){
            if(currentState.dismissedAlerts.indexOf(alerts[i].id)===-1){
                document.getElementById(alerts[i].task).classList.add("alert");
            }
        }
    });
    // Add function to communicate with WebSockets which handles updated after each evaluation

});
