const btnStart = document.getElementById("begin");
const startMenu = document.getElementById("startMenu");
const vn = document.getElementById("vn");
let textbox = document.querySelector(".text");
let optionsbox = document.querySelector(".optionsbox");
let nextBtn = document.querySelector(".nextText");
const vnData= '../json/vn.json';
let pageNum = 0;
let currentPage;
let json, to;

btnStart.addEventListener("click", () => { 
    startMenu.style.display = "none";
    vn.style.display = "block";
    grabData();
})

async function grabData() {
    const resp = await fetch(vnData)
    json = await resp.json();

    currentPage = Object.keys(json.scene1.pages)[pageNum];

    initialize(json);
    handleOptions(json);
}


async function initialize(data){
    textbox.innerText = '';
    


        textbox.innerText = data.scene1.pages[currentPage].pageText;
        vn.style.backgroundImage = data.scene1.background;
    }


function handleOptions(data){
	
	optionsbox.innerHTML = "";

	if(data.scene1.pages[currentPage].hasOwnProperty('options')){
		var o = data.scene1.pages[currentPage].options;
		var str = Object.keys(o).forEach(k => {
			const row = document.createElement('div');
			row.innerHTML = `${k}`
			optionsbox.appendChild(row);
			row.addEventListener('click', () => { 
				console.log(o[k]);
				if(o[k] == "worldMap"){
					worldMap();
				}
				else{
				currentPage = (o[k]);
				pageNum = Object.keys(json.scene1.pages).indexOf(currentPage);
				initialize(json); 
				optionsbox.innerHTML = "";
				console.log("test")
			}})
		})
	}
}


function checkPage(data){
	if(data.scene1.pages[currentPage].hasOwnProperty('Options')) return false;
	if(data.scene1.pages[currentPage].hasOwnProperty('NextPage')) {
		if(data.scene1.pages[currentPage].NextPage == "End") return false;
	}
	
	return true;
}

window.addEventListener('click', () => {
	if(!json) return;
    if(checkPage(json)){
		if(json.scene1.pages[currentPage].hasOwnProperty('NextPage')){
			currentPage = json.scene1.pages[currentPage].NextPage;
		}
		else {
			pageNum++;
			currentPage = Object.keys(json.scene1.pages)[pageNum];
		}
		
		initialize(json);
		handleOptions(json);
	}
    else return;
})

function worldMap(){
	console.log("works");
}