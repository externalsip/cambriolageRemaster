/*/////////////////////////////////
START MENU
/////////////////////////////////*/ 

let buttonsArr = document.querySelectorAll(".start");
const tipText = document.querySelector(".tipText");
const warning = document.querySelector(".warning");

buttonsArr.forEach((button, i) => {
    button.addEventListener("mouseover", () => {
        console.log("hi");
        if(i == 0){
            tipText.innerHTML = "Commencer l'aventure à partir de l'introduction.";
            warning.innerHTML = "";
        }
        else{
            tipText.innerHTML = "Continuer l'aventure à partir d'où vous l'avez laissé la dernière fois";
            warning.innerHTML = "Attention, les sauvegardes sont dans le localStorage, si vous rénitialisez votre navigateur, vous allez perdre votre progression";
        }
    })
})

