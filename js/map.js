const mapInfo = document.querySelector(".mapInfo");
const mapName = document.querySelector(".mapName");
const mapPlace1 = document.getElementById("place1");
const mapPlace2 = document.getElementById("place2");
let mapElementsArr = document.querySelectorAll(".mapElement");
let mapInfoBox = document.querySelector(".mapText");
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

async function grabData() {
    const resp = await fetch(mapData);    
	json = await resp.json();
    placeIndex = Object.keys(json.mapElements)[placeNum];
    initialize(json);
}

async function initialize(data){
    mapInfo.innerText = data.mapElements[placeIndex].description;
    mapName.innerText = data.mapElements[placeIndex].name;
}

mapElementsArr.forEach((element) => {
    element.addEventListener("mouseover", () => {
        gsap.to(mapInfoBox, {bottom: "8vh", duration: 0.5})
    })
    element.addEventListener("mouseout", () => {
        gsap.to(mapInfoBox, {bottom: "-35%", duration: 0.5})
    })
})