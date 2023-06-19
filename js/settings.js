let fullscreen = document.getElementById("fullscreen");
let body = document.querySelector("body");
let settingBtnArr = document.querySelectorAll(".settingsMenu");
let settingsMenu = document.querySelector(".settings");
let settingsCloseBtn = document.getElementById("closeBtn");
let settingsWrapper = document.querySelector(".settingWrapper")

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
})