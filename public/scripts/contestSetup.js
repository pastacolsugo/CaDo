// function to fetch the form content and organizing it into a pretty object

var getFormData = function () {
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