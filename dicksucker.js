var dicksSucked = 0;
var allTimeDicksSucked = 0;
var multiplier = 1;
var currentDPS = 0;
var displayString = "dicks sucked";

var products = [
    {objID: "dickSuckingMachine",    displayName: "Low Tech Dick Sucking Machine",      counter: 0,   price: 50,      multiplier: 0,  dps: 1  },
    {objID: "cheapProstitute",       displayName: "Cheap Prostitute",                   counter: 0,   price: 300,     multiplier: 1,  dps: 2  },
    {objID: "antiChafingCream",      displayName: "Anti Chafing Cream",                 counter: 0,   price: 600,     multiplier: 2,  dps: 3  },
    {objID: "midDickSuckingMachine", displayName: "Mid Tech Cock Slurping Contraption", counter: 0,   price: 2000,    multiplier: 3,  dps: 5  },
    {objID: "withdrawingCrackWhore", displayName: "Withdrawing Crack Whore",            counter: 0,   price: 4000,    multiplier: 4,  dps: 7  },
    {objID: "largeSpiderGag",        displayName: "Large Spider Gag",                   counter: 0,   price: 7500,    multiplier: 5,  dps: 10 },
    {objID: "hiDickSuckingMachine",  displayName: "Hi Tech Knob Gobbling Device",       counter: 0,   price: 10000,   multiplier: 7,  dps: 12 },
    {objID: "luxuriousEscort",       displayName: "Luxurious Escort",                   counter: 0,   price: 20000,   multiplier: 9,  dps: 15 },
    {objID: "mouthWideningSurgery",  displayName: "Mouth-Widening Surgery",             counter: 0,   price: 50000,   multiplier: 11, dps: 18 },
    {objID: "mouthImplant",          displayName: "Implant More Mouths",                counter: 0,   price: 200000,  multiplier: 15, dps: 21 },
    {objID: "cockPortal",            displayName: "Cock Universe Portal",               counter: 0,   price: 350000,  multiplier: 20, dps: 24 }
];

var consumables = [
	{objID: "vMode",                 displayName: "/v/ Mode",                           owned: false, price: 500000,  multiplier: 30, dps: 30, effectText: "???" },
	{objID: "dMode",                 displayName: "/d/ Mode",                           owned: false, price: 1000000, multiplier: 60, dps: 60, effectText: "???" },
	{objID: "aerodynamicDicks",      displayName: "Aerodynamic Dicks",                  owned: false, price: 2000000, multiplier: 0,  dps: 0,  effectText: "Doubles DPS" }
];

function main() {
	for(x = 0; x < products.length; x++) {
		createButton(products[x], false);
	}
	
	for(y = 0; y < consumables.length; y++) {
		createButton(consumables[y], true);
	}
	
	var suckDickButton = document.createElement("button");
	suckDickButton.setAttribute("id", "suckDickButton");
	suckDickButton.onmousedown = function () { suckDick(); };
	suckDickButton.innerHTML = "Suck dick";
	document.getElementById("suckDickButtonContainer").appendChild(suckDickButton);
	
	window.setInterval(tick, 1000);
}

function createButton(product, consumable) {
	var newButton = document.createElement("button");
	newButton.className = "buyButton";
	newButton.setAttribute("id", product.objID + "Button");
	newButton.onclick = function() { buy(product.objID); };
	newButton.disabled = true;

	if(consumable == true) {
		newButton.innerHTML = "<b>"+ product.displayName + "</b><br />" + beautify(product.price) + " Dicksucks (" + product.effectText + ")";
		document.getElementById("consumablesContainer").appendChild(newButton);
	} else {
		newButton.innerHTML = "<b>"+ product.displayName + "</b><br />" + beautify(product.price) + " Dicksucks (+" + beautify(product.multiplier) + "mp, " + beautify(product.dps) + "dps)<br />" + "Owned: <b>" + beautify(product.counter) + "</b>";
		document.getElementById("productsContainer").appendChild(newButton);
	}
}

function suckDick() {
	dicksSucked += multiplier;
	allTimeDicksSucked += multiplier;
	updateDisplay();
}

function updateDisplay() {
	document.getElementById("dickSuckingDisplay").innerHTML = beautify(dicksSucked);
	document.getElementById("dickSuckingFlavorText").innerHTML = displayString;
	document.getElementById("multiplierDisplay").innerHTML = "Your click multiplier is " + beautify(multiplier);
	document.getElementById("dpsDisplay").innerHTML = "Your current DPS is " + beautify(currentDPS);
	document.getElementById("allTimeDicksSucked").innerHTML = "(all time: " + beautify(allTimeDicksSucked) + ")";
	
	for(i = 0; i < products.length; i++) {
			document.getElementById(products[i].objID + "Button").innerHTML = 
				"<b>"+ products[i].displayName + "</b><br />" +
				beautify(products[i].price) + " Dicksucks (+" + beautify(products[i].multiplier) + "mp, " + beautify(products[i].dps) + "dps)<br />" +
				"Owned: <b>" + beautify(products[i].counter) + "</b>";
	}
	
	toggleButtons();
	updateSlogan();
}

function buy(whatToBuy) {
	for(i = 0; i < products.length; i++) {
		if(products[i].objID == whatToBuy) {
			if(dicksSucked >= products[i].price) {
				dicksSucked -= products[i].price;
				multiplier += products[i].multiplier;
				currentDPS += products[i].dps;
				products[i].price = Math.round(products[i].price * 1.1);
				products[i].counter += 1;
				createGrafix(whatToBuy);
				updateDisplay();
				return;
			}
		}
	}
	
	for(j = 0; j < consumables.length; j++) {
		if(consumables[j].objID == whatToBuy) {
			if(dicksSucked >= consumables[j].price) {
				dicksSucked -= consumables[j].price;
				multiplier += consumables[j].multiplier;
				currentDPS += consumables[j].dps;
				
				var newGrafix = document.createElement("img")
				var randTop = Math.floor(Math.random()*101);
				var randLeft = Math.floor(Math.random()*101);
				newGrafix.className = "grafix";
				newGrafix.setAttribute("style", "top: " + randTop + "%; left: " + randLeft + "%;");
				var flavorText;
				
				// Boost-specific effects
				switch (whatToBuy) {
					case "vMode":
						if(consumables[1].owned == true) { // if user has /d/ mode already
							displayString = "feminine futanari dicks sucked";
						} else {
							displayString = "feminine dicks sucked";
						}
						
						newGrafix.src = "./i/vMode.png";
						flavorText = "/v/ Mode Activated";
						document.body.style.backgroundImage = "url('./i/vModeBackground.png')";
						break;
					case "dMode":
						if(consumables[0].owned == true) { // if user has /v/ mode already
							displayString = "feminine futanari dicks sucked";
						} else {
							displayString = "futanari dicks sucked";
						}
						
						newGrafix.src = "./i/dMode.png";
						flavorText = "/d/ Mode Activated";
						document.body.style.backgroundImage = "url('./i/dModeBackground.png')";
						break;
					case "aerodynamicDicks":
						newGrafix.src = "./i/aerodynamicDicks.png";
						flavorText = "Aerodynamic Dicks";
						currentDPS += currentDPS;
						break;
				}

				newGrafix.setAttribute("alt", flavorText);
				newGrafix.setAttribute("title", flavorText);
				document.getElementById("grafixContainer").appendChild(newGrafix);
				document.getElementById(consumables[j].objID + "Button").setAttribute("class","hidden");
				consumables[j].owned = true;
				updateDisplay();
			}
		}
	}
}

function toggleButtons() {
	for(i = 0; i < products.length; i++) {
		if(dicksSucked < products[i].price) {
			document.getElementById(products[i].objID + "Button").disabled = true;
		} else {
			document.getElementById(products[i].objID + "Button").disabled = false;
		}
	}
	
	for(j = 0; j < consumables.length; j++) {
		if(dicksSucked < consumables[j].price) {
			document.getElementById(consumables[j].objID + "Button").disabled = true;
		} else {
			document.getElementById(consumables[j].objID + "Button").disabled = false;
		}
	}
}

function tick() {
	dicksSucked += currentDPS;
	allTimeDicksSucked += currentDPS;
	updateDisplay();
}

function beautify(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function createGrafix(which) {
	var newGrafix = document.createElement("img")
	var randTop = Math.floor(Math.random()*101);
	var randLeft = Math.floor(Math.random()*101);
	var flavorText;
	newGrafix.className = "grafix";
	newGrafix.setAttribute("style", "top: " + randTop + "%; left: " + randLeft + "%;");
	newGrafix.src = "./i/" + which + ".png";
	
	for(i = 0; i < products.length; i++) {
		if(which == products[i].objID) {
			flavorText = products[i].displayName + " #" + beautify(products[i].counter);
			break;
		}
	}
	
	newGrafix.setAttribute("alt", flavorText);
	newGrafix.setAttribute("title", flavorText);
	document.getElementById("grafixContainer").appendChild(newGrafix);
}

function updateSlogan() {
	var slogan = document.getElementById("slogan");
	
	if(allTimeDicksSucked <= 500) {
		slogan.innerHTML = "You are an amateur dick sucker";
	} else if(allTimeDicksSucked <= 1000) {
		slogan.innerHTML = "Your cocksucking skills are really coming along";
	} else if(allTimeDicksSucked <= 5000) {
		slogan.innerHTML = "People are starting to recommend you to their friends";
	} else if(allTimeDicksSucked <= 10000) {
		slogan.innerHTML = "You are now sucking off local politicians and business owners";
	} else if(allTimeDicksSucked <= 20000) {
		slogan.innerHTML = "You start a cock sucking training course for porn stars";
	} else if(allTimeDicksSucked <= 35000) {
		slogan.innerHTML = "You've sucked off several presidents and kings";
	} else if(allTimeDicksSucked <= 50000) {
		slogan.innerHTML = "Every man, woman and pet in the world wish they had your cock sucking skills";
	} else if(allTimeDicksSucked <= 100000) {
		slogan.innerHTML = "You have now surpassed your mother in amount of dicks sucked";
	} else if(allTimeDicksSucked <= 200000) {
		slogan.innerHTML = "You bring the likes of Jenna Jameson and Bree Olson to shame";
	} else if(allTimeDicksSucked <= 350000) {
		slogan.innerHTML = "Aliens visit Earth to learn to suck cock like you";
	} else if(allTimeDicksSucked <= 500000) {
		slogan.innerHTML = "You are now sucking cock 24/7, even whilst resting";
	} else if(allTimeDicksSucked <= 750000) {
		slogan.innerHTML = "Your diet now consists exclusively of sperm and smegma";
	} else if(allTimeDicksSucked <= 1000000) {
		slogan.innerHTML = "Your body is now 98.5% semen";
	} else if(allTimeDicksSucked <= 1250000) {
		slogan.innerHTML = "The Earth is engulfed in a tidal wave of cum from your customers";
	} else if(allTimeDicksSucked <= 1500000) {
		slogan.innerHTML = "All liquids in the solar system are now semen";
	} else if(allTimeDicksSucked <= 1750000) {
		slogan.innerHTML = "You have become exceedingly efficient at sucking dicks";
	} else if(allTimeDicksSucked <= 2000000) {
		slogan.innerHTML = "Sometimes you pull on it so hard, you rip the skin";
	} else if(allTimeDicksSucked <= 2500000) {
		slogan.innerHTML = "You now get all necessary sustenance from gobbling dong";
	} else if(allTimeDicksSucked <= 3000000) {
		slogan.innerHTML = "[dick sucking intensifies]";
	} else {
		slogan.innerHTML = "It is time to stop sucking cocks";
	}
}
