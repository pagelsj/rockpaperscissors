var RPS = (function () {
	var RPS = (function () {

		// Create config object. Contains data needed to determin the winner of the game.
		// Can be extended to include more weapons.
		var config = {
			weapons:[
				{
					name:"rock",
					index:0,
					beats:[{name: "scissors", index :2}]
				},
				{
					name:"paper",
					index:1,
					beats:[{name:"rock", index:0}]
				},
				{
					name:"scissors",
					index:2,
					beats:[{name:"paper", index:1}]
				},
			]
		};
		var GameLogic = {
			// Array of choosen weapons.
			chosenWeapons:[],
			winner:[],
			init : function (pcVpc) {
				
				if (pcVpc){
					this.createRandom();
				};

				this.createRandom();
				this.test();
			},
			// Creates a random number based on the length of config.weapons and stores the selected object.
			createRandom: function () {
				var randomNumber = Math.floor(Math.random() * config.weapons.length);
				this.chosenWeapons.push(config.weapons[randomNumber]);
			},
			test : function () {
				console.log("123")
				// given that there is always going to be a result....may as well push the first element into the array.
				// If beanten, we will just remove it later on down the line.
				this.winner.push(this.chosenWeapons[0]);
				// Loop though all randomly chosen weapons.
				for (weapon in this.chosenWeapons) {	
					//Look though the winners
					for (i in this.winner) {
						// Loop through all the weapons the currently chosen one can beat.
						for (b in this.chosenWeapons[weapon].beats){
							// If the currentl weapon beats one that has been stored already, remove the stored one and push this one to the
							// 'winner' storage object.
							if (this.chosenWeapons[weapon].beats[b].index == this.winner[i].index){
								this.winner.push(this.chosenWeapons[weapon]);
								this.winner.splice(i,1);
							// In case of a draw...store both items.
							}else if(this.chosenWeapons[weapon].index == this.winner[i].index && weapon != 0){
								this.winner.push(this.chosenWeapons[weapon]);
							};
						};
					};
				};
				GameView.updateView();

			}
		};

		var GameView = {
			addEvents : function () {

				$('.controlls li').on("click", function (e) {
					// If the user clicks on the random weapon icon, trigger the init function to pick two random weapons.	
					if ($(this).hasClass("pcVpc")) {
					
						GameLogic.init(true);
					
					} else {
						// Otherwise push the users selection to the chosenWeapons array and pick one random one.
						RPS.GameLogic.chosenWeapons.push(config.weapons[$(this).index() -1]);
						console.log("RPS.GameLogic.chosenWeapons", RPS.GameLogic.chosenWeapons);

						GameLogic.init();
					};

				});


			},
			updateView : function () {

				// Simply display the two items in the chosen weapon array
				$(".player:first").attr("class", "player " + RPS.GameLogic.chosenWeapons[0].name);
				$(".player:last").attr("class", "player " + RPS.GameLogic.chosenWeapons[1].name);

				// Add a watermark to the winning weapons display.
				$(".player."+RPS.GameLogic.winner[0].name).addClass("winner");

				// Reset the arrays.
				RPS.GameLogic.winner = [];
				RPS.GameLogic.chosenWeapons = [];

			}

		};

		return {
			GameView:GameView,
			GameLogic:GameLogic
		};
	})();
//	RPS.init();
	RPS.GameView.addEvents();
	return RPS;
})();