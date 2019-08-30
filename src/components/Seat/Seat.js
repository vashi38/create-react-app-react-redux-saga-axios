import React, { Component } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

class Seat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    handleSelectSeat = () => {
        const { seat } = this.props;
        seat.selected = !seat.selected;
        this.setState({
            selected: seat.selected,
        });
    }

    renderSeat = () => {
        const { seat } = this.props;
        if (!seat) return <div className={styles.seatWrapper}>wrong seat</div>;
        if (seat.booked) {
            return <div className={classNames(styles.seatWrapper, styles.booked)}></div>;
        } else if (seat.selected) {
            return <div className={classNames(styles.seatWrapper, styles.selected)} onClick={this.handleSelectSeat}> </div>;
        } else {
            return <div className={styles.seatWrapper} onClick={this.handleSelectSeat}> </div>;
        }
    }
    render() {
        return this.renderSeat();
    }
}

export default Seat;
