describe("The game of Rock-Paper-Scissors", function () {
	beforeEach(function () {
		RPS.GameLogic.winner = [];
		RPS.GameLogic.chosenWeapons = [];
	});

	it("should pick and store 2 new weapons", function () {
		RPS.GameLogic.init();
		expect(RPS.GameLogic.chosenWeapons.length).toEqual(2);
	});
	it("should filter out the weapons that have been defeated", function () {
		RPS.GameLogic.chosenWeapons = [{
			name:"rock",
			index:0,
			beats:[{name: "scissors", index :2}]
		},
		{
			name:"paper",
			index:1,
			beats:[{name:"rock", index:0}]
		}];

		RPS.GameLogic.test();

		expect(RPS.GameLogic.winner.length).toEqual(1);
		expect(RPS.GameLogic.winner[0].name).toBe("paper");
	});
	it("should store both weapons in the 'winner' object if they are the same. This represents a draw.", function () {
		RPS.GameLogic.chosenWeapons = [{
			name:"paper",
			index:1,
			beats:[{name:"rock", index:0}]
		},
		{
			name:"paper",
			index:1,
			beats:[{name:"rock", index:0}]
		}];

		RPS.GameLogic.test();

		expect(RPS.GameLogic.winner.length).toEqual(2);
		expect(RPS.GameLogic.winner[0].name).toBe("paper");
	});
});