const btnStart = document.getElementById("begin");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textboxxer = document.querySelector(".textbox");
let textbox = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let langBtn = document.querySelectorAll(".langSetting");
const map = document.getElementById("map");
const mapPlace1 = document.getElementById("place1");
const mapPlace2 = document.getElementById("place2");

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
		inventoryLangSwap();
	})
});

mapPlace1.addEventListener("click", () => { 
    map.style.display = "none";
    vn.style.display = "block";
	sceneIndex = 1;
    grabData();
	if(inventory.find((item) => item.id=="pins")){
		pageNum = 0;
	}
	else{
		pageNum = 2;
	}
	return sceneIndex, pageNum;
});

mapPlace2.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	sceneIndex = 2;
	pageNum = 0;
	grabData();
	return sceneIndex, pageNum;
})

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
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('action')){
			present(json.scenes[sceneSwap].pages[currentPage].action, json);
		}
		else{
			present("noPuzzle", json);
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
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('action')){
			present(json.scenes[sceneSwap].pages[currentPage].action, json);
		}
		else{
			present("noPuzzle", json);
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
let itemAmnt = document.querySelector(".itemAmnt");
let inventoryCloseBtn = document.getElementById("closeBtnIN");
let inventoryWrapper = document.querySelector(".inventoryWrapper");
let inventoryCloseArea = document.querySelector(".inventoryCloseArea");
let openInventoryBtn = document.querySelector(".openInventory");
let lastItem = 0;
let presentBtn = document.getElementById("presentBtn");

//Basic item class, will be used to create tools, valuables and other kind of items

class Item {
    constructor(name, img
        ){
        this.name = name;
        this.img = img;
    }
}

//Tools class, those items are meant to be used to progress in the game, drb is their durability, durability only decreases by one after the clearing the puzzle, the game will be built in a way where you cannot enter a heist without having the required items at the required durability.

class Tool extends Item {
    constructor(name, img, drb, consumable, desc, id){
        super(name, img);
        this.drb = drb;
        this.consumable = consumable;
        this.desc = desc;
		this.id = id;
    }
}

//Declaration of objects, because of the way language swap is handled, they need to be declared in both french and english so that the inventory can be changed between those languages, the method in which the swap is handle is awful and will eventually require a comically long switch statement because it will need to go through the entire inventory to change every item for the same one in the other language one by one.

let crowbar;
let pins;
let inventory = [];



function inventoryLangSwap() {
	if(en == true){
		crowbar = new Tool ('Crowbar', 'link', 10, false, "A thief's best friend.", "crowbar");
		pins = new Tool ('Pins', 'link', 2, true, "Always handy to have around in case of locked doors.", "pins");
		inventoryUpdate();
		return crowbar, pins;
	}
	else{
		crowbar = new Tool ('Pied-de-Biche', 'link', 10, false, "Le fidèle compagnon de n'importe quel voleur", "crowbar");
		pins = new Tool ('Crochets', 'link', 2, true, "Toujours pratique à avoir sous la main en cas de porte verouillée", "pins");
		inventoryUpdate();		
		return crowbar, pins;
		}

}


inventoryLangSwap();


inventory.push(crowbar);


//This is definetly not the best way to handle consumable items, but it is the only one I can think of right now, every consumable has their own variable for their number, with a default of zero and if the item is already present once in the inventory, instead of adding a second button for the item, it only makes the number go up by 1.

let pinsNum = 0;
function giveItem(btnData) {
	console.log()
	switch(btnData){
		case "pinsGiveBtn":
			if(inventory.includes(pins)){
				pinsNum++
				inventoryUpdate();
			}
			else{
				inventory.push(pins);
				pinsNum++
				inventoryUpdate();
			}
	}
}

console.log(inventory);

function inventoryUpdate(){
	for(let i = 0; i <= inventory.length - 1; i++){
		switch(inventory[i].id){
			case "crowbar":
				inventory[i] = crowbar;
				break;
			case "pins":
				inventory[i] = pins;
				break;
		}
	}
	itemList.innerHTML = "";
    for(let i = 0; i <= inventory.length - 1; i++){
        const btn = document.createElement("button");
        if(inventory[i].consumable == true){
			switch(inventory[i].id){
				case "pins":
					const node = document.createTextNode(inventory[i].name + "x" + pinsNum);
					btn.appendChild(node);
					console.log(pinsNum);
					break;
			}
        }
        else{
            const node = document.createTextNode(inventory[i].name);
            btn.appendChild(node);
        }

        btn.setAttribute("class", "inventoryBtn " + inventory[i].name);
        btn.setAttribute("value", inventory[i].name);
        btn.setAttribute("type", "button");
		btn.setAttribute("id", inventory[i].id);
        itemList.appendChild(btn);
}
inventoryBtnArr = document.querySelectorAll(".inventoryBtn");        
console.log(inventoryBtnArr);
subMenu(inventoryBtnArr);
return(inventoryBtnArr);
}
inventoryUpdate();


function subMenu(array){
	array.forEach((element, index) => {
		element.addEventListener("click",() => {
			for(let i = 0; i <= inventory.length -1; i++){
				if(element.getAttribute("value") == String(inventory[i].name)){
					subMenuName.innerText = inventory[i].name;
					subMenuImg.setAttribute("src", inventory[i].img);
					subMenuDesc.innerText = inventory[i].desc;
					if(inventory[i].consumable == true){
						switch(inventory[i].id){
							case "pins":
								itemAmnt.innerText = "x" + pinsNum;
								break;
						}
					}
					else{
						itemAmnt.innerText = "";
					}
				}

			}
			presentBtn.setAttribute("class", inventory[index].id + " itemAction");
			lastItem = index;	
			return lastItem;
		})
	})
}

inventoryCloseBtn.addEventListener("click", () => {
	gsap.timeline()
    .to(inventoryWrapper, {opacity: 0, duration: 0.5})
    .set(inventoryWrapper, {x: "-100%"})
});

inventoryCloseArea.addEventListener("click", () => {
	gsap.timeline()
    .to(inventoryWrapper, {opacity: 0, duration: 0.5})
    .set(inventoryWrapper, {x: "-100%"})
});

openInventoryBtn.addEventListener("click", () => {
	subMenuName.innerText = inventory[lastItem].name;
	subMenuImg.setAttribute("src", inventory[lastItem].img);
	subMenuDesc.innerText = inventory[lastItem].desc;
		if(inventory[lastItem].consumable == true){
			switch(inventory[lastItem].name){
				case "Pins":
					itemAmnt.innerText = "x" + pinsNum;
					break;
			}
		}
		else{
		itemAmnt.innerText = "";
		}
		gsap.timeline()		
		.set(inventoryWrapper, {x: "100%"})
		.to(inventoryWrapper, {opacity: 1, duration: 0.5})
});

function present(puzzle, data){
	console.log(puzzle);
if(puzzle == "noPuzzle"){
	presentBtn.style.display = "none";
}
else{
	presentBtn.style.display = "block";
		presentBtn.addEventListener("click", () => {
		presentBtn.style.display = "block";
		switch(puzzle){
			case "presentPuzzleTest":
				if(presentBtn.classList.contains("crowbar")){
					pageNum = 3;
					currentPage = Object.keys(data.scenes[sceneSwap].pages)[pageNum];
				}
				else{
					pageNum = 4;
					currentPage = Object.keys(data.scenes[sceneSwap].pages)[pageNum];

				}					
				initialize(data);
				handleOptions(data);
				break;
		}
		console.log("what");
		gsap.timeline()
		.to(inventoryWrapper, {opacity: 0, duration: 0.2})
		.set(inventoryWrapper, {x: "-100%"})				
	})
}

}
