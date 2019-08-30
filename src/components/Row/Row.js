import React, { Component } from 'react';
import Seat from '../Seat/Seat';
import styles from './styles.module.scss';

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderRow = () => {
        const { row } = this.props;
        if (!row) return <div> wrong row</div>;
        return (
            <div className={styles.rowWrapper}>
                <h3>{row.code}</h3>
                {row.seats.map(item => <Seat seat={item} />)}
            </div>
        )
    }
    
    render() {
        return this.renderRow();
    }
}

export default Row;
