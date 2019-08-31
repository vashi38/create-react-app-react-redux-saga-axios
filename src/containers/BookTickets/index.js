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


class BookTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onClickHome = () => {
        this.props.dispatch(push(`/shows`));
    }

    renderButtons = () => {
        return (
            <div className={styles.buttonWrapper}>
                <button type="button" onClick={this.onClickHome}>Home</button>
            </div>
        )
    }

    renderResult = () => {
        try {
            const { currentSelectedShow } = this.props;
            const selectedSeatsByLine = currentSelectedShow.getSelectedSeats();
            let selectedSeats = [];
            selectedSeatsByLine.map(item => {
                selectedSeats = selectedSeats.concat(...item.selectedSeats);
                return selectedSeats;
            });
            const result = currentSelectedShow.bookTickets(selectedSeats);
            console.log(result)
            if (result.success) {
                currentSelectedShow.deSelectAllSeats();
                return this.renderSuccessMessage(result);
            }
            return this.renderFailureMessage(result);
        } catch (e) {
            return '';
        }
    }

    renderSuccessMessage = (result) => {
        return(
            <div>
                <strong>Success. Selected seats booked successfully.</strong>
            </div>
        );
    }

    renderFailureMessage = (result) => {
        const message = result.message;
        return(
            <div>
                <strong>Failed. Failed to book selected seats.</strong>
                <div>
                    {message}
                </div>
            </div>
        );
    }

    render() {
        const { currentSelectedShow } = this.props;
        if (!currentSelectedShow || !currentSelectedShow.id) return null;
        return (
            <div>
                <div>
                    {this.renderResult()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BookTickets);