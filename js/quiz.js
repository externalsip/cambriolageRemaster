let quizArea = document.querySelectorAll(".playAreaQuiz");
let optionsboxQuiz = document.querySelector(".optionsboxQuiz");
let textboxTextQuiz = document.querySelector(".textQuiz");
let currentQuestion;
const quizResults = {
	male1: 0,
	male2: 0,
	female1: 0,
	female2: 0,
}
let questionIndex = 0;
const quizDataFR = './json/quizFR.json';
const quizDataEN = './json/quizEN.json';
let quizJson, to;
let playArea = document.querySelectorAll(".playArea");

import {fr, en} from './langSwap.js';
import { handleQuiz, finalizeQuiz } from './game.js';

export async function grabQuizData(){
	if(fr == true){
		const resp = await fetch(quizDataFR); 
		quizJson = await resp.json();
        currentQuestion = Object.keys(quizJson.questions)[questionIndex];
	}
	else{
		const resp = await fetch(quizDataEN);    
		quizJson = await resp.json();
	}
	initializeQuiz(quizJson);
}

function initializeQuiz(data){
    console.log("passed");
	playArea.forEach((element) => {
		element.style.display = "none";
	})
	quizArea[1].style.display = "block";
	quizArea[0].style.display = "flex";
	handleQuiz(data);
}


function nextQuestion(data){
	questionIndex++;
	if(questionIndex >= Object.keys(data.questions).length){
		finalizeQuiz();
	}
	else{
		handleQuiz(data);
	}
}

export async function handleAnswers(data){
    optionsboxQuiz.innerHTML = '';
	if(data.questions[currentQuestion].hasOwnProperty('answers')){
		var o = data.questions[currentQuestion].answers;
		var str = Object.keys(o).forEach(k => {
			const row = document.createElement('button');
			row.innerHTML = `${o[k].text}`
			row.setAttribute("type", "button");
            row.classList.add("optionBtn");
			row.addEventListener("click",() => {
				switch(o[k].target){
					case "A":                        
                        console.log(quizResults)
						quizResults.male1 += o[k].points;
                        console.log(data.questions.length)
						nextQuestion(data);

						break;
					case "B":
						quizResults.male2 += o[k].points;
						nextQuestion(data);
						break;
					case "C":
						quizResults.female1 += o[k].points;
						nextQuestion(data);
						break;
					case "D":
						quizResults.female2 += o[k].points;
						nextQuestion(data);
						break;
				}
			})
			optionsboxQuiz.appendChild(row);
			})
		}
	}

export { currentQuestion, quizJson, quizResults}