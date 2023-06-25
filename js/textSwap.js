import {fr, en} from '../js/langSwap.js';

let langBtn = document.querySelectorAll(".langSetting");
let title = document.querySelector(".title");
let mainBtnArr = document.querySelectorAll(".start");
let settingHeader = document.getElementById("settingHeader");
let langHeader = document.querySelector(".langHeader");
let settingLabelArr = document.querySelectorAll(".settingLabel");
let settingBtnArr = document.querySelectorAll(".settingsMenuBtn");
let menuModalBody = document.querySelector(".menuModalBody");
let menuModalLabel = document.getElementById("menuModalLabel");
let menuModalBtnArr = document.querySelectorAll(".menuModalBtn");
let inventoryTitle = document.querySelector(".inventoryTitle");
let inventoryAction = document.querySelectorAll(".itemAction");
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
    settingBtnArr[1].innerText = "Menu Principal";
    menuModalBody.innerText = "Toute progression non-sauvegardée sera perdue.";
    menuModalLabel.innerText = "Retourner au menu principal";
    menuModalBtnArr[0].innerText = "Confirmer";
    menuModalBtnArr[1].innerText = "Annuler";
    inventoryTitle.innerText = "Inventaire";
    inventoryAction[0].innerText = "Présenter";
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
    settingBtnArr[1].innerText = "Main Menu";
    menuModalBody.innerText = "Any progression that was not saved will be lost.";
    menuModalLabel.innerText = "Return to main menu";
    menuModalBtnArr[0].innerText = "Confirm";
    menuModalBtnArr[1].innerText = "Cancel";
    inventoryTitle.innerText = "Inventory";
    inventoryAction[0].innerText = "Present";
}