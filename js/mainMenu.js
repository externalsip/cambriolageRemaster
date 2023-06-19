/*/////////////////////////////////
START MENU
/////////////////////////////////*/ 

import {fr, en} from '../js/langSwap.js';

let buttonsArr = document.querySelectorAll(".start");
const tipText = document.querySelector(".tipText");
const warning = document.querySelector(".warning");

buttonsArr.forEach((button, i) => {
    button.addEventListener("mouseover", () => {
        if(fr == true){
            switch(i){
                case 0:
                    tipText.innerHTML = "Commencer l'aventure à partir de l'introduction.";
                    warning.innerHTML = "";
                    break;
                case 1:
                    tipText.innerHTML = "Continuer l'aventure à partir d'où vous l'avez laissé la dernière fois";
                    warning.innerHTML = "Attention, les sauvegardes sont dans le localStorage, si vous rénitialisez votre navigateur, vous allez perdre votre progression";
                    break;
                case 2:
                    tipText.innerHTML = "Modifier quelques options tel que le plein écran et la langue."
                    warning.innerHTML = "";
                    break;
            }
        }
        else{
            switch(i){
                case 0:
                    tipText.innerHTML = "Start the adventure from the introduction.";
                    warning.innerHTML = "";
                    break;
                case 1:
                    tipText.innerHTML = "Continue the adventure from where you left off last time.";
                    warning.innerHTML = "Warning, saves are stored in the localStorage, if you reset your browser, you will lose your progression.";
                    break;
                case 2:
                    tipText.innerHTML = "Modify some settings such as fullscreen and language."
                    warning.innerHTML = "";
                    break;
            }
        }



    })
})

