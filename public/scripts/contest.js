function openTheProblem(idToOpen){
    document.getElementsByClassName("openProblem")[0].classList.remove("openProblem");
    document.getElementById(idToOpen).classList.add("openProblem");
}