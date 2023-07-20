const btnStart = document.getElementById("startGame");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textbox = document.querySelector(".textbox");
let textboxText = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let shopText = document.querySelector(".shopText");
let sprite1 = document.querySelector(".sprite1");
let sprite1eyes = document.querySelector(".sprite1eyes");
let sprite1mouth = document.querySelector(".sprite1mouth");
let sprite2 = document.querySelector(".sprite2");
let sprite2eyes = document.querySelector(".sprite2eyes");
let sprite2mouth = document.querySelector(".sprite2mouth");
let namebox1 = document.querySelector(".namebox1");
let namebox2 = document.querySelector(".namebox2");
const map = document.getElementById("map");
const mapPlace1 = document.getElementById("place1");
const mapPlace2 = document.getElementById("place2");
const mapPlace3 = document.getElementById("place3");
const mapPlace4 = document.getElementById("place4");
let playArea = document.querySelectorAll(".playArea");

const vnDataFR= './json/vnFR.json';
const vnDataEN= './json/vnEN.json';
let pageNum = 0;
let currentPage;
let json, to;
let sceneIndex;
let sceneSwap;
let currentWindow;

import {fr, en} from './langSwap.js';

btnStart.addEventListener("click", () => {
	localStorage.clear();
	localStorage.setItem("langFR", fr);
	localStorage.setItem("langEN", en);
	console.log(en);
    startMenu.style.display = "none";
    vn.style.display = "block";
	currentWindow = "vn";
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
	currentWindow = "vn";
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
	currentWindow = "vn";
	switch(true){		
		case place2Return:
			console.log(place2Return);
			sceneIndex = 6;
			break;
		
		case presentPuzzleTestSolved:
			sceneIndex = 5;
			break;

		default:
			sceneIndex = 2;
	}
	pageNum = 0;
	grabData();
	return sceneIndex, pageNum;
});

mapPlace3.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	currentWindow = "vn";
	sceneIndex = 3;
	pageNum = 0;
	grabData();
	return sceneIndex, pageNum;
});

mapPlace4.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	currentWindow = "vn";
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

let stop = false;
//initialize function 
async function initialize(data){		
	if(isTalking == true){
		textboxText.innerHTML = data.scenes[sceneSwap].pages[currentPage].pageText;
		stop = true;
	}

	else{
    textboxText.innerText = '';
	namebox1.innerText = '';
	namebox2.innerText = '';

	//manages the sprites currently on screen, and which sprite is the active one, the inactive sprite is greyed out so we clearly know who is talking.
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('character1')){
		sprite1.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character1].base +')';
		sprite1mouth.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character1][data.scenes[sceneSwap].pages[currentPage].sprite1].mouth +')';
		sprite1eyes.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character1][data.scenes[sceneSwap].pages[currentPage].sprite1].eyes +')';
		if(data.scenes[sceneSwap].pages[currentPage].active == "sprite1"){
			sprite1.classList.add("active");
			sprite2.classList.remove("active");
		}
		else{
			sprite1.classList.remove("active");
		}
	}
	else{
		sprite1.style.backgroundImage = "";
		sprite1mouth.style.backgroundImage = "";
		sprite1eyes.style.backgroundImage = "";
	}
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('character2')){
		sprite2.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character2].base +')';
		sprite2mouth.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character2][data.scenes[sceneSwap].pages[currentPage].sprite2].mouth +')';
		sprite2eyes.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character2][data.scenes[sceneSwap].pages[currentPage].sprite2].eyes +')';
		if(data.scenes[sceneSwap].pages[currentPage].active == "sprite2"){
			sprite2.classList.add("active");
			sprite1.classList.remove("active");
		}
		else{
			sprite2.classList.remove("active");
		}
	}
	else{
		sprite2.style.backgroundImage = "";
		sprite2mouth.style.backgroundImage = "";
		sprite2eyes.style.backgroundImage = "";
	}
	switch(true){
		case data.scenes[sceneSwap].pages[currentPage].active == "sprite1":
			namebox1.style.display = "flex";
			namebox2.style.display = "none";
			namebox1.innerText = data.scenes[sceneSwap].pages[currentPage].character1;
			break;
		case data.scenes[sceneSwap].pages[currentPage].active == "sprite2":
			namebox2.style.display = "flex";
			namebox1.style.display = "none";
			namebox2.innerText = data.scenes[sceneSwap].pages[currentPage].character2;
			break;
		case data.scenes[sceneSwap].pages[currentPage].active == "hidden":
			namebox1.style.display = "flex";
			namebox2.style.display = "none";
			namebox1.innerText = data.scenes[sceneSwap].pages[currentPage].characterName;
			break;
		default:
			namebox1.style.display = "none";
			namebox2.style.display = "none";
			namebox1.innerText = "";
			break;
	}

        vn.style.backgroundImage = data.scenes[sceneSwap].background;
		stop = false;
		typeWriter(data.scenes[sceneSwap].pages[currentPage].pageText, "vn");
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('check')){
			switch(json.scenes[sceneSwap].pages[currentPage].check){
				case "place2Return":
					place2Return = true;
					break;
			}
		}	}
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
				switch(o[k]){
					case "worldMap":
						worldMap();
						break;

					case "giveItem":
						dialogItem = json.scenes[sceneSwap].pages[currentPage].class;
						itemManage(dialogItem);
						console.log(data.scenes[sceneSwap].pages[currentPage].class);
						pageNum = pageNum + 1;
						currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];
						console.log(pageNum);
						initialize(json); 
						optionsbox.innerHTML = "";
						handleOptions(json);
						break;

					case "present":
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
							subMenuName.innerText = "Pas d'objet séléctionné";
									subMenuImg.removeAttribute("src");
									subMenuDesc.innerText = "Veuillez cliquer sur un objet pour voir sa description";
										itemAmnt.innerText = "";
										itemPrc.innerText = "";
						}
						gsap.timeline()		
						.set(inventoryWrapper, {x: "100%"})
						.to(inventoryWrapper, {opacity: 1, duration: 0.5})
						break;

					default:
						currentPage = (o[k]);
						pageNum = Object.keys(json.scenes[sceneSwap].pages).indexOf(currentPage);
						initialize(json); 
						optionsbox.innerHTML = "";
						break;
				}
				})
		})
	}
}

let isTalking = false;

function typeWriter(txt, check, i, wordsArr, currentWord) {
	i = i || 0;
	wordsArr = wordsArr || txt.split(' ');
	currentWord = currentWord || 0;
  
	if (!i) {
	  if (check === "vn") {
		textboxText.innerHTML = '';
	  } else if (check === "shop") {
		shopText.innerHTML = '';
	  }
	  clearTimeout(to);
	}
  
	var speed = 30; /* The speed/duration of the effect in milliseconds */
  
	if (stop === true) {
	  i = wordsArr.length;
	  isTalking = false;
	  spriteAnimation();
	}
	else{
		if (currentWord < wordsArr.length) {
	  isTalking = true;
	  spriteAnimation();
  
	  var word = wordsArr[currentWord];
	  var charsToShow = i > word.length ? word.length : i;
	  var visibleWord = word.slice(0, charsToShow);
  
	  if (check === "vn") {
		textboxText.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
	  } else if (check === "shop") {
		shopText.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
	  }
  
	  // Check if the text overflows the container
	  var textContainer = check === "vn" ? textboxText : shopText;
	  if (textContainer.scrollHeight > textContainer.clientHeight) {
		// If overflowed, remove the last character and stop the typing for the current word
		visibleWord = word.slice(0, charsToShow - 1);
		if (check === "vn") {
		  textboxText.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
		} else if (check === "shop") {
		  shopText.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
		}
		isTalking = false;
		spriteAnimation();
		return;
	  }
  
	  if (i >= word.length) {
		i = 0;
		currentWord++;
	  }
  
	  var charDelay = speed;
	  if (i === 0) {
		// Add a delay before starting the next word
		charDelay = speed * 5;
	  }

  
	  to = setTimeout(function() {
		typeWriter(txt, check, i + 1, wordsArr, currentWord);
	  }, charDelay);
	} else {
	  isTalking = false;
	  spriteAnimation();
	}
	}
	
	
  }


function checkPage(data){
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('Options')) return false;
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('NextPage')) {
		if(data.scenes[sceneSwap].pages[currentPage].NextPage == "End") return false;
	}
	
	return true;
}

playArea.forEach((element) => {
	element.addEventListener('click', () => {
		if(isTalking == true){
			initialize(json);
			handleOptions(json);
		}
		else{
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
		}

	});
});



function worldMap(){
	vn.style.display = "none";
	map.style.display = "block";
	currentWindow = "map";
}

/*Checks which character is currently talking and makes it so their mouth only moves while needed*/

let talk1 = gsap.to(sprite1mouth, {backgroundPositionX: "-36vw", ease: SteppedEase.config(3), duration: 0.5, repeat: -1});
let talk2 = gsap.to(sprite2mouth, {backgroundPositionX: "-36vw", ease: SteppedEase.config(3), duration: 0.5, repeat: -1});
//let blink1 = gsap.to(sprite1eyes, {backgroundPositionX: "-48vw", ease: SteppedEase.config(4), duration: 0.5, repeat: -1, repeatDelay: 5});
//let blink2 = gsap.to(sprite2eyes, {backgroundPositionX: "-48vw", ease: SteppedEase.config(4), duration: 0.5, repeat: -1, repeatDelay: 5, delay: 1});
talk1.pause();
talk2.pause();
//blink1.pause();
//blink2.pause();

function spriteAnimation() {
	switch(true){
		case sprite1.classList.contains("active"):
			if(isTalking == true){				
				//blink1.pause();
				//gsap.set(sprite1eyes, {backgroundPositionX: 0});
				talk1.play();
			}
			else{
				talk1.pause();
				gsap.set(sprite1mouth, {backgroundPositionX: 0});
				//blink1.play();
			}
			break;
		case sprite2.classList.contains("active"):
			if(isTalking == true){
				//blink2.pause();
				//gsap.set(sprite2eyes, {backgroundPositionX: 0});
				talk2.play();
			}
			else{
				talk2.pause();
				//gsap.set(sprite2mouth, {backgroundPositionX: 0});
				//blink2.play();
			}
			break;
	}


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
let invSubMenu = document.querySelector(".inventorySub");
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
let itemPrc = document.querySelector(".itemPrc");

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
		crowbar = new Tool ('Crowbar', '/media/img/items/crowbar.png', false, "A thief's best friend.", "crowbar", false);
		pins = new Tool ('Pins', '/media/img/items/lockpick.png', false, "Always handy to have around in case of locked doors.", "pins", false, 0);
		gun = new Tool ('Gun', '/media/img/items/gun.png', false, "I dont think you're supposed to own that actually.", 'gun', false);
		dubloons = new Valuable ('Dubloons', 'link', true, "Pirate money","dubloons", 10, 3, true);
		shillings = new Valuable ('Shillings', 'link', true, "All the rage in britain","shillings", 10, 5, true);
		necklace = new Valuable ('Necklace', 'link', false, "I needed a non-consumable item test ok", "necklace", 1, 50, true);
		return crowbar, pins, gun, dubloons, shillings, necklace;
	}
	else{
		crowbar = new Tool ('Pied-de-Biche', '/media/img/items/crowbar.png', false, "Le fidèle compagnon de n'importe quel voleur", "crowbar", false);
		pins = new Tool ('Pins', '/media/img/items/lockpick.png', true, "Toujours pratique en cas de porte verouillée.", "pins", false, 0);
		gun = new Tool ('Gun', '/media/img/items/gun.png', false, "Je ne pense pas que tu est sensé posséder cet objet.", 'gun', false);
		dubloons = new Valuable ('Dubloons', 'link', true, "Pirate money", "dubloons", 10, 3, true);
		shillings = new Valuable ('Shillings', 'link', true, "All the rage in britain","shillings", 10, 5, true);
		necklace = new Valuable ('Necklace', 'link', false, "I needed a non-consumable item test ok", "necklace", 1, 50, true);
		valuableTest();
		return crowbar, pins, gun, dubloons, shillings, necklace;
	}
}

function valuableTest(){
	giveItem(dubloons);
	giveItem(shillings);
	giveItem(necklace);
}


let inventoryPosition;
console.log(inventory);

let keyCategory = document.getElementById("keyCategory");
let consCategory = document.getElementById("consCategory");
let valCategory = document.getElementById("valCategory");
let keyWrap = document.getElementById("keyWrap");
let consWrap = document.getElementById("consWrap");
let valWrap = document.getElementById("valWrap");

//updates the inventory, inventory is separated in different categories each categories dont appear at the same moment.


function inventoryUpdate(){
	console.log(inventory);
	keyItemList.innerHTML = "";
	consumableItemList.innerHTML = "";
	valuableItemList.innerHTML = "";
	if(lastItem != undefined && lastItem.amount == 0){
		lastItem = undefined;
	}
	if(inventory.length != 0){
		keyCategory.classList.remove("emptyCategory");
		for(let i = 0; i <= inventory.length - 1; i++){
        	const btn = document.createElement("button");
        	btn.setAttribute("class", "inventoryBtn key mb-2 " + inventory[i].name);
			btn.style.backgroundImage = 'url(' + inventory[i].img +')'
        	btn.setAttribute("value", inventory[i].name);
        	btn.setAttribute("type", "button");
			btn.setAttribute("id", inventory[i].id);
        	keyItemList.appendChild(btn);
		}
	}
	else{
		keyItemList.innerText = "Cette catégorie est vide!!!";
		keyCategory.classList.add("emptyCategory");
	}
	if(consumableInventory.length != 0){
		consCategory.classList.remove("emptyCategory");
		for(let i = 0; i <= consumableInventory.length - 1; i++){
			const btn = document.createElement("button");
			const span = document.createElement("span");
			const spanNode = document.createTextNode("x" + consumableInventory[i].amount);
			span.appendChild(spanNode);
			span.setAttribute("class", "itemAmountBtn");
			btn.appendChild(span);
			btn.style.backgroundImage = 'url(' + consumableInventory[i].img +')'
			btn.setAttribute("class", "inventoryBtn consumable mb-2 " + consumableInventory[i].name);
			btn.setAttribute("value", consumableInventory[i].name);
			btn.setAttribute("type", "button");
			btn.setAttribute("id", consumableInventory[i].id);
			consumableItemList.appendChild(btn);
		}
	}
	else{
		consumableItemList.innerText = "Cette catégorie est vide!!!";
		consCategory.classList.add("emptyCategory");
	}
	if(valuableInventory.length != 0){
		valCategory.classList.remove("emptyCategory");
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
		valCategory.classList.add("emptyCategory");
	}

inventoryBtnArr = document.querySelectorAll(".key");    
consumableBtnArr = document.querySelectorAll(".consumable");
valuableBtnArr = document.querySelectorAll(".valuable");
completeBtnArr = document.querySelectorAll(".inventoryBtn");


subMenu(inventoryBtnArr, consumableBtnArr, valuableBtnArr);
return lastItem;
}



/*FUNCTIONS FOR MAKING CERTAIN CATEGORIES APPEAR IN INVENTORY */

keyCategory.addEventListener("click", () => {
	if(inventory.length != 0){
		keyWrap.style.display = "block";
		consWrap.style.display = "none";
		valWrap.style.display = "none";
	}
	else{
		return;
	}
});

consCategory.addEventListener("click", () => {
	if(consumableInventory.length != 0){
		keyWrap.style.display = "none";
		consWrap.style.display = "block";
		valWrap.style.display = "none";
	}
});

valCategory.addEventListener("click", () => {
	if(valuableInventory.length != 0){
		keyWrap.style.display = "none";
		consWrap.style.display = "none";
		valWrap.style.display = "block";
	}
});

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
				if(inventory[index].amount != 0){
					lastItem = inventory[index];	
				}
				else{
					lastItem = undefined;
				}
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
			if(inventory[index].amount != 0){
				lastItem = consumableInventory[index];	
			}
			else{
				lastItem = undefined;
			}
		})
	})
	valuableArray.forEach((element, index) => {
		element.addEventListener("click", () => {
			for(let i = 0; i <= valuableInventory.length - 1; i++){
				if(element.getAttribute("value") == String(valuableInventory[i].name)){
					subMenuName.innerText = valuableInventory[i].name;
					subMenuImg.setAttribute("src", valuableInventory[i].img);
					subMenuDesc.innerText = valuableInventory[i].desc;						
					itemAmnt.innerText = "";
					if(valuableInventory[i].consumable){
						itemAmnt.innerText = "x" + valuableInventory[i].amount;	
					}
					itemPrc.innerText = valuableInventory[i].price + "$";
				}
			}
			presentBtn.setAttribute("class", valuableInventory[index].id + " itemAction");
			if(valuableInventory[index].amount != 0){
				lastItem = valuableInventory[index];
			}
			else{
				lastItem = undefined;
			}

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
		subMenuName.innerText = "Pas d'objet séléctionné";
				subMenuImg.removeAttribute("src");
				subMenuDesc.innerText = "Veuillez cliquer sur un objet pour voir sa description";
					itemAmnt.innerText = "";
					itemPrc.innerText = "";
	}
		gsap.timeline()		
		.set(inventoryWrapper, {x: "100%"})
		.to(inventoryWrapper, {opacity: 1, duration: 0.5})
});
});

let presentPuzzleTestSolved = false;
let place2Return = false;


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
						presentPuzzleTestSolved = true;
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
inventoryUpdate();

/*/////////////////////////////////////////////////////////
SHOPS
/////////////////////////////////////////////////////////*/

/*Variable contains amount of money in wallet */

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
let itmAmntShop = document.querySelectorAll(".itemAmntShop");
let itemPrice = document.querySelector(".itemPriceNumber");
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
		crowbarShop = new shopItem ('Crowbar', '/media/img/items/crowbar.png', false, "A thief's best friend.", 50, false, "crowbar", 1, crowbar);
		pinsShop = new shopItem ('Pins', '/media/img/items/lockpick.png', true, "Always handy to have around in case of locked doors.", 5, false, "pins", 10, pins);
		gunShop = new shopItem('Gun', '/media/img/items/gun.png', false, "Fucking end me", 50, false, "gun", 1, gun);
		shopInventories();
		return crowbarShop, pinsShop, gunShop;
	}
	else{
		crowbarShop = new shopItem ('Pied-de-Biche', '/media/img/items/crowbar.png', false, "Le fidèle compagnon de n'importe quel voleur", 50, false, "crowbar", 1, crowbar);
		pinsShop = new shopItem ('Crochets', '/media/img/items/lockpick.png', true, "Toujours pratique à avoir sous la main en cas de porte verouillée", 5, false, "pins", 10, pins);
		gunShop = new shopItem('Gun', '/media/img/items/gun.png', false, "Fucking end me", 50, false, "gun", 1, gun);
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
	pageNum = num;
	shopText.innerText = '';
	currentPage = Object.keys(json.scenes[sceneSwap].pages)[pageNum];	
	typeWriter(data.scenes[sceneSwap].pages[currentPage].pageText, "shop");
	shop.style.backgroundImage = data.scenes[sceneSwap].background;
	vn.style.display = "none";
	shop.style.display = "block";
	currentWindow = "shop";
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
						btn.setAttribute("class", "shopBtn noStock mb-4 " + shopInventory1[i].name);
						shopItemList.appendChild(btn);
					}
					else{
						btn.setAttribute("class", "shopBtn mb-4 " + shopInventory1[i].name);
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
				btn.setAttribute("class", "shopBtn mb-4 " + valuableInventory[i].name);
				btn.setAttribute("value", valuableInventory[i].name);
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
							subItemShopNameArr[0].innerText = shopInventory1[i].name;
							itemPrice.innerText = shopInventory1[i].price;
							itemImgShop.style.backgroundImage = 'url(' + shopInventory1[i].img + ')';
							descItmShop.innerText = shopInventory1[i].desc;
							if(shopInventory1[i].consumable == true){
								itmAmntShop[0].innerText = "x" + shopInventory1[i].amount;
							}
							else{
								itmAmntShop[0].innerText = "";
							}
						}
					}
			}
			gsap.to(shopSubMenu, {left: 0, duration: 0.5});
		});
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
						if(shopInventory1[index].consumable == true){
							itmAmntShop[1].innerText = "x" + shopInventory1[index].amount;
						}
						else{
							itmAmntShop[1].innerText = "";
						}
						subItemShopNameArr[1].innerText = shopInventory1[index].name;
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
							subItemShopNameArr[0].innerText = valuableInventory[i].name;
							itemImgShop.setAttribute("src", valuableInventory[i].img);
							descItmShop.innerText = valuableInventory[i].desc;
							itemPrice.innerText = valuableInventory[i].price;
							if(valuableInventory[i].consumable == true){
								itmAmntShop[0].innerText = "x" + valuableInventory[i].amount;
							}
							else{
								itmAmntShop[0].innerText = "";
							}
						}
						else{
						}
					}
			gsap.to(shopSubMenu, {left: 0, duration: 0.5});
		});
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
			subItemShopNameArr[1].innerText = valuableInventory[index].name;
			if(valuableInventory[index].consumable == true){
				itmAmntShop[1].innerText = "x" + valuableInventory[index].amount;
			}
			else{
				itmAmntShop[1].innerText = "";
			}
			sellItem(valuableInventory[index], name);								
		});
	});

}
let selectedItemId = null;


let buyBtn = document.getElementById("buyBtn");
let cancelBtn = document.getElementById("cancelBtn");
let sliderContainer = document.querySelector(".shopSliderContainer");
let input = document.getElementById("shopSlider");
let priceDisplayContainer = document.querySelector(".priceContainer")
let priceDisplay = document.querySelector(".itemPriceConfirm");
let sellBtn = document.getElementById("sellBtn");
let stackPrice;
let amountLeft;

function buyItem(item, shop) {
  console.log(item);
  priceDisplay.innerText = item.price;
  stackPrice = item.price;
  selectedItemId = item.invEquivalent;
  input.value = 1;
  if (item.consumable == true) {
    sliderContainer.style.display = "block";
    input.setAttribute("max", item.amount);
    input.addEventListener("input", () => {
      stackPrice = item.price * input.value;
      priceDisplay.innerText = stackPrice;	  
	  priceDisplayContainer.style.color = "var(--white)";
	  if(stackPrice > wallet){
		priceDisplayContainer.style.color = "var(--red)";
	  }
    });
    buyBtn.addEventListener("click", handlePurchaseOnce.bind(null, item, shop));
  } 
  else {
    sliderContainer.style.display = "none";
    priceDisplay.innerText = item.price;
	priceDisplayContainer.style.color = "var(--white)";
	if(item.price > wallet){
		priceDisplayContainer.style.color = "var(--red)";
	}
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
		walletUpdate();
	  } 
	  else {
		enterShop(shop, json, mathFunction(8, 10));
	  }
	} 
	else {
	  if (wallet >= item.price) {
		giveItem(selectedItemId);
		wallet = wallet - item.price;
		amountLeft = item.amount - 1;
		item.amount = amountLeft;	
		enterShop(shop, json, mathFunction(2, 4));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
		walletUpdate();
	  } else {
		enterShop(shop, json, mathFunction(8, 10));
	  }
	}
  }

/*CANCEL AND CLOSE */

cancelBtn.addEventListener("click", () => {
	itemConfirm.style.display = "none";
	shopPrimary.style.display = "none";
	shopChoice.style.display = "flex";
	gsap.set(shopSubMenu, {left: "-35%", duration: 0.5});
});

closeBtnSH.addEventListener("click", () => {
	itemConfirm.style.display = "none";
	shopPrimary.style.display = "none";
	shopChoice.style.display = "flex";
	shopSubMenu.style.display = "none";
	gsap.set(shopSubMenu, {left: "-35%", duration: 0.5});
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
			console.log(item);
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
	input.value = 1;
	priceDisplay.innerText = item.price;
	sellPrice = item.price;
	selectedItemId = item;
	if (item.consumable == true) {
		sliderContainer.style.display = "block";
		input.setAttribute("max", item.amount);
		input.addEventListener("input", () => {
			sellPrice = item.price * input.value;
		  	priceDisplay.innerText = sellPrice;
		  	console.log(sellPrice);
		});
	
		sellBtn.addEventListener("click", handleSalesOnce.bind(null, item));
	} 
	else {
		sliderContainer.style.display = "none";
		priceDisplay.innerText = item.price;
	
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
		walletUpdate();
	}

	else{		
		removeItem(selectedItemId);
		wallet = wallet + item.price;
		enterShop("pawn", json, mathFunction(12, 14));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
		walletUpdate();
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

let moneyCount = document.querySelectorAll(".count");

function walletUpdate() {
	moneyCount.forEach((element) => {
		element.innerText = String(wallet);
	})

}

walletUpdate();

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
	localStorage.setItem("currentPage", currentPage);
	localStorage.setItem("sceneIndex", sceneIndex);
	localStorage.setItem("sceneSwap", sceneSwap);
	localStorage.setItem("pageNum", pageNum);
	localStorage.setItem("keyInventory", JSON.stringify(inventory));
	localStorage.setItem("consInventory", JSON.stringify(consumableInventory));
	localStorage.setItem("valInventory", JSON.stringify(valuableInventory));
	localStorage.setItem("shopInventory1", JSON.stringify(shopInventory1));
	localStorage.setItem("wallet", wallet);
	localStorage.setItem("place2ReturnCheck", place2Return);
	localStorage.setItem("presentPuzzleTestSolvedCheck", presentPuzzleTestSolved);
	localStorage.setItem("presentArea", currentWindow);
});

const continueBtn = document.getElementById("continue");

continueBtn.addEventListener("click", () => {
	currentPage = localStorage.getItem("currentPage");
	sceneIndex = localStorage.getItem("sceneIndex");
	sceneSwap = localStorage.getItem("sceneSwap");
	pageNum = localStorage.getItem("pageNum");
	inventory = JSON.parse(localStorage["keyInventory"]);
	consumableInventory = JSON.parse(localStorage["consInventory"]);
	valuableInventory = JSON.parse(localStorage["valInventory"]);
	shopInventory1 = JSON.parse(localStorage["shopInventory1"]);
	wallet = localStorage.getItem("wallet");
	place2Return = checkValue(localStorage.getItem("place2ReturnCheck"));
	presentPuzzleTestSolved = checkValue(localStorage.getItem("presentPuzzleTestSolvedCheck"));
	startMenu.style.display = "none";
	switch(localStorage.getItem("presentArea")){
		case "vn":
			vn.style.display = "block";
			break;
		case "shop":
			shop.style.display = "block";
			break;
		case "map":
			map.style.display = "block";
			break;
		default:
			startMenu.style.display = "block";
	}
	inventoryUpdate();
	grabData();
	walletUpdate();
	console.log(shopInventory1);
});

function checkValue(value){
	switch(value){
		case 'true':
			value = true;
			return value;
		case 'false':
			value = false;
			return value;
	}
}