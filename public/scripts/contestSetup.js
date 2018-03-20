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

function setTeams() {
    
    var teamForm = document.getElementById('teamNumber');
    var nTeams = 0;

    try{
        nTeams = parseInt(teamForm.value);
    }
    
    catch(err){
        nTeams = 0;
    }
    
    if (nTeams <= 0 )
        document.getElementById("teamNumberWarning").classList.remove("hide");

    else{

        document.getElementById("teamNumberWarning").classList.add("hide");
        
        var teams = document.getElementsByClassName("teamName");
        
        // console.log(teams.length);

        while(teams.length>0){
            teams[0].remove();
        }

        for(var i = 0; i < nTeams; i++){

            var newTeam = document.createElement("input");
            newTeam.type = "text";
            newTeam.id = "team" + i;
            newTeam.classList.add("teamName");
            newTeam.classList.add("textInput");
            newTeam.name = "nomeGara";
            newTeam.placeholder = "team "+ (i+1).toString() + " name";
            newTeam.autocomplete = "false";
            newTeam.autocorrect = "false";
            newTeam.autocapitalize = "false";
            newTeam.spellcheck = "false";
            
            document.getElementById('form').appendChild(newTeam);

        }
    }

}