import Seat from './Seat';

class Line {
    constructor(code, seats, price) {
        this._code = code;
        this._seats = this.getListFromSeats(seats, price);
    }

    get code() {
        return this._code;
    }

    get seats() {
        if (Array.isArray(this._seats)) {
            return this._seats;
        }
        return [];
    }

    getListFromSeats (seats, price) {
        try {
            return seats.map(each => new Seat(each, price, false));
        } catch (e) {
            return [];
        }
    }

    getAvailableSeats() {
        try {
            return this._seats.filter(each => !each.booked);
        } catch (e) {
            return [];
        }
    }

    getBookedSeats() {
        try {
            return this._seats.filter(each => each.booked);
        } catch (e) {
            return [];
        }
    }

    getSelectedSeats() {
        try {
            return this._seats.filter(each => each.selected);
        } catch (e) {
            return [];
        }
    }
}

export default Line;