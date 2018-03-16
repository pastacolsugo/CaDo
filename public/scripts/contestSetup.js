// function to fetch the form content and organizing it into a pretty object

var postFormData = function () {
    // empty object initialization
    var contest = {};
    
    // getting each value by index
    // I don't like this approach, I would rather use a key-string, like the input "name" - ugo

    contest['name'] = document.getElementById('contestName').value;
    contest['teamNumber'] = document.getElementById('teamNumber').value;
    contest['tutor'] = document.getElementById('tutor').value;

    // build the stringfyied contest JSON file ready to be POST to backend side
    var stringContest = JSON.stringify(contest);

    // logging stringified data to the console, just for test purposes
    // console.log(contest);
    console.log(stringContest);
    // here instead of log, a help is needed to POST the stringContest var into a JSON file in the backend side
}

var setTeams = function() {
    
    var teamForm = document.getElementById('teamNumber');
    var nTeams = 0;
    try{
        nTeams = parseInt(teamForm.value);
    }
    catch(err){
        nTeams = 0;
    }
    
    if (nTeams == 0 ){
        var advise = document.createElement('h6');
        advise.innerHTML = "Inserisci un numero di squadre diverso da 0";
        teamForm.appendChild(advise);
    }
    else{
        for(var i=0; i<nTeams; i++){
            var newTeam = document.createElement("input");
            newTeam.type = "text";
            newTeam.id = "team " + i;
            newTeam.class = "textInput";
            newTeam.name = "nomeGara";
            newTeam.placeholder = newTeam.id + "name";
            newTeam.autocomplete = "false";
            newTeam.autocorrect = "false";
            newTeam.autocapitaliza = "false";
            newTeam.spellcheck = "false";
            
            document.getElementById('form').appendChild(newTeam);

        }
    }

}