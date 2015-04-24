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
			init : function () {
				this.winner = [];
				this.chosenWeapons = [],
				console.log("this.inner", this.winner);
				this.createRandom();
				this.createRandom();
				this.test();
			},
			// Creates a random number based on the length of config.weapons and stores the selected object.
			createRandom: function () {
				var randomNumber = Math.floor(Math.random() * config.weapons.length);
				this.chosenWeapons.push(config.weapons[randomNumber]);
			},
			test : function () {
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
				console.log("winner", this.winner);
			}
		};

		var GameView = {
			addEvents : function () {

				$('#pcVpc').on("click", function (e) {
					
					e.prevendDefault	;
					GameLogic.init();


				});
				$(GameLogic.winner).on("change", function () {
					console.log("winner2", winner[0].name);
				})
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