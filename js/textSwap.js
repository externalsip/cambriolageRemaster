import {fr, en} from '../js/langSwap.js';

let langBtn = document.querySelectorAll(".langSetting");
let title = document.querySelector(".title");
let mainBtnArr = document.querySelectorAll(".start");

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
    

}