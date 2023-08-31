export default class PlayerLogic {
  constructor(playerName, playerChips) {
    this.name = playerName;
    this.chips = parseInt(playerChips);
    this.currentBet = 0;
  }

  addChips(chipValue) {
    this.chips += chipValue;
  }

  addBet(chipValue) {
    this.currentBet += chipValue;
  }
}