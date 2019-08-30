import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectBreadcrumbs } from '../Home/selectors';


class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    render() {
        const { breadcrumbList } = this.props;
        return (
            <div>
                {breadcrumbList.map((Breadcrumb, index, list) => {
                    if (index === list.length - 1) {
                        return <span><Breadcrumb /></span>
                    }
                    return <span><Breadcrumb />&nbsp;>&nbsp;</span>
                })}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    breadcrumbList: selectBreadcrumbs(),
})

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);