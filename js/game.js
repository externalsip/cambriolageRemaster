const btnStart = document.getElementById("startGame");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textbox = document.querySelector(".textbox");
let textboxText = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let shopText = document.querySelector(".shopText");
const map = document.getElementById("map");
const mapPlace1 = document.getElementById("place1");
const mapPlace2 = document.getElementById("place2");
const mapPlace3 = document.getElementById("place3");
const mapPlace4 = document.getElementById("place4");

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
	inventoryLang();
	ShopLang();
    grabData();
	return sceneIndex, pageNum;
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
});

mapPlace3.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	sceneIndex = 3;
	pageNum = 0;
	grabData();
	return sceneIndex, pageNum;
});

mapPlace4.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	sceneIndex = 4;
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
    textboxText.innerText = '';
        vn.style.backgroundImage = data.scenes[sceneSwap].background;
		typeWriter(data.scenes[sceneSwap].pages[currentPage].pageText, "vn");
}

let dialogItem;

function handleOptions(data){
	
	optionsbox.innerHTML = "";

	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('options')){
		var o = data.scenes[sceneSwap].pages[currentPage].options;
		var str = Object.keys(o).forEach(k => {
			const row = document.createElement('button');
			row.innerHTML = `${k}`
			row.setAttribute("type", "button");
				if(o[k] == "giveItem"){
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
					dialogItem = json.scenes[sceneSwap].pages[currentPage].class;
					itemManage(dialogItem);
					console.log(data.scenes[sceneSwap].pages[currentPage].class);
					pageNum = pageNum + 1;
					currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
					console.log(pageNum);
					initialize(json); 
					optionsbox.innerHTML = "";
					handleOptions(json);
				}
				else{
				currentPage = (o[k]);
				pageNum = Object.keys(json.scenes[sceneSwap].pages).indexOf(currentPage);
				initialize(json); 
				optionsbox.innerHTML = "";
			}})
		})
	}
}

function typeWriter(txt, check, i) {
		i = i || 0;
	if(!i) {
		if(check == "vn"){
			textboxText.innerHTML = '';
		}
		else if(check == "shop"){
			shopText.innerHTML = '';
		}
		clearTimeout(to);
	}
	var speed = 30; /* The speed/duration of the effect in milliseconds */
	if (i < txt.length) {
		var c = txt.charAt(i++);
		if(c === ' ') c = '&nbsp;'
		if(check == "vn"){
			textboxText.innerHTML += c;
		}
		else if(check == "shop"){
			shopText.innerHTML += c;
		}
	    to = setTimeout(function() {
	    	typeWriter(txt, check, i)
	    }, speed);
	}
}


function checkPage(data){
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('Options')) return false;
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('NextPage')) {
		if(data.scenes[sceneSwap].pages[currentPage].NextPage == "End") return false;
	}
	
	return true;
}

textbox.addEventListener('click', () => {
	if(!json) return;
    if(checkPage(json)){
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('shop')){
			enterShop(json.scenes[sceneSwap].pages[currentPage].shop, json, 1);
		}
		else{
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
	}
    else return;
})
optionsbox.addEventListener('click', () => {
	if(!json) return;
    if(checkPage(json)){		
		
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('shop')){
			enterShop(json.scenes[sceneSwap].pages[currentPage].shop, json, 1);
		}
		else{
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
	}
    else return;
})

function worldMap(){
	vn.style.display = "none";
	map.style.display = "block";
}


/*//////////////////////////////////////////////////////
INVENTORY
//////////////////////////////////////////////////////*/

const keyItemList = document.querySelector(".keyItemList");
const consumableItemList = document.querySelector(".consumableItemList");
const valuableItemList = document.querySelector(".valuableItemList");
let inventoryBtnArr;
let consumableBtnArr;
let valuableBtnArr;
let completeBtnArr;
let subMenuName = document.querySelector(".itemName");
let subMenuImg = document.querySelector(".itemImg");
let subMenuDesc = document.querySelector(".itemDesc");
let itemAmnt = document.querySelector(".itemAmnt");
let inventoryCloseBtn = document.getElementById("closeBtnIN");
let inventoryWrapper = document.querySelector(".inventoryWrapper");
let inventoryCloseArea = document.querySelector(".inventoryCloseArea");
let openInventoryBtn = document.querySelectorAll(".openInventory");
let lastItem;
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
    constructor(name, img, consumable, desc, id, sell, amount){
        super(name, img);
        this.consumable = consumable;
        this.desc = desc;
		this.id = id;
		this.amount = amount;
		this.sell = sell;
    }
}

class Valuable extends Item {
	constructor(name, img, consumable, desc, id, amount, price, sell){
		super(name, img);
		this.consumable = consumable;
		this.desc = desc;
		this.id = id;
		this.amount = amount;
		this.price = price;
		this.sell = sell;
	}
}

//Declaration of objects, because of the way language swap is handled, they need to be declared in both french and english so that the inventory can be changed between those languages, the method in which the swap is handle is awful and will eventually require a comically long switch statement because it will need to go through the entire inventory to change every item for the same one in the other language one by one.

let crowbar;
let pins;
let gun;
let dubloons;
let shillings;
let necklace;
let inventory = [];
let valuableInventory = [];
let consumableInventory = [];



function inventoryLang() {
	if(en == true){
		crowbar = new Tool ('Crowbar', 'link', false, "A thief's best friend.", "crowbar", false);
		pins = new Tool ('Pins', 'link', true, "Always handy to have around in case of locked doors.", "pins", false, 0);
		gun = new Tool ('Gun', 'link', false, "Fucking end me", 'gun', false);
		dubloons = new Valuable ('Dubloons', 'link', true, "Pirate money","dubloons", 10, 3, true);
		shillings = new Valuable ('Shillings', 'link', true, "All the rage in britain","shillings", 10, 5, true);
		necklace = new Valuable ('Necklace', 'link', false, "I needed a non-consumable item test ok", "necklace", 1, 50, true);
		return crowbar, pins, gun, dubloons, shillings, necklace;
	}
	else{
		crowbar = new Tool ('Pied-de-Biche', 'link', false, "Le fidèle compagnon de n'importe quel voleur", "crowbar");
		pins = new Tool ('Pins', 'link', true, "Toujours pratique en cas de porte verouillée.", "pins", false, 0);
		gun = new Tool ('Gun', 'link', false, "Fucking end me", 'gun');
		dubloons = new Valuable ('Dubloons', 'link', true, "Pirate money", "dubloons", 10, 3);
		shillings = new Valuable ('Shillings', 'link', true, "All the rage in britain","shillings", 10, 5);
		necklace = new Valuable ('Necklace', 'link', false, "I needed a non-consumable item test ok", "necklace", 1, 50);
		valuableTest();
		return crowbar, pins, gun, dubloons, shillings, necklace;
	}
}

function valuableTest(){
	giveItem(dubloons);
	giveItem(shillings);
	giveItem(necklace);
}

//This is definetly not the best way to handle consumable items, but it is the only one I can think of right now, every consumable has their own variable for their number, with a default of zero and if the item is already present once in the inventory, instead of adding a second button for the item, it only makes the number go up by 1.
let inventoryPosition;
console.log(inventory);

let keyHead = document.getElementById("keyHead");
let consumableHead = document.getElementById("consumableHead");
let valuableHead = document.getElementById("valuableHead");

function inventoryUpdate(){
	console.log(inventory);
	keyItemList.innerHTML = "";
	consumableItemList.innerHTML = "";
	valuableItemList.innerHTML = "";
	if(inventory.length != 0){
		keyHead.style.display = "block";
		keyItemList.style.display = "flex";
		for(let i = 0; i <= inventory.length - 1; i++){
        	const btn = document.createElement("button");
        	const node = document.createTextNode(inventory[i].name);
        	btn.appendChild(node);
        	btn.setAttribute("class", "inventoryBtn key mb-2 " + inventory[i].name);
        	btn.setAttribute("value", inventory[i].name);
        	btn.setAttribute("type", "button");
			btn.setAttribute("id", inventory[i].id);
        	keyItemList.appendChild(btn);
		}
	}
	else{
		keyHead.style.display = "none";
		keyItemList.style.display = "none";
	}
	if(consumableInventory.length != 0){
		consumableHead.style.display = "block";
		consumableItemList.style.display = "flex";
		for(let i = 0; i <= consumableInventory.length - 1; i++){
			const btn = document.createElement("button");
			const span = document.createElement("span");
			const spanNode = document.createTextNode("x" + consumableInventory[i].amount);
			span.appendChild(spanNode);
			span.setAttribute("class", "itemAmountBtn");
			btn.appendChild(span);
			const node = document.createTextNode(consumableInventory[i].name);
			btn.appendChild(node);
			btn.setAttribute("class", "inventoryBtn consumable mb-2 " + consumableInventory[i].name);
			btn.setAttribute("value", consumableInventory[i].name);
			btn.setAttribute("type", "button");
			btn.setAttribute("id", consumableInventory[i].id);
			consumableItemList.appendChild(btn);
		}
	}
	else{
		consumableHead.style.display = "none";
		consumableItemList.style.display = "none";
	}
	if(valuableInventory.length != 0){
		valuableHead.style.display = "block";
		valuableItemList.style.display = "flex";
		for(let i = 0; i <= valuableInventory.length - 1; i++){
			const btn = document.createElement("button");
			if(valuableInventory[i].consumable == true){
				const span = document.createElement("span");
				const spanNode = document.createTextNode("x" + valuableInventory[i].amount);
				span.appendChild(spanNode);
				span.setAttribute("class", "itemAmountBtn");
				btn.appendChild(span);
				const node = document.createTextNode(valuableInventory[i].name);
				btn.appendChild(node);
			}
			else{
				const node = document.createTextNode(valuableInventory[i].name);
				btn.appendChild(node);
			}		
			btn.setAttribute("class", "inventoryBtn valuable mb-4 " + valuableInventory[i].name);
			btn.setAttribute("value", valuableInventory[i].name);
			btn.setAttribute("type", "button");
			btn.setAttribute("id", valuableInventory[i].id);
			valuableItemList.appendChild(btn);
		}

	}
	else{
		valuableHead.style.display = "none";
		valuableItemList.style.display = "none";
	}

inventoryBtnArr = document.querySelectorAll(".key");    
consumableBtnArr = document.querySelectorAll(".consumable");
valuableBtnArr = document.querySelectorAll(".valuable");
completeBtnArr = document.querySelectorAll(".inventoryBtn");

subMenu(inventoryBtnArr, consumableBtnArr, valuableBtnArr);
}

inventoryUpdate();

function subMenu(keyArray, consumableArray, valuableArray){
	keyArray.forEach((element, index) => {
		element.addEventListener("click",() => {
					for(let i = 0; i <= inventory.length -1; i++){
						if(element.getAttribute("value") == String(inventory[i].name)){
							subMenuName.innerText = inventory[i].name;
							subMenuImg.setAttribute("src", inventory[i].img);
							subMenuDesc.innerText = inventory[i].desc;			
							itemAmnt.innerText = "";
					}
				}
				presentBtn.setAttribute("class", inventory[index].id + " itemAction");
				lastItem = inventory[index];	
			}
			)
		})
	consumableArray.forEach((element, index) => {
		element.addEventListener("click", () => {
			for(let i = 0; i <= consumableInventory.length - 1; i++){
				if(element.getAttribute("value") == String(consumableInventory[i].name)){
					subMenuName.innerText = consumableInventory[i].name;
					subMenuImg.setAttribute("src", consumableInventory[i].img);
					subMenuDesc.innerText = consumableInventory[i].desc;
					itemAmnt.innerText = "x" + consumableInventory[i].amount;	
				}
			}
			presentBtn.setAttribute("class", consumableInventory[index].id + " itemAction");
			lastItem = consumableInventory[index];	
		})
	})
	valuableArray.forEach((element, index) => {
		element.addEventListener("click", () => {
			for(let i = 0; i <= valuableInventory.length - 1; i++){
				if(element.getAttribute("value") == String(valuableInventory[i].name)){
					subMenuName.innerText = valuableInventory[i].name;
					subMenuImg.setAttribute("src", valuableInventory[i].img);
					subMenuDesc.innerText = valuableInventory[i].desc;
					if(valuableInventory[i].consumable){
						itemAmnt.innerText = "x" + valuableInventory[i].amount;	
					}
					else{
						itemAmnt.innerText = "";
					}
				}
			}
			presentBtn.setAttribute("class", valuableInventory[index].id + " itemAction");			
			lastItem = valuableInventory[index];	
		})
	});
	return lastItem;
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

openInventoryBtn.forEach((button) => {
	button.addEventListener("click", () => {
	if(lastItem != undefined){
		if(inventory.length > 0 || consumableInventory.length > 0 || valuableInventory.length > 0){
				subMenuName.innerText = lastItem.name;
				subMenuImg.setAttribute("src", lastItem.img);
				subMenuDesc.innerText = lastItem.desc;
				if(lastItem.consumable == true){
					itemAmnt.innerText = "x" + lastItem.amount;
				}
				else{
				itemAmnt.innerText = "";
				}
			}
	}
	else{
		subMenuName.innerText = "";
				subMenuImg.setAttribute("src", "");
				subMenuDesc.innerText = "";
					itemAmnt.innerText = "";
	}
		gsap.timeline()		
		.set(inventoryWrapper, {x: "100%"})
		.to(inventoryWrapper, {opacity: 1, duration: 0.5})
});
});

function present(puzzle, data){
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
			gsap.timeline()
			.to(inventoryWrapper, {opacity: 0, duration: 0.2})
			.set(inventoryWrapper, {x: "-100%"})
		})
	}
}

/*/////////////////////////////////////////////////////////
SHOPS
/////////////////////////////////////////////////////////*/

let wallet = 50;
let crowbarShop;
let pinsShop;
let gunShop;
let buyMenuBtn = document.getElementById("buyMenuBtn");
let sellMenuBtn = document.getElementById("sellMenuBtn");
let shopPrimary = document.querySelector(".shopPrimary");
let shopChoice = document.querySelector(".shopChoice");
let leaveBtn = document.getElementById("leaveBtn");
const shopItemList = document.querySelector(".itemListShop");
const shop = document.querySelector(".shopWrapper");
let subItemShopNameArr = document.querySelectorAll(".itemNameShop");
let shopSubMenu = document.querySelector(".shopSub");
let itemImgShop = document.querySelector(".itemImgShop");
let descItmShop = document.querySelector(".itemDescShop");
let itmAmntShop = document.querySelector(".itemAmntShop");
let itemConfirm = document.querySelector(".shopConfirm");
let closeBtnSH = document.getElementById("closeBtnSH");



class shopItem extends Item{
	constructor(name, img, consumable, desc, price, purchased, id, amount, invEquivalent){
		super(name, img);
		this.consumable = consumable;
		this.desc = desc;
		this.price = price;
		this.purchased = purchased;
		this.id = id;
		this.amount = amount;
		this.invEquivalent = invEquivalent
	}
}

let shopInventory1 = [];

function ShopLang() {
	if(en == true){
		crowbarShop = new shopItem ('Crowbar', 'link', false, "A thief's best friend.", 50, false, "crowbar", 1, crowbar);
		pinsShop = new shopItem ('Pins', 'link', true, "Always handy to have around in case of locked doors.", 5, false, "pins", 10, pins);
		gunShop = new shopItem('Gun', 'link', false, "Fucking end me", 50, false, "gun", 1, gun);
		shopInventories();
		return crowbarShop, pinsShop, gunShop;
	}
	else{
		crowbarShop = new shopItem ('Pied-de-Biche', 'link', false, "Le fidèle compagnon de n'importe quel voleur", 50, false, "crowbar", 1, crowbar);
		pinsShop = new shopItem ('Crochets', 'link', true, "Toujours pratique à avoir sous la main en cas de porte verouillée", 5, false, "pins", 10, pins);
		gunShop = new shopItem('Gun', 'link', false, "Fucking end me", 50, false, "gun", 1, gun);
		shopInventories();
		return crowbarShop, pinsShop, gunShop;
	}
}

function shopInventories(){
	shopInventory1 = [crowbarShop, pinsShop, gunShop];
	return shopInventory1;
};




let shopBtnArr;



//This function checks what shop the player just entered with a name that will be called when needed, since each shop has its own inventory, they all need to be declared separately to make sure that the right inventory appears at the right time, the switch statement is used to verify which shop is currently being used.

function enterShop(shopName, data, num){
	console.log(shopName);
	console.log(wallet);
	pageNum = num;
	shopText.innerText = '';
	currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];	
	typeWriter(data.scenes[sceneSwap].pages[currentPage].pageText, "shop");
	shop.style.backgroundImage = data.scenes[sceneSwap].background;
	shop.style.display = "block";
	buyMenuBtn.addEventListener("click", () => {			
		shopItemList.innerHTML = "";
		shopChoice.style.display = "none";
		shopPrimary.style.display = "block";
		shopSubMenu.style.display = "flex";
		switch(shopName){
			case "shop1":
				for(let i = 0; i <= shopInventory1.length - 1; i++){
					const btn = document.createElement("button");
					if(shopInventory1[i].consumable == true){
						const span = document.createElement("p");
						const spanNode = document.createTextNode("x" + shopInventory1[i].amount);
						span.appendChild(spanNode);
						span.setAttribute("class", "itemAmountBtn");
						btn.appendChild(span);
						const node = document.createTextNode(shopInventory1[i].name);
						btn.appendChild(node);
					}
					else{
						const node = document.createTextNode(shopInventory1[i].name);
						btn.appendChild(node);
					}
					btn.setAttribute("type", "button");
					btn.setAttribute("value", shopInventory1[i].name);
					if(shopInventory1[i].amount == 0){
						btn.setAttribute("class", "shopBtn noStock " + shopInventory1[i].name);
						shopItemList.appendChild(btn);
					}
					else{
						btn.setAttribute("class", "shopBtn " + shopInventory1[i].name);
						shopItemList.appendChild(btn);
					}

				}
		}
		shopBtnArr = document.querySelectorAll(".shopBtn");
		hoverShopBtn(shopBtnArr, shopName);
		selectItem(shopBtnArr, shopName);
		return shopBtnArr;
	})
	sellMenuBtn.addEventListener("click", () => {
		if(shopName == "pawn"){
			console.log(valuableInventory);
			shopItemList.innerHTML = "";
			shopChoice.style.display = "none";
			shopPrimary.style.display = "block";
			shopSubMenu.style.display = "flex";
			for(let i = 0; i <= valuableInventory.length - 1; i++){
				const btn = document.createElement("button");
				if(valuableInventory[i].consumable == true){
							const node = document.createTextNode(valuableInventory[i].name + "x" + valuableInventory[i].amount);
							btn.appendChild(node);
				}
				else{
					const node = document.createTextNode(valuableInventory[i].name);
					btn.appendChild(node);
				}
				btn.setAttribute("class", "shopBtn " + valuableInventory[i].name);
				btn.setAttribute("type", "button");
				shopItemList.appendChild(btn);
			}		
			shopBtnArr = document.querySelectorAll(".shopBtn");
			hoverSellBtn(shopBtnArr);
			selectItemSell(shopBtnArr);
			return shopBtnArr;
		}
		else {
			pageNum = 15;
			shopText.innerText = '';
			currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];	
			typeWriter(data.scenes[sceneSwap].pages[currentPage].pageText, "shop");
		}

	});
	leaveBtn.addEventListener("click", () => {
		shop.style.display = "none";
		map.style.display = "block";
	});
}

/*Shop buttons Hover function */

function hoverShopBtn(btnArr, name){
	btnArr.forEach((btn) => {
		btn.addEventListener("mouseover",() => {
			switch(name){
				case "shop1":
					for(let i = 0; i <= shopInventory1.length - 1; i++){
						if(btn.getAttribute("value") == String(shopInventory1[i].name)){
							for(let e = 0; e <= subItemShopNameArr.length - 1; e++){
								subItemShopNameArr[e].innerText = shopInventory1[i].name;
							}
							itemImgShop.setAttribute("src", shopInventory1[i].img);
							descItmShop.innerText = shopInventory1[i].desc;
							if(shopInventory1[i].consumable == true){
								itmAmntShop.innerText = shopInventory1[i].amount;
							}
							else{
								itmAmntShop.innerText = "";
							}
						}
					}
			}
			gsap.to(shopSubMenu, {left: 0, duration: 0.5});
		});
		btn.addEventListener("mouseout", () => {
			gsap.to(shopSubMenu, {left: "-35%", duration: 0.5});
		})
	})
}

let purchaseMade = false;

function selectItem(btnArr, name){
	btnArr.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			if(btn.classList.contains("noStock")){
				itemConfirm.style.display = "none";
				shopPrimary.style.display = "none";
				shopChoice.style.display = "flex";
				shopSubMenu.style.display = "none";
				enterShop(name, json, mathFunction(5, 7));
			}
			else{
				switch(name){
					case "shop1":
						shopSubMenu.style.display = "none";
						itemConfirm.style.display = "flex";
						buyBtn.style.display = "block";
						sellBtn.style.display = "none";
						purchaseMade = false;
						buyItem(shopInventory1[index], "shop1");								
						break;
				}
			}
			
		});
	});

}


function hoverSellBtn(btnArr){
	btnArr.forEach((btn) => {
		btn.addEventListener("mouseover",() => {
					for(let i = 0; i <= valuableInventory.length - 1; i++){
						if(btn.getAttribute("value") == String(valuableInventory[i].name)){
							for(let i = 0; i <= subItemShopNameArr.length; i++){
								subItemShopNameArr[i].innerText = valuableInventory[i].name;
							}
							itemImgShop.setAttribute("src", valuableInventory[i].img);
							descItmShop.innerText = valuableInventory[i].desc;
							if(valuableInventory[i].consumable == true){
								itmAmntShop.innerText = valuableInventory[i].amount;
							}
							else{
								itmAmntShop.innerText = "";
							}
						}
					}
			gsap.to(shopSubMenu, {left: 0, duration: 0.5});
		});
		btn.addEventListener("mouseout", () => {
			gsap.to(shopSubMenu, {left: "-35%", duration: 0.5});
		})
	})
}

let salesMade = false;

function selectItemSell(btnArr, name){
	btnArr.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			shopSubMenu.style.display = "none";
			itemConfirm.style.display = "flex";
			buyBtn.style.display = "none";
			sellBtn.style.display = "block";
			salesMade = false;
			sellItem(valuableInventory[index], name);								
		});
	});

}
let selectedItemId = null;


let buyBtn = document.getElementById("buyBtn");
let cancelBtn = document.getElementById("cancelBtn");
let sliderContainer = document.querySelector(".shopSliderContainer");
let input = document.getElementById("shopSlider");
let priceDisplay = document.querySelector(".itemPrice");
let sellBtn = document.getElementById("sellBtn");
let stackPrice;
let amountLeft;

function buyItem(item, shop) {
  console.log(item);
  priceDisplay.innerText = item.price + " $";
  stackPrice = item.price;
  selectedItemId = item.invEquivalent;
  input.value = 1;
  if (item.consumable == true) {
    sliderContainer.style.display = "block";
    input.setAttribute("max", item.amount);
    input.addEventListener("input", () => {
      stackPrice = item.price * input.value;
      priceDisplay.innerText = stackPrice + " $";
    });

    buyBtn.addEventListener("click", handlePurchaseOnce.bind(null, item, shop));
  } else {
    sliderContainer.style.display = "none";
    priceDisplay.innerText = item.price + " $";

    buyBtn.addEventListener("click", handlePurchaseOnce.bind(null, item, shop));
  }
}

/*PURCHASE HANDLER*/

function handlePurchaseOnce(item, shop) {
	if (purchaseMade) {
	  return;
	}
  
	purchaseMade = true;
  
	if (selectedItemId.consumable) {
	  if (wallet >= stackPrice) {
		for (let i = 0; i <= input.value - 1; i++) {
		  giveItem(selectedItemId);
		}
		wallet = wallet - stackPrice;
		amountLeft = item.amount - input.value;
		item.amount = amountLeft;		

		enterShop(shop, json, mathFunction(2, 4));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
	  } else {
		alert("broke");
	  }
	} else {
	  if (wallet >= item.price) {
		giveItem(selectedItemId);
		wallet = wallet - item.price;
		amountLeft = item.amount - 1;
		item.amount = amountLeft;	
		enterShop(shop, json, mathFunction(2, 4));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";

	  } else {
		alert("broke");
	  }
	}
  }

/*CANCEL AND CLOSE */

cancelBtn.addEventListener("click", () => {
	itemConfirm.style.display = "none";
	shopPrimary.style.display = "none";
	shopChoice.style.display = "flex";
});

closeBtnSH.addEventListener("click", () => {
	itemConfirm.style.display = "none";
	shopPrimary.style.display = "none";
	shopChoice.style.display = "flex";
	shopSubMenu.style.display = "none";
});

function itemManage(itemName) {
	switch(itemName){
		case "pins":
			giveItem(pins);
			break;
	}
}

/*
FUNCTION TO GIVE ITEM
*/

function giveItem(item) {
	console.log(wallet);
	console.log(item);		
	if(item.sell == false){
		if(item.consumable == true){
			if(consumableInventory.includes(item)){
				inventoryPosition = consumableInventory.indexOf(item);
				consumableInventory[inventoryPosition].amount++;
				inventoryUpdate();
				}
			else{
				consumableInventory.push(item);
				inventoryPosition = consumableInventory.indexOf(item);
				consumableInventory[inventoryPosition].amount++;
				inventoryUpdate();
				}
			}
			else{
				inventory.push(item);
				inventoryUpdate();
			}
	}
	else{
		if(item.consumable == true){
			if(valuableInventory.includes(item)){
				inventoryPosition = valuableInventory.indexOf(item);
				valuableInventory[inventoryPosition].amount++;
				inventoryUpdate();
				}
			else{
				valuableInventory.push(item);
				inventoryPosition = valuableInventory.indexOf(item);
				valuableInventory[inventoryPosition].amount++;
				inventoryUpdate();
				}
			}
			else{
				valuableInventory.push(item);
				inventoryUpdate();
			}
	}
	
}

/*
SELLING FUNCTIONS 
*/

let sellPrice;

function sellItem(item){
	console.log(item);
	priceDisplay.innerText = item.price + " $";
	sellPrice = item.price;
	selectedItemId = item;
	if (item.consumable == true) {
		sliderContainer.style.display = "block";
		input.setAttribute("max", item.amount);
		input.addEventListener("input", () => {
			sellPrice = item.price * input.value;
		  	priceDisplay.innerText = sellPrice + " $";
		  	console.log(sellPrice);
		});
	
		sellBtn.addEventListener("click", handleSalesOnce.bind(null, item));
	  } else {
		sliderContainer.style.display = "none";
		priceDisplay.innerText = item.price + " $";
	
		sellBtn.addEventListener("click", handleSalesOnce.bind(null, item));
	  }
}

function handleSalesOnce(item) {
	if (salesMade) {
	  return; // Exit the function if purchase has already been made
	}
  
	salesMade = true; // Set the flag to indicate purchase has been made

	if (item.consumable == true) {
		for (let i = 0; i <= input.value - 1; i++) {
			removeItem(selectedItemId);
		  }
		console.log(sellPrice);
		wallet = wallet + sellPrice;
		enterShop("pawn", json, mathFunction(12, 14));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
		console.log(wallet);
	}

	else{		
		removeItem(selectedItemId);
		wallet = wallet + item.price;
		enterShop("pawn", json, mathFunction(12, 14));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
	} 
}

/*
FUNCTION FOR RANDOM SHOP DIALOGUE
*/

function mathFunction(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

/*
FUNCTION TO REMOVE ITEM
*/

function removeItem(item){
	if(item.consumable == true){
		inventoryPosition = valuableInventory.indexOf(item);
		valuableInventory[inventoryPosition].amount--;		
		if(valuableInventory[inventoryPosition].amount == 0){
			valuableInventory.splice(inventoryPosition, 1);
		}
		inventoryUpdate();
	}
	else{
		inventoryPosition = valuableInventory.indexOf(item);
		valuableInventory.splice(inventoryPosition, 1);
		inventoryUpdate();
	}
}