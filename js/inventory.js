const itemList = document.querySelector(".itemList");
let inventoryBtnArr = document.querySelectorAll(".inventoryBtn");
let subMenuName = document.querySelector(".itemName");
let subMenuImg = document.querySelector(".itemImg");
let subMenuDesc = document.querySelector(".itemDesc");
let givePinsBtnArr = document.querySelectorAll(".pinsGiveBtn");
let firstBtn = document.getElementById("0");


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

let Tools = [
    crowbar = new Tool ('crowbar', 'link', 10, false, "A thief's best friend."),
    pins = new Tool ('pins', 'link', 2, true, "Always handy to have around in case of locked doors."),
];

let inventory = [];

for (let i of Tools){
    if(i.drb === 10){
        inventory.push(crowbar);
        inventory.push(pins);
    }
};

givePinsBtnArr.forEach((element) => {
    element.addEventListener("click", () => {
            inventory.push(pins);
        inventoryUpdate();
    })

});

console.log(inventory);
let b = 0;
function inventoryUpdate(){
    itemList.innerHTML = "";
    for(let i = 0; i <= inventory.length - 1; i++){
        const btn = document.createElement("button");
        if(inventory[i].consumable == true){
            for(instance of inventory){
                if(instance.name == inventory[i].name){
                    b++;
                }
            }
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
       // btn.setAttribute("onclick", "inventoryBtnTest(value)")
        itemList.appendChild(btn);
        inventoryBtnArr = document.querySelectorAll(".inventoryBtn");
        console.log(inventoryBtnArr);
}
return(inventoryBtnArr);
}

inventoryUpdate();

inventoryBtnArr.forEach((element) => {
    console.log("test");
    element.addEventListener("click", () => {
        for(let i = 0; i <= inventory.length; i++){
            if(element.getAttribute("value") == inventory[i].name){
                subMenuName.innerText = inventory[i].name;
                subMenuImg.setAttribute("src", inventory[i].img);
                subMenuDesc.innerText = inventory[i].desc;
                console.log(inventory[i]);
            }
        }
    });
});

function inventoryBtnTest(element) {
    for(let i = 0; i <= inventory.length -1; i++){
        if(element == inventory[i].name){
            subMenuName.innerText = inventory[i].name;
            subMenuImg.setAttribute("src", inventory[i].img);
            subMenuDesc.innerText = inventory[i].desc;
        }
    }
}

inventoryBtnTest("crowbar");




