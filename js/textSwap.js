import {fr, en} from '../js/langSwap.js';

let langBtn = document.querySelectorAll(".langSetting");
let title = document.querySelector(".title");
let mainBtnArr = document.querySelectorAll(".start");
let settingHeader = document.getElementById("settingHeader");
let langHeader = document.querySelector(".langHeader");
let settingLabelArr = document.querySelectorAll(".settingLabel");
let settingBtnArr = document.querySelectorAll(".settingBtn")

langBtn.forEach((element) => {
	element.addEventListener("click", () => {
        if(fr == true){
            french();
        }
        else{
            english();
        }
	})
});

function french(){
    // Main menu
    title.innerText = "Cambriolage";
    mainBtnArr[0].innerText = "Commencer";
    mainBtnArr[1].innerText = "Continuer";
    mainBtnArr[2].innerText = "Options";
    // Settings
    settingHeader.innerText = "Options";
    langHeader.innerText = "Langue";
    settingLabelArr[0].innerText = "Plein écran";
    settingBtnArr[0].innerText = "Sauvegarder";
}

function english(){
        // Main menu
        title.innerText = "Break in";
        mainBtnArr[0].innerText = "Start";
        mainBtnArr[1].innerText = "Continue";
        mainBtnArr[2].innerText = "Settings";
        // Settings
        settingHeader.innerText = "Settings";
        langHeader.innerText = "Language";
        settingLabelArr[0].innerText = "Fullscreen";
        settingBtnArr[0].innerText = "Save";
}