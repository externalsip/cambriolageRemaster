const btnStart = document.getElementById("startGame");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
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
let textboxTextQuiz = document.querySelector(".textQuiz");
let quizArea = document.querySelectorAll(".playAreaQuiz");
let sectionsArr = document.querySelectorAll(".section");
let hero;

const vnDataFR= './json/vnFR.json';
const vnDataEN= './json/vnEN.json';
let pageNum = 0;
let currentPage;
let json, to;
let sceneIndex;
let sceneSwap;
let currentWindow;

import {fr, en} from './langSwap.js';						
import { grabQuizData, currentQuestion, quizJson, quizResults, handleAnswers } from './quiz.js';
import { inventoryLang, enterShop, ShopLang, itemManage, lang, closeInventory, openInventory } from './inventory.js';

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 __   __  ___   _______  __   __  _______  ___        __    _  _______  __   __  _______  ___        _______  __    _  ______     __   __  _______  _______ 
|  | |  ||   | |       ||  | |  ||   _   ||   |      |  |  | ||       ||  | |  ||       ||   |      |   _   ||  |  | ||      |   |  |_|  ||   _   ||       |
|  |_|  ||   | |  _____||  | |  ||  |_|  ||   |      |   |_| ||   _   ||  |_|  ||    ___||   |      |  |_|  ||   |_| ||  _    |  |       ||  |_|  ||    _  |
|       ||   | | |_____ |  |_|  ||       ||   |      |       ||  | |  ||       ||   |___ |   |      |       ||       || | |   |  |       ||       ||   |_| |
|       ||   | |_____  ||       ||       ||   |___   |  _    ||  |_|  ||       ||    ___||   |___   |       ||  _    || |_|   |  |       ||       ||    ___|
 |     | |   |  _____| ||       ||   _   ||       |  | | |   ||       | |     | |   |___ |       |  |   _   || | |   ||       |  | ||_|| ||   _   ||   |    
  |___|  |___| |_______||_______||__| |__||_______|  |_|  |__||_______|  |___|  |_______||_______|  |__| |__||_|  |__||______|   |_|   |_||__| |__||___|    

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

//btnStart is the button after the language confirm in the main menu, it starts the game by calling the json for the script.

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
	lang();
	return sceneIndex, pageNum;
});

/*////////////////////////////////////////////////////////////////////////////////////
 __   __  _______  _______ 
|  |_|  ||   _   ||       |
|       ||  |_|  ||    _  |
|       ||       ||   |_| |
|       ||       ||    ___|
| ||_|| ||   _   ||   |    
|_|   |_||__| |__||___|    

/////////////////////////////////////////////////////////////////////////////////////////*/

//The map places are map elements, for now they are placeholders, they each lead to their own place, with their own dialogue, some places run checks to see if you performed certain actions, like having come there at least once, so the same dialogue isnt executed twice.

mapPlace1.addEventListener("click", () => { 
    map.style.display = "none";
    vn.style.display = "block";
	currentWindow = "vn";
	sceneIndex = 2;
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
			sceneIndex = 7;
			break;
		
		case presentPuzzleTestSolved:
			sceneIndex = 6;
			break;

		default:
			sceneIndex = 3;
	}
	pageNum = 0;
	grabData();
	return sceneIndex, pageNum;
});

mapPlace3.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	currentWindow = "vn";
	sceneIndex = 4;
	pageNum = 0;
	grabData();
	return sceneIndex, pageNum;
});

mapPlace4.addEventListener("click", () => {
	map.style.display = "none";
	vn.style.display = "block";
	currentWindow = "vn";
	sceneIndex = 5;
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

}

let stop = false;
/*///////////////////////////////////////////////////////////////

 ___   __    _  ___   _______  ___   _______  ___      ___   _______  _______ 
|   | |  |  | ||   | |       ||   | |   _   ||   |    |   | |       ||       |
|   | |   |_| ||   | |_     _||   | |  |_|  ||   |    |   | |____   ||    ___|
|   | |       ||   |   |   |  |   | |       ||   |    |   |  ____|  ||   |___ 
|   | |  _    ||   |   |   |  |   | |       ||   |___ |   | | ______||    ___|
|   | | | |   ||   |   |   |  |   | |   _   ||       ||   | | |_____ |   |___ 
|___| |_|  |__||___|   |___|  |___| |__| |__||_______||___| |_______||_______|

/////////////////////////////////////////////////////////////////*/

/*The  initialize function handles everything that is visual on the visual novel pages, the sprites, the text, the background images, the animations. For the letter by letter effect, it calls on the typewritter function, and if the screen is clicked again while the text is still being printed, it appears instantly.*/
async function initialize(data){		
	if(isTalking == true && optionClick == false){
		let originalText = data.scenes[sceneSwap].pages[currentPage].pageText;
		let updatedText = originalText;
		if(hero != undefined){
			updatedText = originalText.replace("%PROTAG%", hero.name);
		}
		textboxText.innerHTML = updatedText;
		stop = true;
	}

	else{
	optionClick = false;
    textboxText.innerText = '';
	namebox1.innerText = '';
	namebox2.innerText = '';
	let originalText = data.scenes[sceneSwap].pages[currentPage].pageText;
	let updatedText = originalText;
	if(hero != undefined){
		updatedText = originalText.replace("%PROTAG%", hero.name);
		switch(hero.gender){
			case "male":
				if(fr == true){
					updatedText = originalText.replace("%HE/SHE%", "il");
					updatedText = originalText.replace("%HE/SHE(Cap)%", "Il");
					updatedText = originalText.replace("%HE/SHE(Caps)%", "IL");
					updatedText = originalText.replace("%HIM/HER%", "lui");
					updatedText = originalText.replace("%HIM/HER(Cap)%", "Lui");
					updatedText = originalText.replace("%HIM/HER(Caps)%", "LUI");
				}
				else{
					updatedText = originalText.replace("%HE/SHE%", "he");
					updatedText = originalText.replace("%HE/SHE(Cap)%", "He");
					updatedText = originalText.replace("%HE/SHE(Caps)%", "HE");
					updatedText = originalText.replace("%HIM/HER%", "him");
					updatedText = originalText.replace("%HIM/HER(Cap)%", "Him");
					updatedText = originalText.replace("%HIM/HER(Caps)%", "HIM");
				}

				break;
			case "female":
				if(fr == true){
					updatedText = originalText.replace("%HE/SHE%", "elle");
					updatedText = originalText.replace("%HE/SHE(Cap)%", "Elle");
					updatedText = originalText.replace("%HE/SHE(Caps)%", "ELLE");
					updatedText = originalText.replace("%HIM/HER%", "lui");
					updatedText = originalText.replace("%HIM/HER(Cap)%", "Lui");
					updatedText = originalText.replace("%HIM/HER(Caps)%", "LUI");
				}
				else{
					updatedText = originalText.replace("%HE/SHE%", "she");
					updatedText = originalText.replace("%HE/SHE(Cap)%", "She");
					updatedText = originalText.replace("%HE/SHE(Caps)%", "SHE");
					updatedText = originalText.replace("%HIM/HER%", "her");
					updatedText = originalText.replace("%HIM/HER(Cap)%", "Her");
					updatedText = originalText.replace("%HIM/HER(Caps)%", "HER");
				}

				break;
			
		}
	}

	console.log(updatedText);

	//manages the sprites currently on screen, and which sprite is the active one, the inactive sprite is greyed out so we clearly know who is talking.
	if(data.scenes[sceneSwap].pages[currentPage].hasOwnProperty('character1')){
		if(data.scenes[sceneSwap].pages[currentPage].character1 = "hero"){
			sprite1.style.backgroundImage = 'url('+ hero.base +')';
			sprite1mouth.style.backgroundImage = 'url('+ hero[data.scenes[sceneSwap].pages[currentPage].sprite1].mouth +')';
			sprite1eyes.style.backgroundImage = 'url('+ hero[data.scenes[sceneSwap].pages[currentPage].sprite1].eyes +')';
		}
		else{
			sprite1.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character1].base +')';
			sprite1mouth.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character1][data.scenes[sceneSwap].pages[currentPage].sprite1].mouth +')';
			sprite1eyes.style.backgroundImage = 'url('+ data.characters[data.scenes[sceneSwap].pages[currentPage].character1][data.scenes[sceneSwap].pages[currentPage].sprite1].eyes +')';
		}

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
		console.log(data.scenes[sceneSwap].pages[currentPage].pageText);
		typeWriter(updatedText, "vn");
		if(json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('check')){
			switch(json.scenes[sceneSwap].pages[currentPage].check){
				case "place2Return":
					place2Return = true;
					break;
			}
		}	}
}

let dialogItem;

/*/////////////////////////////////////////////////////////////////
 _______  __   __  ___   _______    _______  __   __  __    _  _______  _______  ___   _______  __    _  _______ 
|       ||  | |  ||   | |       |  |       ||  | |  ||  |  | ||       ||       ||   | |       ||  |  | ||       |
|   _   ||  | |  ||   | |____   |  |    ___||  | |  ||   |_| ||       ||_     _||   | |   _   ||   |_| ||  _____|
|  | |  ||  |_|  ||   |  ____|  |  |   |___ |  |_|  ||       ||       |  |   |  |   | |  | |  ||       || |_____ 
|  |_|  ||       ||   | | ______|  |    ___||       ||  _    ||      _|  |   |  |   | |  |_|  ||  _    ||_____  |
|      | |       ||   | | |_____   |   |    |       || | |   ||     |_   |   |  |   | |       || | |   | _____| |
|____||_||_______||___| |_______|  |___|    |_______||_|  |__||_______|  |___|  |___| |_______||_|  |__||_______|

///////////////////////////////////////////////////////////////////*/

let tiedResults = [];
let finalResult;

export async function handleQuiz(data) {
	stop = false;
	typeWriter(data.questions[currentQuestion].questionText, "quiz");
}


quizArea.forEach((element) => {
    element.addEventListener("click", () => {
		if(isTalking == true){
			stop = true;
			handleAnswers(quizJson);
			textboxTextQuiz.innerHTML = quizJson.questions[currentQuestion].questionText;
		}
    })
})

export function finalizeQuiz(){
	let highScore = 0;

	for (const result in quizResults){
		if(quizResults[result] > highScore) {
			highScore = quizResults[result];
			tiedResults = [result];
		}
		else if (quizResults[result] === highScore) {
			tiedResults.push(result);
		  }
	}

	if (tiedResults.length > 1) {
		const randomIndex = Math.floor(Math.random() * tiedResults.length);
		finalResult = tiedResults[randomIndex];
	  }
	else{
		finalResult = tiedResults[0];
	}

	quizArea.forEach((element) => {
		element.style.display = "none";
	})
	playArea[1].style.display = "block";
	playArea[0].style.display = "flex";
	sceneIndex = 1;
	pageNum = 0;
	console.log(finalResult);
	switch(finalResult){
		case "male1":
			hero = json.characters.male01;
			break;
		case "male2":
			hero = json.characters.male02;
			break;
		case "female1":
			console.log("female01");
			hero = json.characters.female01;
			console.log(hero);
			break;
		case "female2":
			hero = json.characters.female02;
			break;
	}
	grabData();
	return hero;
}

let optionClick = false;

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
						optionsbox.innerHTML = "";
						sprite1.style.backgroundImage = "";
						sprite1mouth.style.backgroundImage = "";
						sprite1eyes.style.backgroundImage = "";
						sprite2.style.backgroundImage = "";
						sprite2mouth.style.backgroundImage = "";
						sprite2eyes.style.backgroundImage = "";
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
						openInventory();
						break;

					default:
						currentPage = (o[k]);
						pageNum = Object.keys(json.scenes[sceneSwap].pages).indexOf(currentPage);
						initialize(json);
						optionsbox.innerHTML = "";
						optionClick = true;
						break;
				}
				})
		})
	}
}

let isTalking = false;

export function typeWriter(txt, check, i, wordsArr, currentWord) {
	i = i || 0;
	wordsArr = wordsArr || txt.split(' ');
	currentWord = currentWord || 0;
  
	if (!i) {
	  if (check === "vn") {
		textboxText.innerHTML = '';
	  } else if (check === "shop") {
		stop = false;
		shopText.innerHTML = '';
	  }
	  else if (check === "quiz") {
		console.log("pass")
		textboxTextQuiz.innerHTML = '';
	  }
	  clearTimeout(to);
	}
  
	var speed = 30; /* The speed/duration of the effect in milliseconds */
  
	if (stop === true) {
	  i = wordsArr.length;
	  isTalking = false;
	  console.log(isTalking);
	  spriteAnimation();
	  if(check === "quiz"){
		handleAnswers(quizJson);
	  }
	  else{
		handleOptions(json);
	  }
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
	  } 
	  else if (check === "shop") {
		shopText.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
	  }
	  else if(check === "quiz"){
		textboxTextQuiz.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
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
		else if(check === "quiz") {
			textboxTextQuiz.innerHTML = wordsArr.slice(0, currentWord).join(' ') + ' ' + visibleWord;
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
		charDelay = speed * 7;
	  }

  
	  to = setTimeout(function() {
		typeWriter(txt, check, i + 1, wordsArr, currentWord);
	  }, charDelay);
	} else {
	  isTalking = false;
	  if(check === "quiz"){
		handleAnswers(quizJson);
	  }
	  else{
		handleOptions(json);
	  }

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
		}
		else{
		if(!json) return;
		if(checkPage(json)){
			switch(true){
				case json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('jump'):
					switch(json.scenes[sceneSwap].pages[currentPage].jump){
						case "titleScreen":
							sectionsArr.forEach((element) => {
								element.style.display = "none";
								})
								startMenu.style.display = "flex";
								break;
						case "quiz":
								grabQuizData();
							break;
					}
					break;
				case json.scenes[sceneSwap].pages[currentPage].hasOwnProperty('shop'):
					enterShop(json.scenes[sceneSwap].pages[currentPage].shop, 0, Number(json.scenes[sceneSwap].pages[currentPage].shopNum));
					currentWindow = "shop";	
					break;
				
				default:
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
				gsap.set(sprite2mouth, {backgroundPositionX: 0});
				//blink2.play();
			}
			break;
	}
}

let presentPuzzleTestSolved = false;
let place2Return = false;

let presentBtn = document.getElementById("presentBtn");

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
					closeInventory();			
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

export function recoverSave() {
	currentPage = localStorage.getItem("currentPage");
	sceneIndex = localStorage.getItem("sceneIndex");
	sceneSwap = localStorage.getItem("sceneSwap");
	pageNum = localStorage.getItem("pageNum");
	hero = JSON.parse(localStorage["hero"]);
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
	grabData();
}

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

export {isTalking, sceneSwap, currentPage, sceneIndex, pageNum, place2Return, presentPuzzleTestSolved, currentWindow, hero};