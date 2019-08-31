import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    selectShows,
} from '../Home/selectors';

import Card from '../../components/Card';

import styles from './styles.module.scss';


class ShowsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidMount() {
        const { shows } = this.props;
        try {
            shows.map(each => each.deSelectAllSeats())
        } catch (e) {
            console.log('error', e);
        }
    }

    handleChangeShow = (id) => {
        const { route } = this.props;
        this.props.dispatch(push(`/${route.path}/${id}`));
    }

    render() {
        const { shows } = this.props;
        return (
            <div>
                <div className={styles.showsTitleContainer}>
                    <strong>Shows</strong>
                </div>
                <div className={styles.cardsContainer}>
                    {shows.map((item, index) => (
                        <Card 
                            key={index}
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
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowsComponent);