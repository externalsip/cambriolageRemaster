let fullscreen = document.getElementById("fullscreen");
let body = document.querySelector("body")


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

