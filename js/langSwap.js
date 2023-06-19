let langSetting = document.querySelectorAll(".langSetting");
let fr = true;
let en = false;
langSetting.forEach((element, i) => {
    element.addEventListener("click", () => {
        if(i == 0){
            if(element.checked){
                fr = true;
                en = false;
            }
            else{
                fr = false;
                en = true;
            }
        }
        else{
            if(element.checked){
                fr = false;
                en = true;
            }
            else{
                fr = true;
                en = false;
            }
        }
        console.log(fr);
        return fr, en;
    }
)
})

export { fr, en }