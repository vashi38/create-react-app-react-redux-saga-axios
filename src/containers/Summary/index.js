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
    initializeState, selectShow, setBreadcrumbs,
} from '../Home/actions';
import ShowsBreadcrumb from '../Breadcrumbs/ShowsBreadcrumb';
import ShowBreadcrumb from '../Breadcrumbs/ShowBreadcrumb';

import styles from './styles.module.scss';


class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { currentSelectedShow } = this.props;
        console.log(currentSelectedShow.getSelectedSeats());
        this.props.setBreadcrumbs([ShowsBreadcrumb, ShowBreadcrumb])
    }

    bookTickets = () => {
        const { match } = this.props;
        this.props.dispatch(push(`${match.url}/summary`));
    }

    onCancel = () => {
        const { match } = this.props;
        this.props.dispatch(push(match.url.replace('/summary', '')));
    }

    renderButtons = () => {
        return (
            <div className={styles.buttonWrapper}>
                <button type="button" onClick={this.bookTickets}>Next</button>
                <button type="button" onClick={this.onCancel}>Back</button>
            </div>
        )
    }

    renderSummaryOfSelectedSeats = (selectedShow) => {
        const lines = selectedShow.getSelectedSeats();
        return (
            <div>
                {lines.map(item => lines.selectedSeats)}
            </div>
        )
    }

    render() {
        const { currentSelectedShow } = this.props;
        return (
            <div>
                <div>
                    {this.renderSummaryOfSelectedSeats(currentSelectedShow)}
                </div>
                
                <div>
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
        setBreadcrumbs: (list) => {
            dispatch(setBreadcrumbs(list));
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);