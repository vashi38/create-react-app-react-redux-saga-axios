import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectHomeState } from './selectors';
import { connect } from 'react-redux';
import { callAction1Action } from './actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div>This is home page</div>
                <input type="button" onClick={this.props.callAction1} value='callAction1Action' />
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    home: selectHomeState(),
})

function mapDispatchToProps(dispatch) {
    return {
        callAction1: () => {
            dispatch(callAction1Action());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);