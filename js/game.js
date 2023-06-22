const btnStart = document.getElementById("begin");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textboxxer = document.querySelector(".textbox");
let textbox = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let langBtn = document.querySelectorAll(".langSetting");
const map = document.getElementById("map");
const mapPlace1 = document.getElementById("place1");

const vnDataFR= './json/vnFR.json';
const vnDataEN= './json/vnEN.json';
let pageNum = 0;
let currentPage;
let json, to;
let sceneIndex;
let sceneSwap;

import {fr, en} from './langSwap.js';

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
				if(o[k] == "giveItem"){
					console.log("item")
					row.classList.add(data.scenes[sceneSwap].pages[currentPage].class, "optionBtn");
					optionsbox.appendChild(row);
				}
				else{
					row.classList.add("optionBtn");
					optionsbox.appendChild(row);
				}
			

			row.addEventListener('click', () => { 
				console.log(o[k]);
				if(o[k] == "worldMap"){
					worldMap();
				}
				else if(o[k] == "giveItem"){					
					giveItem(json.scenes[sceneSwap].pages[currentPage].class);
					console.log(data.scenes[sceneSwap].pages[currentPage].class);
					pageNum = pageNum + 1;
					currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
					console.log(pageNum);
					initialize(json); 
					optionsbox.innerHTML = "";
					handleOptions(json);
					console.log("test");

				}
				else{
				currentPage = (o[k]);
				pageNum = Object.keys(json.scenes[sceneSwap].pages).indexOf(currentPage);
				initialize(json); 
				optionsbox.innerHTML = "";
				console.log("test");
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


/*//////////////////////////////////////////////////////
INVENTORY
//////////////////////////////////////////////////////*/

const itemList = document.querySelector(".itemList");
let inventoryBtnArr;
let subMenuName = document.querySelector(".itemName");
let subMenuImg = document.querySelector(".itemImg");
let subMenuDesc = document.querySelector(".itemDesc");


class Item {
    constructor(name, img
        ){
        this.name = name;
        this.img = img;
    }
}

class Tool extends Item {
    constructor(name, img, drb, consumable, desc){
        super(name, img);
        this.drb = drb;
        this.consumable = consumable;
        this.desc = desc;
    }
}


let  crowbar = new Tool ('crowbar', 'link', 10, false, "A thief's best friend.");
let  pins = new Tool ('pins', 'link', 2, true, "Always handy to have around in case of locked doors.");


let inventory = [];

inventory.push(crowbar);
inventory.push(pins);

let b = 0;
function giveItem(btnData) {
	console.log()
	switch(btnData){
		case "pinsGiveBtn":
			if(inventory.includes(pins)){
				b++			
				inventoryUpdate();
				return b;
			}
			else{
				inventory.push(pins);
				b++
				inventoryUpdate();
				return b;
			}
	}
}

console.log(inventory);

function inventoryUpdate(){
	itemList.innerHTML = "";
    for(let i = 0; i <= inventory.length - 1; i++){
        const btn = document.createElement("button");
        if(inventory[i].consumable == true){		
            const node = document.createTextNode(inventory[i].name + "x" + b);        
            btn.appendChild(node);
        }
        else{
            const node = document.createTextNode(inventory[i].name);
            btn.appendChild(node);
        }

        btn.setAttribute("class", "inventoryBtn " + inventory[i].name);
        btn.setAttribute("value", inventory[i].name);
        btn.setAttribute("type", "button");
        btn.setAttribute("id", i);
        itemList.appendChild(btn);
}
inventoryBtnArr = document.querySelectorAll(".inventoryBtn");        
console.log(inventoryBtnArr);
subMenu(inventoryBtnArr);
return(inventoryBtnArr);
}
inventoryUpdate();


function subMenu(array){
	array.forEach((element) => {
		element.addEventListener("click",() => {
			for(let i = 0; i <= inventory.length -1; i++){
				if(element.getAttribute("value") == String(inventory[i].name)){
					subMenuName.innerText = inventory[i].name;
					subMenuImg.setAttribute("src", inventory[i].img);
					subMenuDesc.innerText = inventory[i].desc;
				}
			}
		})
	})
}