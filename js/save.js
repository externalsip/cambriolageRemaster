import { sceneSwap, currentPage, sceneIndex, pageNum, place2Return, presentPuzzleTestSolved, currentWindow, hero, recoverSave } from './game.js'
import { inventory, consumableInventory, valuableInventory, wallet, shopInventory1, recoverInventory } from './inventory.js';

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
	localStorage.setItem("hero", JSON.stringify(hero));
});

const continueBtn = document.getElementById("continue");

continueBtn.addEventListener("click", () => {
    recoverInventory();
    recoverSave();
})