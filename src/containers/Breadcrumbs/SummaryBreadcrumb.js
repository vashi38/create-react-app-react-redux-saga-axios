import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSelectedCurrentShow } from '../Home/selectors';
import { Link } from 'react-router';

class SummaryBreadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { currentSelectedShow } = this.props;
        const showId = currentSelectedShow && currentSelectedShow.id;
        return (
            <Link to={`/shows/${showId}/summary`}>Summary</Link>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentSelectedShow: selectSelectedCurrentShow(),
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryBreadcrumb);