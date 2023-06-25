let fullscreen = document.getElementById("fullscreen");
let body = document.querySelector("body");
let settingBtnArr = document.querySelectorAll(".settingsMenu");
let settingsCloseBtn = document.getElementById("closeBtnST");
let settingsCloseArea = document.querySelector(".settingsCloseArea")
let settingsWrapper = document.querySelector(".settingWrapper");
const backToMain = document.getElementById("backToMain");
let sectionsArr = document.querySelectorAll(".section");
const startMenu = document.getElementById("startMenu");
let hideMenuBtnArr = document.querySelectorAll(".hideMenu");
let hideMenuCheckArr = document.querySelectorAll(".hideMenuCheck");
let hideableElemArr = document.querySelectorAll(".hideableElem");

import {fr, en} from '../js/langSwap.js';

fullscreen.addEventListener("click", () => {
    if(fullscreen.checked == true){
        body.requestFullscreen();
    }
    else{
        document.exitFullscreen();
    }
})

document.addEventListener("fullscreenchange", (e) => {
    if(document.fullscreenElement) {
        console.log("fullscreen");
        fullscreen.checked = true;
    }
    else{
        console.log("windowed");
        fullscreen.checked = false;
    }
})

settingBtnArr.forEach((element) => {
    element.addEventListener("click", () => {
        gsap.timeline()
            .set(settingsWrapper, {x: "100%"})
            .to(settingsWrapper, {opacity: 1, duration: 0.5})
    })
});

settingsCloseBtn.addEventListener("click", () => {
    gsap.timeline()    
    .to(settingsWrapper, {opacity: 0, duration: 0.5})
    .set(settingsWrapper, {x: "-100%"})
});

settingsCloseArea.addEventListener("click", () => {
    gsap.timeline()    
    .to(settingsWrapper, {opacity: 0, duration: 0.5})
    .set(settingsWrapper, {x: "-100%"})
});

backToMain.addEventListener("click", () => {
    gsap.timeline()    
    .to(settingsWrapper, {opacity: 0, duration: 0.5})
    .set(settingsWrapper, {x: "-100%"})
    if(startMenu.style.display == "flex"){
        if(fr == true){
            alert("Vous êtes déjà au menu principal :)")
        }
        else{
            alert("Already on main menu :)")
        }

    }
    else{
        sectionsArr.forEach((element) => {
        element.style.display = "none";
        })
        startMenu.style.display = "flex";
    }

});

hideMenuBtnArr.forEach((element) => {
    element.addEventListener("click", () => {
        hideableElemArr.forEach((element) => {
            gsap.to(element, {opacity: 0, duration: 0.5});
        });
        hideMenuCheckArr.forEach((element) => {
            element.style.display = "block";
        });
    })
});

hideMenuCheckArr.forEach((element) => {
    element.addEventListener("click", () => {
        hideableElemArr.forEach((element) => {
            gsap.to(element, {opacity: 1, duration: 0.5});
        });
        hideMenuCheckArr.forEach((element) => {
            element.style.display = "none";
        })  
    })
})