import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
    selectShows,
    selectSelectedCurrentShow,
    selectSelectedCurrentShowId,
} from './selectors';
import {
    initializeState, selectShow,
} from './actions';

import Card from '../../components/Card';
import Show from '../../classes/Show';
import { shows, Tax } from './data';

import styles from './styles.module.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        const _shows = shows.map(show => new Show(show.id, show.name, show.seats, Tax));
        this.props.initializeState(_shows);
    }

    handleChangeShow = (id) => {
        const { currentSelectedShow } = this.props;
        console.log(id);
        this.props.handleChangeSelectedShow(id, currentSelectedShow);
    }

    render() {
        const { shows } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.cardsContainer}>
                    {shows.map(item => (
                        <Card 
                            id={item.id} 
                            name={item.name}
                            onClick={this.handleChangeShow} 
                        />
                    ))}
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);