const btnStart = document.getElementById("startGame");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textbox = document.querySelector(".textbox");
let textboxText = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let langBtn = document.querySelectorAll(".langSetting");
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
			shopTextbox.innerHTML = '';
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
			shopTextbox.innerHTML += c;
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

const itemList = document.querySelector(".itemList");
let inventoryBtnArr;
let subMenuName = document.querySelector(".itemName");
let subMenuImg = document.querySelector(".itemImg");
let subMenuDesc = document.querySelector(".itemDesc");
let itemAmnt = document.querySelector(".itemAmnt");
let inventoryCloseBtn = document.getElementById("closeBtnIN");
let inventoryWrapper = document.querySelector(".inventoryWrapper");
let inventoryCloseArea = document.querySelector(".inventoryCloseArea");
let openInventoryBtn = document.querySelectorAll(".openInventory");
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
    constructor(name, img, consumable, desc, id, amount){
        super(name, img);
        this.consumable = consumable;
        this.desc = desc;
		this.id = id;
		this.amount = amount;
    }
}

class Valuable extends Item {
	constructor(name, img, consumable, desc, id, amount, value){
		super(name, img);
		this.consumable = consumable;
		this.desc = desc;
		this.id = id;
		this.amount = amount;
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



function inventoryLang() {
	if(en == true){
		crowbar = new Tool ('Crowbar', 'link', false, "A thief's best friend.", "crowbar");
		pins = new Tool ('Pins', 'link', true, "Always handy to have around in case of locked doors.", "pins", 0);
		gun = new Tool ('Gun', 'link', false, "Fucking end me", 'gun');
		dubloons = new Valuable ('Dubloons', 'link', true, "Pirate money","dubloons", 10, 3);
		shillings = new Valuable ('Shillings', 'link', true, "All the rage in britain","shillings", 10, 5);
		necklace = new Valuable ('Necklace', 'link', false, "I needed a non-consumable item test ok", 1, 50);
		valuableInventory.push(dubloons, shillings, necklace);
		return crowbar, pins, gun, dubloons, shillings, necklace;
	}
	else{
		crowbar = new Tool ('Pied-de-Biche', 'link', false, "Le fidèle compagnon de n'importe quel voleur", "crowbar");
		pins = new Tool ('Crochets', 'link', true, "Toujours pratique à avoir sous la main en cas de porte verouillée", "pins", 0);	
		gun = new Tool ('Gun', 'link', false, "Fucking end me", 'gun');
		dubloons = new Valuable ('Dubloons', 'link', true, "Pirate money", 10, 3);
		shillings = new Valuable ('Shillings', 'link', true, "All the rage in britain","shillings", 10, 5);
		necklace = new Valuable ('Necklace', 'link', false, "I needed a non-consumable item test ok", 1, 50);
		return crowbar, pins, gun, dubloons, shillings, necklace;
	}
}


//This is definetly not the best way to handle consumable items, but it is the only one I can think of right now, every consumable has their own variable for their number, with a default of zero and if the item is already present once in the inventory, instead of adding a second button for the item, it only makes the number go up by 1.
let inventoryPosition;


console.log(inventory);

function inventoryUpdate(){
	console.log(inventory);
	itemList.innerHTML = "";
    for(let i = 0; i <= inventory.length - 1; i++){
        const btn = document.createElement("button");
        if(inventory[i].consumable == true){
					const node = document.createTextNode(inventory[i].name + "x" + inventory[i].amount);
					btn.appendChild(node);
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
								itemAmnt.innerText = "x" + inventory[i].amount;
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

openInventoryBtn.forEach((button) => {
	button.addEventListener("click", () => {
	if(inventory.length > 0){
		subMenuName.innerText = inventory[lastItem].name;
		subMenuImg.setAttribute("src", inventory[lastItem].img);
		subMenuDesc.innerText = inventory[lastItem].desc;
		if(inventory[lastItem].consumable == true){
			itemAmnt.innerText = "x" + inventory[lastItem].amount;
		}
		else{
		itemAmnt.innerText = "";
		}
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
let subItemShopName = document.querySelector(".itemNameShop");
let shopSubMenu = document.querySelector(".shopSub");
let itemImgShop = document.querySelector(".itemImgShop");
let descItmShop = document.querySelector(".itemDescShop");
let itmAmntShop = document.querySelector(".itemAmntShop");
let itemConfirm = document.querySelector(".shopConfirm");
let closeBtnSH = document.getElementById("closeBtnSH");
let shopTextbox = document.querySelector(".shopTextbox");



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
	console.log(wallet);
	pageNum = num;
	shopTextbox.innerText = '';
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
						const node = document.createTextNode(shopInventory1[i].name + " x" + shopInventory1[i].amount);
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
			shopItemList.innerHTML = "";
			shopChoice.style.display = "none";
			shopPrimary.style.display = "block";
			for(let i = 0; i <= valuableInventory.length; i++){
				const btn = document.createElement("button");
				if(valuableInventory[i].consumable == true){
							const node = document.createTextNode(valuableInventory[i].name + "x" + valuableInventory[i].amount);
							btn.appendChild(node);
				}
				else{
					const node = document.createTextNode(valuableInventory[i]);
					btn.appendChild(node);
				}
				btn.setAttribute("class", "shopBtn" + valuableInventory[i].name);
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
			shopTextbox.innerText = '';
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
							subItemShopName.innerText = shopInventory1[i].name;
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
				enterShop(shop, json, mathFunction(5, 7))
			}
			else{
				switch(name){
					case "shop1":
						shopSubMenu.style.display = "none";
						itemConfirm.style.display = "flex";
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
							subItemShopName.innerText = valuableInventory[i].name;
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

function handlePurchaseOnce(item, shop) {
	if (purchaseMade) {
	  return; // Exit the function if purchase has already been made
	}
  
	purchaseMade = true; // Set the flag to indicate purchase has been made
  
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

function giveItem(item) {
	console.log(wallet);
	console.log(item);
	if(item.consumable == true){
		if(inventory.includes(item)){
			inventoryPosition = inventory.indexOf(item);
			inventory[inventoryPosition].amount++;
			inventoryUpdate();
		}
		else{
			inventory.push(item);
			inventoryPosition = inventory.indexOf(item);
			inventory[inventoryPosition].amount++;
			inventoryUpdate();
		}
	}
	else{
		inventory.push(item);
		inventoryUpdate();
	}
}

function sellItem(item, shop){
	console.log(item);
	priceDisplay.innerText = item.value + "$";
	stackPrice = item.price;
	selectedItemId = item;
	input.value = 1;
	if (item.consumable == true) {
		sliderContainer.style.display = "block";
		input.setAttribute("max", item.amount);
		input.addEventListener("input", () => {
		  stackPrice = item.price * input.value;
		  priceDisplay.innerText = stackPrice + " $";
		});
	
		buyBtn.addEventListener("click", handleSalesOnce.bind(null, item, shop));
	  } else {
		sliderContainer.style.display = "none";
		priceDisplay.innerText = item.price + " $";
	
		buyBtn.addEventListener("click", handleSalesOnce.bind(null, item, shop));
	  }
}

function handleSalesOnce(item, shop) {
	if (salesMade) {
	  return; // Exit the function if purchase has already been made
	}
  
	salesMade = true; // Set the flag to indicate purchase has been made

	if (selectedItemId.consumable) {
		amountLeft = item.amount - input.value;		
		removeItem(selectedItemId, item.amountLeft);
		wallet = wallet + stackPrice;
		item.amount = amountLeft;		
		enterShop(shop, json, mathFunction(12, 14));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
		console.log(wallet);
	}

	else{		
		removeItem(selectedItemId, item.amountLeft);
		wallet = wallet + item.value;
		enterShop(shop, json, mathFunction(12, 14));
		itemConfirm.style.display = "none";
		shopPrimary.style.display = "none";
		shopChoice.style.display = "flex";
	} 
}

function mathFunction(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function removeItem(item, newAmount){
	if(item.consumable == true){
		let index = inventory.findIndex(item);
		inventory[index].amount = inventory[index].amount - newAmount;
		if(inventory[index].amount == 0){
			inventory.splice(index, index);
		}
	}
	else{
		let index = inventory.findIndex(item);
		inventory.splice(index, index);
	}
}