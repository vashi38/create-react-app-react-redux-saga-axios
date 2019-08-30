import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectSelectedCurrentShow } from '../Home/selectors';

class ShowBreadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { currentSelectedShow } = this.props;
        return (
            <span>{currentSelectedShow && currentSelectedShow.name}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowBreadcrumb);