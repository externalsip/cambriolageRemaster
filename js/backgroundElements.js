let hideableElemArr = document.querySelectorAll(".hideableElem");

let lettersInteraction1 = false;
let ramenInteraction1 = false;
let badDecision = false;
let moneyAcquired = false;

import {fr, en} from './langSwap.js';
import { initialize, json, pageUpdate } from './game.js';

export function initializeAppartement() {
    let appartmentElementsArr = document.querySelectorAll(".backgroundElem");
    for(let i = 0; i <= appartmentElementsArr.length - 1; i++){
        appartmentElementsArr[i].addEventListener("click", () => {
            for(let i = 0; i < hideableElemArr.length; i++){
                console.log("hi");
                hideableElemArr[i].style.display = "block";
            }
             switch(true){
            case appartmentElementsArr[i].classList.contains("letters"):
                letterInteractions();
                break;
            }
        })
       
    }
}

export function itemCheck(check){
    switch(check){
        case "lettersInteraction1":
            lettersInteraction1 = true;
            break;
        case "ramenInteraction1":
            ramenInteraction1 = true;
            break;
        case "badDecision":
            badDecision = true;
            break;
        case "moneyAcquired":
            moneyAcquired = true;
            break;
    }
}

function letterInteractions(){
    switch(true){
        case moneyAcquired:
            if(fr == true){
                pageUpdate(json, 6)
            }
        case badDecision:
            if(fr == true){
                pageUpdate(json, 0)
            }
            break;
        case lettersInteraction1:
            if(fr == true){
                console.log("passes");
                pageUpdate(json, 4)
            }
            break;
        default:
            if(fr == true){
                pageUpdate(json, 3)
            }
            break;
    }
}