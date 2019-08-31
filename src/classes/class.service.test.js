import { shows, Tax as _tax } from '../containers/Home/data';
import Show from './Show';


describe('check the initialised state', () => {
    let _shows = []
    beforeEach(() => {
        console.log(_tax);
        _shows = shows.map((show) => new Show(show.id, show.name, show.seats, _tax));
    })
    it('state should contain the shows', () => {
        expect(_shows).toBeTruthy();
        expect(_shows.length).toBe(3);
    })
    
    it('get the selected show', () => {
        const show = _shows[0];
        expect(show.name).toBe('show 1');
    })

    it('should display available seats of the selected show', () => {
        try {
            const show = _shows[0];
            expect(show.name).toBe('show 1');
            console.log(show.getAvailableSeats())
        } catch (e) {
            expect(e).toBeFalsy();
        }
    })
})

describe('book tickets tests', () => {
    let _shows = [];
    beforeEach(() => {
        _shows = shows.map(show => new Show(show.id, show.name, show.seats, _tax));
    })
    
    it('should book tickets with success', () => {
        const show = _shows[0];
        const selectedSeats = ['A1', 'A2'];
        const response = show.bookTickets(selectedSeats); 
        expect(response.success).toBeTruthy();
        expect(response.list).toBeTruthy();       
        expect(response.list.length).toBe(2); 
        expect(parseFloat(response.cost.subTotal).toFixed(2)).toBe('640.00'); //without tax
        expect(parseFloat(response.cost.total).toFixed(2)).toBe('736.00'); //with tax
    })

    it('should fail book tickets', () => {
        const show = _shows[0];
        const selectedSeats = ['A11', 'A22'];
        const response = show.bookTickets(selectedSeats); 
        expect(response.success).toBeFalsy();       
    })

    it('should fail book tickets when trying to book booked tickets', () => {
        const show = _shows[0];
        const selectedSeats = ['A1', 'A2'];
        const firstResponse = show.bookTickets(selectedSeats); 
        expect(firstResponse.success).toBeTruthy();
        const secondResponse = show.bookTickets(selectedSeats); 
        expect(secondResponse.success).toBeFalsy();    
    })
})

describe('Display revenue of the owner tests', () => {
    let _shows = [];
    beforeEach(() => {
        _shows = shows.map(show => new Show(show.id, show.name, show.seats, _tax));
    })

    it('should display total revenue of the owener', () => {
        const show = _shows[0];
        let selectedSeats = ['A1', 'A2'];
        const firstResponse = show.bookTickets(selectedSeats); 
        expect(firstResponse.success).toBeTruthy();
        selectedSeats = ['A3', 'A4'];
        const secondResponse = show.bookTickets(selectedSeats); 
        expect(secondResponse.success).toBeTruthy();
        try {
            const revenueList = _shows.map(each => each.getRevenue());
            console.log(revenueList);
        } catch (e) {
            expect(e).toBeFalsy();
        }
    })
})