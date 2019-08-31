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
import Row from '../../components/Row/Row';

import styles from './styles.module.scss';


class ShowHome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { params, currentSelectedShow } = this.props;
        const showId = parseInt(params.showId, 10);
        this.props.handleChangeSelectedShow(showId, currentSelectedShow);
    }

    onViewSummary = () => {
        const { params } = this.props;
        this.props.dispatch(push(`/shows/${params.showId}/summary`));
    }

    onCancel = () => {
        this.props.dispatch(push(`/shows`));
    }

    renderButtons = () => {
        return (
            <div className={styles.buttonWrapper}>
                <button type="button" onClick={this.onViewSummary}>Next</button>
                <button type="button" onClick={this.onCancel}>Back</button>
            </div>
        )
    }

    render() {
        const { currentSelectedShow } = this.props;
        const rows = currentSelectedShow && currentSelectedShow.lines;
        return (
            <div className={styles.showContainer}>
                <div className={styles.roomContainer}>
                    <div className={styles.showNameContainer}>
                        <strong>{currentSelectedShow && currentSelectedShow.name}</strong>
                    </div>
                    <div className={styles.rowsWrapper}>
                    {
                        rows && rows.map && rows.map((row, index) => <Row key={index} row={row} />)
                    }
                    </div>
                    <div className={styles.screenContainer}>
                        <div className={styles.screen}></div>
                        <strong>screen this side</strong>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowHome);