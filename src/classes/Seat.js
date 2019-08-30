class Seat {
    constructor(code, price = 0, booked=false, selected=false) {
        this._code = code;
        this._price = price;
        this._booked = booked
        this._selected = selected;
    }
    get code() {
        return this._code;
    }

    get price() {
        return this._price;
    }

    get booked() {
        return this._booked;
    }

    get selected() {
        return this._selected;
    }
    
    set booked(booked) {
        try {
            this._booked = booked
            return true;
        } catch (e) {
            return false;
        }
    }

    set selected(selected) {
        try {
            this._selected = selected
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default Seat;