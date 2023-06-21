const btnStart = document.getElementById("begin");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textboxxer = document.querySelector(".textbox");
let textbox = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let langBtn = document.querySelectorAll(".langSetting");
const map = document.getElementById("map");
const mapPlace1 = document.getElementById("place1");

const vnDataFR= '../json/vnFR.json';
const vnDataEN= '../json/vnEN.json';
let pageNum = 0;
let currentPage;
let json, to;
let sceneIndex;
let sceneSwap;

import {fr, en} from '../js/langSwap.js';

btnStart.addEventListener("click", () => { 
    startMenu.style.display = "none";
    vn.style.display = "block";
	sceneIndex = 0;
	pageNum = 0;
    grabData();
	return sceneIndex, pageNum;
});

langBtn.forEach((element) => {
	element.addEventListener("click", () => {
		grabData();
	})
});

mapPlace1.addEventListener("click", () => { 
    map.style.display = "none";
    vn.style.display = "block";
	sceneIndex = 1;
	pageNum = 0;
    grabData();
	return sceneIndex, pageNum;
});

async function grabData() {
	if(fr == true){
		    const resp = await fetch(vnDataFR)    
			json = await resp.json();
			sceneSwap = Object.keys(json.scenes)[sceneIndex];
    		currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
	}
	else{
			const resp = await fetch(vnDataEN);
			json = await resp.json();
			sceneSwap = Object.keys(json.scenes)[sceneIndex];
			currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
	}



    initialize(json);
    handleOptions(json);
}


async function initialize(data){
    textbox.innerText = '';
        textbox.innerText = data.scenes[sceneSwap].pages[currentPage].pageText;
        vn.style.backgroundImage = data.scenes[sceneSwap].background;
    }


function handleOptions(data){
	
	optionsbox.innerHTML = "";

	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('options')){
		var o = data.scenes[sceneSwap].pages[currentPage].options;
		var str = Object.keys(o).forEach(k => {
			const row = document.createElement('button');
			row.innerHTML = `${k}`
			row.setAttribute("type", "button");
			row.classList.add("optionBtn");
			optionsbox.appendChild(row);
			row.addEventListener('click', () => { 
				console.log(o[k]);
				if(o[k] == "worldMap"){
					worldMap();
				}
				else{
				currentPage = (o[k]);
				pageNum = Object.keys(json.scenes[sceneSwap].pages).indexOf(currentPage);
				initialize(json); 
				optionsbox.innerHTML = "";
				console.log("test")
			}})
		})
	}
}


function checkPage(data){
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('Options')) return false;
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('NextPage')) {
		if(data.scenes[sceneSwap].pages[currentPage].NextPage == "End") return false;
	}
	
	return true;
}

textboxxer.addEventListener('click', () => {
	if(!json) return;
    if(checkPage(json)){
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('NextPage')){
			currentPage = json.scenes[sceneSwap].pages[currentPage].NextPage;
		}
		else {
			pageNum++;
			currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
		}
		
		initialize(json);
		handleOptions(json);
	}
    else return;
})
optionsbox.addEventListener('click', () => {
	if(!json) return;
    if(checkPage(json)){
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('NextPage')){
			currentPage = json.scenes[sceneSwap].pages[currentPage].NextPage;
		}
		else {
			pageNum++;
			currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
		}
		
		initialize(json);
		handleOptions(json);
	}
    else return;
})

function worldMap(){
	console.log("works");
	vn.style.display = "none";
	map.style.display = "block";
}

