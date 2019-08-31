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
            <div className={styles.container}>
                <span className={styles.lineDescription}>Line: {row.code} Price: {parseFloat(row.price).toFixed(2)}</span>
                <hr />
                <div className={styles.rowWrapper}>
                    {row.seats.map((item, index) => <Seat key={index} seat={item} />)}
                </div>
            </div>
        )
    }
    
    render() {
        return this.renderRow();
    }
}

export default Row;
