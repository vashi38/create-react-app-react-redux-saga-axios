import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    selectShows,
} from '../Home/selectors';

import Card from '../../components/Card';

import styles from './styles.module.scss';
import { setBreadcrumbs } from '../Home/actions';
import ShowsBreadcrumb from '../Breadcrumbs/ShowsBreadcrumb';


class ShowsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidMount() {
        this.props.setBreadcrumbs([ShowsBreadcrumb])
    }

    handleChangeShow = (id) => {
        const { match } = this.props;
        this.props.dispatch(push(`${match.url}/${id}`));
    }

    render() {
        const { shows } = this.props;
        return (
            <div>
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
})

function mapDispatchToProps(dispatch) {
    return {
        setBreadcrumbs: (list) => {
            dispatch(setBreadcrumbs(list));
        },
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowsComponent);