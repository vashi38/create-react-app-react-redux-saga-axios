import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    selectShows,
    selectSelectedCurrentShow,
    selectSelectedCurrentShowId,
} from '../Home/selectors';
import {
    initializeState, selectShow,
} from '../Home/actions';
import styles from './styles.module.scss';
import TotalCost from '../../components/TotalSummary';


class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getSelectedSeats = (item) => {
        const list = item.line.getSelectedSeats().map(each => each.code).join(', ');
        return list || 'No seat selected';
    }

    bookTickets = () => {
        const { params } = this.props;
        this.props.dispatch(push(`/shows/${params.showId}/book`));
    }

    onCancel = () => {
        const { params } = this.props;
        this.props.dispatch(push(`/shows/${params.showId}`));
    }

    renderButtons = () => {
        return (
            <div className={styles.buttonWrapper}>
                <button type="button" onClick={this.onCancel}>Back</button>
                <button type="button" onClick={this.bookTickets}>Book Tickets</button>
            </div>
        )
    }

    formatPrice = (price) => parseFloat(price).toFixed(2);

    renderTable = (lines) => {
        return(
            <table>
                <tr>
                    <th className={styles.lineColumn}>Line</th>
                    <th className={styles.seatsColumn}>Seats</th>
                    <th className={styles.countColumn}>count</th>
                    <th className={styles.perSeatColumns}>Per Seat</th>
                    <th className={styles.totalColumn}>Total</th>
                </tr>
                {
                    lines.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className={styles.lineColumn}>{item.line.code}</td>
                                <td className={styles.seatsColumn}>{this.getSelectedSeats(item)}</td>
                                <td className={styles.countColumn}>{item.line.getSelectedSeats().length}</td>
                                <td className={styles.perSeatColumns}>{this.formatPrice(item.line.price)}</td>
                                <td className={styles.totalColumn}>{this.formatPrice(item.cost.subTotal)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        )
    }
    
    renderTotalCost = (totalCost) => {
        const { currentSelectedShow } = this.props;
        return (
            <TotalCost totalCost={{
                ...totalCost,
                tax: currentSelectedShow.tax
            }} />
        );
    }

    renderSummaryOfSelectedSeats = (selectedShow) => {
        try {
            const lines = selectedShow.getSelectedSeats(false);
            const cost = lines.map(item => ({
                line: item.line,
                cost: selectedShow.getCost(item.selectedSeats),
            }));
            let allSelectedSeats = [];
            lines.map(item => {
                allSelectedSeats = allSelectedSeats.concat(...item.selectedSeats);
                return allSelectedSeats;
            })
            const totalCost = selectedShow.getCost(allSelectedSeats, true);
            return (
                <div className={styles.tableWrapper}>
                    {this.renderTable(cost)}
                    {this.renderTotalCost(totalCost)}
                </div>
            )
        } catch (e) {
            return '';
        }
    }

    render() {
        const { currentSelectedShow } = this.props;
        return (
            <div>
                <div>
                    {this.renderSummaryOfSelectedSeats(currentSelectedShow)}
                </div>
                
                <div className={styles.buttonContainer}>
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    shows: selectShows(),
    currentSelectedShow: selectSelectedCurrentShow(),
    currentSelectedShowId: selectSelectedCurrentShowId(),
})

function mapDispatchToProps(dispatch) {
    return {
        initializeState: (showsList) => {
            dispatch(initializeState(showsList));
        },
        handleChangeSelectedShow: (selectedShowId, currentItem = null) => {
            dispatch(selectShow(selectedShowId, currentItem));
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);