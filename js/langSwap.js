let langSetting = document.querySelectorAll(".langSetting");
let fr = true;
let en = false;
langSetting.forEach((element, i) => {
    element.addEventListener("click", () => {
        if(i == 0){
            if(element.checked){
                localStorage.setItem("langFR", fr);
                localStorage.setItem("langEN", en);
            }
            else{
                localStorage.setItem("langFR", fr);
                localStorage.setItem("langEN", en);
            }
        }
        else{
            if(element.checked){
                localStorage.setItem("langFR", fr);
                localStorage.setItem("langEN", en);
            }
            else{
                localStorage.setItem("langFR", fr);
                localStorage.setItem("langEN", en);
            }
        }
        return fr, en;
    }
)
})

if(localStorage.getItem("langFR") != null){
    switch(localStorage.getItem("langFR")){
        case 'true':
            fr = true;
            break;
        case 'false':
            fr = false;
            break;
    }
}
else{
    localStorage.setItem("langFR", fr);
    console.log("fr");
}

if(localStorage.getItem("langEN") != null){
    switch(localStorage.getItem("langEN")){
        case 'true':
            en = true;
            break;
        case 'false':
            en = false;
            break;
    }
}
else{
    localStorage.setItem("langEN", en);
}

export { fr, en }