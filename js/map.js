const mapInfoBot = document.querySelector(".mapInfoBottom");
const mapNameBot = document.querySelector(".mapNameBottom");
const mapInfoTop = document.querySelector(".mapInfoTop");
const mapNameTop = document.querySelector(".mapNameTop");
const mapPlace1 = document.getElementById("place1");
const mapPlace2 = document.getElementById("place2");
const mapPlace3 = document.getElementById("place3");
let mapElementsArr = document.querySelectorAll(".mapElement");
let mapInfoBoxBot = document.querySelector(".mapTextBottom");
let mapInfoBoxTop = document.querySelector(".mapTextTop");
const mapData = "./json/mapInfo.json";
let placeNum;
let placeIndex;
let json, to;

mapPlace1.addEventListener("mouseover", () => {
    placeNum = 0;
    grabData();
    return placeNum;
})

mapPlace2.addEventListener("mouseover", () => {
    placeNum = 1;
    grabData();
    return placeNum;
})

mapPlace3.addEventListener("mouseover", () => {
    placeNum = 2;
    grabData();
    return placeNum;
})

async function grabData() {
    const resp = await fetch(mapData);    
	json = await resp.json();
    placeIndex = Object.keys(json.mapElements)[placeNum];
    initialize(json);
}

async function initialize(data){
    mapInfoBot.innerText = data.mapElements[placeIndex].description;
    mapNameBot.innerText = data.mapElements[placeIndex].name;
    mapInfoTop.innerText = data.mapElements[placeIndex].description;
    mapNameTop.innerText = data.mapElements[placeIndex].name;
}

let viewHeight = window.innerHeight;
let posY;

window.addEventListener("mousemove", (e) => {
    posY = e.pageY;
    return posY;
});

mapElementsArr.forEach((element) => {
    element.addEventListener("mouseover", () => {
        if(posY <= viewHeight/2){
            gsap.to(mapInfoBoxBot, {bottom: "8vh", duration: 0.5});
        }
        else{
            gsap.to(mapInfoBoxTop, {top: "0vh", duration: 0.5});
        }
    });
    element.addEventListener("mouseout", () => {
            gsap.to(mapInfoBoxBot, {bottom: "-35%", duration: 0.5});
            gsap.to(mapInfoBoxTop, {top: "-35%", duration: 0.5});
    });
});