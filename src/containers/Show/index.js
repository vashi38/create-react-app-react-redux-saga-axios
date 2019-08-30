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
import Row from '../../components/Row/Row';

import styles from './styles.module.scss';


class ShowHome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { match: { params }, currentSelectedShow } = this.props;
        const showId = parseInt(params.showId, 10);
        this.props.handleChangeSelectedShow(showId, currentSelectedShow);
        this.props.setBreadcrumbs([ShowsBreadcrumb, ShowBreadcrumb])
    }

    onViewSummary = () => {
        const { match } = this.props;
        this.props.dispatch(push(`${match.url}/summary`));
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
            <div>
                <div className={styles.rowsWrapper}>
                {
                    rows.map(row => <Row row={row} />)
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowHome);