import React, { Component } from 'react';
import { Link } from 'react-router';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectShows,
    selectSelectedCurrentShow,
    selectSelectedCurrentShowId,
} from './selectors';
import {
    initializeState,
} from './actions';

import styles from './styles.module.scss';
import { shows, Tax } from './data';
import Show from '../../classes/Show';
import Breadcrumbs from '../Breadcrumbs';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const _shows = shows.map(show => new Show(show.id, show.name, show.seats, Tax));
        this.props.initializeState(_shows);
    }

    render() {
        const { children, routes } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.appHeaderContainer}>
                    <Breadcrumbs routes={routes} />
                    <Link to={'/totalRevenue'} >Total Revenue</Link>
                </div>
                <div className={styles.routeComponentContainer}>
                    {children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    shows: selectShows(),
    currentSelectedShow: selectSelectedCurrentShow(),
    currentSelectedShowId: selectSelectedCurrentShowId(),
})

export function mapDispatchToProps(dispatch) {
    return {
        initializeState: (showsList) => {
            dispatch(initializeState(showsList));
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);