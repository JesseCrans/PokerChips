export default class PlayerLogic {
    constructor(name, chips) {
        this.name = name;
        this.chips = parseInt(chips);
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (newName === '') {
            throw 'Name must be at least 1 character.'
        }
        this._name = newName;
    }

    get chips() {
        return this._chips;
    }

    set chips(amount) {
        if (amount < 0) {
            throw 'Amount must be greater than or equal to zero.'
        }
        this._chips = amount;
    }

    addChips(amount) {
        this._chips += amount
    }
}
